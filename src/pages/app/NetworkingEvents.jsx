import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { HandshakeIcon, SearchIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useUserDocStore } from "../../config/store";
import { industryBranches } from "../../config/content";
import useNetworkingEventsSuggestions from "../../hooks/useNetworkingEventsSuggestions";
import ModuleHeader from "../../components/ModuleHeader";
import Spinner from "../../components/Spinner";

const NetworkingEvents = () => {
  const { userDoc } = useUserDocStore((state) => ({
    userDoc: state.userDoc,
  }));

  const {
    networkingEventsSuggestions,
    loading,
    getNetworkingEventsSuggestions,
  } = useNetworkingEventsSuggestions();

  const validationSchema = z.object({
    location: z.string().min(1, "Please fill out this field."),
    industryBranch: z.string().min(1, "Please fill out this field."),
  });

  const defaultValues = {
    location: "",
    industryBranch: "",
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
        location: values.location || userDoc.location || "",
        industryBranch: values.industryBranch || userDoc.industryBranch || "",
      });
    }
  }, [userDoc, reset, loading, getValues]);

  const onSubmit = async ({ location, industryBranch }) => {
    getNetworkingEventsSuggestions(location, industryBranch);
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title="Network Like a Pro"
            description="Take a look at the upcoming networking events in your area."
            icon={<HandshakeIcon className="w-8 h-8 stroke-primary-500" />}
          />
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col items-center gap-4 max-w-4xl p-8">
              <div className="w-full">
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Enter your location"
                      isInvalid={!!errors.location}
                      errorMessage={errors.location?.message}
                      autoComplete="street-address"
                      isDisabled={loading}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <div className="w-full flex flex-col sm:flex-row items-center gap-4">
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
                    {errors.industryBranch && (
                      <p className="text-xs text-danger-500 p-1 sm:hidden">
                        {errors.industryBranch?.message}
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
                {errors.industryBranch && (
                  <p className="text-xs text-danger-500 p-1 hidden sm:block">
                    {errors.industryBranch?.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <Markdown className="prose max-w-4xl" rehypePlugins={[rehypeRaw]}>
            {networkingEventsSuggestions}
          </Markdown>
        </CardBody>
      </Card>
    </div>
  );
};

export default NetworkingEvents;
