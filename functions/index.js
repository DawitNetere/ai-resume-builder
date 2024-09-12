const admin = require("firebase-admin");
const checkResume = require("./ai/checkResume.func");
const suggestNetworkingEvents = require("./ai/suggestNetworkingEvents.func");
const suggestResources = require("./ai/suggestResources.func");
const recommendCourses = require("./ai/recommendCourses.func");
const suggestJobOffers = require("./ai/suggestJobOffers.func");
const suggestSkillEnhancement = require("./ai/suggestSkillEnhancement.func");
const planJobHunt = require("./ai/planJobHunt.func");
const getInterviewQuestions = require("./ai/getInterviewQuestions.func");
const checkInterviewAnswers = require("./ai/checkInterviewAnswers.func");

admin.initializeApp();

module.exports = {
  checkResume,
  suggestNetworkingEvents,
  suggestResources,
  recommendCourses,
  suggestJobOffers,
  suggestSkillEnhancement,
  planJobHunt,
  getInterviewQuestions,
  checkInterviewAnswers,
};
