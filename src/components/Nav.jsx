import React from "react";
import routes from "../config/routes";
import NavLink from "./NavLink";

const Nav = () => {
  return (
    <nav className="min-h-full flex flex-col gap-4 justify-between">
      <ul className="flex flex-col gap-4">
        {Object.values(routes.app)
          .filter((route) => route.path !== routes.app.myProfile.path)
          .map((route) => (
            <li key={route.path}>
              <NavLink route={route} />
            </li>
          ))}
      </ul>
      <NavLink route={routes.app.myProfile} />
    </nav>
  );
};

export default Nav;
