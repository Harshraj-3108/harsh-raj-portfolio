import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRedux,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostman,
  SiCplusplus,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechItem = {
  name: string;
  icon: IconType;
  color: string;
};

export const techStack: TechItem[] = [
  { name: "HTML", icon: SiHtml5, color: "#E44D26" },
  { name: "CSS", icon: SiCss, color: "#2965F1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "JavaScript", icon: SiJavascript, color: "#F0DB4F" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
  { name: "NextJS", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "NodeJS", icon: SiNodedotjs, color: "#68A063" },
  { name: "ExpressJS", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
  { name: "Git", icon: SiGit, color: "#F1502F" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];
