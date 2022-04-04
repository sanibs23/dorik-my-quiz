import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import {
    Button,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";
import { genUniqId, isImageUrl } from "../../helper";
import MyQuizList from "./myQuizList";
import ImageOption from "../question/imageOption";

export default function CreateQuizForm({ update }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        setQuizHandler,
        setQuestionHandler,
        updateQuestionHandler,
        getQuestionById,
        countQuestionByQuizId,
    } = useContext(QuizDispatchContext);
    const { quizList } = useContext(QuizContext);

    const [quizTitle, setQuizTitle] = useState("");
    const [layout, setLayout] = useState({ label: "Single", value: "single" });
    const [quizId, setQuizId] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState("");
    const [correctOption, setCorrectOption] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [rewardPoint, setRewardPoint] = useState(1);
    const [isMultiChoice, setIsMultiChoice] = useState(false);

    /**
     * Handler for set option by Enter pressing.
     *
     * @param {Object} event
     */
    const handleOptionSet = (event) => {
        const title = event.target.value;
        if (event.key === "Enter" && title) {
            const option = {
                title,
                id: genUniqId(),
                isImage: isImageUrl(title),
            };

            setOptions([option, ...options]);
            // Clearing option input value to set new
            setOption("");
        }
    };

    /**
     * Handler for set correct option.
     *
     * @param {string} optionId
     */
    const onCorrectOptionSelection = (optionId) => {
        if (isMultiChoice) {
            setCorrectOption([...correctOption, optionId]);
        } else {
            setCorrectOption(optionId);
        }
    };

    /**
     * Handler for quiz type selection from existing quiz list
     *
     * @param {Array} value
     */
    const onExistingQuizSelect = (value) => {
        setQuizId(value[0]?.id);
        setQuizTitle("");
    };

    /**
     * set correct option as single if question is single choice otherwise make it multiple (array)
     */
    useEffect(() => {
        if (isMultiChoice && !Array.isArray(correctOption)) {
            setCorrectOption(correctOption ? [correctOption] : []);
        } else if (
            !isMultiChoice &&
            Array.isArray(correctOption) &&
            correctOption.length
        ) {
            setCorrectOption(correctOption?.pop());
        }
    }, [isMultiChoice, correctOption]);

    /**
     * Reset form handler
     */
    const resetFrom = () => {
        setQuestionTitle("");
        setOptions([]);
        setOption("");
        setQuizTitle("");
        setCorrectOption("");
        setIsFormValid(false);
        setIsMultiChoice(false);
        setRewardPoint(1);
        setLayout("");
    };

    /**
     * Quiz creation handler
     */
    const createQuiz = () => {
        if (isFormValid) {
            const doSave = (quiz, order) => {
                const question = {
                    correctOption,
                    isMultiChoice,
                    options,
                    order,
                    title: questionTitle,
                    rewardPoint: parseInt(rewardPoint) > 0 ? +rewardPoint : 1,
                };

                if (!update) {
                    question.id = genUniqId();
                    question.quizId = quiz?.id || quizId;
                }

                if (quiz?.id) {
                    setQuizHandler(quiz);
                }

                if (update) {
                    updateQuestionHandler(question, id, () => navigate(-1));
                } else {
                    setQuestionHandler(question);
                }

                resetFrom();
            };
            if (quizTitle) {
                const quiz = {
                    id: genUniqId(),
                    title: quizTitle,
                    layout,
                };
                doSave(quiz, 1);
            } else {
                countQuestionByQuizId(quizId, (value) => {
                    doSave(null, value + 1);
                });
            }
        } else {
            alert("Please provide required data for the quiz");
        }
    };

    /**
     * Setting form submit button status based on form required fields.
     */
    useEffect(() => {
        if (
            (update || quizTitle || quizId) &&
            questionTitle &&
            options.length > 1
        ) {
            if (Array.isArray(correctOption) && correctOption.length) {
                setIsFormValid(true);
            } else if (!Array.isArray(correctOption) && correctOption) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        } else {
            setIsFormValid(false);
        }
    }, [questionTitle, quizId, quizTitle, options, correctOption, update]);

    useEffect(() => {
        if (id && update) {
            getQuestionById(id, (value) => {
                const { correctOption, options, rewardPoint, title, isMultiChoice } =
                    value;
                setCorrectOption(correctOption);
                setRewardPoint(rewardPoint);
                setQuestionTitle(title);
                setOptions(options);
                setIsMultiChoice(isMultiChoice);
            });
        }
    }, [update, id]);

    return (
        <>
            <h4 className="text-center">
                {update ? "Update Question" : "Create Quiz"}
            </h4>
            <hr />

            {/* Quiz Title section */}
            {!update && (
                <div className="d-flex justify-content-between">
                    <div className="w-100">
                        <FormGroup>
                            <Label htmlFor="quizTitle">Quiz title *</Label>
                            <Input
                                placeholder="Quiz title"
                                id="quizTitle"
                                name="quizTitle"
                                value={quizTitle}
                                required
                                onChange={(e) => {
                                    setQuizTitle(e.target.value);
                                    setQuizId("");
                                }}
                            />
                        </FormGroup>
                    </div>

                    <div className="w-100 mx-2">
                        <FormGroup>
                            <Label htmlFor="quizList">or Select from existing</Label>

                            <Select
                                options={quizList}
                                labelField="title"
                                valueField="id"
                                disabled={quizList.length <= 0 || quizTitle}
                                onChange={onExistingQuizSelect}
                            />
                        </FormGroup>
                    </div>
                    <div className="w-50">
                        <FormGroup>
                            <Label htmlFor="quizList">Layout</Label>

                            <Select
                                values={[layout]}
                                options={[
                                    { label: "Single", value: "single" },
                                    { label: "Multiple", value: "multiple" },
                                ]}
                                disabled={quizId}
                                labelField="label"
                                valueField="value"
                                onChange={(value) => setLayout(value[0])}
                            />
                        </FormGroup>
                    </div>
                </div>
            )}

            {/* Question Form */}
            <FormGroup>
                <Label htmlFor="questionTitle">Question Title *</Label>
                <Input
                    placeholder="Press Enter to add"
                    id="questionTitle"
                    name="questionTitle"
                    value={questionTitle}
                    required
                    onChange={(e) => setQuestionTitle(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="rewardPoint">Reward Point</Label>
                <Input
                    placeholder="Reward point"
                    id="rewardPoint"
                    name="rewardPoint"
                    type="number"
                    min="1"
                    step="1"
                    value={rewardPoint}
                    required
                    onChange={(e) => setRewardPoint(e.target.value)}
                />
            </FormGroup>

            {/* Option section */}
            <p className="fw-bold">
                Option List{" "}
                <small className="text-muted">
                    (You have to add minimum 2 options)
                </small>
            </p>
            <FormGroup>
                <Label htmlFor="optionTitle">Option {options.length + 1}</Label>
                <Input
                    placeholder="Press Enter to add"
                    id="optionTitle"
                    name="optionTitle"
                    value={option}
                    onKeyUp={handleOptionSet}
                    onChange={(e) => setOption(e.target.value)}
                />
            </FormGroup>
            {options.length ? (
                <p>
                    Click on the correct option(s){" "}
                    <small className="text-muted">(Have to select at least one)</small>
                </p>
            ) : (
                ""
            )}
            <ListGroup>
                {options?.map((option) => (
                    <ListGroupItem
                        color={
                            correctOption?.includes(option.id) || option.id === correctOption
                                ? "primary"
                                : "secondary"
                        }
                        className="mb-2"
                        key={option.id}
                        onClick={() => onCorrectOptionSelection(option.id)}
                    >
                        {option.isImage ? (
                            <ImageOption imageUrl={option.title} />
                        ) : (
                            <p className="m-0 py-1">{option.title}</p>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <FormGroup>
                <Input
                    id="isMultiChoice"
                    type="checkbox"
                    name="isMultiChoice"
                    checked={isMultiChoice}
                    onChange={(e) => setIsMultiChoice(e.target.checked)}
                />
                <Label className="ms-2" htmlFor="isMultiChoice">
                    Multi choice
                </Label>
            </FormGroup>
            <div className="text-center">
                <Button disabled={!isFormValid} onClick={createQuiz} color="success">
                    {update ? "Update" : "Create"}
                </Button>
                <span className="mx-3">Or</span>
                <Link to="/dashboard">
                    <Button color="danger">Cancel</Button>
                </Link>
            </div>
            {!update && <MyQuizList preview />}
        </>
    );
}
