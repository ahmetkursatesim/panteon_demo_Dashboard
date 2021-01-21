import React, { useReducer } from "react";
import userContext from "./context";
import Reducer from "./reducer";
import {
    POST_APP_SUGGESTIONS,
    POST_TOP_CHARTS,
    POST_TRACKED_APPS,
    POST_RANK_HISTORY
} from "./values";
const Context = props =>{

    let initialState ={
        appSuggestions:[],
        topChart:[],
        trackedApps:[],
        rankHistory:[]


    }
    const [state, dispatch] = useReducer(Reducer, initialState);
     async function getAppSuggestions(){
         fetch('dataset/appSuggestions.json'
             ,{
                 headers : {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json'
                 }
             }
         )
             .then(function(response){
                 console.log(response)
                 return response.json();
             })
             .then(function(myJson) {
                 dispatch({
                     type: POST_APP_SUGGESTIONS,
                     payload:myJson.appSuggestions
                 });

             });
    }

    async function getTopChart(){
        fetch('dataset/topChart.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                dispatch({
                    type: POST_TOP_CHARTS,
                    payload:myJson.topChart
                });

            });
    }
    async function getRankHistory(){


        fetch('dataset/topChart.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                let dataTmp=[]
                let tmpData={}
                myJson.topChart.forEach(function (d2){
                    d2.apps.forEach(function (d3){
                        if(!tmpData.hasOwnProperty(d3.name)){
                            tmpData[d3.name]=[{date:d2.date,rank:d3.rank}]
                        }else{
                            let tmp=tmpData[d3.name]
                            let pos = tmp.findIndex(i => i.date === d2.date);
                            if(pos !==-1){

                                if(tmp[pos].rank>d3.rank){
                                    tmp[pos]={date:d2.date,rank:d3.rank}
                                }
                            }else{
                                tmp.push({date:d2.date,rank:d3.rank})
                            }
                            tmpData[d3.name]=tmp
                        }

                    })
                })

                Object.keys(tmpData).forEach(function(key) {

                    let dataApp=[]
                    tmpData[key].forEach(function(d){
                        dataApp.push(d)
                    })
                    dataTmp.push({name:key,values:dataApp})
                });


                dispatch({
                    type: POST_RANK_HISTORY,
                    payload: dataTmp
                });

            });
    }



    async function getTrackedApps(){
        fetch('dataset/trackedApps.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                dispatch({
                    type: POST_TRACKED_APPS,
                    payload:myJson.trackedApps
                });

            });
    }
    return (
        <userContext.Provider value={{
            appSuggestions: state.appSuggestions,
            topChart:state.topChart,
            trackedApps:state.trackedApps,
            rankHistory:state.rankHistory,
            getAppSuggestions,
            getTopChart,
            getTrackedApps,
            getRankHistory

        }}>
            {props.children}
        </userContext.Provider>
    );
};

export default Context;
