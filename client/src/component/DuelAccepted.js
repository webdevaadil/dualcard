import  React,{useState,useEffect} from 'react';
import './DuelAccepted.css';
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios"
import {Link} from "react-router-dom"


export const DuelAccepted = () => {

    const [challengedata, setchallengedata] = useState([]);
    const [challengeid,setChallengeId] = useState("")
    const [loader,setLoader] = useState(true)
    const [userimagedata, setuserimagedata] = useState([]);

    const data = JSON.parse(localStorage.getItem("nftuser"));
    const id = data._id;




    const getrecieved = async () => {
        console.log(id);
        const res = await axios.post("/api/auth/recievedchallenge",{id:id,Accept:true});
        const newres = await axios.post("/api/auth/challengedata",{id:id,Accept:true})

        console.log(res)
        res.data.map((items,index)=>{
          console.log(items)
          console.log(items._id)
            setChallengeId(items._id) 
        })
        console.log(challengeid)
        setchallengedata([...res.data,...newres.data]);
        console.log(challengedata)
      };

      async function getimages() {
        const data = JSON.parse(localStorage.getItem("nftuser"));
    
        const res = await axios.post("/api/auth/getdata", data).then((data) => {
          setuserimagedata(data.data);
        });
      }
      getimages();

      useEffect(()=>{
        // getacceptedchallenge()
        getrecieved()
      },[])

  return (
    <div>
        <div className='duelacept-sec'>
            <div className='container'>
                <div className='section-title'>
                    <h2 className = "body-main">Duel Accepted</h2>
                </div>

                <div className='row duelat-main'>

                    {
                        challengedata.map((items,index)=>{
                            console.log(items)
                            return(
                                <>
                                

                    <div className='col-md-5 col-sm-5'>

                       <div className='dA-left'>
                        <div className='dA-profile'>
                            <div class="clearfix">
                                    <img src="./tabicon8.png" alt="img"/>
                                    <button type="button" class="btn float-end">{items.player_1[0].name}</button>
                            </div> 
                            <div className='dA-slider'>

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
                            <div className='select-btn'>
                              <button className='hero-btn'> <span>{items.player_1[0].images.length}</span>selected</button>
                            </div>
                            <div className='btn-duel-right winner-btn'>
                                <Link to = "/winner">
                                    <button className='hero-btn'>Winner</button>
                                </Link>
                             </div>
                        </div>
                        </div> 
                    </div>
                    <div className='col-md-2 col-sm-2 duelA-center'>
                       <img src="./VS icon.png" alt="img"/>
                    </div>
                    <div className='col-md-5 col-sm-5'>
                    <div className='dA-left'>
                        <div className='dA-profile'>
                        <div class="clearfix">
                                <img src="./tabicon-6.png" alt="img"/>
                                <button type="button" class="btn float-end">{items.player_2[0].name}</button>
                         </div> 
                         <div className='dA-slider'>

                            <Carousel>
                                {
                                    userimagedata.map((items,index)=>{
                                        return(
                                            <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={items.url}
                                            alt="First slide"
                                            />
                                            <Carousel.Caption>
                                            
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        )
                                    })
                                }
                        </Carousel>
                            </div>
                            <div className='select-btn'>
                              <button className='hero-btn'> <span>3</span>selected</button>
                            </div>
                            <div className='btn-duel-right winner-btn'>
                            <Link to = "/loser">
                                    <button className='hero-btn'>Loser</button>
                                </Link>
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
  )
}


export default DuelAccepted;