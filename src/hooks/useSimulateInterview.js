import { useState } from "react";
import { toast } from "sonner";
import { industryBranches } from "../config/content";
import { getInterviewQuestions, checkInterviewAnswers } from "../services/api";

const useSimulateInterview = () => {
  const [questions, setQuestions] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const getQuestions = async (industryBranchKey, position, onError) => {
    try {
      setQuestions(null);
      setLoading(true);
      const industryBranch = industryBranches.find(
        (branch) => branch.value === industryBranchKey
      ).label;
      const response = await getInterviewQuestions(industryBranch, position);
      const parsedQuestions = response.data.interviewQuestions
        .split(";")
        .map((question) => question.trim());
      setQuestions(parsedQuestions);
    } catch (error) {
      toast.error("Failed to get interview questions.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswers = async (
    industryBranchKey,
    position,
    questionsAndAnswers,
    onError
  ) => {
    try {
      setSummary(null);
      setLoading(true);
      const industryBranch = industryBranches.find(
        (branch) => branch.value === industryBranchKey
      ).label;
      const response = await checkInterviewAnswers(
        industryBranch,
        position,
        questionsAndAnswers
      );
      setSummary(response.data.summary);
    } catch (error) {
      toast.error("Failed to check interview answers.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const clearStates = () => {
    setQuestions(null);
    setSummary(null);
    setLoading(false);
  };

  return {
    questions,
    summary,
    loading,
    getQuestions,
    checkAnswers,
    clearStates,
  };
};

export default useSimulateInterview;
