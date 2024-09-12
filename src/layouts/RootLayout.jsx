import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import routes from "../config/routes";
import appConfig from "../config/app";
import Error from "../pages/Error";

const RootLayout = ({ children }) => {
  const location = useLocation();

  const currentRoute = Object.values(routes)
    .flatMap((route) =>
      Object.values(route).map(({ title, path }) => ({ title, path }))
    )
    .find((route) => route.path === location.pathname);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Helmet>
        <title>
          {currentRoute?.title
            ? `${currentRoute.title} – ${appConfig.name}`
            : appConfig.name}
        </title>
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <div className="relative h-full">{children}</div>
    </ErrorBoundary>
  );
};

export default RootLayout;
