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
  Image,
  Avatar,
  DropdownSection,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

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
          <Image alt="OSINTRACK Logo" className="object-cover rounded-xl" src={`/images/osintrack${darkMode ? "_white" : ""}.svg`} width={150} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarBrand>
          <Image alt="OSINTRACK Logo" className="object-cover rounded-xl" src={`/images/osintrack${darkMode ? "_white" : ""}.svg`} width={150} />
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
                <DropdownItem onClick={() => handleDarkMode(false)}>
                  <div className="flex gap-1">
                    <Image alt="Light Mode" className="object-cover rounded-xl" src="/icons/sun.svg" width={20} />
                    <span>Light mode</span>
                  </div>
                </DropdownItem>
              ) : (
                <DropdownItem onClick={() => handleDarkMode(true)}>
                  <div className="flex gap-1">
                    <Image alt="Dark Mode" className="object-cover rounded-xl" src="/icons/moon.svg" width={20} />
                    <span>Dark mode</span>
                  </div>
                </DropdownItem>
              )}

              <DropdownItem>
                <div className="flex gap-1">
                  <Image alt="Settings" className="object-cover rounded-xl" src="/icons/config.svg" width={20} />
                  <span>Settings</span>
                </div>
              </DropdownItem>
            </DropdownSection>

            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              <div className="flex gap-1">
                <Image alt="Log out" className="object-cover rounded-xl" src="/icons/logout.svg" width={20} />
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
