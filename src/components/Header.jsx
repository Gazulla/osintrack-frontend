import { useState } from "react";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Header({ user, handleLogin, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Dashboard", "My Settings", "Log Out"];

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
          <p className="font-bold text-inherit">OSINTRACK</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">OSINTRACK</p>
        </NavbarBrand>
        <NavbarItem isActive>
          <Link to="/">Dashboard</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {" "}
          {user ? (
            <Button onClick={handleLogout} as={Link} color="warning" href="#">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} as={Link} color="primary" href="#">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
