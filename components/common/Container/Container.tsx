import { ReactNode } from "react";
import "./Container.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`container ${className}`.trim()}>{children}</div>;
}
