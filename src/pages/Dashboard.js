import React, { useContext, useEffect,useState,useRef } from "react";
import Context from "../config/context";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./dashboard.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Flag } from 'semantic-ui-react'
import RGL, { WidthProvider } from "react-grid-layout";
import StarRatings from 'react-star-ratings';
import {Layout} from "../components/Layout";
import ChartContainer from "../components/ChartContainer";
const ReactGridLayout = WidthProvider(RGL);

export default function Dashboard() {

    const context = useContext(Context);
    const {getAppSuggestions,appSuggestions,topChart,getTopChart,trackedApps,getTrackedApps } = context;

    useEffect(() => {
        getAppSuggestions()
        getTopChart()
        getTrackedApps()
    }, [])
    const [count, setCount] = useState(0);
    const [state,setState]=useState(
        {
            currentBreakpoint: "lg",
            compactType: "vertical",
            layout : [
                {i: '1', x: 0, y: 0, w: 1, h: 4},
                {i: '2', x: 1, y: 0, w: 1, h: 4},
                {i: '3', x: 0, y: 6, w: 1, h: 4},
                {i: '4', x: 1, y: 6, w: 1, h: 4}
            ]

        }

    )
    let currentTop=[];
    if(topChart.length>0){
        debugger;
        currentTop=topChart[0].apps
    }
    return (

        <Layout >

            <div style={{width:"90%",marginLeft:"2%",marginTop:"2%", height: "calc(100% * 1)", backgroundColor: "#d9f7ff",marginBottom:"2%"}}>
                <ReactGridLayout
                    className="layoutBody"
                    rowHeight={82}
                    colWidth={30}
                    items={5}
                    cols={2}
                    layout={state.layout}
                    draggableHandle=".MyDragHandleClassName"
                    draggableCancel=".MyDragCancel"
                >
                    <div className="item" key={1} >
                        <div className='MyDragHandleClassName'>
                            <h2>
                                Top Charts
                            </h2>
                        </div>
                        <center>
                            <hr className="solid" style={{width:"95%"}}/>
                        </center>
                        <div className="example" style={{width: "90%", margin: "auto", height: "90%"}}>
                        <TableContainer   >
                            <Table  aria-label="caption table">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    {currentTop.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="left" style={{width:"5px"}}>{row.id}</TableCell>
                                            <TableCell align="left">
                                                <p>
                                                    {
                                                        row.name
                                                    }
                                                </p>
                                                <p> <Flag name={row.country.toLowerCase()} /> {row.publisher}  <StarRatings
                                                    rating={row.rating}
                                                    starRatedColor="#ffd700"
                                                    numberOfStars={5}
                                                    starDimension="10px"
                                                    starSpacing="1px"
                                                    name='rating'
                                                /> (1.234) </p>

                                            </TableCell>
                                            <TableCell align="center" style={{width:"5px"}}>
                                                <div className="verticalLine">
                                                    <center style={{marginTop:"1.5vh",marginLeft:"2.5vh"}}>
                                                        {(row.rank-row.id==0)? <p style={{color:"gray"}}>{row.rank-row.id}</p>:((row.rank-row.id)<0?<p style={{color:"red"}}>
                                                            {row.rank-row.id} <span className='icon-down'></span></p>:<p style={{color:"green"}}>+{row.rank-row.id}<span className='icon-up'></span></p>)}

                                                    </center>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                    </div>
                    <div className="item" key={2} >
                        <div className='MyDragHandleClassName'>
                            <h2>
                                Tracked Apps
                            </h2>
                        </div>
                        <center>
                            <hr className="solid" style={{width:"95%"}}/>
                        </center>
                        <div class="example" style={{width:"90%",margin:"auto",height:"90%"}}>
                            <TableContainer   >
                                <Table  aria-label="caption table">
                                    <TableHead>
                                    </TableHead>
                                    <TableBody>
                                        {trackedApps.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left" style={{width:"5px"}}>{row.id}</TableCell>
                                                <TableCell align="left">
                                                    <p>
                                                        {
                                                            row.name
                                                        }
                                                    </p>
                                                    <p> <Flag name={row.country.toLowerCase()} /> {row.publisher}  <StarRatings
                                                        rating={row.rating}
                                                        starRatedColor="#ffd700"
                                                        numberOfStars={5}
                                                        starDimension="10px"
                                                        starSpacing="1px"
                                                        name='rating'
                                                    /> (1.234) </p>

                                                </TableCell>
                                                <TableCell align="center" style={{width:"5px"}}>
                                                    <div className="verticalLine">
                                                        <center style={{marginTop:"1.5vh",marginLeft:"2.5vh"}}>
                                                            {row.progress==0? <p style={{color:"gray"}}>{row.progress}</p>:(row.progress<0?<p style={{color:"red"}}>
                                                                {row.progress} <span className='icon-down'></span></p>:<p style={{color:"green"}}>+{row.progress}<span className='icon-up'></span></p>)}

                                                        </center>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <div className="item" key={3} >
                        <div className='MyDragHandleClassName'>
                            <h2>
                                App Suggestions
                            </h2>
                        </div>
                        <center>
                            <hr className="solid" style={{width:"95%"}}/>
                        </center>
                        <div  class="example" style={{width:"90%",margin:"auto"}}>
                            <TableContainer  >
                                <Table  aria-label="caption table">
                                    <TableHead>
                                    </TableHead>
                                    <TableBody>
                                        {appSuggestions.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left" style={{width:"5px"}}>{row.id}</TableCell>
                                                <TableCell align="left">
                                                    <p>
                                                        {
                                                            row.name
                                                        }
                                                    </p>
                                                    <p> <Flag name={row.country.toLowerCase()} /> {row.publisher}  <StarRatings
                                                        rating={row.rating}
                                                        starRatedColor="#ffd700"
                                                        numberOfStars={5}
                                                        starDimension="10px"
                                                        starSpacing="1px"
                                                        name='rating'
                                                    /> (1.234) </p>

                                                </TableCell>
                                                <TableCell align="center" style={{width:"5px"}}>
                                                    <div className="verticalLine">
                                                        <center style={{marginTop:"1.5vh",marginLeft:"2.5vh"}}>
                                                            {row.progress==0? <p style={{color:"gray"}}>{row.progress}</p>:(row.progress<0?<p style={{color:"red"}}>
                                                                {row.progress} <span className='icon-down'></span></p>:<p style={{color:"green"}}>+{row.progress}<span className='icon-up'></span></p>)}

                                                        </center>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>


                    <div className="item" key={4} >
                        <div className='MyDragHandleClassName'>
                            <h2>
                                Rank History
                            </h2>
                        </div>
                        <center>
                            <hr className="solid" style={{width:"95%"}}/>
                        </center>
                        <ChartContainer/>

                    </div>


                </ReactGridLayout>

            </div>


        </Layout>


    );
}
