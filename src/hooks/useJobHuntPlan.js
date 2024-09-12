import { useState } from "react";
import { toast } from "sonner";
import { industryBranches } from "../config/content";
import { planJobHunt } from "../services/api";

const useJobHuntPlan = () => {
  const [jobHuntPlan, setJobHuntPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJobHuntPlan = async (industryBranchKey, position, onError) => {
    try {
      setJobHuntPlan(null);
      setLoading(true);
      const industryBranch = industryBranches.find(
        (branch) => branch.value === industryBranchKey
      ).label;
      const response = await planJobHunt(industryBranch, position);
      setJobHuntPlan(response.data.jobHuntPlan);
    } catch (error) {
      toast.error("Failed to plan a job hunt.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobHuntPlan,
    loading,
    getJobHuntPlan,
  };
};

export default useJobHuntPlan;
