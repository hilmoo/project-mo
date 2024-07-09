import { rem } from "@mantine/core";
import cx from "clsx";
import classes from "./MoLogo.module.css";
import { LogoProps } from "./use-mo-logo-colors";

export function MoLogoInfoLomba({ size, style, className, ...others }: LogoProps) {
  return (
    <svg
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1437.04 452"
      style={{ height: rem(size), ...style }}
      className={cx(classes.logo, classes.moUILogo, className)}
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
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M496.25,161.93h21.75v110.4h-21.75v-110.4ZM645.35,276.83l-83.7-75.6,6.45,3.6.45,67.5h-22.05v-114.75h.9l81.9,75.3-4.8-2.1-.45-68.85h21.9v114.9h-.6ZM674.45,161.93h69v21h-47.25v25.05h40.95v21h-40.95v43.35h-21.75v-110.4ZM757.7,217.28c0-7.6,1.45-14.8,4.35-21.6,2.9-6.8,6.92-12.82,12.08-18.07,5.15-5.25,11.12-9.38,17.92-12.38,6.8-3,14.1-4.5,21.9-4.5s14.95,1.5,21.75,4.5c6.8,3,12.83,7.12,18.08,12.38s9.35,11.28,12.3,18.07c2.95,6.8,4.42,14,4.42,21.6s-1.48,15.1-4.42,21.9c-2.95,6.8-7.05,12.78-12.3,17.93-5.25,5.15-11.28,9.18-18.08,12.07-6.8,2.9-14.05,4.35-21.75,4.35s-15.1-1.45-21.9-4.35c-6.8-2.9-12.78-6.92-17.92-12.07-5.15-5.15-9.18-11.12-12.08-17.93-2.9-6.8-4.35-14.1-4.35-21.9ZM780.2,217.28c0,4.9.87,9.48,2.62,13.72,1.75,4.25,4.2,8,7.35,11.25,3.15,3.25,6.8,5.78,10.95,7.58,4.15,1.8,8.67,2.7,13.58,2.7s9.08-.9,13.12-2.7,7.58-4.32,10.58-7.58c3-3.25,5.35-7,7.05-11.25,1.7-4.25,2.55-8.82,2.55-13.72s-.88-9.65-2.62-13.95c-1.75-4.3-4.15-8.07-7.2-11.33-3.05-3.25-6.62-5.77-10.72-7.58-4.1-1.8-8.55-2.7-13.35-2.7s-9.25.9-13.35,2.7c-4.1,1.8-7.7,4.33-10.8,7.58-3.1,3.25-5.5,7.03-7.2,11.33-1.7,4.3-2.55,8.95-2.55,13.95ZM892.25,161.93h21.75v89.4h51.9v21h-73.65v-110.4ZM978.65,217.28c0-7.6,1.45-14.8,4.35-21.6,2.9-6.8,6.92-12.82,12.08-18.07,5.15-5.25,11.12-9.38,17.92-12.38,6.8-3,14.1-4.5,21.9-4.5s14.95,1.5,21.75,4.5c6.8,3,12.83,7.12,18.08,12.38s9.35,11.28,12.3,18.07c2.95,6.8,4.42,14,4.42,21.6s-1.48,15.1-4.42,21.9c-2.95,6.8-7.05,12.78-12.3,17.93-5.25,5.15-11.28,9.18-18.08,12.07-6.8,2.9-14.05,4.35-21.75,4.35s-15.1-1.45-21.9-4.35c-6.8-2.9-12.78-6.92-17.92-12.07-5.15-5.15-9.18-11.12-12.08-17.93-2.9-6.8-4.35-14.1-4.35-21.9ZM1001.15,217.28c0,4.9.87,9.48,2.62,13.72,1.75,4.25,4.2,8,7.35,11.25,3.15,3.25,6.8,5.78,10.95,7.58,4.15,1.8,8.67,2.7,13.58,2.7s9.08-.9,13.12-2.7,7.58-4.32,10.58-7.58c3-3.25,5.35-7,7.05-11.25,1.7-4.25,2.55-8.82,2.55-13.72s-.88-9.65-2.62-13.95c-1.75-4.3-4.15-8.07-7.2-11.33-3.05-3.25-6.62-5.77-10.72-7.58-4.1-1.8-8.55-2.7-13.35-2.7s-9.25.9-13.35,2.7c-4.1,1.8-7.7,4.33-10.8,7.58-3.1,3.25-5.5,7.03-7.2,11.33-1.7,4.3-2.55,8.95-2.55,13.95ZM1113.19,272.33v-114.9h.15l61.35,87-9.3-2.1,61.2-84.9h.3v114.9h-21.75v-65.85l1.35,11.25-37.35,53.1h-.3l-38.4-53.1,3.75-10.35v64.95h-21ZM1287.79,161.93c11.5,0,20.65,2.33,27.45,6.98,6.8,4.65,10.2,11.58,10.2,20.77,0,6.8-1.68,12.48-5.02,17.03-3.35,4.55-7.9,7.95-13.65,10.2-5.75,2.25-12.33,3.38-19.72,3.38l-3.45-11.7c9.1,0,17.17,1.25,24.22,3.75,7.05,2.5,12.62,6.08,16.73,10.72,4.1,4.65,6.15,10.23,6.15,16.73,0,6-1.08,11.08-3.22,15.22-2.15,4.15-5.05,7.5-8.7,10.05-3.65,2.55-7.78,4.4-12.38,5.55-4.6,1.15-9.35,1.72-14.25,1.72h-36.75v-110.4h32.4ZM1290.34,207.08c4.3,0,7.47-1.3,9.52-3.9,2.05-2.6,3.08-5.55,3.08-8.85,0-3.8-1.27-6.65-3.83-8.55-2.55-1.9-5.98-2.85-10.27-2.85h-11.7v24.15h13.2ZM1291.09,252.08c3.2,0,6.1-.42,8.7-1.28,2.6-.85,4.65-2.2,6.15-4.05,1.5-1.85,2.25-4.17,2.25-6.97,0-3.2-.9-5.62-2.7-7.28-1.8-1.65-4.12-2.8-6.97-3.45-2.85-.65-5.83-.97-8.92-.97h-12.45v24h13.95ZM1336.24,272.33l49.8-114.75h1.2l49.8,114.75h-25.2l-31.8-80.7,15.75-10.8-38.1,91.5h-21.45ZM1370.29,232.43h33.15l7.65,18.3h-47.55l6.75-18.3Z"
        />
      </g>
    </svg>
  );
}
