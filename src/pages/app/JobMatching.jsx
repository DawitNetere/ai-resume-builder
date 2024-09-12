import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
} from "@nextui-org/react";
import { BriefcaseBusinessIcon, FileBadgeIcon, UploadIcon } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import useJobOffersSuggestions from "../../hooks/useJobOffersSuggestions";
import { useUserDocStore } from "../../config/store";
import ModuleHeader from "../../components/ModuleHeader";
import DashboardCard from "../../components/DashboardCard";
import EmptyCard from "../../components/EmptyCard";
import FileUploader from "../../components/FileUploader";
import PdfPreview from "../../components/PdfPreview";
import SuggestionCard from "../../components/SuggestionCard";

const JobMatching = () => {
  const { userDoc } = useUserDocStore((state) => ({
    userDoc: state.userDoc,
  }));

  const [pdfFile, setPdfFile] = useState(null);
  const [location, setLocation] = useState("");

  const { jobOffersSuggestions, loading, getJobOffersSuggestions } =
    useJobOffersSuggestions();

  useEffect(() => {
    if (userDoc?.location) {
      setLocation(userDoc.location);
    }
  }, [userDoc]);

  const handleReset = () => {
    setPdfFile(null);
  };

  const handleRefetch = () => {
    getJobOffersSuggestions(pdfFile, location, handleReset);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPdfFile(file);
    getJobOffersSuggestions(file, location, handleReset);
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title="Job Matching"
            description="Find job offers that match your resume."
            icon={
              <BriefcaseBusinessIcon className="w-8 h-8 stroke-primary-500" />
            }
          />
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <div className="relative h-full flex-1 flex flex-col gap-8 xl:grid xl:grid-rows-none xl:grid-cols-2">
            <div className="w-full flex flex-col gap-8">
              <Input
                label="Enter your location"
                autoComplete="street-address"
                isDisabled={loading}
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
              <DashboardCard
                title="Your Resume"
                icon={<FileBadgeIcon className="stroke-primary-500" />}
                className={!pdfFile ? "h-full" : "h-fit"}
                buttons={
                  pdfFile && (
                    <Button
                      color="primary"
                      variant="flat"
                      size="sm"
                      radius="md"
                      startContent={<UploadIcon className="w-4 h-4" />}
                      onClick={handleReset}
                      isDisabled={loading}
                    >
                      Upload New File
                    </Button>
                  )
                }
              >
                {pdfFile ? (
                  <PdfPreview file={pdfFile} reset={handleReset} />
                ) : (
                  <div className="xl:mb-14 w-full grid place-items-center">
                    <FileUploader
                      label="Upload Resume (PDF)"
                      file={pdfFile}
                      onChange={handleFileChange}
                      accept="application/pdf"
                      icon={<FileBadgeIcon className="stroke-foreground-400" />}
                    />
                  </div>
                )}
              </DashboardCard>
            </div>

            <DashboardCard noBackground>
              {pdfFile ? (
                <SuggestionCard
                  icon={
                    <BriefcaseBusinessIcon className="stroke-primary-500" />
                  }
                  title="Job Offers Suggestions"
                  loading={loading}
                  refetch={handleRefetch}
                >
                  <Markdown
                    className="prose"
                    rehypePlugins={[rehypeRaw]}
                  >
                    {jobOffersSuggestions}
                  </Markdown>
                </SuggestionCard>
              ) : (
                <div className="h-full grid place-items-center">
                  <EmptyCard
                    title="Upload your resume to check for job offers."
                    description="AI will analyze your resume, and you will get some job offers suggestions based on your skills and experience."
                    small
                  />
                </div>
              )}
            </DashboardCard>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default JobMatching;
