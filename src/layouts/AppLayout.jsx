import React, { useState } from "react";
import { cn } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useUserStore } from "../config/store";
import routes from "../config/routes";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  const [isLogOutLoading, setIsLogOutLoading] = useState(false);

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const handleLogOut = async () => {
    try {
      setIsLogOutLoading(true);
      await signOut(auth);
      navigate(routes.auth.logIn.path);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLogOutLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-full p-4 flex flex-col md:flex-row gap-4",
        !user && "justify-center"
      )}
    >
      {user && (
        <Sidebar
          user={user}
          logOut={handleLogOut}
          isLogOutLoading={isLogOutLoading}
        />
      )}
      <main className="min-h-full w-full">
        {user ? (
          children
        ) : (
          <div className="h-full grid place-items-center">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
