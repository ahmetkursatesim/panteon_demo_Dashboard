import React from 'react';
import {Sidebar} from "./Sidebar";
import "./BodyWrapper.css"

const BodyWrapper = ({children}) => {
    return (
        <div className="flex mainBody" >
            <Sidebar/>
            <main className="mainBody" >{children}</main>
        </div>
    );
};
export default BodyWrapper;
