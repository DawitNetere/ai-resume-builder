import React from "react";
import { cn, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const DashboardCard = ({
  icon,
  title,
  buttons,
  noBackground,
  className,
  children,
}) => {
  const Component = !noBackground ? Card : "div";

  return (
    <Component className={cn("relative", className)}>
      {!noBackground ? (
        <>
          <CardHeader className="flex items-center justify-between gap-4 min-h-14 overflow-auto">
            <div className="flex items-center gap-2">
              <div className="shrink-0">{icon}</div>
              <p className="text-nowrap">{title}</p>
            </div>
            {buttons}
          </CardHeader>
          <Divider />
          <CardBody className="grid place-items-center p-4 overflow-auto min-h-64">
            {children}
          </CardBody>
        </>
      ) : (
        children
      )}
    </Component>
  );
};

export default DashboardCard;
