"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import api from '../api/assetList'
import CheckOut from "./checkOut"
import CheckIn from "./checkIn"
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
                    font-family: Inter "> Loans</h1>
            <p class="w-[350px] mb-1"> An asset can be loaned to users or locations on this page. Search for a single asset and assign it to a loanee or search for an asset to check in. </p>
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
                        <section class="mt-3">
                            <CheckOut />
                        </section></TabPanel>
                    <TabPanel><CheckIn /></TabPanel>

                </TabPanels>
            </TabGroup>
        </section>
    )
}

