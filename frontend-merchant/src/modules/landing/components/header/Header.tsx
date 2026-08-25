'use client'
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { navItems } from '../../constants';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative mx-auto max-w-7xl bg-transparent">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo imgSrc='/logo/asl_logo.png' altName='Logo' />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <AnimatedThemeToggler variant="hexagon" duration={300} fromCenter className="z-10 cursor-pointer"/>
            <NavbarButton onClick={() => router.push("/login")} variant="outline">Login</NavbarButton>
            <NavbarButton onClick={() => router.push("#download")} variant="gradient">Download App</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo imgSrc='/logo/asl_logo.png' altName='Logo' />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/login");
                }}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/signup");
                }}
                variant="gradient"
                className="w-full"
              >
                Get Started 
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
