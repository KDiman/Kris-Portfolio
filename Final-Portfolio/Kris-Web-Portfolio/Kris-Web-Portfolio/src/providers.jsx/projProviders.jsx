import { createContext, useState } from "react";
import javaGameThumbnail from "../assets/thumbnail/javeGameThumbnail.jpg";
import sadieThumbnail from "../assets/thumbnail/sadieOnlineShopThumbnail.jpg";
import brandedThumbnail from "../assets/thumbnail/brandedThumbnail.jpg";

const ProjContext = createContext();

const ProjProvider = (props) => {
  const [proj, setProj] = useState([
    {
      id: 1,
      thumbnail: javaGameThumbnail,
      title: "Defend the Throne",
      description:
        "Defend the throne is a 2D scrolling game. The goal of the game is to defend the throne as long as possible. The game was coded with vanilla JavaScript.",
      link: "https://project-java-game.vercel.app/",
    },
    {
      id: 2,
      thumbnail: sadieThumbnail,
      title: "Sadie Online Shop",
      description: "This is an e-commerce front end created with React.",
      link: "https://sadieonlineshop.vercel.app/",
    },
    {
      id: 3,
      thumbnail: brandedThumbnail,
      title: "Branded",
      description:
        "This is an e-commerce project that targets to create a website for users which they can use to create their gallery.",
      link: "https://brandedapp.vercel.app/",
    },
  ]);

  return (
    <ProjContext.Provider value={[proj, setProj]}>
      {props.children}
    </ProjContext.Provider>
  );
};

export { ProjProvider, ProjContext };
