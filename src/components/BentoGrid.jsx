import React from "react";
import { cn, Link } from "@nextui-org/react";

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  isDisabled,
}) => {
  const Component = href && !isDisabled ? Link : "div";

  return (
    <Component
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-white shadow-medium",
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
      href={href}
      color="foreground"
    >
      <div className={cn("w-full min-h-full flex", isDisabled && "opacity-50")}>
        <div>{background}</div>
        <div className="w-full pointer-events-none z-10 flex justify-end transform-gpu flex-col gap-8 p-8 transition-all duration-300">
          <Icon className="h-12 w-12 stroke-primary-500 origin-left transform-gpu transition-all duration-300 ease-in-out" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl truncate">{name}</h3>
            <p className="max-w-lg text-foreground-500">{description}</p>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 transform-gpu transition-all duration-300",
            !background &&
              "group-hover:bg-foreground-50 group-hover:dark:bg-neutral-800/10"
          )}
        />
      </div>
    </Component>
  );
};

export { BentoCard, BentoGrid };
