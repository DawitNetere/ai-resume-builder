import { useState } from "react";
import { toast } from "sonner";
import { industryBranches } from "../config/content";
import { recommendCourses } from "../services/api";

const useCourseRecommendations = () => {
  const [courseRecommendations, setCourseRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCourseRecommendations = async (
    industryBranchKey,
    description,
    onError
  ) => {
    try {
      setCourseRecommendations(null);
      setLoading(true);
      const industryBranch = industryBranches.find(
        (branch) => branch.value === industryBranchKey
      ).label;
      const response = await recommendCourses(industryBranch, description);
      setCourseRecommendations(response.data.courses);
    } catch (error) {
      toast.error("Failed to recommend courses.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    courseRecommendations,
    loading,
    getCourseRecommendations,
  };
};

export default useCourseRecommendations;
