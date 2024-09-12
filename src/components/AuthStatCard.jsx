import React from "react";

const AuthStatCard = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <div className="flex flex-col">
        <span className="text-sm text-foreground-500 truncate">{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default AuthStatCard;
