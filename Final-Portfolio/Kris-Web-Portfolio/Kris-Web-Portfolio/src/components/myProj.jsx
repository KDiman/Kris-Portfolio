import { useState, useContext } from "react";
import styleMyProj from "../styles/myProj.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ProjContext } from "../providers.jsx/projProviders";

const MyProj = ({ isDrawerOpen, toggleDrawer, children }) => {
  const [proj, setProj] = useContext(ProjContext);
  const [url, seturl] = useState("");

  return (
    <div>
      <div onClick={toggleDrawer} className={styleMyProj.backHome}>
        {" "}
        <AiOutlineArrowLeft className={styleMyProj.backHomeIcon} /> Back Home
      </div>
      <div className={styleMyProj.iframeContainer}>
        {/* <div>
          <iframe src="https://sadieonlineshop.vercel.app/"></iframe>
        </div> */}
        <div className={styleMyProj.projectContainer}>
          {proj.map((myProj, index) => {
            return (
              <div className={styleMyProj.projectItem} key={index} >
                <img src={myProj.thumbnail} />
                <div className={styleMyProj.projectTitle}> {myProj.title}</div>
                <div className={styleMyProj.projectDescription}> {myProj.description}</div>
                
                <div></div><a  className={styleMyProj.visitLink} href={myProj.link} target="_blank">Visit Website</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyProj;
