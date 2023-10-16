import workExp from "../styles/workExp.module.css";
import { useAnimate, motion, usePresence, delay } from "framer-motion";
import { useEffect } from "react";
const WorkExperience = () => {
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

  return (
    <div ref={scope}>
      <div className={workExp.workExperienceContainer}>
        <div>
          <div className={workExp.workExperienceTitle}>Work Experience</div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>Burpple Pte. Ltd.</div>
          <div>Customer Success Manager, November 2021 - September 2023</div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>
            Microsourcing, Manila
          </div>
          <div>Onboarding Specialist, August 2020 - May 2021</div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>
            Malts premium whisky bar, Singapore
          </div>
          <div>Assistant Manager, December 2019 – March 2020</div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>
            Grub bistro, Singapore
          </div>
          <div>Assistant Manager, April 2013 – October 2019</div>
          <div></div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>
            New World Hotel Manila
          </div>
          <div>Bartender, October 2011 – August 2012</div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>Bed Club Malate</div>
          <div>Bartender, December 2010 – May 2011</div>
        </div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>
            Chateau Group of Restaurants (Cafè 1771)
          </div>
          <div>Server/Food Coordinator, June 2010 – December 2010</div>
        </div>

        <div className={workExp.trainingTitle}>Training</div>
        <div className={workExp.workExperienceList}>
          <div className={workExp.workExperienceCompany}>Uplift Code Camp</div>
          <div>May - October 2023</div>
        </div>
      </div>
    </div>
  );
};
export default WorkExperience;
