import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:3001",
});

// Topics API
export const getTopics = () => API.get('/topics');
export const getTopicById = (id) => API.get(`/topics/${id}`);

// Questions API
export const getQuestionByTopic = async (topicId) => {
  const res = await axios.get(
    `http://localhost:3001/questions?topicId=${topicId}`);
    return res.data;
}
// export const getQuestionsByTopic = (topicId) => API.get(`/questions?topicId=${topicId}`);

// Results API
export const getResults = (userId) => API.get(`/results?userId=${userId}`);
export const getResultById = (id) => API.get(`/results/${id}`);
export const createResult = (data) => API.post('/results', data); 