"use client"
import SearchBar from "../AssetSearch/page";
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
                            <TabPanel><checkOut /></TabPanel>
                            <TabPanel><Search /></TabPanel>

                        </TabPanels>
                    </TabGroup>

                </div>
            </div>

        </section>
    )
}
function Search() {

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
            <form>

            </form>
        </section>
    )
}
function checkIn(props) {
    return (
        <section>

        </section>
    )
}