import {
  Link,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { SVGProps } from "react";

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || height}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const Navbar = () => {
  return (
    <NextUINavbar shouldHideOnScroll>
      <NavbarBrand className="flex items-center justify-start gap-1">
        <Logo size={40} />
        <p className="font-bold text-lg">Logo</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Link
          href="/"
          color="foreground"
          className="text-black hover:text-crimson-hover transition-colors"
        >
          Home
        </Link>
        <Link
          href="/article"
          color="foreground"
          className="text-black hover:text-crimson-hover transition-colors"
        >
          Articles
        </Link>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
