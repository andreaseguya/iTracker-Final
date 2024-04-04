"use client"
import React, { Component } from "react";
import axios from "axios";
import { useState } from "react"

class Activities extends Component {

    state = {
        assets: [],

    };

    async componentDidMount() {
        const { data: assets } = await axios.get(
            `https://65f8f806df151452461037b3.mockapi.io/Asset`
        );
        this.setState({ assets });
    }
    searchChanged = event => {

        this.setState({ search: event.target.value })
    }
    render() {
        return (
            <div>
                <input type='text' placeholder="Search" onChange={this.searchChanged} value={this.state.search} />
                <div>
                    {this.state.assets
                        .filter(asset => asset.assetName.includes(this.state.search))
                        .map((asset) => {
                            if (asset.assetName.includes(this.state.search)) {
                                return (
                                    <div key={asset.id}>
                                        <div class="w-[100px] " id="assets">
                                            <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] ">

                                            </div>
                                            <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                        </div>

                                    </div>
                                )
                            }
                        }
                            // .map((asset) => {
                            //     if(asset.assetName.includes(this.state.search)){
                            //         return(

                            //         )
                            //     }
                            //     return ''
                            // }
                            // );


                        )}
                </div>
            </div>
        );
    }
}
function SearchBar() {
    const [APIData, setAPIData] = useState([]);
}
export default Activities;