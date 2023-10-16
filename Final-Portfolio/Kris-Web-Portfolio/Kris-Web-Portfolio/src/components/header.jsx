
import stylesHeader from "../styles/header.module.css"



const Header = () => {
  return (
    <>
      <div className={stylesHeader.container}>
        <div className={stylesHeader.content}>
          <div> Hello World!</div>
          <h1>I am Kris </h1>
          <div> and I am a Web Developer</div>
        </div>
      </div>
    </>
  );
};

export default Header;
