import styles from "./styles/Title.module.css";
import React from "react";

interface TitleProps {
  title: string;
  containerStyles?: React.CSSProperties;
}

export default function Title({ title, containerStyles }: TitleProps) {
  return (
    <h1 style={containerStyles} className="text-[25px] font-semibold text-white">
      {title}
    </h1>
  );
}
