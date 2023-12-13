/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Button,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SunIcon } from "../assets/svg/SunIcon";
import { MoonIcon } from "../assets/svg/MoonIcon";
import { ConfigIcon } from "../assets/svg/ConfigIcon";
import { LogoutIcon } from "../assets/svg/LogoutIcon";
import { OsintrackLogo } from "../assets/svg/OsintrackLogo";
import { ProfileIcon } from "../assets/svg/ProfileIcon";
import { profileGet } from "../actions/profileActions";
import { telegramSessionCheck } from "../actions/telegramActions";
import { TelegramIcon } from "../assets/svg/TelegramIcon";

export default function Header({ user, handleLogout, darkMode, handleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user: profileUser } = useSelector((state) => state.profile);
  const { connected } = useSelector((state) => state.telegramConnection);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(profileGet());
      dispatch(telegramSessionCheck());
    }
  }, [user]);

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
        <Tooltip color={connected ? "success" : "danger"} content={`${connected ? `Connected to Telegram` : `Disconnected from Telegram`}`}>
          <Button variant="faded" radius="full" color={connected ? "success" : "danger"} isIconOnly>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              <TelegramIcon width={20} />
            </Link>
          </Button>
        </Tooltip>
        <Dropdown>
          <DropdownTrigger>
            <Avatar as="button" isBordered color="primary" src={profileUser.image} />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu">
            <DropdownSection title={profileUser.firstName} showDivider>
              <DropdownItem textValue="Profile">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex gap-1">
                    <ProfileIcon width={20} />
                    <span>Profile</span>
                  </div>
                </Link>
              </DropdownItem>

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

              {user.isAdmin && (
                <DropdownItem textValue="Settings">
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex gap-1">
                      <ConfigIcon width={20} />
                      <span>Admin</span>
                    </div>
                  </Link>
                </DropdownItem>
              )}
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
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
