import React from "react";
import { cn } from "@nextui-org/react";
import { WandSparklesIcon } from "lucide-react";

const EmptyCard = ({ icon, title, description, small }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 max-w-md",
        small && "gap-6"
      )}
    >
      {icon || (
        <WandSparklesIcon
          className={cn("stroke-primary-500 w-16 h-16", small && "w-14 h-14")}
        />
      )}
      <div className={cn("flex flex-col items-center gap-2", small && "gap-1")}>
        <p
          className={cn("text-xl text-center text-pretty", small && "text-lg")}
        >
          {title || "Upload your resume to check for improvements."}
        </p>
        <p
          className={cn(
            "text-center text-pretty text-foreground-500 px-4",
            small && "text-sm"
          )}
        >
          {description ||
            "AI will analyze your resume, and you will get some improvements to help you find a job."}
        </p>
      </div>
    </div>
  );
};

export default EmptyCard;
