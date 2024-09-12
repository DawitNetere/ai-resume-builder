import React from "react";
import { cn, Button, Link } from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const NavLink = ({ route }) => {
  const location = useLocation();
  const isActive = location.pathname === route.path;

  return (
    <Button
      href={route.path}
      as={Link}
      variant={isActive ? "shadow" : "light"}
      color="primary"
      fullWidth
      startContent={
        <div
          className={cn(
            "[&>svg]:w-6 [&>svg]:h-6",
            !isActive && "text-primary-500"
          )}
        >
          {route.icon}
        </div>
      }
      className={cn(
        "justify-start text-sm",
        !isActive && "[&:not(:hover)]:text-foreground"
      )}
    >
      <span className="truncate">{route.title}</span>
    </Button>
  );
};

export default NavLink;
