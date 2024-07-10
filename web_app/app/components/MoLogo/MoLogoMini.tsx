import { rem } from "@mantine/core";
import cx from "clsx";
import classes from "./MoLogo.module.css";
import { LogoProps } from "./use-mo-logo-colors";
export function MoLogoFull({ size, style, className, ...others }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 452 452"
      style={{ width: rem(size), height: rem(size), ...style }}
      className={cx(classes.logo, classes.moUILogo, className)}
      {...others}
    >
      <g fill="none">
        <path
          style={{ fill: "var(--mo-logo-fill)" }}
          d="M382,452H70c-38.66,0-70-31.34-70-70V70C0,31.34,31.34,0,70,0h312c38.66,0,70,31.34,70,70v312c0,38.66-31.34,70-70,70Z"
        />
        <path
          style={{ fill: "var(--mo-logo-color)" }}
          d="M95.01,116v220h-50v-176.7l-25-43.3h75ZM189.01,116v220h50V116h-50ZM117.01,116v133.4l25,43.3,25-43.3V116h-50ZM297.48,116l28.87,50h55.64v96.37l42.51,73.63h7.49V116h-134.51ZM370.64,286h-55.64v-96.38l-42.51-73.62h-7.49v220h134.51l-28.87-50Z"
        />
      </g>
    </svg>
  );
}
