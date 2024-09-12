import React from "react";
import { FileSearchIcon } from "lucide-react";
import ErrorLayout from "../layouts/ErrorLayout";
import EmptyCard from "../components/EmptyCard";

const NotFound = () => {
  return (
    <ErrorLayout className="min-h-full grid place-items-center px-4">
      <EmptyCard
        icon={<FileSearchIcon className="stroke-primary-500 w-16 h-16" />}
        title="This page could not be found"
        description="Sorry, we couldn't find the page you are looking for."
      />
    </ErrorLayout>
  );
};

export default NotFound;
