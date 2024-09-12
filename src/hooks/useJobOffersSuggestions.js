import { useState } from "react";
import { toast } from "sonner";
import { suggestJobOffers } from "../services/api";

const useJobOffersSuggestions = () => {
  const [jobOffersSuggestions, setJobOffersSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJobOffersSuggestions = async (file, location, onError) => {
    try {
      setJobOffersSuggestions(null);
      setLoading(true);
      const response = await suggestJobOffers(file, location);
      setJobOffersSuggestions(response.data.jobOffers);
    } catch (error) {
      toast.error("Failed to suggest job offers.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return { jobOffersSuggestions, loading, getJobOffersSuggestions };
};

export default useJobOffersSuggestions;
