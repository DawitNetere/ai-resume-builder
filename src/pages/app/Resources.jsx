import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { PaperclipIcon, SearchIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useUserDocStore } from "../../config/store";
import { industryBranches } from "../../config/content";
import useResourcesSuggestions from "../../hooks/useResourcesSuggestions";
import ModuleHeader from "../../components/ModuleHeader";
import Spinner from "../../components/Spinner";

const Resources = () => {
  const { userDoc } = useUserDocStore((state) => ({
    userDoc: state.userDoc,
  }));

  const { resourcesSuggestions, loading, getResourcesSuggestions } =
    useResourcesSuggestions();

  const validationSchema = z.object({
    industryBranch: z.string().min(1, "Please fill out this field."),
    description: z.string().min(1, "Please fill out this field."),
  });

  const defaultValues = {
    industryBranch: "",
    description: "",
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
        description: values.description || "",
      });
    }
  }, [userDoc, reset, loading, getValues]);

  const onSubmit = async ({ industryBranch, description }) => {
    await getResourcesSuggestions(industryBranch, description);
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title="Resources"
            description="Check out resources that can boost your learning."
            icon={<PaperclipIcon className="w-8 h-8 stroke-primary-500" />}
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
                      label="Enter your industry"
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
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Enter resource description"
                          isInvalid={!!errors.description}
                          isDisabled={loading}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-xs text-danger-500 p-1 sm:hidden">
                        {errors.description?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    variant="shadow"
                    size="lg"
                    startContent={
                      !loading && <SearchIcon className="w-5 h-5" />
                    }
                    className="flex-none w-full sm:w-auto"
                    isLoading={loading}
                    spinner={<Spinner />}
                  >
                    Search
                  </Button>
                </div>
                {errors.description && (
                  <p className="text-xs text-danger-500 p-1 hidden sm:block">
                    {errors.description?.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <Markdown className="prose max-w-4xl" rehypePlugins={[rehypeRaw]}>
            {resourcesSuggestions}
          </Markdown>
        </CardBody>
      </Card>
    </div>
  );
};

export default Resources;
