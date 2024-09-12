import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import RootLayout from "../layouts/RootLayout";
import LandingLayout from "../layouts/LandingLayout";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/LandingPage";
import LogIn from "../pages/auth/LogIn";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/app/Dashboard";
import JobHuntPlanner from "../pages/app/JobHuntPlanner";
import JobMatching from "../pages/app/JobMatching";
import ResumeShiner from "../pages/app/ResumeShiner";
import InterviewSimulator from "../pages/app/InterviewSimulator";
import NetworkingEvents from "../pages/app/NetworkingEvents";
import Resources from "../pages/app/Resources";
import CourseRecommendations from "../pages/app/CourseRecommendations";
import SkillEnhancement from "../pages/app/SkillEnhancement";
import MyProfile from "../pages/app/MyProfile";

const router = createBrowserRouter([
  {
    path: routes.landing.home.path,
    element: (
      <RootLayout>
        <LandingLayout>
          <LandingPage />
        </LandingLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.auth.logIn.path,
    element: (
      <RootLayout>
        <AuthLayout>
          <LogIn />
        </AuthLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.auth.register.path,
    element: (
      <RootLayout>
        <AuthLayout>
          <Register />
        </AuthLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.dashboard.path,
    element: (
      <RootLayout>
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.jobHuntPlanner.path,
    element: (
      <RootLayout>
        <AppLayout>
          <JobHuntPlanner />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.jobMatching.path,
    element: (
      <RootLayout>
        <AppLayout>
          <JobMatching />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.resumeShiner.path,
    element: (
      <RootLayout>
        <AppLayout>
          <ResumeShiner />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.interviewSimulator.path,
    element: (
      <RootLayout>
        <AppLayout>
          <InterviewSimulator />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.networkingEvents.path,
    element: (
      <RootLayout>
        <AppLayout>
          <NetworkingEvents />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.resources.path,
    element: (
      <RootLayout>
        <AppLayout>
          <Resources />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.courseRecommendations.path,
    element: (
      <RootLayout>
        <AppLayout>
          <CourseRecommendations />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.skillEnhancement.path,
    element: (
      <RootLayout>
        <AppLayout>
          <SkillEnhancement />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: routes.app.myProfile.path,
    element: (
      <RootLayout>
        <AppLayout>
          <MyProfile />
        </AppLayout>
      </RootLayout>
    ),
  },
  {
    path: "*",
    element: (
      <RootLayout>
        <NotFound />
      </RootLayout>
    ),
  },
]);

export default router;
