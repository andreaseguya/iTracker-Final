"use client"
import React, { Component } from "react";
import axios from "axios";
class SearchBar extends Component {
    state = {
        assets: [],
        search: "",
        loading: false

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
            <div class="mt-3 ml-3">
                <input
                    class="  w-[350px]  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                    type='text' placeholder="Search by name" onChange={this.searchChanged} value={this.state.search} />

                <div class=" mt-3 w-[370px] flex flex-row gap-3 flex-wrap">
                    {this.state.assets
                        .filter((asset) => {
                            if (this.state.search == "") {
                                return "";
                            }
                            else if (asset.assetName.toLowerCase().includes(this.state.search.toLowerCase()))
                                return asset

                        })
                        .map((asset) => {
                            if (asset.assetName.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return (
                                    <div key={asset.id} class="">
                                        <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                        <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                    </div>
                                )
                            }
                        }

                        )

                    }
                </div>
            </div>
        );
    }
}


export default SearchBar;
