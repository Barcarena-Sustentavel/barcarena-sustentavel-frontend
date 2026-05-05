import React from "react";
import "./location.css";
import { useNavigate } from "react-router-dom";

interface LocationProps {
  parentName?: string;
  childName?: string;
}

const Location: React.FC<LocationProps> = ({ parentName, childName}) => {
  const navigate = useNavigate()
  const handleNavigate = (url:string) =>{
    navigate(url)
  }

  if (!childName){
    return (
    <div className="location-container">
      <span> <a onClick={() => handleNavigate("/")}>Início</a> › </span>
      {parentName && <span style={{textDecoration:'none'}} className="location-parent"><a>{parentName}</a></span>}
    </div>
  );
  } 


  return (
    <div className="location-container">
      <span> <a className="home-parent" onClick={() => handleNavigate("/")}>Início</a> <span className="location-separator"> › </span> </span>
      {parentName && <span className="location-parent"><a className="parent-anchor" onClick={() => handleNavigate(`/${parentName}`)}>{parentName}</a></span>}
      {parentName && childName && <span className="location-separator"> › </span>}
      {childName && <span className="location-child">{childName}</span>}
    </div>
  );
};

export default Location;
