import styleAboutMe from "../styles/aboutMe.module.css";
import { AiFillHtml5 } from "react-icons/ai";
import { BiLogoCss3 } from "react-icons/bi";
import { DiJavascript } from "react-icons/di";
import { BiLogoNodejs } from "react-icons/bi";
import { BiLogoMongodb } from "react-icons/bi";
import { useAnimate , motion, usePresence,  delay } from "framer-motion"
import {  useEffect } from "react";


const AboutMe = ({ onAboutMeClick }) => {
const [isPresent, safeToRemove] = usePresence()
const [scope, animate] =useAnimate()


useEffect(() => {
  const enterAnimation = async () => {
    await animate(
      scope.current,
      { opacity: [0, 1] },
      { duration: 0.5, delay: 0.2 }
    );
  };

  const exitAnimation = async () => {
    await animate(
      scope.current,
      { opacity: [1, 0] },
      { duration: 0.5, delay: 0.2 }
    );
    safeToRemove();
  };

  if (isPresent) {
    enterAnimation();
  } else {
    exitAnimation();
  }
}, [isPresent]);



  return (
    <div ref={scope}>
    <div className={styleAboutMe.aboutMeContainer} onClick={onAboutMeClick}>
      <h2 className={styleAboutMe.aboutMeTitle}>About Me</h2>
      <div className={styleAboutMe.aboutMeText}>
        An enthusiastic and passionate individual who love his craft. I have
        been in the F&B Industry for over 10 years with the last 6 years serving
        the Singaporean Market. With my knack for developing great relationship
        with guests, and my keenness to details I can help the organization to
        succeed with its mission.
      </div>
      <div className={styleAboutMe.skillsContainer}>
        <div className={styleAboutMe.skillsHeader}>Skills</div>
        <div>
          <div className={styleAboutMe.skillsContainer}>
            <span className={styleAboutMe.skillCategory}>Frontend</span>
          </div>
          <div className={styleAboutMe.iconContainer}>
            <AiFillHtml5 className={styleAboutMe.htmlIcon} />
            HTML
          </div>
          <div className={styleAboutMe.iconContainer}>
            <BiLogoCss3 className={styleAboutMe.cssIcon} />
            CSS
          </div>
          <div className={styleAboutMe.iconContainer}>
            {" "}
            <DiJavascript className={styleAboutMe.jsIcon} />
            JavaScript
          </div>
        </div>

        <div>
          <div className={styleAboutMe.skillsContainer}>
            <span className={styleAboutMe.skillCategory}>Backend</span>
          </div>
          <div className={styleAboutMe.iconContainer}>
            <BiLogoNodejs className={styleAboutMe.nodeJsIcon} />
            NodeJs
          </div>
          <div className={styleAboutMe.iconContainer}>
            <BiLogoMongodb className={styleAboutMe.mongoDbIcon} />
            MongoDb
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutMe;
