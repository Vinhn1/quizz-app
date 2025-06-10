import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByTopic } from "../../api/quizApi";
import QuestionCard from "../../components/QuestionCard";
import "./Quiz.scss";

export default function Quiz() {
  const { topicId } = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    getQuestionByTopic(topicId)
      .then((data) => {
        if (!data || data.length === 0) {
          setError("Không tìm thấy câu hỏi cho chủ đề này");
          return;
        }
        
        setAllQuestions(data);
        // Tính số đề cần thiết (mỗi đề 20 câu)
        const sets = Math.ceil(data.length / 20);
        setTotalSets(sets);
        // Lấy 20 câu đầu tiên cho đề đầu tiên
        setCurrentQuestions(data.slice(0, 20));
        setUserAnswers(new Array(Math.min(20, data.length)).fill(null));
      })
      .catch((err) => {
        setError("Có lỗi xảy ra khi tải câu hỏi. Vui lòng thử lại sau.");
        console.error("Error loading questions:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topicId]);

  const handleSelectAnswer = (qIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[qIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setUserAnswers(new Array(currentQuestions.length).fill(null));
    setSubmitted(false);
  };

  const handleChangeSet = (setIndex) => {
    const startIndex = setIndex * 20;
    const endIndex = Math.min(startIndex + 20, allQuestions.length);
    setCurrentQuestions(allQuestions.slice(startIndex, endIndex));
    setUserAnswers(new Array(endIndex - startIndex).fill(null));
    setSubmitted(false);
    setCurrentSet(setIndex);
  };

  const correctCount = currentQuestions.reduce((acc, q, index) => {
    return acc + (userAnswers[index] !== null && q.answers[userAnswers[index]] === q.correctAnswer ? 1 : 0);
  }, 0);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải câu hỏi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  if (!currentQuestions.length) {
    return (
      <div className="error-container">
        <h2>Không có câu hỏi nào</h2>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h2>Đề số {currentSet + 1}/{totalSets}</h2>
        <div className="set-selector">
          {Array.from({ length: totalSets }, (_, i) => (
            <button
              key={i}
              className={`set-button ${currentSet === i ? 'active' : ''}`}
              onClick={() => handleChangeSet(i)}
            >
              Đề {i + 1}
            </button>
          ))}
        </div>
      </div>

      {currentQuestions.map((q, index) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={index}
          selected={userAnswers[index]}
          submitted={submitted}
          onSelect={handleSelectAnswer}
        />
      ))}

      {!submitted ? (
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={userAnswers.some(answer => answer === null)}
        >
          Nộp Bài
        </button>
      ) : (
        <div className="result-container">
          <h3>Kết quả</h3>
          <p>Số Câu Đúng: {correctCount}</p>
          <p>Số Câu Sai: {currentQuestions.length - correctCount}</p>
          <p>Tỷ lệ đúng: {((correctCount / currentQuestions.length) * 100).toFixed(2)}%</p>
          <button className="retry-button" onClick={handleRetry}>
            Làm Lại
          </button>
        </div>
      )}
    </div>
  );
}
