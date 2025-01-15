"use client"
import React, { useEffect, useState } from 'react';
// reddux
import { useSelector } from 'react-redux';
import AddKit from './addKit';
export default function Kits() {
    const [create, setCreate] = useState(true);
    // Selecting cart from global state
    const cart = useSelector((state) => state.cart);
    // Getting the count of items
    const getItemsCount = () => {
        return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    };
    return (
        <section class="ml-3 w-[450px]">
            {/* Title,  Add Btn, Intro paragraph */}
            <div class="flex flex-row gap-[250px]">
                <h2 class="ml-6 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
                  font-family: Inter;">Kits</h2>
                {/* <Link href="/AddKit">
                    <IoIosAddCircle size={25} class="hover:fill-red-600" /></Link> */}
            </div>
            <div class="w-[330px] ml-6">
                <p class=" w-[340px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
            </div>
            {/* Search Bar for kits
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        const newSearchValue = e.target.value;
                        setSearch(newSearchValue);
                        fetchKits(newSearchValue);
                    }}
                    className="  block p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg w-[320px] bg-gray-40 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for Kits"
                />
            </div> */}
            {create ? (<div><AddKit /></div>) : (<div></div>)}

        </section>
    )
}