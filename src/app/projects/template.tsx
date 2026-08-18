import type { ReactNode } from "react";

type ProjectTemplateProps = {
  children: ReactNode;
};

export default function ProjectTemplate({ children }: ProjectTemplateProps) {
  return <div className="project-enter">{children}</div>;
}
