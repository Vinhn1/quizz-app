import { useLocation, useNavigate } from 'react-router-dom';
import './Results.scss';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, topicName } = location.state || {};

  if (!location.state) {
    return (
      <div className="error-container">
        <h2>No Results Found</h2>
        <p>Please complete a quiz to see your results</p>
        <button className="btn btn-primary" onClick={() => navigate('/topics')}>
          Go to Topics
        </button>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const getMessage = () => {
    if (percentage >= 90) return "Excellent! You're a master!";
    if (percentage >= 70) return "Great job! You're doing well!";
    if (percentage >= 50) return "Good effort! Keep practicing!";
    return "Keep studying! You'll get better!";
  };

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      <h2>{topicName}</h2>

      <div className="score-display">
        {percentage}%
      </div>

      <p className="result-message">{getMessage()}</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{score}</div>
          <div className="stat-label">Correct Answers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalQuestions - score}</div>
          <div className="stat-label">Incorrect Answers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalQuestions}</div>
          <div className="stat-label">Total Questions</div>
        </div>
      </div>

      <div className="results-actions">
        <button 
          className="btn btn-primary"
          onClick={() => navigate(`/quiz/${location.state.topicId}`)}
        >
          Try Again
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => navigate('/topics')}
        >
          Back to Topics
        </button>
      </div>
    </div>
  );
};

export default Results; 