import './Header.css';
//MARC LOGO for corner?
//Need to have all the access buttons dependent on authentication. 

function Header() {
    return(
        <div Classname="header">
            <div Classname="headerButton" id="tradeMarc"><h1 classname="tradeMarc">M.A.R.C</h1></div>
           <div Classname="headerButton">Login</div> 
        </div>
    )
}

export default Header;