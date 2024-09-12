import React from "react";
import {
  Link,
  Card,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import {
  MenuIcon,
  ScanFaceIcon,
  UserRoundPlusIcon,
  ArrowRightIcon,
} from "lucide-react";
import routes from "../config/routes";
import Logo from "./Logo";

const Header = ({ isUserLoggedIn }) => {
  return (
    <header className="p-4 sticky top-0 max-w-screen-xl mx-auto z-40">
      <Card>
        <div className="h-16 px-4 py-1 flex items-center justify-between gap-8 overflow-x-auto">
          <Link href={routes.landing.home.path} color="foreground">
            <Logo />
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href={routes.landing.features.path}
                  size="sm"
                  color="foreground"
                >
                  {routes.landing.features.title}
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              {isUserLoggedIn ? (
                <Button
                  color="primary"
                  variant="shadow"
                  size="sm"
                  radius="md"
                  endContent={<ArrowRightIcon className="w-4 h-4" />}
                  href={routes.app.dashboard.path}
                  as={Link}
                >
                  Go to the App
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="shadow"
                    size="sm"
                    radius="md"
                    startContent={<ScanFaceIcon className="w-4 h-4" />}
                    href={routes.auth.logIn.path}
                    as={Link}
                  >
                    Log In
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    size="sm"
                    radius="md"
                    startContent={<UserRoundPlusIcon className="w-4 h-4" />}
                    href={routes.auth.register.path}
                    as={Link}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </nav>
          <Dropdown>
            <DropdownTrigger className="sm:hidden">
              <Button color="primary" variant="shadow" size="sm" isIconOnly>
                <MenuIcon className="w-5 h-5" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Navigation" variant="light">
              <DropdownSection showDivider>
                <DropdownItem
                  key="features"
                  href={routes.landing.features.path}
                >
                  {routes.landing.features.title}
                </DropdownItem>
              </DropdownSection>
              {isUserLoggedIn ? (
                <DropdownItem
                  key="go-to-the-app"
                  endContent={<ArrowRightIcon className="w-4 h-4" />}
                  href={routes.app.dashboard.path}
                >
                  Go to the App
                </DropdownItem>
              ) : (
                <>
                  <DropdownItem
                    key="log-in"
                    startContent={<ScanFaceIcon className="w-4 h-4" />}
                    href={routes.auth.logIn.path}
                  >
                    Log In
                  </DropdownItem>
                  <DropdownItem
                    key="register"
                    startContent={<UserRoundPlusIcon className="w-4 h-4" />}
                    href={routes.auth.register.path}
                  >
                    Register
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Card>
    </header>
  );
};

export default Header;
