"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import api from '../api/assetList'
export default function Check() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await api.post("/Loans", data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const [users, setUsers] = useState([]);
    return (
        <section class="w-[350px] ml-3">
            <h1 class=" text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
                    font-family: Inter; "> Loans</h1>
            <p class="w-[350px] mb-1"> An asset can be loaned to users or locations on this page. Search for a single asset and assign it to a loanee. The cart displays picked assets. </p>
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
                    <TabPanel>
                        <section>
                            <form>
                                <div class="mt-2">
                                    {/* <input class="  w-[350px]  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                                                type="search" placeholder="Search for asset to checkout"></input> */}
                                    {/* <SearchBar /> */}

                                </div>

                            </form>
                        </section></TabPanel>
                    <TabPanel>2</TabPanel>

                </TabPanels>
            </TabGroup>
        </section>
    )
}

