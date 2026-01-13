import React from "react";
import "./location.css";

interface LocationProps {
  parentName?: string;
  childName?: string;
}

const Location: React.FC<LocationProps> = ({ parentName, childName }) => {
  return (
    <div className="location-container">
      {parentName && <span className="location-parent">{parentName}</span>}
      {parentName && childName && <span className="location-separator"> / </span>}
      {childName && <span className="location-child">{childName}</span>}
    </div>
  );
};

export default Location;
