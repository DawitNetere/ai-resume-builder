import React from "react";
import { Card, CardHeader, Divider, CardBody, Button } from "@nextui-org/react";
import { WandSparklesIcon } from "lucide-react";
import Loader from "./Loader";

const SuggestionCard = ({ icon, title, refetch, loading, children }) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4 min-h-14 overflow-auto">
        <div className="flex items-center gap-2">
          <div className="shrink-0">{icon}</div>
          <p className="text-nowrap">{title}</p>
        </div>
        {!loading && (
          <Button
            color="primary"
            variant="shadow"
            size="sm"
            radius="md"
            startContent={<WandSparklesIcon className="w-4 h-4" />}
            onClick={refetch}
          >
            Generate Again
          </Button>
        )}
      </CardHeader>
      <Divider />
      <CardBody className="p-6">
        {loading ? (
          <div className="grid place-items-center min-h-64">
            <Loader />
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  );
};

export default SuggestionCard;
