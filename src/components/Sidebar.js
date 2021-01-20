
import { useHistory, useLocation,Link } from "react-router-dom";

import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "./sidebar2.css"
import classNames from 'classnames'


import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const Sidebar = () => {
    const [state,setState]=useState( {showMenu: false})
    const showMenu = state.showMenu;
    const sidebarClass = classNames({
        'sidebar': true,
        'sidebar-menu-expanded': showMenu,
        'sidebar-menu-collapsed': !showMenu
    });

    const elementsClass = classNames({
        'expanded-element': true,
        'is-hidden': !showMenu,
    });
   function  toggleMenu() {
       setState({ showMenu: !state.showMenu })
   }

    return (
        <React.Fragment>
                <nav className={sidebarClass} style={{backgroundColor:"#0bcaff",position:""}}>

                    <img  className="menuIcon" src="/images/dashboardImages/logo.png"></img>
                    <ul>
                        <li className="active">
                            <Link className="expandable" to="/Dashboard" title="Dashboard">
                                <button className="button active" style={{hover: true}} ><span style={{display:"flex"}}>
                                    <img src="/images/dashboardImages/dashboardMenuIcon.png" style={{float:"left",border:"none"}}/>
                                 <p style={{marginLeft:"15px",marginTop:"8px"}}> <i className="arrow right"></i></p>
                                </span></button>
                            </Link>
                        </li>
                    </ul>
                </nav>
        </React.Fragment>
    );
};
