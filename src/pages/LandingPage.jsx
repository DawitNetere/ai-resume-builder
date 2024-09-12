import React from "react";
import { cn, Input, Button, Divider, Link } from "@nextui-org/react";
import { SparklesIcon, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useUserStore } from "../config/store";
import routes from "../config/routes";
import appConfig from "../config/app";
import useScreenSize from "../hooks/useScreenSize";
import WordRotate from "../components/WordRotate";
import Ripple from "../components/Ripple";
import Safari from "../components/Safari";
import BorderBeam from "../components/BorderBeam";
import heroImage from "../assets/hero-image.png";
import { BentoGrid, BentoCard } from "../components/BentoGrid";
import { features } from "../config/content";

const LandingPage = () => {
  const navigate = useNavigate();
  const { width } = useScreenSize();

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, "Please fill out this field.")
      .email("Please enter a valid email address."),
  });

  const defaultValues = {
    email: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = ({ email }) => {
    navigate(routes.auth.register.path, { state: { email } });
  };

  return (
    <div className="px-4 max-w-screen-xl mx-auto flex flex-col items-center">
      <div className="w-full h-[calc(100dvh-10%)] absolute left-0 top-0">
        <Ripple
          mainCircleSize={width < 768 ? width : 720}
          mainCircleOpacity={0.15}
        />
      </div>
      <section className="py-32 z-10">
        <div className="text-center text-pretty text-4xl max-w-xl md:text-5xl md:max-w-2xl mx-auto">
          <h2>Welcome to your personalised career counsellor for</h2>
          <WordRotate
            words={[
              "resume building",
              "skill development",
              "job hunting",
              "interview prep",
            ]}
            className="text-primary-500 font-medium"
          />
        </div>
        <p className="text-center text-pretty md:text-xl mt-6 max-w-4xl mx-auto text-foreground-500">
          The journey to a successful career starts here. Our AI-enhanced career
          guidance system is designed to help university students navigate their
          career paths with ease.
        </p>
        <div className={cn("mt-12 max-w-xl mx-auto", user && "max-w-sm")}>
          {user ? (
            <Button
              color="primary"
              variant="shadow"
              size="lg"
              fullWidth
              endContent={<ArrowRightIcon className="w-5 h-5" />}
              href={routes.app.dashboard.path}
              as={Link}
            >
              Go to the App
            </Button>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        label="Enter your email address"
                        isInvalid={!!errors.email}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-danger-500 p-1 sm:hidden">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  color="primary"
                  variant="shadow"
                  size="lg"
                  startContent={<SparklesIcon className="w-5 h-5" />}
                  className="flex-none w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </div>
              {errors.email && (
                <p className="text-xs text-danger-500 p-1 hidden sm:block">
                  {errors.email?.message}
                </p>
              )}
            </form>
          )}
        </div>
        <div className="relative mt-32 rounded-[0.625rem] max-w-screen-lg overflow-hidden shadow-medium">
          <BorderBeam size={width < 768 ? 300 : 600} />
          <Safari
            url={appConfig.domain}
            className="size-full"
            src={heroImage}
            noBorders
          />
        </div>
      </section>
      <Divider />
      <section id="features" className="py-32 max-w-screen-lg">
        <h2 className="text-center text-pretty text-4xl max-w-xl md:text-5xl md:max-w-2xl mx-auto">
          Features that can help you boost your career
        </h2>
        <BentoGrid className="sm:grid-rows-5 mt-12">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
};

export default LandingPage;
