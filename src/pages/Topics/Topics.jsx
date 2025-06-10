import React, { useEffect, useState } from 'react';
import { Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getTopics } from '../../api/quizApi';
import './Topics.scss';

const { Title } = Typography;

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await getTopics();
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/quiz/${topicId}`);
  };

  // Mảng màu gradient cho các topic card
  const gradients = [
    'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    'linear-gradient(135deg, #FF6B6B 0%, #FF0000 100%)',
    'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
    'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
    'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)',
    'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)',
  ];

  if (loading) {
    return (
      <div className="topics-loading">
        <div className="loading-content">
          <Spin size="large" />
          <p>Đang tải chủ đề...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="topics">
      <div className="topics-header">
        <Title level={2} className="topics__title">
          Chọn Chủ Đề Luyện Tập
        </Title>
        <p className="topics__subtitle">
          Hãy chọn một chủ đề để bắt đầu luyện tập và nâng cao kiến thức Frontend của bạn
        </p>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className="topic-card"
            onClick={() => handleTopicClick(topic.id)}
            style={{
              background: gradients[index % gradients.length],
            }}
          >
            <div className="topic-card-content">
              <div>
                <h3>{topic.name}</h3>
                <p className="topic-description">{topic.description}</p>
              </div>
              <div className="topic-card-icon">
                <span className="material-icons">arrow_forward</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics; 