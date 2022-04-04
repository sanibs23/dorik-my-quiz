import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import GameEndScreen from "../../components/question/quizEnd";
import QuizOption from "../../components/question/option";
import QuizTitle from "../../components/question/title";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";

export default function QuizBoard() {
    let { id } = useParams();
    const { questionList } = useContext(QuizContext);
    const { getQuestionByQuiz } = useContext(QuizDispatchContext);
    const [isCorrectAnswer, setCorrectAnswer] = useState(false);
    const [answeredId, setAnsweredId] = useState();
    const [point, setPoint] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [hasQuizEnd, setQuizEnd] = useState(false);

    const reset = () => {
        setCorrectAnswer(false);
        setAnsweredId();
    };

    const validateAnswer = (answerId, correctAnswer) => {
        if (!answeredId) {
            setAnsweredId(answerId);
            const isCorrect = answerId === correctAnswer;
            setCorrectAnswer(isCorrect);
            setPoint(isCorrect ? point + currentQuestion.rewardPoint : point);
        }
    };

    const onNextHandler = () => {
        if (questionList.length - 1 > currentQuestionIndex) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            reset();
        }
    };

    useEffect(() => {
        questionList?.length && setCurrentQuestion(questionList[currentQuestionIndex]);
    }, [currentQuestionIndex, questionList]);

    useEffect(() => {
        getQuestionByQuiz(id);
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
            setQuizEnd(answeredId && questionList.length - 1 === currentQuestionIndex);
        }, 1500);
    }, [currentQuestionIndex, answeredId]);

    return (
        <>
            {hasQuizEnd ? <GameEndScreen point={point} /> : <>
                <h5 className="text-end pe-3">Your Point <span className="border d-inline-block p-2 rounded-circle border-info">{point}</span></h5>
                {
                    currentQuestion ? <div >
                        <QuizTitle title={currentQuestion.title} />

                        {currentQuestion.options.map((option) =>
                            <div key={option.id}
                                onClick={() => validateAnswer(option.id, currentQuestion.correctOption)}
                                aria-hidden="true"
                            >
                                <QuizOption
                                    isImage={option.isImage}
                                    isCorrectAnswer={answeredId === option.id && isCorrectAnswer}
                                    isItAnsweredId={answeredId}
                                    title={option.title}
                                    bgClass={answeredId ? answeredId === option.id && isCorrectAnswer ? "bg-success" : answeredId === option.id && !isCorrectAnswer ? "bg-danger" : "" : ""}
                                />
                            </div>
                        )}
                        {currentQuestion?.isMultiChoice && <p>It is a multi-choice question. You can choose multiple option</p>}
                    </div>
                        : <p>Loading...</p>}

                <div className="text-center mt-3">
                    <Button
                        disabled={!answeredId || !(questionList.length - 1 > currentQuestionIndex)}
                        size="lg"
                        onClick={onNextHandler}>Next</Button>
                </div>
            </>
            }


        </>
    );
}
