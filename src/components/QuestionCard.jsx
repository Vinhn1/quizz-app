import React from 'react';
import './QuestionCard.scss';

const QuestionCard = ({ question, index, selected, submitted, onSelect }) => {
  return (
    <div className="question__card">
      <h3>
        Câu {index + 1}: {question.question}
      </h3>
      <ul>
        {question.answers.map((ans, i) => (
          <li
            key={i}
            className={`option ${selected === i ? "selected" : ""} ${
              submitted && question.correctAnswer === ans ? "correct" : ""
            } ${
              submitted && selected === i && question.answers[selected] !== question.correctAnswer
                ? "wrong"
                : ""
            }`}
            onClick={() => !submitted && onSelect(index, i)}
          >
            {String.fromCharCode(65 + i)}. {ans}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
