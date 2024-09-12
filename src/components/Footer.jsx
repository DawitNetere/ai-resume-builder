import React from "react";
import { Card, Link } from "@nextui-org/react";
import routes from "../config/routes";
import appConfig from "../config/app";
import Logo from "./Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 max-w-screen-xl mx-auto">
      <Card>
        <div className="h-16 px-4 py-1 flex items-center justify-between gap-8 overflow-x-auto">
          <p className="text-sm font-medium">
            {appConfig.name} © {year}
          </p>
          <Link href={routes.landing.home.path} color="foreground">
            <Logo />
          </Link>
        </div>
      </Card>
    </footer>
  );
};

export default Footer;
