import React from "react";
import { AiOutlineMail, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { TfiLocationPin } from "react-icons/tfi";
import { BsPhone } from "react-icons/bs";
import styleContacts from "../styles/contacts.module.css";
import { useAnimate , motion, usePresence,  delay } from "framer-motion"
import {  useEffect } from "react";

const Contacts = () => {
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
    <div className={styleContacts.centerContainer}>
      <div>
        <h3>Contact Me</h3>
      </div>
      <div>
        <div>
          <TfiLocationPin />
          Address: Bulacan, Philippines
        </div>
        <div>
          <BsPhone /> +63 917 114 4971
        </div>
        <div>
          <AiOutlineMail />
          Email: krisaldiman@gmail.com
        </div>
      </div>
      
        <div className={styleContacts.iconContainer}>
            <div className={styleContacts.iconBox} >
          <a href="https://github.com/KDiman" target="_blank">
            <AiFillGithub className={styleContacts.gitHubIcon} />{" "}
          </a>{" "}
          <div>Github</div>
          </div>
          <div className={styleContacts.iconBox}>
            <a href="https://www.linkedin.com/login" target="_blank">
              <AiFillLinkedin className={styleContacts.linkInIcon} />
            </a>
            <div>LinkIn</div>
          </div>
        </div>
     
      <div>
        <div>Email Me</div>
        <form
          action="https://formsubmit.co/krisaldiman@gmail.com"
          method="POST"
        >
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Contacts;
