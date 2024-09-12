import React, { useState } from "react";
import {
  cn,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Link,
  Button,
} from "@nextui-org/react";
import { MenuIcon } from "lucide-react";
import routes from "../config/routes";
import Logo from "./Logo";
import Nav from "./Nav";
import User from "./User";

const Sidebar = ({ user, logOut, isLogOutLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="sticky top-4 flex flex-col gap-2 md:hidden z-40">
        <Card>
          <CardHeader className="h-16 px-4 py-1 flex items-center justify-between gap-8 overflow-x-auto bg-white">
            <Link href={routes.app.dashboard.path} color="foreground">
              <Logo />
            </Link>
            <Button
              color="primary"
              variant="shadow"
              size="sm"
              isIconOnly
              onClick={toggleMenuOpen}
            >
              <MenuIcon className="w-5 h-5" />
            </Button>
          </CardHeader>
        </Card>
        <Card
          className={cn(
            "fixed top-24 inset-x-4 right-4 -translate-y-[calc(100%+6rem)]",
            isMenuOpen && "translate-y-0"
          )}
        >
          <CardBody className="p-4">
            <Nav />
          </CardBody>
          <Divider />
          <CardFooter className="p-4">
            <User
              name={user.displayName}
              email={user.email}
              photo={user.photoURL}
              logOut={logOut}
              isLogOutLoading={isLogOutLoading}
            />
          </CardFooter>
        </Card>
      </header>
      <aside className="sticky top-4 h-[calc(100dvh-2rem)] hidden md:block z-40">
        <Card className="h-full">
          <CardHeader className="p-4">
            <Link href={routes.app.dashboard.path} color="foreground">
              <Logo />
            </Link>
          </CardHeader>
          <Divider />
          <CardBody className="p-4">
            <Nav />
          </CardBody>
          <Divider />
          <CardFooter className="p-4">
            <User
              name={user.displayName}
              email={user.email}
              photo={user.photoURL}
              logOut={logOut}
              isLogOutLoading={isLogOutLoading}
            />
          </CardFooter>
        </Card>
      </aside>
    </>
  );
};

export default Sidebar;
