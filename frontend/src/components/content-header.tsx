import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const ContentHeader: React.FC<Props> = (props) => {
  return (
    <div>
      <h1 className="page-title">{props.title}</h1>
      <span>{props.subtitle}</span>
    </div>
  );
};

export default ContentHeader;
