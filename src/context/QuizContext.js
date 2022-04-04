import React, { createContext, useEffect, useState } from "react";
import {
    getQuiz,
    setQuiz,
    setQuestion,
    getQuestionById,
    getQuestionByQuizId,
    countQuestionByQuizId,
    updateQuestionOrderByQuestionId,
    updateQuestionById,
    getQuizLayoutById
} from "../DB/useQuizIDB";

// Create two context:
// QuizContext: to query the context state
// QuizDispatchContext: to mutate the context state
const QuizContext = createContext(undefined);
const QuizDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function QuizProvider({ children }) {
    const [quizList, setQuizList] = useState([]);
    const [questionList, setQuestionList] = useState([]);

    const setQuizHandler = (quiz, cb) => {
        setQuizList([quiz, ...quizList]);
        setQuiz(quiz, cb);
    };

    const setQuestionHandler = (question, cb) => {
        setQuestion(question, cb);
    };
    const updateQuestionHandler = (question, id, cb) => {
        updateQuestionById(question, id, cb);
    };

    const getQuestionByQuiz = (quizId) => {
        getQuestionByQuizId(quizId, setQuestionList);
    };

    const getQuizLayoutByIdHandler = (id, cb) => {
        getQuizLayoutById(id, cb);
    };

    useEffect(() => {
        getQuiz((quiz) => setQuizList(quiz));
    }, []);

    return (
        <QuizContext.Provider value={{ quizList, questionList }}>
            <QuizDispatchContext.Provider
                value={{
                    setQuizHandler,
                    setQuestionHandler,
                    updateQuestionHandler,
                    getQuestionByQuiz,
                    countQuestionByQuizId,
                    updateQuestionOrderByQuestionId,
                    getQuestionById,
                    getQuizLayoutByIdHandler
                }}
            >
                {children}
            </QuizDispatchContext.Provider>
        </QuizContext.Provider>
    );
}

export { QuizProvider, QuizContext, QuizDispatchContext };
