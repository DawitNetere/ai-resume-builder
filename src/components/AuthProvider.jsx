import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useUserStore, useUserDocStore } from "../config/store";
import routes from "../config/routes";

const AuthProvider = ({ location, navigate, children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.reset);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const setUserDoc = useUserDocStore((state) => state.setUserDoc);
  const resetUserDoc = useUserDocStore((state) => state.reset);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        return;
      }

      resetUser();
      resetUserDoc();

      if (location?.pathname.includes(routes.app.dashboard.path)) {
        navigate(routes.auth.logIn.path, {
          state: { from: location.pathname },
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, location, setUser, setUserDoc, resetUser, resetUserDoc]);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userDoc = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(
        userDoc,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserDoc(userData);
            return;
          }
          resetUserDoc();
        },
        () => {
          resetUserDoc();
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, setUserDoc, resetUserDoc]);

  return <>{children}</>;
};

export default AuthProvider;
