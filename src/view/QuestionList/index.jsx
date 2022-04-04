import React, { useCallback, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { QuizContext, QuizDispatchContext } from "../../context/QuizContext";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import QuestionItemCard from "./questionItem";

export default function QuestionList() {
    const { id } = useParams();
    const { questionList } = useContext(QuizContext);
    const { getQuestionByQuiz, updateQuestionOrderByQuestionId } =
        useContext(QuizDispatchContext);

    useEffect(() => {
        getQuestionByQuiz(id);
    }, [id]);

    const changeOrder = useCallback((fromQuestionId, toQuestionId, orderTo) => {
        updateQuestionOrderByQuestionId(fromQuestionId, toQuestionId, orderTo, () =>
            getQuestionByQuiz(id)
        );
    }, []);

    const renderQuestionItem = useCallback((question, index) => {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <div className="w-100 me-2">
                    <QuestionItemCard
                        key={question.id}
                        index={index}
                        title={question.title}
                        changeOrder={changeOrder}
                        question={question}
                    />
                </div>
                <Link to={`/update-question/${question.id}`}><Button color="primary">Edit</Button></Link>
            </div>
        );
    }, []);

    return (
        <>
            <h4 className="text-center">All questions</h4>
            <hr />
            {questionList?.length > 0 ? (
                <div>
                    <ListGroup>
                        {questionList.map((question, idx) => {
                            return (
                                <ListGroupItem
                                    className="mb-1 cursor-pointer"
                                    key={question.id}
                                >
                                    {renderQuestionItem(question, idx)}
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </div>
            ) : (
                <span>loading...</span>
            )}
        </>
    );
}
