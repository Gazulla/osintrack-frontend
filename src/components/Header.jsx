import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  DropdownSection,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SunIcon } from "../assets/svg/SunIcon";
import { MoonIcon } from "../assets/svg/MoonIcon";
import { ConfigIcon } from "../assets/svg/ConfigIcon";
import { LogoutIcon } from "../assets/svg/LogoutIcon";
import { OsintrackLogo } from "../assets/svg/OsintrackLogo";

export default function Header({ user, handleLogout, darkMode, handleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return <></>;
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <OsintrackLogo width={150} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarBrand>
          <OsintrackLogo width={150} />
        </NavbarBrand>
        <NavbarItem isActive>
          <Link to="/">Dashboard</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar as="button" isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu">
            <DropdownSection title="Pedro Gazulla" showDivider>
              {darkMode ? (
                <DropdownItem textValue="Light mode" onClick={() => handleDarkMode(false)}>
                  <div className="flex gap-1">
                    <SunIcon width={20} />
                    <span>Light mode</span>
                  </div>
                </DropdownItem>
              ) : (
                <DropdownItem textValue="Dark mode" onClick={() => handleDarkMode(true)}>
                  <div className="flex gap-1">
                    <MoonIcon width={20} />
                    <span>Dark mode</span>
                  </div>
                </DropdownItem>
              )}

              <DropdownItem textValue="Settings">
                <div className="flex gap-1">
                  <ConfigIcon width={20} />
                  <span>Settings</span>
                </div>
              </DropdownItem>
            </DropdownSection>

            <DropdownItem textValue="Log out" key="logout" color="danger" onClick={handleLogout}>
              <div className="flex gap-1">
                <LogoutIcon width={20} />
                <span>Log out</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link to="/">Dashboard</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
