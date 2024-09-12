import { useState } from "react";
import { toast } from "sonner";
import { suggestNetworkingEvents } from "../services/api";
import { industryBranches } from "../config/content";

const useNetworkingEventsSuggestions = () => {
  const [networkingEventsSuggestions, setNetworkingEventsSuggestions] =
    useState(null);
  const [loading, setLoading] = useState(false);

  const getNetworkingEventsSuggestions = async (
    location,
    industryBranchKey,
    onError
  ) => {
    try {
      setNetworkingEventsSuggestions(null);
      setLoading(true);
      const industryBranch = industryBranches.find(
        (branch) => branch.value === industryBranchKey
      ).label;
      const response = await suggestNetworkingEvents(location, industryBranch);
      setNetworkingEventsSuggestions(response.data.networkingEvents);
    } catch (error) {
      toast.error("Failed to suggest networking events.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    networkingEventsSuggestions,
    loading,
    getNetworkingEventsSuggestions,
  };
};

export default useNetworkingEventsSuggestions;
