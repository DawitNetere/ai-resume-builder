import React from "react";

const ModuleHeader = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-start gap-2 p-8">
      <div className="flex items-center gap-4">
        <p className="text-3xl">{title}</p>
        {icon}
      </div>
      <p className="text-lg text-foreground-500">{description}</p>
    </div>
  );
};

export default ModuleHeader;
