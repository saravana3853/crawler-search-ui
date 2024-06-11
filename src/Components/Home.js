// Home.js

import React, { useState, useEffect,ChangeEvent } from 'react';
import ReactSearchBox from "react-search-box";
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";

const columns = [
        {
          field: "id",
          headerName: "Id",
          headerClassName : "px-3 py-3 bg-amber-800 text-white  shadow-lg",
          width: 70,
          renderCell: (params) => {
                        return (
                                <>
                                        <div className=" h-full w-full">
                                         {params.value}
                                        </div>
                                </>
                        );
                },
        },
        {
          field: "rank",
          headerName: "Rank",
          width: 100,
          headerClassName : "px-3 py-3 bg-amber-800 text-white shadow-lg",
          renderCell: (params) => {
                        return (
                                <>
                                        <div className=" h-full w-full">
                                         {params.value}
                                        </div>
                                </>
                        );
                },
        },
        {
          field: "title",
          headerName: "Y Combinator News",
          width: 500,
          headerClassName : "px-3 py-3 bg-amber-800 text-white shadow-lg",
          renderCell: (params) => {
                        return (
                                <>
                                        <div className=" h-full w-full">
                                         {params.value}
                                        </div>
                                </>
                        );
                },
        },
        { 
          field: "domain",
          headerName: "Domain",
          width: 550,
          headerClassName : "px-3 py-3 bg-amber-800 text-white shadow-lg",
          renderCell: (params) => {
                        return (
                                <>      
                                        <div className=" h-full w-full">
                                         {params.value}
                                        </div>
                                </>
                        );
                },
        }
       ];



const HomePage = () => {

        const [resp, setResp] = useState([]);
        const [data, setData] = useState([]);
        const [showResult,setShowResult] = useState(false);
        const [inputText, setInputText] = useState("");

        const handleChange = (e) => {
             console.log(e.target.value);
             setInputText(e.target.value);
        };        

        const onButtonClick = () => {
               const searchUrl = 'http://127.0.0.1:5000/search'
               console.log(inputText)
               let data = JSON.stringify({
                       "query": inputText
               });

               let config = {
                       method: 'post',
                       maxBodyLength: Infinity,
                       url: searchUrl,
                       headers: {
                        'Content-Type': 'application/json'
                       },
                       data : data,
               };

               axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
               axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
               axios.request(config)
              .then((response) => {
                  console.log("Successful Search Response");
                  setResp(response.data);
                  setShowResult(true);
                  console.log(resp);
               })
              .catch((error) => {
                   console.log('Error in search');
                   console.log(error);
              });
         };

        return (
            <div id="home" className="w-full min-h-screen p-8 flex-col items-center bg-gradient-to-b from-white to-gray-400">
               <h1 className="text-orange-500 text-3xl"> Y Combinator Search </h1>
               <div className="max-w-7xl mx-auto md:flex md:flex-row md:items-center p-12">
                  <div className="md:w-3/4">
                        <input className="w-full rounded-full shadow-lg" value={inputText} onChange={handleChange} />
                  </div>
                  <div className="md:w-1/4 md:pl-2">
                       <button className="px-3 py-3 w-full bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900" onClick={onButtonClick}>
                                    Search
                        </button>
                  </div>
               </div>
               <div className="mx-auto md:items-center  md:flex max-w-7xl p-12">
                    { showResult ? 
                    <DataGrid rows={resp} columns={columns}  getRowHeight={() => 'auto'} getRowClassName={(params) => {
                                console.log(params)
                                return "bg-gradient-to-b from-white to-gray-400 text-wrap";
                         }} /> : null }
               </div>
           </div>
      );
};

export default HomePage;

