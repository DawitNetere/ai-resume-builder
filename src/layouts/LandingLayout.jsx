import React from "react";
import { useUserStore } from "../config/store";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LandingLayout = ({ children }) => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  return (
    <div className="min-h-full">
      <Header isUserLoggedIn={!!user} />
      <main className="min-h-[calc(100%-6rem)]">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
