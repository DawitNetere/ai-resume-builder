import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="min-h-full grid place-items-center px-4">
      <div className="w-full flex flex-col items-center gap-8">{children}</div>
    </main>
  );
};

export default AuthLayout;
