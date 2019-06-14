import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";
const Header=(props)=>{
    const {isAdmin}=props.isAdmin;
    console.log("props is :"+props.isAdmin);
    return(
        <nav>
            <Link to={"./dashboard"}>Buzz</Link>
            <Link to={"./complaints"}>Complaints</Link>
            <Link to={"../resolve"}>Resolve</Link>
            <Link to={"./settings"}>Settings</Link>
            <Link to={'./logout'}>Logout</Link>
        </nav>
    );
}
export default Header;