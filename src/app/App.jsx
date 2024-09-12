import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "../config/router";
import AuthProvider from "../components/AuthProvider";

const App = () => {
  return (
    <HelmetProvider>
      <NextUIProvider navigate={router.navigate}>
        <Toaster richColors closeButton position="top-right" />
        <RouterProvider router={router} />
        <AuthProvider
          location={router.state.location}
          navigate={router.navigate}
        />
      </NextUIProvider>
    </HelmetProvider>
  );
};

export default App;
