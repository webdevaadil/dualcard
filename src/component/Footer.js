import React, {useEffect, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import './Header.css';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

const Footer = () => {
const [show,setShow] = useState(false)
const navigate  = useNavigate()


  return (
    <div>
      <div class='footer-sec'>
        <div className='container'>
          <div className='footer-logo'>
            <img src="./Logo-Footer.png" alt="foot-logo"/>
          </div>
          <div className='foot-list'>
          <ul className="footer-menu">
                <li className="nav-item" to="/">                    
                    <Link  to="BuyDuelCard" className="foot-link" aria-current="page">BuyDuelCard</Link>
                    </li>                    
                    <li className="nav-item" onClick={()=>navigate("/Marketplace")} to='/Marketplace'>                                        
                    <Link  to="Marketplace" className="foot-link" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Marketplace</Link>
                    </li>     
                    <li className="nav-item" onClick={()=>navigate("/DuelSomeone")} to='/DuelSomeone'>                                        
                    <Link  to="DuelSomeone" className="foot-link" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Duel Someone</Link>
                    </li> 
                    <li className="nav-item" onClick={()=>navigate("/AboutRules")} to='/AboutRules'>                                        
                    <Link  to="AboutRules" className="foot-link" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">About / Rules</Link>
                    </li>  
                    <li className="nav-item" onClick={()=>navigate("/ICOInformation")} to='/ICOInformation'>                                        
                    <Link  to="ICOInformation" className="foot-link" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">ICO Information</Link>
                    </li>                                    
                     
                </ul>
          </div>
          <hr className='hr-line'></hr>
          <div className='copylink'>
            <p>Copyright © DuelCards 2021, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer