import React from "react";
import { CircleXIcon } from "lucide-react";
import ErrorLayout from "../layouts/ErrorLayout";
import EmptyCard from "../components/EmptyCard";

const Error = ({ error }) => {
  return (
    <ErrorLayout>
      <EmptyCard
        icon={<CircleXIcon className="stroke-primary-500 w-16 h-16" />}
        title="Something went wrong"
        description={error.message}
      />
    </ErrorLayout>
  );
};

export default Error;
