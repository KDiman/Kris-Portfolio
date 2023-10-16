
import stylesNavBar from "../styles/navBar.module.css";
const NavBar = ({ onAboutMeClick,toggleWorkExp,toggleContacts }) => {

  
  return (
    <div className={stylesNavBar.navBarContainer}>
      <div onClick={onAboutMeClick} className={stylesNavBar.aboutMe}>About Me</div>
      <div onClick={toggleWorkExp}className={stylesNavBar.workExperience}>Work Experience</div>
      <div  onClick={toggleContacts} className={stylesNavBar.contacts}>Contacts</div>
    </div>
  );
};

export default NavBar;
