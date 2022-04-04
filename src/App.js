import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./view/Homescreen/index.jsx";
import CreateQuizForm from "./components/dashboard/createQuizForm.jsx";
import Dashboard from "./view/Dashboard/index.jsx";
import QuizBoard from "./view/Quizboard/index.jsx";
import MyQuizList from "./components/dashboard/myQuizList.jsx";
import QuestionList from "./view/QuestionList/index.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-quiz" element={<CreateQuizForm />} />
                <Route
                    path="/update-question/:id"
                    element={<CreateQuizForm update />} />
                <Route path="/question/:id" element={<QuestionList />} />
                <Route path="/quiz" element={<MyQuizList visitor />} />
                <Route path="/quiz/:id" element={<QuizBoard />} />
            </Routes>
        </div>
    );
}

export default App;
