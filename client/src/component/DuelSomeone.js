import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import "./DuelChallenge.css";
import { useDispatch, useSelector } from "react-redux";
import { postimage } from "../actions/apiAction";
import img1 from "../images/Plus.png";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../component/Loader";
import "../Pages/tickimage.css";
import { useAlert } from "react-alert";

const DuelSomeone = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const data = JSON.parse(localStorage.getItem("nftuser"))
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [targetname, settargetname] = useState("");
  const [textvalue, setTextvalue] = useState("");
  const [newarr, setNewarr] = useState([]);
  const [filedata, setFiledata] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [localuser, setlocaluser] = useState("");
  const [newuserdata, setnewuserdata] = useState([]);
  const [searchfilter, setsearchfilter] = useState([]);
  const [userId, setUserId] = useState("");
  const [runfun, setrunfun] = useState(true);
  const [loader, setLoader] = useState(false);
  const [userprofiledata, setUserprofiledata] = useState([]);
  const [show, setShow] = useState(false);
  const [userimagedata, setuserimagedata] = useState([]);
  const [clickeduser, setclickeduser] = useState("");
  const [firstname, setfirstname] = useState(true);
  const [checkedimage, setcheckedimage] = useState([]);
  const [linkurl, setlinkurl] = useState("");
 const [checked,setChecked] = useState()
  const thisid = JSON.parse(localStorage.getItem("nftuser"));
  const [erromessage,setErrorMessage] = useState("")
  const [inputerror,setInputError]  = useState("")

  setTimeout(()=>{
   setrunfun(false)
  },800)
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function getuserdata() {
    if (!firstname) {
      return;
    }
    const res = await axios.get("/api/auth/getuserdata");
    setUserdata(res.data);
    const localdata = JSON.parse(localStorage.getItem("nftuser"));
    setlocaluser(localdata.username);

    userdata.sort((a, b) => a.username.localeCompare(b.username));

    const filtereduser = userdata.filter((items, index) => {
      return items._id !== localdata._id;
    });

    setnewuserdata(filtereduser);
    setsearchfilter(filtereduser);
    filtereduser.map((items,index)=>{
      if(index===0){
settargetname(items.username)
setclickeduser(items._id)
settargetname(items.username)
      }
    })
    return;
  }

  if(runfun){
    console.log(targetname)
    console.log(clickeduser)
    getuserdata();
  }

  const handleupload = async (e) => {
    const files = e.target.files[0];
    console.log(files);
    setFiledata(files);
    const userdata = JSON.parse(localStorage.getItem("nftuser"));
    setUserprofiledata([userdata]);
    setUserId(userdata._id);
    console.log(userId);
  };

  const handlesubmit = async () => {
setLoader(true)
    let data = new FormData();
    data.append("profile", filedata);
    data.append("upload_preset", "profile");
    data.append("userId",userId)
    // data.append("cloud_name", "degu3b9yz");
    dispatch(postimage(data));
    setShow(false);
    setTimeout(()=>{
setLoader(false)
    },1000)
  };

 
  
    const getchekedimage = (event) => {
      if(checked===false) {
        console.log(checked)
    }else{
      checkedimage.push(event.target.src);
    }
    console.log(checkedimage)
  }


  async function getimages() {
const res = await axios.post("/api/auth/getdata",data).then((data)=>{
    var url = data.data[0].url
    console.log(url.slice(19))
    
    setuserimagedata(data.data)
})
  }
  useEffect(()=>{
      getimages()
  },[])




  const sendValue = async (e) => {
e.preventDefault()
 if(checkedimage.length<=0){
  setErrorMessage("please select cards")
  setTimeout(()=>{
setErrorMessage("")
  },2200)
      return
    }
    else if(!targetname){
         setErrorMessage("please select a name")
         setTimeout(()=>{
          setErrorMessage("")
            },2200)
         return
    }


      setLoader(true);
      const res = await axios.post("/api/auth/sendchal", {
        playerone_url: checkedimage,
        playeronetext: textvalue,
        playeroneuserid:thisid._id, 
        playertwouserid: clickeduser,
        playeronename: localuser,
        playertwoname:targetname,
        playeronelink: linkurl,
      });
  
    if(res){
          setLoader(false);
      navigate("/thankyou");
    }
    console.log(res.data);
  };
  const handleuserclick = async (e) => {
    setfirstname(false);
    console.log(e);
    setclickeduser(e.target.name);
    settargetname(e.target.value);
    console.log(targetname)
    console.log(clickeduser);
  };

  const handleSearch = (event) => {
    setrunfun(false);
    let keyword = event.target.value;
    const result = newuserdata.filter((user) => {
      return user.username.toLowerCase().startsWith(keyword.toLowerCase());
    });

    setsearchfilter(result);
  };

  

 

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="duelchalenge-sec">
            <div className="container">
              <div className="section-title">
                <h2>Commence Duel/Challenge</h2>
              </div>

              <div className="search-bar">
                <div class="input-group md-form form-sm form-2 pl-0">
                  <input
                    class="form-control my-0 py-1 red-border"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(event) => handleSearch(event)}
                  />
                  <div class="input-group-append">
                    <span
                      class="input-group-text red lighten-3"
                      id="basic-text1"
                    >
                      <i class="fas fa-search text-grey" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="tab-challange">
                  <div className="tab-section">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {searchfilter.map((items, index) => {
                        return (
                          <li className="nav-item" role="presentation">
                            <button
                              value={items.username}
                              onClick={handleuserclick}
                              name={items._id}
                              className="nav-link active tab-btn"
                              id="home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#home"
                              type="button"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                            >
                              {" "}
                              <img
                                src={require(`../images/tabicon-${
                                  index + 1
                                }.png`)}
                                alt="img"
                              />
                              {items.username}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="tab-content" id="myTabContent">

                      <div
                        className="tab-pane fade"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="tab-cont">
                          <div className="row tabct-main gx-5">
                            <div className="col-md-6 tab-left">
                              <div className="dchallenge-rt-1">
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
                                <button className="hero-btn">
                                  SELECT CARDS
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6 tab-right">
                              <div className="dule-rt-2">
                                <div class="clearfix">
                                  <img src="./User_avatar.png" alt="img" />
                                  <button type="button" class="btn float-end">
                                    Laurie
                                  </button>
                                </div>
                              </div>
                              <div className="challenge-list">
                                <div className="won-title">
                                  <h4>Challenges won</h4>
                                  <span>5</span>
                                </div>
                                <div className="lost-title">
                                  <h4>Challenges lost</h4>
                                  <span>8</span>
                                </div>
                              </div>
                              <div className="duel-form">
                                <div class="mb-3 mt-0">
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    placeholder="Write your terms"
                                    rows="10"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="btn-duel-right">
                                <Link to="/DuelRecieved"></Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
{
  erromessage&&<div class="popup error">
  <div class="message">
    <p>{erromessage}</p>
  </div>
  <div class="action">
    <button onClick={()=>setErrorMessage("")}>Ok</button>
  </div>
</div>
}
                      <div
                        className=""
                        id="Stephen"
                        aria-labelledby="Stephen-tab"
                      >
                        <div className="tab-cont">
                          <div className="row tabct-main gx-5">
                            <div className="col-md-6 tab-left">
                              {loader? (
                                <Loader
                                  style={{ backgroundColor: "#282054" }}
                                />
                              ) : (
                                <div className="dchallenge-rt-1">
                                  {userimagedata.map((items, index) => {
                                    const src = items.url.slice(21)
                                    console.log(src)
                                    return (
                                      <>
                                        <div class="grid-two imageandtext">
                                          <div class="imageandtext image_grid">
                                            <label>
                                              <img
                                                onClick={getchekedimage}
                                                src={require(`../../../uploads/${src}`)}
                                                className="img-thumbnail"
                                              />
                                              <input
                                                onClick={(e)=>setChecked(e.target.checked)}
                                                type="checkbox"
                                                name="selimg"
                                              />
                                              <span class="caption"></span>
                                            </label>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}

                                  <div
                                    style={{
                                      border: "2px dashed #4A6BBC",
                                      height: "250px",
                                      borderRadius: "16px",
                                    }}
                                    className="dule-img1"
                                  >
                                    {
                                      <div
                                        style={{
                                          textAlign: "center",
                                          position: "relative",
                                          top: "65px",
                                          left: "20px",
                                        }}
                                        onClick={handleShow}
                                        className="icon-plus button"
                                      >
                                        <img src={img1} />
                                      </div>
                                    }
                                  </div>
                                </div>
                              )}
                              <div className="btn-duel-right">
                                <button
                                  onClick={handleShow}
                                  className="hero-btn"
                                >
                                  SELECT CARDS
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6 tab-right">
                              <div className="dule-rt-2">
                                <div class="clearfix">
                                  {searchfilter.map((items, index) => {
                                    if (index === 0) {
                                      return (
                                        <>
                                          <img
                                            src="./tabicon-14.png"
                                            alt="img"
                                          />
                                          <button
                                            type="button"
                                            class="btn float-end"
                                          >
                                            {firstname
                                              ? items.username
                                              : targetname
                                              }
                                          </button>
                                        </>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="challenge-list">
                                <div className="won-title">
                                  <h4>Challenges won</h4>
                                  <span>5</span>
                                </div>
                                <div className="lost-title">
                                  <h4>Challenges lost</h4>
                                  <span>8</span>
                                </div>
                              </div>

                              {
inputerror&&<div style = {{position:"relative",left:"55%",top:"%"}} className="popup error">
<div className="message">
<p>{inputerror}</p>
</div>
<div className="action">
<button onClick={()=>setInputError("")}>Ok</button>
</div>
</div>
}

                              <form onSubmit={sendValue}>
                                <div className="duel-form">
                                  <div class="mb-3 mt-0">
                                    <textarea
                                      required
                                      onChange={(e) =>
                                        setTextvalue(e.target.value)
                                      }
                                      value={textvalue}
                                      class="form-control"
                                      id="exampleFormControlTextarea1"
                                      placeholder="Write your terms"
                                      rows="10"
                                    />
                                  </div>
                                </div>

                                <div className="search-bar">
                                  <div class="input-group md-form form-sm form-2 pl-0">
                                    <input
                                    type = "url"
                                      required
                                      class="form-control my-0 py-1 red-border"
                                      placeholder="put your twitch or youtube live link"
                                      aria-label="Search"
                                      onChange={(e) =>
                                        setlinkurl(e.target.value)
                                      }
                                    />

                                    <div class="input-group-append"></div>
                                  </div>
                                </div>

                                <div className="btn-duel-right challenge">
                                  <input
                                    type="submit"
                                    // on={sendValue}
                                    placeholder="send Challenge"
                                    className="hero-btn challenge"
                                  />
                                 
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Modal
                        style={{ height: "800px" }}
                        show={show}
                        onHide={handleClose}
                        >
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <input
                            multiple
                            onChange={handleupload}
                            type="file"
                            name=""
                            id=""
                            />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={handlesubmit}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Link to="/duelstatus">
                <h4 style={{ color: "white" }}>
                  Please check status for previous Duel Challenges
                </h4>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DuelSomeone;