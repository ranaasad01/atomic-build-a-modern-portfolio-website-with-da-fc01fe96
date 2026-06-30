export const APP_NAME = "Alex Rivera";
export const APP_TAGLINE = "Creative Developer";
export const APP_EMAIL = "hello@alexrivera.dev";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Hire Me",
  href: "#contact",
};