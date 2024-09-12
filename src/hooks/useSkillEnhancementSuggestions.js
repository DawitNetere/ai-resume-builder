import { useState } from "react";
import { toast } from "sonner";
import { suggestSkillEnhancement } from "../services/api";

const useSkillEnhancementSuggestions = () => {
  const [skillEnhancementSuggestions, setSkillEnhancementSuggestions] =
    useState(null);
  const [loading, setLoading] = useState(false);

  const getSkillEnhancementSuggestions = async (file, onError) => {
    try {
      setSkillEnhancementSuggestions(null);
      setLoading(true);
      const response = await suggestSkillEnhancement(file);
      setSkillEnhancementSuggestions(response.data.skillEnhancement);
    } catch (error) {
      toast.error("Failed to suggest skill enhancement.", {
        description: "Please try again.",
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    skillEnhancementSuggestions,
    loading,
    getSkillEnhancementSuggestions,
  };
};

export default useSkillEnhancementSuggestions;
