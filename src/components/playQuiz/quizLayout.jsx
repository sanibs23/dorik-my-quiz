import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import QuizOption from "../question/option";
import QuizTitle from "../question/title";

export default function SingleLayoutQuiz({
    isMulti,
    currentQuestion,
    setPoint,
    point,
    handleNext,
    checkQuizEnd,
    setTotal
}) {
    const [isCorrectAnswer, setCorrectAnswer] = useState(false);
    const [answeredId, setAnsweredId] = useState();

    const validateAnswer = (answerId, correctAnswer) => {
        if (!answeredId) {
            setAnsweredId(answerId);
            const isCorrect = answerId === correctAnswer;
            setCorrectAnswer(isCorrect);
            setPoint(isCorrect ? point + currentQuestion.rewardPoint : point);
        }
        isMulti && setTotal();
    };

    useEffect(() => {
        setTimeout(() => {
            answeredId && checkQuizEnd();
        }, 1500);
    }, [answeredId]);

    const reset = () => {
        setCorrectAnswer(false);
        setAnsweredId();
    };

    const onNextHandler = () => {
        reset();
        !isMulti && handleNext();
    };

    return (
        <>
            <div>
                <QuizTitle title={currentQuestion.title} />

                {currentQuestion.options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() =>
                            validateAnswer(option.id, currentQuestion.correctOption)
                        }
                        aria-hidden="true"
                    >
                        <QuizOption
                            isImage={option.isImage}
                            isCorrectAnswer={answeredId === option.id && isCorrectAnswer}
                            isItAnsweredId={answeredId}
                            title={option.title}
                            bgClass={
                                answeredId
                                    ? answeredId === option.id && isCorrectAnswer
                                        ? "bg-success"
                                        : answeredId === option.id && !isCorrectAnswer
                                            ? "bg-danger"
                                            : ""
                                    : ""
                            }
                        />
                    </div>
                ))}

                {!isMulti && (
                    <div className="text-center">
                        {" "}
                        <Button disabled={!answeredId} size="lg" onClick={onNextHandler}>
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
