import { useState } from "react";
import { toast } from "sonner";
import { industryBranches } from "../config/content";
import { suggestResources } from "../services/api";

const useResourcesSuggestions = () => {
  const [resourcesSuggestions, setResourcesSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResourcesSuggestions = async (
    industryBranchKey,
    description,
    onError
  ) => {
    try {
      setResourcesSuggestions(null);
      setLoading(true);
      const industryBranch = industryBranches.find(
        (branch) => branch.value === industryBranchKey
      ).label;
      const response = await suggestResources(industryBranch, description);
      setResourcesSuggestions(response.data.resources);
    } catch (error) {
      toast.error("Failed to suggest resources.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    resourcesSuggestions,
    loading,
    getResourcesSuggestions,
  };
};

export default useResourcesSuggestions;
