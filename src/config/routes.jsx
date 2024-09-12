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
      title: "Job Hunt Planner",
      path: "/app/job-hunt-planner",
      icon: <PlaneIcon />,
    },
    jobMatching: {
      title: "Job Matching",
      path: "/app/job-matching",
      icon: <BriefcaseBusinessIcon />,
    },
    resumeShiner: {
      title: "Resume Shiner",
      path: "/app/resume-shiner",
      icon: <FileBadgeIcon />,
    },
    interviewSimulator: {
      title: "Interview Simulator",
      path: "/app/interview-simulator",
      icon: <MessagesSquareIcon />,
    },
    networkingEvents: {
      title: "Networking Events",
      path: "/app/networking-events",
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
      title: "Skill Enhancement",
      path: "/app/skill-enhancement",
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
