import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { FileBadgeIcon, UploadIcon } from "lucide-react";
import useResumeSuggestions from "../../hooks/useResumeSuggestions";
import ModuleHeader from "../../components/ModuleHeader";
import DashboardCard from "../../components/DashboardCard";
import EmptyCard from "../../components/EmptyCard";
import FileUploader from "../../components/FileUploader";
import PdfPreview from "../../components/PdfPreview";
import Suggestions from "../../components/Suggestions";

const ResumeShiner = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const { resumeSuggestions, loading, getResumeSuggestions } =
    useResumeSuggestions();

  const handleReset = () => {
    setPdfFile(null);
  };

  const handleRefetch = () => {
    getResumeSuggestions(pdfFile, handleReset);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPdfFile(file);
    getResumeSuggestions(file, handleReset);
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title="Resume Shiner"
            description="Get suggestions on how to improve your resume."
            icon={<FileBadgeIcon className="w-8 h-8 stroke-primary-500" />}
          />
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <div className="relative h-full flex-1 flex flex-col gap-8 xl:grid xl:grid-rows-none xl:grid-cols-2">
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

            <DashboardCard noBackground>
              {pdfFile ? (
                <Suggestions
                  grammar={resumeSuggestions?.grammar}
                  keywords={resumeSuggestions?.keywords
                    .split(",")
                    .map((keyword) => keyword.trim())}
                  refetch={handleRefetch}
                  loading={loading}
                />
              ) : (
                <div className="h-full grid place-items-center">
                  <EmptyCard small />
                </div>
              )}
            </DashboardCard>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResumeShiner;
