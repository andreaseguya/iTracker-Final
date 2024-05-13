"use client"
// import SearchBar from "../AssetSearch/page";
import React, { Component } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import api from '../api/assetList'
export default function Check() {
    return (
        <section class="w-[350px] ml-3">
            <div class="flex flex-row">
                <h1 class=" text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
                    font-family: Inter; "> Loans</h1>
                {/* <p class=" pl-20 ml-[110px] text-sm text-red-500 hover:text-black">Check in</p> */}

            </div>
            <div >
                <p class="w-[350px]">
                    An asset can be loaned to users or locations on this page. Search for a single asset and assign it to a loanee. Use the calendar in the admin page to view all reservations </p>
                <div class="mt-2 w-[320px]">
                    {/* <SearchBar /> */}
                </div>
                <div>
                    <TabGroup>
                        <TabList>
                            <Tab className=" rounded-[5px] data-[selected]:bg-black data-[selected]:text-white data-[hover]:underline">
                                <button class=" hover:text-white hover:bg-black rounded-[5px] w-[110px]">Check out</button>
                            </Tab>
                            <Tab className="rounded-[5px] ml-[120px] data-[selected]:bg-black data-[selected]:text-white data-[hover]:underline">
                                <button class=" hover:text-white hover:bg-black rounded-[5px] w-[110px]">Check in</button>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel><section>
                            </section></TabPanel>
                            <TabPanel>2</TabPanel>

                        </TabPanels>
                    </TabGroup>

                </div>
            </div>

        </section>
    )
}



function checkOut(props) {
    const {
        id,
        assetName,
        AlertEmail,
        Quantity,
        minQuantity,
        status,
        Returnable,
        StorageLocation
    } = props.obj;
    return (
        <section>
            <p class="text-black">2</p>
            <form>

            </form>
        </section>
    )
}

function checkIn(props) {
    return (
        <section>
            <p class="text-black">2</p>
        </section>
    )
}

class SearchBar extends Component {
    state = {
        assets: [],
        search: "",
        loading: false

    };

    async componentDidMount() {
        const { data: assets } = await api.get('/assets'
        );
        this.setState({ assets });
    }
    searchChanged = event => {
        this.setState({ search: event.target.value })
    }
    render() {
        return (
            <div class="">
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
                                        <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] ">
                                            {/* <Selected />  */}
                                        </div>
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