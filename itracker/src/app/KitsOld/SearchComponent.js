"use client"
import React, { useState, useEffect } from 'react';
// import axios from 'axios'
import api from '../api/assetList'
function SearchComponent({ searchCourse, courseSearchUserFunction, addCourseToCartFunction }) {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await api.get('/assets');
                setAPIData(response.data);
            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range 
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }
        fetchAssets();
    }, [])
    return (
        <section class="" id="App-header" >
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search and add assets to your kit"
                    value={searchCourse}
                    onChange={courseSearchUserFunction}
                    class="mt-2 w-[320px]  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                />
            </div>
            <div class=" mt-3 w-[370px] flex flex-row gap-3 flex-wrap">
                {APIData
                    .filter((asset) => {
                        if (searchCourse == "") {
                            return "";
                        }
                        else if (asset.assetName.toLowerCase().includes(searchCourse.toLowerCase()))
                            return asset

                    })
                    .map((asset) => {
                        if (asset.assetName.toLowerCase().includes(searchCourse.toLowerCase())) {
                            return (
                                <div key={asset.id} class="">
                                    <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                    <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                    <button
                                        className="add-to-cart-button"
                                        onClick={() => addCourseToCartFunction(asset)}
                                    >
                                        Add to Kit
                                    </button>
                                </div>
                            )
                        }
                    }

                    )

                }
            </div>
        </section>
    );
}


export default SearchComponent;
