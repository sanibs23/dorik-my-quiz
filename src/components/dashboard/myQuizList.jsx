import { Button } from "reactstrap";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuizContext } from "../../context/QuizContext";

export default function MyQuizList({ preview, visitor, admin }) {
    const { quizList } = useContext(QuizContext);
    return (
        <>
            {admin &&
                <>
                    <div className="d-flex justify-content-between">
                        <h4>My Quiz List</h4>
                        <Link to="/create-quiz"><Button color="primary">Create New</Button></Link>
                    </div>
                    <hr />
                </>
            }
            {visitor && <><h4>Play quiz by quiz category</h4><hr /></>}

            {
                quizList.length ? <ol>
                    {quizList.map(quiz =>
                        <li className="px-2 h5" key={quiz.id}>
                            <div className="d-flex justify-content-between m-0 mb-2">
                                <p className="text-truncate m-0">{quiz.title}</p>

                                {admin && <div> <Link to={`/question/${quiz.id}`}> <Button color="info">Edit/Show</Button></Link></div>}


                                {visitor && <div> <Link to={`/quiz/${quiz.id}`}> <Button color="info">Play</Button></Link></div>}
                            </div>
                        </li>
                    )}
                </ol> : !preview ? <h3 className="text-center">You do not have any quiz</h3> : ""
            }
        </>
    );
}
