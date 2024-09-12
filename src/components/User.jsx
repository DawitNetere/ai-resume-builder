import React from "react";
import { User as NextUIUser, Button, Tooltip, Link } from "@nextui-org/react";
import { UserIcon, LogOutIcon } from "lucide-react";
import routes from "../config/routes";
import Spinner from "../components/Spinner";

const User = ({ name, email, photo, logOut, isLogOutLoading }) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <Link href={routes.app.myProfile.path} color="foreground">
        <NextUIUser
          name={name}
          description={email}
          avatarProps={{
            src: photo,
            size: "sm",
            isBordered: true,
            radius: "sm",
            color: "primary",
            fallback: <UserIcon className="w-5 h-5" />,
            className: "mr-1",
          }}
        />
      </Link>
      <Tooltip content="Log Out" showArrow color="primary" placement="right">
        <Button
          size="sm"
          variant="light"
          isIconOnly
          aria-label="Log Out"
          onClick={logOut}
          isLoading={isLogOutLoading}
          spinner={<Spinner />}
        >
          <LogOutIcon className="w-5 h-5 stroke-foreground-400" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default User;
