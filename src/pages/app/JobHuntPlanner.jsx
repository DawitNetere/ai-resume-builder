import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Input,
  Button,
} from "@nextui-org/react";
import { PlaneIcon, WandSparklesIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useUserDocStore } from "../../config/store";
import { industryBranches } from "../../config/content";
import useJobHuntPlan from "../../hooks/useJobHuntPlan";
import ModuleHeader from "../../components/ModuleHeader";
import Spinner from "../../components/Spinner";

const JobHuntPlanner = () => {
  const { userDoc } = useUserDocStore((state) => ({
    userDoc: state.userDoc,
  }));

  const { jobHuntPlan, loading, getJobHuntPlan } = useJobHuntPlan();

  const validationSchema = z.object({
    industryBranch: z.string().min(1, "Please fill out this field."),
    position: z.string().min(1, "Please fill out this field."),
  });

  const defaultValues = {
    industryBranch: "",
    position: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!loading && userDoc) {
      const values = getValues();
      reset({
        industryBranch: values.industryBranch || userDoc.industryBranch || "",
        position: values.position || "",
      });
    }
  }, [userDoc, reset, loading, getValues]);

  const onSubmit = async ({ industryBranch, position }) => {
    await getJobHuntPlan(industryBranch, position);
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title="Job Hunt Planner"
            description="Plan your job hunt to make sure you stay on track."
            icon={<PlaneIcon className="w-8 h-8 stroke-primary-500" />}
          />
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col items-center gap-4 max-w-4xl p-8">
              <div className="w-full">
                <Controller
                  name="industryBranch"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      selectedKeys={[field.value]}
                      label="Enter your industry branch"
                      isInvalid={!!errors.industryBranch}
                      errorMessage={errors.industryBranch?.message}
                      isDisabled={loading}
                    >
                      {industryBranches.map((branch) => (
                        <SelectItem key={branch.value} value={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="w-full">
                <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full">
                    <Controller
                      name="position"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Enter position"
                          isInvalid={!!errors.position}
                          isDisabled={loading}
                        />
                      )}
                    />
                    {errors.position && (
                      <p className="text-xs text-danger-500 p-1 sm:hidden">
                        {errors.position?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    variant="shadow"
                    size="lg"
                    startContent={
                      !loading && <WandSparklesIcon className="w-5 h-5" />
                    }
                    className="flex-none w-full sm:w-auto"
                    isLoading={loading}
                    spinner={<Spinner />}
                  >
                    Generate
                  </Button>
                </div>
                {errors.position && (
                  <p className="text-xs text-danger-500 p-1 hidden sm:block">
                    {errors.position?.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <Markdown className="prose max-w-4xl" rehypePlugins={[rehypeRaw]}>
            {jobHuntPlan}
          </Markdown>
        </CardBody>
      </Card>
    </div>
  );
};

export default JobHuntPlanner;
