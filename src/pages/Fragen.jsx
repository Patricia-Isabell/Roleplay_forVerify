import React, { useState } from "react";
import fragen from "../data/fragen.json";
import "../styles/fragen.css";
export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = fragen[currentQuestionIndex];
  // <-- Dein Code hier
  const imgCategory = (currentQuestion) => {
    if (currentQuestion.category) {
      return `/src/img/${currentQuestion.category}.png`;
    }
    return null; // Falls keine Kategorie gesetzt ist
  };
  return (
    <div
      className="quiz-container"
      style={{
        backgroundImage: `url(${imgCategory(currentQuestion)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px",
      }}
    >
      <h2>{currentQuestion.frage}</h2>
      <div>
        {currentQuestion.antworten.map((antwort, index) => (
          <button key={index} className="answer">
            {antwort}
          </button>
        ))}
      </div>
    </div>
  );
}

const imgCategory = (currentQuestion) => {
  if (currentQuestion.category) {
    return `../img/${currentQuestion.category}.png`;
  }
};
