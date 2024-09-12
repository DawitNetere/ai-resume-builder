import { useState } from "react";
import { toast } from "sonner";
import { checkResume } from "../services/api";

const useResumeSuggestions = () => {
  const [resumeSuggestions, setResumeSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResumeSuggestions = async (file, onError) => {
    try {
      setResumeSuggestions(null);
      setLoading(true);
      const response = await checkResume(file);
      setResumeSuggestions(response.data);
    } catch (error) {
      toast.error("Failed to check resume.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return { resumeSuggestions, loading, getResumeSuggestions };
};

export default useResumeSuggestions;
