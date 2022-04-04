import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameEndScreen from "../../components/question/quizEnd";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";
import QuizLayout from "../../components/playQuiz/quizLayout";

export default function QuizBoard() {
    let { id } = useParams();
    const { questionList } = useContext(QuizContext);
    const { getQuestionByQuiz, getQuizLayoutByIdHandler } =
        useContext(QuizDispatchContext);

    const [point, setPoint] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [hasQuizEnd, setQuizEnd] = useState(false);
    const [layout, setLayout] = useState("");
    const [total, setTotal] = useState(0);


    const onNextHandler = () => {
        if (questionList.length - 1 > currentQuestionIndex) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    useEffect(() => {
        questionList?.length &&
            setCurrentQuestion(questionList[currentQuestionIndex]);
    }, [currentQuestionIndex, questionList]);

    useEffect(() => {
        getQuestionByQuiz(id);
        getQuizLayoutByIdHandler(id, (value) => setLayout(value));
    }, [id]);

    const checkQuizEnd = () => {
        setQuizEnd((questionList.length - 1 === currentQuestionIndex) || questionList.length === total);
    };

    return (
        <>
            {hasQuizEnd ? (
                <GameEndScreen point={point} />
            ) : (
                <>
                    <h5 className="text-end pe-3">
                        Your Point{" "}
                        <span className="border d-inline-block p-2 rounded-circle border-info">
                            {point}
                        </span>
                    </h5>

                    {layout && layout == "single" && currentQuestion ? (
                        <QuizLayout
                            currentQuestion={currentQuestion}
                            setPoint={setPoint}
                            setQuizEnd={setQuizEnd}
                            point={point}
                            handleNext={onNextHandler}
                            checkQuizEnd={checkQuizEnd}
                        />
                    ) : layout === "multiple" ? (
                        questionList?.map((question) => (
                            <QuizLayout
                                isMulti
                                key={question.id}
                                currentQuestion={question}
                                setPoint={setPoint}
                                setQuizEnd={setQuizEnd}
                                point={point}
                                handleNext={onNextHandler}
                                checkQuizEnd={checkQuizEnd}
                                setTotal={() => setTotal(total + 1)}
                            />
                        ))
                    ) : (
                        <h4>Loading...</h4>
                    )}
                </>
            )}
        </>
    );
}
