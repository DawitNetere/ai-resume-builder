import {
  LayoutDashboardIcon,
  PaperclipIcon,
  GraduationCapIcon,
  StarIcon,
  PlaneIcon,
  HandshakeIcon,
  MessagesSquareIcon,
  FileBadgeIcon,
  BriefcaseBusinessIcon,
  UserRoundPenIcon,
} from "lucide-react";

const routes = {
  landing: {
    home: { title: "", path: "/" },
    features: {
      title: "Features",
      path: "/#features",
    },
  },
  auth: {
    logIn: {
      title: "Log In",
      path: "/auth/log-in",
    },
    register: {
      title: "Register",
      path: "/auth/register",
    },
  },
  app: {
    dashboard: {
      title: "Dashboard",
      path: "/app",
      icon: <LayoutDashboardIcon />,
    },
    jobHuntPlanner: {
      title: "Plan My Job Hunt",
      path: "/app/plan-my-job-hunt",
      icon: <PlaneIcon />,
    },
    jobMatching: {
      title: "Job Matching",
      path: "/app/job-matching",
      icon: <BriefcaseBusinessIcon />,
    },
    resumeShiner: {
      title: "Shine My Resume",
      path: "/app/shine-my-resume",
      icon: <FileBadgeIcon />,
    },
    interviewSimulator: {
      title: "Interview Me",
      path: "/app/interview-me",
      icon: <MessagesSquareIcon />,
    },
    networkingEvents: {
      title: "Network Like a Pro",
      path: "/app/network-like-a-pro",
      icon: <HandshakeIcon />,
    },
    resources: {
      title: "Resources",
      path: "/app/resources",
      icon: <PaperclipIcon />,
    },
    courseRecommendations: {
      title: "Course Recommendations",
      path: "/app/course-recommendations",
      icon: <GraduationCapIcon />,
    },
    skillEnhancement: {
      title: "Soften My Skills",
      path: "/app/soften-my-skills",
      icon: <StarIcon />,
    },
    myProfile: {
      title: "My Profile",
      path: "/app/my-profile",
      icon: <UserRoundPenIcon />,
    },
  },
};

export default routes;
