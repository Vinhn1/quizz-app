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
    <h4>Các câu bạn đã trả lời:</h4>
    <ul style={{textAlign: 'left', maxHeight: 200, overflowY: 'auto'}}>
      {currentQuestions.map((q, idx) => {
        const userIdx = userAnswers[idx];
        const isCorrect = q.answers[userIdx] === q.correctAnswer;
        return (
          <li key={q.id} style={{marginBottom: 10}}>
            <strong>{q.question}</strong><br />
            <span style={{color: 'green'}}>Đáp án đúng: {q.correctAnswer}</span><br />
            <span style={{color: isCorrect ? 'green' : 'red'}}>Bạn chọn: {q.answers[userIdx]}</span>
          </li>
        );
      })}
    </ul>
    <button className="retry-button" onClick={handleRetry}>
      Làm Lại
    </button>
  </div>
)} 