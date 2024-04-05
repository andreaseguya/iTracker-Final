"use client"
import SearchBar from "../AssetSearch/page";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from 'axios'
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

            <div class=" ml-5 bg-[#F8F8F8] w-[330px] rounded-[14px] mt-5 p-2  items-center">
                <h1 class=" ml-[90px] float-center text-[#2F2F2F] text-l not-italic font-normal leading-[normal];
  font-family: Inter;">Low Stock Assets</h1>
                <LowStock />
            </div>

        </section>
    )
}
function LowStock() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {

        axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset`)
            .then((response) => {
                setAPIData(response.data);
            })

    }, [])
    const setData = (data) => {
        let { assetName, Quantity, minQuantity } = data;
        localStorage.setItem('Quantity', Quantity);
        localStorage.setItem("Asset Name", assetName);
        localStorage.setItem("Minimum Quantity", minQuantity);

    }



    return (
        <div class="grid grid-cols-4 gap-4 content-between ... p-5 mb-3">
            {APIData.map((data) => {
                while (data.Quantity <= data.minQuantity) {
                    return (
                        <div key="ID" >
                            <div class="bg-[#DFDFDF] h-[62px] rounded-[50%] w-[63px]">
                                {/* Asset image */}
                            </div>
                            <p class="ml-2">{data.assetName}</p>
                            <p class="text-[#F11919] ml-2">{data.Quantity} unit</p>
                        </div>
                    )
                }

            })}
        </div>
    )
}

function CheckOut() {
    return (
        <section>

        </section>
    )
}