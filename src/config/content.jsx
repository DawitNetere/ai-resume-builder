import { cn } from "@nextui-org/react";
import {
  PaperclipIcon,
  GraduationCapIcon,
  StarIcon,
  PlaneIcon,
  HandshakeIcon,
  MessagesSquareIcon,
  FileBadgeIcon,
  BriefcaseBusinessIcon,
} from "lucide-react";
import routes from "./routes";
import GridPattern from "../components/GridPattern";

export const features = [
  {
    Icon: PaperclipIcon,
    name: "Resources",
    description:
      "Blog posts, articles, and guides on career development topics.",
    className: "sm:col-start-1 sm:col-end-2 sm:row-start-3 sm:row-end-4",
    dashboardClassName:
      "xl:col-start-1 xl:col-end-2 xl:row-start-2 xl:row-end-3",
    path: routes.app.resources.path,
  },
  {
    Icon: GraduationCapIcon,
    name: "Course Recommendations",
    description:
      "AI-driven suggestions for courses tailored to your career goals and current skill set.",
    className: "sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3",
    dashboardClassName:
      "xl:col-start-1 xl:col-end-2 xl:row-start-1 xl:row-end-2",
    path: routes.app.courseRecommendations.path,
  },
  {
    Icon: StarIcon,
    name: "Soften My Skills",
    description:
      "Identify your soft skills gaps and get actionable advice on how to improve them.",
    background: (
      <GridPattern
        numSquares={30}
        maxOpacity={0.03}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    ),
    className: "sm:col-start-1 sm:col-end-2 sm:row-start-4 sm:row-end-6",
    dashboardClassName:
      "xl:col-start-1 xl:col-end-2 xl:row-start-3 xl:row-end-5",
    path: routes.app.skillEnhancement.path,
  },
  {
    Icon: PlaneIcon,
    name: "Plan My Job Hunt",
    description:
      "Job hunting plan generator that outlines a step-by-step mission for you.",
    className: "sm:col-start-3 sm:col-end-3 sm:row-start-1 sm:row-end-2",
    dashboardClassName:
      "xl:col-start-3 xl:col-end-3 xl:row-start-1 xl:row-end-2",
    path: routes.app.jobHuntPlanner.path,
  },
  {
    Icon: HandshakeIcon,
    name: "Network Like a Pro",
    description:
      "Networking events, conferences, and gatherings that you can attend, based on your location and industry.",
    className: "sm:col-start-3 sm:col-end-3 sm:row-start-2 sm:row-end-4",
    dashboardClassName:
      "xl:col-start-3 xl:col-end-3 xl:row-start-2 xl:row-end-3",
    path: routes.app.networkingEvents.path,
  },
  {
    Icon: FileBadgeIcon,
    name: "Shine My Resume",
    description:
      "Analyze the quality, content, structure, and keyword optimization of your resume.",
    background: (
      <GridPattern
        numSquares={30}
        maxOpacity={0.03}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    ),
    className: "sm:row-start-1 sm:row-end-4 sm:col-start-2 sm:col-end-3",
    dashboardClassName:
      "xl:row-start-1 xl:row-end-3 xl:col-start-2 xl:col-end-3",
    path: routes.app.resumeShiner.path,
  },
  {
    Icon: MessagesSquareIcon,
    name: "Interview Me",
    description:
      "Simulate real interview scenarios and get instant feedback on your responses, helping you to practice and refine your answers.",
    className: "sm:col-start-2 sm:col-end-4 sm:row-start-4 sm:row-end-5",
    dashboardClassName:
      "xl:col-start-2 xl:col-end-4 xl:row-start-3 xl:row-end-4",
    path: routes.app.interviewSimulator.path,
  },
  {
    Icon: BriefcaseBusinessIcon,
    name: "Job Matching",
    description:
      "Relevant job postings based on your profile, location, and career interests.",
    className: "sm:col-start-2 sm:col-end-4 sm:row-start-5 sm:row-end-5",
    dashboardClassName:
      "xl:col-start-2 xl:col-end-4 xl:row-start-4 xl:row-end-5",
    path: routes.app.jobMatching.path,
  },
];

export const industryBranches = [
  {
    label: "Technology",
    value: "technology",
  },
  {
    label: "Healthcare & Pharmaceuticals",
    value: "healthcare",
  },
  {
    label: "Finance & Banking",
    value: "finance",
  },
  {
    label: "Energy",
    value: "energy",
  },
  {
    label: "Manufacturing",
    value: "manufacturing",
  },
  {
    label: "Retail & E-commerce",
    value: "retail",
  },
  {
    label: "Construction & Real Estate",
    value: "construction",
  },
  {
    label: "Telecommunications",
    value: "telecommunications",
  },
  {
    label: "Food & Beverage",
    value: "food",
  },
  {
    label: "Transportation & Logistics",
    value: "transportation",
  },
  {
    label: "Entertainment & Media",
    value: "entertainment",
  },
  {
    label: "Education & Training",
    value: "education",
  },
];
