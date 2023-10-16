import { useState, useEffect } from "react";
import Header from "../components/header";
import "../App.css";
import styles from "../styles/circle.module.css";
import dogPic from "../assets/dogSamplePic.png";
import NavBar from "../components/navBar";
import logo from "../assets/svg_20230525_033146_0000.svg";
import stylesNavBar from "../styles/navBar.module.css";
import AboutMe from "../components/aboutMe";
import WorkExperience from "../components/workExperience";
import Contacts from "../components/contacts";
import { AiOutlineArrowRight } from "react-icons/ai";
import styleMyProj from "../styles/myProj.module.css";
import MyProj from "../components/myProj";
import DownloadCV from "../components/downloadPdf";
import {
  useAnimate,
  motion,
  usePresence,
  delay,
  useInView,
} from "framer-motion";
import { useRef } from "react";

function Home() {
  const [showNavBarAndDogPic, setShowNavBarAndDogPic] = useState(true);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showWorkExp, setShowWorkExp] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

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

  useEffect(() => {
    if (showAboutMe || showWorkExp || showContacts) {
      setShowNavBarAndDogPic(false);
    } else {
      setShowNavBarAndDogPic(true);
    }
  }, [showAboutMe, showWorkExp, showContacts]);

  const toggleAboutMeContent = () => {
    setShowAboutMe(!showAboutMe);
    setShowWorkExp(false);
    setShowContacts(false);
  };

  const toggleWorkExp = () => {
    setShowAboutMe(false);
    setShowContacts(false);
    setShowWorkExp(!showWorkExp);
  };
  const toggleContacts = () => {
    setShowAboutMe(false);
    setShowWorkExp(false);
    setShowContacts(!showContacts);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div ref={scope}>
      <div>
        <DownloadCV />
      </div>
      <img src={logo} className={styles.logo} />
      <div className={stylesNavBar.navBarContainer}>
        <NavBar
          onAboutMeClick={toggleAboutMeContent}
          toggleWorkExp={toggleWorkExp}
          toggleContacts={toggleContacts}
        />
      </div>

      {showNavBarAndDogPic && (
        <div>
          <Header />

          <div className={styles.circle}></div>
          <img src={dogPic} className={styles.img} />
        </div>
      )}

      {showAboutMe && <AboutMe />}
      {showWorkExp && <WorkExperience />}
      {showContacts && <Contacts />}

      <div onClick={toggleDrawer} className={styleMyProj.bottomRightText}>
        <div className={styleMyProj.bottomRightIcon}>
          My Projects <AiOutlineArrowRight />
        </div>
      </div>
      <div
        className={
          isDrawerOpen
            ? `${styleMyProj.myProjDrawer} ${styleMyProj.active}`
            : styleMyProj.myProjDrawer
        }
      >
        <MyProj
          className={`${styleMyProj.myProjDrawer} ${
            isDrawerOpen ? "active" : ""
          }`}
          toggleDrawer={toggleDrawer}
        />
      </div>
    </div>
  );
}

export default Home;
