import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  User,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  CircleXIcon,
  CircleCheckIcon,
  UserIcon,
  ScanFaceIcon,
  UserRoundPlusIcon,
  IdCardIcon,
  ImageIcon,
  SplitIcon,
  MapPinIcon,
  WrapTextIcon,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useUserStore, useUserDocStore } from "../../config/store";
import { industryBranches } from "../../config/content";
import { uploadProfilePicture, updateUserDoc } from "../../services/firebase";
import AuthStatCard from "../../components/AuthStatCard";
import FileUploader from "../../components/FileUploader";
import Spinner from "../../components/Spinner";

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const updateUserStore = useUserStore((state) => state.updateUser);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { userDoc } = useUserDocStore((state) => ({
    userDoc: state.userDoc,
  }));

  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const defaultPhotoFileName = photoURL
    ? decodeURIComponent(photoURL).split("/").pop().split("?")[0]
    : null;

  const creationTime = new Date(
    user.metadata.creationTime
  ).toLocaleDateString();

  const lastSignInTime = new Date(
    user.metadata.lastSignInTime
  ).toLocaleDateString();

  const handleFileChange = (event) => {
    setPhotoURL(null);
    const file = event.target.files[0];
    if (!file) return;
    setPhotoFile(file);
  };

  const handleFileClear = () => {
    setPhotoFile(null);
    setPhotoURL(null);
  };

  useEffect(() => {
    const onFileUpload = async () => {
      try {
        setIsFileUploading(true);
        const downloadURL = await uploadProfilePicture(user, photoFile);
        setPhotoURL(downloadURL);
        toast.success("File has been uploaded.");
      } catch {
        setPhotoFile(null);
        toast.error("Something went wrong.");
      } finally {
        setIsFileUploading(false);
      }
    };

    photoFile && !photoURL && onFileUpload();
  }, [photoFile, photoURL, user]);

  const validationSchema = z.object({
    displayName: z.string().min(1, "Please fill out this field."),
    industryBranch: z.string(),
    location: z.string(),
    bio: z.string(),
  });

  const defaultValues = {
    displayName: "",
    industryBranch: "",
    location: "",
    bio: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!isLoading) {
      reset({
        displayName: user?.displayName || "",
        industryBranch: userDoc?.industryBranch || "",
        location: userDoc?.location || "",
        bio: userDoc?.bio || "",
      });
    }
  }, [userDoc, user, reset, isLoading]);

  const handleReset = () => {
    reset({
      displayName: user?.displayName || "",
      industryBranch: userDoc?.industryBranch || "",
      location: userDoc?.location || "",
      bio: userDoc?.bio || "",
    });
    setPhotoFile(null);
    setPhotoURL(user.photoURL);
  };

  const onSubmit = async ({ displayName, industryBranch, location, bio }) => {
    try {
      setIsLoading(true);
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || "",
      });
      await updateUserDoc(user, {
        industryBranch,
        location,
        bio,
      });
      updateUserStore({ displayName, photoURL });
      toast.success("Profile has been updated.");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex items-center justify-between gap-8 flex-wrap p-8">
          <User
            name={user.displayName}
            description={user.email}
            avatarProps={{
              src: user.photoURL,
              size: "md",
              isBordered: true,
              radius: "md",
              color: "primary",
              fallback: <UserIcon className="w-6 h-6" />,
              className: "mr-2",
            }}
            classNames={{
              name: "text-md",
              description: "text-sm",
            }}
          />
          <div className="flex items-center gap-8 lg:gap-16 flex-wrap">
            <AuthStatCard
              label="Last Sign In Time"
              value={lastSignInTime}
              icon={<ScanFaceIcon className="w-10 h-10 stroke-primary-500" />}
            />
            <AuthStatCard
              label="Creation Time"
              value={creationTime}
              icon={
                <UserRoundPlusIcon className="w-10 h-10 stroke-primary-500" />
              }
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-full flex-1 flex flex-col justify-between"
          >
            <div className="p-8 flex flex-col gap-8 max-w-4xl">
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Full Name"
                    labelPlacement="outside"
                    placeholder="Enter your full name"
                    isRequired
                    isInvalid={!!errors.displayName}
                    errorMessage={errors.displayName?.message}
                    autoComplete="name"
                    isDisabled={isLoading}
                    startContent={
                      <IdCardIcon className="stroke-foreground-400 mr-1.5" />
                    }
                  />
                )}
              />
              <FileUploader
                label="Profile Picture"
                file={photoFile}
                onChange={handleFileChange}
                onClear={handleFileClear}
                accept="image/*"
                align="left"
                fullWidth
                small
                icon={<ImageIcon className="stroke-foreground-400" />}
                isDisabled={isLoading}
                isLoading={isFileUploading}
                defaultValue={defaultPhotoFileName}
              />
              <Controller
                name="industryBranch"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    selectedKeys={[field.value]}
                    label="Industry"
                    labelPlacement="outside"
                    placeholder="Enter your industry"
                    isInvalid={!!errors.industryBranch}
                    errorMessage={errors.industryBranch?.message}
                    isDisabled={isLoading}
                    startContent={
                      <SplitIcon className="stroke-foreground-400 mr-1.5" />
                    }
                  >
                    {industryBranches.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Location"
                    labelPlacement="outside"
                    placeholder="Enter your location"
                    isInvalid={!!errors.location}
                    errorMessage={errors.location?.message}
                    autoComplete="street-address"
                    isDisabled={isLoading}
                    startContent={
                      <MapPinIcon className="stroke-foreground-400 mr-1.5" />
                    }
                  />
                )}
              />
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Bio"
                    labelPlacement="outside"
                    placeholder="Enter your bio"
                    isInvalid={!!errors.bio}
                    errorMessage={errors.bio?.message}
                    isDisabled={isLoading}
                    startContent={
                      <WrapTextIcon className="stroke-foreground-400 mr-1.5" />
                    }
                    minRows={6}
                  />
                )}
              />
            </div>
            <div>
              <Divider />
              <div className="p-3.5 flex items-center justify-end gap-3.5">
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<CircleXIcon className="w-5 h-5" />}
                  isDisabled={isLoading || isFileUploading}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="shadow"
                  startContent={
                    !isLoading && <CircleCheckIcon className="w-5 h-5" />
                  }
                  isLoading={isLoading}
                  isDisabled={isFileUploading}
                  spinner={<Spinner />}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyProfile;
