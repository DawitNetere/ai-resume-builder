import axios from "axios";

const API_BASE_URL = "https://us-central1-jobfit-pro.cloudfunctions.net";

export const checkResume = (resumeFile) => {
  const form = new FormData();
  form.append("resumeFile", resumeFile);
  return axios.post(`${API_BASE_URL}/checkResume`, form);
};

export const suggestNetworkingEvents = (location, industryBranch) => {
  return axios.post(`${API_BASE_URL}/suggestNetworkingEvents`, {
    location,
    industryBranch,
  });
};

export const recommendCourses = (industryBranch, description) => {
  return axios.post(`${API_BASE_URL}/recommendCourses`, {
    industryBranch,
    description,
  });
};

export const suggestResources = (industryBranch, description) => {
  return axios.post(`${API_BASE_URL}/suggestResources`, {
    industryBranch,
    description,
  });
};

export const suggestJobOffers = (resumeFile, location) => {
  const form = new FormData();
  form.append("resumeFile", resumeFile);
  if (location) {
    form.append("location", location);
  }
  return axios.post(`${API_BASE_URL}/suggestJobOffers`, form);
};

export const suggestSkillEnhancement = (resumeFile) => {
  const form = new FormData();
  form.append("resumeFile", resumeFile);
  return axios.post(`${API_BASE_URL}/suggestSkillEnhancement`, form);
};

export const planJobHunt = (industryBranch, position) => {
  return axios.post(`${API_BASE_URL}/planJobHunt`, {
    industryBranch,
    position,
  });
};

export const getInterviewQuestions = (industryBranch, position) => {
  return axios.post(`${API_BASE_URL}/getInterviewQuestions`, {
    industryBranch,
    position,
  });
};

export const checkInterviewAnswers = (
  industryBranch,
  position,
  questionsAndAnswers
) => {
  return axios.post(`${API_BASE_URL}/checkInterviewAnswers`, {
    industryBranch,
    position,
    questionsAndAnswers,
  });
};
