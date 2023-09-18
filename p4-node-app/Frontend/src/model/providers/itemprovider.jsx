import { createContext, useState, useEffect } from "react";

const ItemsContext = createContext();

const ItemsProvider = (props) => {
  const [items, setItems] = useState([])

    useEffect(() => {
      fetch("http://localhost:8080/products/active")
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error("Error fetching active products:", error));
    }, [])



  
    // {
    //   id: 2,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/501e5a2930553328f1819c8f9b0aa97a",
    //   Name: "The Ordinary Glycolic Acid 7% Exfoliating Toning Solution",
    //   Brand: "The Ordinary",
    //   Type: "Skin Care",
    //   Category: "Toner",
    //   Description:
    //     "Glycolic Acid 7% Toning Solution from The Ordinary is an exfoliating toning solution which offers mild exfoliation for improved skin radiance and visible clarity. The formula also improves the appearance of skin texture with continued use.",
    //   Size: "240ml",
    //   Price: 925,
    // },
    // {
    //   id: 3,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/6c6056bde49627f64cc55c08b50a53b6",
    //   Name: "CeraVe Skin Renewing Retinol Serum",
    //   Brand: "Cerave",
    //   Type: "Skin Care",
    //   Category: "Serum",
    //   Description:
    //     "A cleanser can remove dirt, makeup and other debris, but a hydrating cleanser, like CeraVe Hydrating Facial Cleanser, can do all that without disrupting the skin’s natural protective barrier or stripping the skin of its natural moisture. Created with dermatologists, CeraVe Hydrating Facial Cleanser is a gentle face wash with ingredients like ceramides and hyaluronic acid that work to restore the skins natural barrier to help the skin lock in moisture",
    //   Size: "1oz",
    //   Price: 1250,
    // },
    // {
    //   id: 4,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/0c07d55c5a14413c26e8c44758d6c689",
    //   Name: "CeraVe Normal to Dry Facial Cleanser (Hydrating)",
    //   Brand: "Cerave",
    //   Type: "Skin Care",
    //   Category: "Cleanser & Scrubs",
    //   Description:
    //     "A cleanser can remove dirt, makeup and other debris, but a hydrating cleanser, like CeraVe Hydrating Facial Cleanser, can do all that without disrupting the skin’s natural protective barrier or stripping the skin of its natural moisture. Created with dermatologists, CeraVe Hydrating Facial Cleanser is a gentle face wash with ingredients like ceramides and hyaluronic acid that work to restore the skins natural barrier to help the skin lock in moisture",
    //   Size: "16oz",
    //   Price: 1325,
    // },
    // {
    //   id: 5,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/09936de5f972c9b9e705055ea38db6bc",
    //   Name: "La Roche-Posay Toleriane Purifying Foaming Cleanser",
    //   Brand: "La Roche-Posay",
    //   Type: "Skin Care",
    //   Category: "Cleanser & Scrubs",
    //   Description:
    //     "Purifying foaming face wash for combination and oily skin effectively removes dirt, oil, impurities and makeup, Refreshing gel texture transforms into a foam to leave the skin feeling fresh and comfortable with no pore-clogging residue, Helps restore skin comfort and retains essential moisture",
    //   Size: "400ml",
    //   Price: 1249,
    // },
    // {
    //   id: 6,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/b83964570f0c7b80bd76bb81b80f81f3",
    //   Name: "GRANDE Cosmetics Conditioning Peptide Mascara",
    //   Brand: "Grande Cosmetics",
    //   Type: "Make Up",
    //   Category: "Make Up",
    //   Description:
    //     "Grande Mascara lets you get the faux lash look with your own natural lashes. This exclusive, rich-black mascara not only provides extreme length and volume, but it’s infused with lash-loving blend of peptides, panthenols, and natural waxes to condition lashes while you coat and promote healthier-looking, longer lashes over time. This mascara is water based, water resistant, and easily removable to prevent lash breakage. Its buildable formula resists lumps and clumps while keeping the lashes flexible and supple. The applicator brush is made with an ideal combination of long and short fibers to reach every lash, giving extreme volume without sacrificing length. ",
    //   Size: "5.6g",
    //   Price: 1100,
    // },
    // {
    //   id: 7,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/9a142715057492217155248da208d5fa",
    //   Name: " Good Molecules Gentle Retinol Cream",
    //   Brand: " Good Molecules",
    //   Type: "Skin Care",
    //   Category: "Serum",
    //   Description:
    //     "Formulated with 0.1% retinol, an effective concentration for softening the look of fine lines and wrinkles Antioxidant-rich bakuchiol boosts the effects of retinol without irritation Grapeseed oil, allantoin, and acmella oleracea extract help nourish and soothe skin",
    //   Size: "30ml",
    //   Price: 725,
    // },
    // {
    //   id: 8,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/sg-11134201-22100-duhhih55bziv29",
    //   Name:
    //     " KRISTIN ESS HAIR Strand Strengthening Reconstructive Moisture Mask",
    //   Brand: " KRISTIN ESS HAIR",
    //   Type: "Others",
    //   Category: "Hair Treatment",
    //   Description:
    //     "The Strand Strengthening Reconstructive Moisture Mask for Dry Damaged Hair from Kristin Ess Hair is a universal treatment for anyone looking to reverse dryness.",
    //   Size: "200ml",
    //   Price: 899,
    // },
    // {
    //   id: 9,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/ph-11134207-23030-lqqm0vhfxqovd3",
    //   Name: "Indeed Labs Nanoblur Cream",
    //   Brand: " Indeed Laboratories",
    //   Type: "Make Up",
    //   Category: "Make Up",
    //   Description:
    //     "Indeed Labs' award-winning Nanoblur Cream instantly blurs and mattifies skin, minimizing the look of enlarged pores, shine, wrinkles and crow's feet.",
    //   Size: "30ml",
    //   Price: 1599,
    // },
    // {
    //   id: 10,
    //   Image:
    //     "https://down-ph.img.susercontent.com/file/87bc1321bde2c3b12be5045f8a1a2ddb",
    //   Name: "La Roche-Posay Pure Vitamin C Face Serum",
    //   Brand: " La Roche-Posay",
    //   Category: "Serum",
    //   Type: "Skin Care",
    //   Description:
    //     "This anti-aging vitamin c face and neck serum leaves skin more radiant, softer, and hydrated. As a result, wrinkles look visibly reduced and skin texture and tone are more even and refined. This serum combines concentrated 10% pure vitamin c, salicylic acid and neurosensine for optimal effectiveness while also being suitable for sensitive skin.",
    //   Size: "30ml",
    //   Price: 2950,
    // },
  ;

  return (
    <ItemsContext.Provider value={[items, setItems]}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export { ItemsContext, ItemsProvider };
