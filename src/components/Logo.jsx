import React from "react";
import { WandSparklesIcon } from "lucide-react";
import appConfig from "../config/app";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <WandSparklesIcon className="w-6 h-6 stroke-primary-500" />
      <span className="text-sm font-medium">{appConfig.name}</span>
    </div>
  );
};

export default Logo;
