import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function Homepage() {
    return (
        <>
            <div className="text-center homeCard">
                <div className="homeCard-action-buttons">
                    <Link to="/dashboard"><Button color="primary">Dashboard</Button></Link>
                    <Link to="/quiz"><Button className="ms-3" color="success">Play Quiz</Button></Link>
                </div>
            </div>
        </>
    );
}
