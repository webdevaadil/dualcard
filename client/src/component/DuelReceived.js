import React, { useEffect, useState } from "react";
import "./DuelReceived.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

const DuelReceived = () => {
  const [challengedata, setchallengedata] = useState([]);
  const data = JSON.parse(localStorage.getItem("nftuser"));
  const id = data._id;

  const getrecieved = async () => {
    console.log(id);

    const res = await axios.post("/api/auth/recievedchallenge", { id: id });
    console.log(res.data);
    setchallengedata(res.data);
  };

  useEffect(() => {
    getrecieved();
  }, []);

  return (
    <div>
      <div className="DuelRec-sec">
        <div className="container">
          <div className="section-title">
            <h2>Duel Received</h2>
          </div>

          <div className="row duel-main">
          {
              challengedata.map((items,index)=>{
                  
                  console.log(items)
                  
                  return(
                      
                      <>
            <div className="col-md-4 col-sm-12 duel-left">
              <div className="duel-lef-slide">
                      <div className="duel-sldier">
                  <Carousel>
                    {
                    items.player_1[0].images.map((items, index) => {
                        return (
                            <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={items}
                              alt="First slide"
                            />
                            </Carousel.Item>
                          );
                        
                    })
                }
                    </Carousel>
                    </div>
                <div className="duel-des">

                          <div class="clearfix">
                        <button type="button" class="btn float-end">
                          {items.player_1[0].name}
                        </button>

                    <img src={require(`../images/tabicon-${index + 1}.png`)} alt="newimg" />
                  </div>
                      
                  <div className="duel-leftgreen-text mt-3">
                    <h4>
                      <span>5</span>won
                    </h4>
                  </div>
                  <div className="duel-leftred-text">
                    <h4>
                      <span>8</span>lost
                    </h4>
                  </div>
                </div>
              </div>
              <div className="dule-cont">
               
                {items.player_1.map((item,index)=>{
return(
    <>
                        <h4>TERMS</h4>
                        <p>{item.text}.</p>  
                      </>
)
                })} 
                
            
                
                      
                    
                  
              </div>
            </div>
            <div className="col-md-2 duel-center">
              <img src="./VS icon.png" alt="img" />
            </div>
            <div className="col-md-6 duel-right">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="dule-rt-1">
                    <div className="dule-img1">
                      <img src="./NFT img1.png" alt="img" />
                    </div>
                    <div className="dule-img1">
                      <img src="./NFT img1.png" alt="img" />
                    </div>
                    <div className="dule-img1">
                      <img src="./NFT img2.png" alt="img" />
                    </div>
                    <div className="dule-img1"></div>
                  </div>
                  <div className="btn-duel-right">
                    <button className="hero-btn">SELECT CARDS</button>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="dule-rt-2">
                    <div class="clearfix">
                      <img src="./tabicon8.png" alt="img" />
                      <button type="button" class="btn float-end">
                        {data.username}
                      </button>
                    </div>
                  </div>
                  <div className="duel-form">
                    <div class="mb-3 mt-4">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        placeholder="Write your terms"
                        rows="10"
                      ></textarea>
                    </div>
                  </div>
                  <div className="btn-duel-right">
                    <button className="hero-btn">acCept challenge</button>
                  </div>
                </div>
              </div>
            </div>
</>
                )
            })
        }
        </div>
        </div>
      </div>
    </div>
  );
};

export default DuelReceived;
