import { FC } from "react";
import "../css/private_route.css";
const BouncingDotsLoader: FC = () => {
  return (
    <>
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
