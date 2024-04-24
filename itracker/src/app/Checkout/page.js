"use client"
import SearchBar from "../AssetSearch/page";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from 'axios'
import api from '../api/assetList'
export default function Check() {
    return (
        <section class="ml-5">
            <div class="  border-gray-200  dark:border-gray-700 w-[350px]">
                <div class="flex flex-row">
                    <h1 class="ml-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter; "> Loans</h1>
                    <Link href="/CheckIn" class=" pl-20 ml-20 text-sm text-red-500">
                        <p>Check in</p>
                    </Link>
                </div>
                <p class="ml-3">
                    Select an asset to checkout or check in a loaned asset by ID </p>
            </div>
            <div class="">
                <SearchBar />
            </div>

            <div class=" flex flex-row gap-2 ml-5 bg-[#F8F8F8] w-[330px] rounded-[14px] mt-5 p-2  items-center">
                {/* <h1 class=" ml-[90px] float-center text-[#2F2F2F] text-l not-italic font-normal leading-[normal];
  font-family: Inter;">Current Loans</h1> */}
                <div>
                    <h1>Current loans</h1>
                </div>
                <div>
                    <h1>Overdue loans</h1>
                </div>

            </div>

        </section>
    )
}


function CheckOut() {
    return (
        <section>

        </section>
    )
}