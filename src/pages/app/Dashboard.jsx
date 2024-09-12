import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { HandMetalIcon } from "lucide-react";
import { useUserStore } from "../../config/store";
import { features } from "../../config/content";
import { BentoGrid, BentoCard } from "../../components/BentoGrid";
import ModuleHeader from "../../components/ModuleHeader";

const Dashboard = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  return (
    <div className="h-full">
      <Card className="min-h-full">
        <CardHeader className="flex flex-col items-start p-0">
          <ModuleHeader
            title={`Hello ${user.displayName}!`}
            description="Ready to start the journey to a successful career?"
            icon={<HandMetalIcon className="w-8 h-8 stroke-primary-500" />}
          />
        </CardHeader>
        <Divider />
        <CardBody className="p-8">
          <BentoGrid className="xl:grid-rows-4">
            {features.map((feature) => (
              <BentoCard
                key={feature.name}
                {...feature}
                className={feature.dashboardClassName}
                href={feature.path}
              />
            ))}
          </BentoGrid>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
