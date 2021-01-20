import React from "react";

import BodyWrapper from "./BodyWrapper";
import "./BodyWrapper.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Layout = ({ children }) => {
    return (
        <BodyWrapper>
            <div className="divBody">
                <header style={{backgroundColor:"white"}}>
                    <h2 style={{marginLeft:"1%",padding:"1.5%"}}>Dashboard</h2>
                </header>
                    <main className="content">
                        <section>
                            <div className="content-box" >
                                {children}
                            </div>
                        </section>
                    </main>
            </div>

        </BodyWrapper>
    );
};
