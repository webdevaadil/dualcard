import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Winner.css";
import axios from "axios";
import { Loader } from "../component/Loader";

const Winner = () => {
  const { id, index } = useParams();
  const [images, setImages] = useState([]);
  const [aadil, setaadil] = useState([]);
  const [loader, setLoader] = useState(true);

  console.log(id);
  console.log(index);

  const getwinner = async () => {

    const res = await axios.post("/api/auth/winnerchallenge",{id:id,result:"pending"});
    if(res){
      setLoader(false)
    }
    images.push(res.data[0]);
    console.log(images[0]);
    const player = `player_${index}`;
    console.log(player);

    console.log(images);

    // console.log(images[0]`.${player}`);

    if (index === "player_1") {
    // const response = await axios.put("/api/auth/winnerstatus",{id:id,playeronestatus:"winner",playertwostatus:"loser",result:"declared"})
      images[0].player_1.map((items, i) => {
        console.log(items);
        setaadil(items.images);
      });
    }
    if (index === "player_2") {
    // const response = await axios.put("/api/auth/winnerstatus",{id:id,playertwostatus:"winner",playeronestatus:"loser",result:"declared"})
      images[0].player_2.map((items, i) => {
        console.log(items);
        setaadil(items.images);
      });
    }
  };

  useEffect(() => {
    getwinner();
  }, [id,index]);

  console.log(aadil);

  return (

    <>
    {
      loader?<Loader/>:  <div className="body-main">
      <div className="winner-sec">
        <div className="container">
          <div className="section-title">
            <h2>You Won!</h2>
            <div className="prizeimg">
              <img src="/Prize.png" alt="img" />
            </div>
          </div>
          <div className="row won-main">
            <div className="won-grid">
              {aadil.map((item, ind) => {
                console.log(item);
                return (
                  <>
                    <div className="wonimg1">
                      <img src={item} alt="img" />
                    </div>
                   
                  </>
                );
              })}
            </div>
          </div>
          <div className="won-btn">
            <div className="btn-duel-right winnerbtn1">
              <button className="hero-btn">CARD GALLERY</button>
            </div>
            <div className="btn-duel-right winnerbtn1">
              <Link to="/DuelSomeone">
                <button className="hero-btn">DUEL AGAIN</button>
              </Link>
            </div>
            <div className="btn-duel-right winnerbtn1">
              <Link to="/Auction">
                <button className="hero-btn">AUCTION CARDS</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  
  );
};

export default Winner;
