import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { StarIcon, FileBadgeIcon, UploadIcon } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import useSkillEnhancementSuggestions from "../../hooks/useSkillEnhancementSuggestions";
import ModuleHeader from "../../components/ModuleHeader";
import DashboardCard from "../../components/DashboardCard";
import EmptyCard from "../../components/EmptyCard";
import FileUploader from "../../components/FileUploader";
import PdfPreview from "../../components/PdfPreview";
import SuggestionCard from "../../components/SuggestionCard";

const SkillEnhancement = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const {
    skillEnhancementSuggestions,
    loading,
    getSkillEnhancementSuggestions,
  } = useSkillEnhancementSuggestions();

  const handleReset = () => {
    setPdfFile(null);
  };

  const handleRefetch = () => {
    getSkillEnhancementSuggestions(pdfFile, handleReset);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPdfFile(file);
    getSkillEnhancementSuggestions(file, handleReset);
  };

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title="Soften My Skills"
            description="Identify soft skills gaps and get advices on how to improve them."
            icon={<StarIcon className="w-8 h-8 stroke-primary-500" />}
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
                <SuggestionCard
                  icon={<StarIcon className="stroke-primary-500" />}
                  title="Soft Skills Suggestions"
                  loading={loading}
                  refetch={handleRefetch}
                >
                  <Markdown className="prose" rehypePlugins={[rehypeRaw]}>
                    {skillEnhancementSuggestions}
                  </Markdown>
                </SuggestionCard>
              ) : (
                <div className="h-full grid place-items-center">
                  <EmptyCard
                    title="Upload your resume to check for soft skills gaps"
                    description="AI will analyze your resume, and you will get some skill enhancement suggestions based on your experience."
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

export default SkillEnhancement;
