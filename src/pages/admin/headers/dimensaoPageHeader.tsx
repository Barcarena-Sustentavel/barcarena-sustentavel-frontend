import { FC, ReactElement, useEffect, useState } from "react";
import { getIcone } from "./getIcone.tsx";
import { getCor } from "./getCor.tsx";

const DimensaoPageHeader: FC<{ dimensao: string }> = ({ dimensao }) => {
    const [icone, setIcone] = useState<ReactElement | null>(null);
    
    useEffect(() => {
        setIcone(() => getIcone(dimensao, "#FFFFFF"));
    }, [dimensao]);

    if(!icone) return;
    return (<div
        style={{
          backgroundColor: getCor(dimensao),
        }}
        className="admin-header-dimensao-page"
      >
        {/* <div className="admin-header-dimensao-page-space">
          {icone}
          <h1 className="admin-header-dimensao-page">{dimensao}</h1>
        </div> */}
      </div>);
};

export default DimensaoPageHeader;
