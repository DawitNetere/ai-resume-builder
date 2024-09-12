import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import {
  ScanFaceIcon,
  FingerprintIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import routes from "../../config/routes";
import Logo from "../../components/Logo";
import Spinner from "../../components/Spinner";

const LogIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, "Please fill out this field.")
      .email("Please enter a valid email address."),
    password: z.string().min(1, "Please fill out this field."),
  });

  const defaultValues = {
    email: "",
    password: "",
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

  const onSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You have successfully logged in.");
      navigate(location.state?.from || routes.app.dashboard.path);
    } catch {
      toast.error("Log in failed.", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href={routes.landing.home.path} color="foreground">
        <Logo />
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="px-8 py-4">
          <div className="flex items-center gap-2">
            <ScanFaceIcon className="w-6 h-6 stroke-primary-500" />
            <span className="text-sm font-medium">Log In</span>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email Address"
                  labelPlacement="outside"
                  placeholder="Enter your email address"
                  isRequired
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  autoComplete="email"
                  isDisabled={isLoading}
                  startContent={
                    <MailIcon className="stroke-foreground-400 mr-1.5" />
                  }
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  isRequired
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  autoComplete="current-password"
                  isDisabled={isLoading}
                  startContent={
                    <LockIcon className="stroke-foreground-400 mr-1.5" />
                  }
                  endContent={
                    <button
                      className="outline-primary-500 outline-offset-4 rounded-md"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="Toggle password visibility"
                    >
                      {isPasswordVisible ? (
                        <EyeOffIcon className="stroke-foreground-400 pointer-events-none" />
                      ) : (
                        <EyeIcon className="stroke-foreground-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              size="lg"
              startContent={
                !isLoading && <FingerprintIcon className="w-6 h-6" />
              }
              className="flex-none w-full sm:w-auto"
              isLoading={isLoading}
              spinner={<Spinner />}
            >
              Sign In
            </Button>
          </form>
        </CardBody>
      </Card>
      <p className="text-sm flex items-center gap-2">
        Don't have an account?
        <Link
          href={routes.auth.register.path}
          className="text-sm font-medium"
          size="sm"
          showAnchorIcon
          anchorIcon={<ArrowUpRightIcon className="w-5 h-5 ml-0.5" />}
        >
          Register
        </Link>
      </p>
    </>
  );
};

export default LogIn;
