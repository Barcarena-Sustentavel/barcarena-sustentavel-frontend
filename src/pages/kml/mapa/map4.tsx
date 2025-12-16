import React from "react";

const HTMLFileIframe: React.FC<{ htmlFilePath: string }> = ({
  htmlFilePath,
}) => {
  return (
    <iframe
      src={htmlFilePath}
      title="External HTML Content"
      width="100%"
      height="1000px"
      style={{ border: "none" }}
      scrolling="no"
    />
  );
};

export default HTMLFileIframe;
