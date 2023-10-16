import React from "react";
import Cv from "../assets/KDCV.pdf"
import styleDownload from "../styles/download.module.css"
import {AiOutlineDownload} from 'react-icons/ai'

const DownloadCV = () => {
  const downloadCV = () => {
    
    const link = document.createElement("a");
    link.href = Cv; 
    link.download = "KDCV.pdf";


    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styleDownload.downloadCvContainer}>
   
      <div className={styleDownload.downloadCvButton} onClick={downloadCV}><AiOutlineDownload className={styleDownload.downloadIcon}/>Download CV</div>
    </div>
  );
};

export default DownloadCV;
