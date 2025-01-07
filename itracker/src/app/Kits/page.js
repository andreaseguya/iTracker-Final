"use client"
import { useRouter } from 'next/navigation';
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
export default function Kits() {
    const [kits, setKits] = useState([])
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetchKits();
    }, []);
    const fetchKits = () => async (searchValue = '') => {
        let data = await fetch(`/api/kits?search=${searchValue}`, {
            method: "GET"
        });
        data = await data.json();
        setKits(data.data);
        //if there are no kits, display an error/ empty page
    }


    return (
        <section class="w-[450px]">
            {/* Title,  Add Btn, Intro paragraph */}
            <div class="flex flex-row gap-[270px] ml-1">
                <h2 class=" text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
                  font-family: Inter;">Kits</h2>
                <Link href="/Kits/add">
                    <IoIosAddCircle size={25} class="hover:fill-red-600" /></Link>
            </div>
            <div class="w-[330px] ml-1">
                <p class=" w-[400px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
            </div>
            {/* Search Bar for kits */}
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        const newSearchValue = e.target.value;
                        setSearch(newSearchValue);
                        fetchKits(newSearchValue);
                    }}
                    className="  block p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg w-[400px] bg-gray-40 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for Kits"
                />
            </div>


        </section>
    )
}