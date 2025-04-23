import { useState, useEffect, memo } from "react";
import { CubeGrid } from "./CubeGrid";

export const Music = memo(() => {
    const [cols, setCols] = useState(10);
    const [rows, setRows] = useState(5);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1536) {
                // 2xl
                setCols(10);  
                setRows(5);   
            } else if (window.innerWidth >= 1024) {
                // lg
                setCols(8);  
                setRows(4);  
            } 
        };

        window.addEventListener("resize", handleResize);
        handleResize(); 

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="inline-flex gap-2 2xl ml-2 mr-2  bg-primary rounded-full md:rounded-4xl md:mr-2 items-end px-3 py-6 lg:py-4 xl:py-5 2xl:py-5">
            <CubeGrid cols={cols} rows={rows} color={"secundary"} />
        </div>
    );
});
