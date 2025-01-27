import React from "react";
import clsx from "clsx";

interface TitleProps {
  title: string;
  className?: string;
}

function Title({ title, className }: TitleProps) {
  return (
    <h2 className={clsx("mb-4 text-lg font-semibold", className)}>{title}</h2>
  );
}

export default Title;
