"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function AssetHelper() {
    const [APIData, setAPIData] = useState([]);
    const [id, setId] = useState(3);
    useEffect(() => {
        axios
            .get("https://65f8f806df151452461037b3.mockapi.io/Asset")
            .then(({ data }) => {
                setAPIData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const AssetDisplay = () => {
        return APIData.map((res, i) => {
            return <Assets
                obj={res} key={i} />;
        });
    };
    const DisplayByID = (id) => {
        // console.log(APIData.filter(ID, id));
        // return (
        //     APIData.filter((item))=>{

        //     }

        // )
    };

    return (
        <section>
            {DisplayByID(0)}
        </section>
    )
}

const Assets = (props) => {
    const {
        _id,
        assetName,
        AlertEmail,
        Quantity,
        minQuantity,
        status,
        Returnable,
        StorageLocation
    } = props.obj;


    return (
        <section class="ml-5 mt-5 w-[370px]">
            <Link href="./" class="float-right text-black text-l font-bold">X</Link>
            {/* Asset Header */}
            <div id="AssetHeader" class="flex flex-row rounded-[20px] p-5 w-[360px] bg-gray-300">
                <div class="rounded-[50%] bg-gray-200 w-[70px] h-[70px]">.
                </div>
                <div class="ml-5 " >
                    <h1 class="text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px]
  font-family: Inter;">{assetName}</h1>
                    <p class="text-black text-[15px] not-italic font-medium leading-5 tracking-[-0.24px];
  font-family: Inter">Last modified by Admin</p>
                    <button class=" mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white">Edit</button>
                    <button class="ml-2 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white">Delete</button>
                </div>

            </div>
            <div id="AssetMidSection" class="flex flex-row w-[360px]">
                {/* First section/ Left side */}
                <div class=" mt-2 w-[50%] h-[168px] bg-[rgba(151,151,151,0.14)] rounded-[10px]">
                    <div class=" flex flex-row w-[157px] h-[57px] rounded-[10px] bg-[#fff] m-3">
                        <button class="bg-[url(/images/LocationLogo.svg)] mt-2 ml-2 w-[37px] h-[38px]" disabled></button>
                        <div>
                            <p class=" mt-1 ml-6 text-black text-lg not-italic font-semibold leading-[normal]
  font-family: Inter;">{StorageLocation}</p>
                            <p class="ml-6 text-[#030229] text-sm not-italic font-normal leading-[normal];
  font-family: Inter;">Location</p>
                        </div>

                    </div>
                    <div class="flex flex-row">
                        <div class="w-[71px] h-[67px] rounded-[10px] bg-[#ffff] ml-3">
                            <p class="ml-2 mt-2 text-black text-base not-italic font-semibold leading-[normal];
  font-family: Inter;">Ready</p>
                            <p class="ml-2 ">{Quantity}</p>
                        </div>
                        <div class="w-[71px] h-[67px] rounded-[10px] bg-[#ffff] ml-3">
                            <p class="ml-2 mt-2 text-black text-base not-italic font-semibold leading-[normal];
  font-family: Inter;">In Kits</p>
                            <p class="ml-2 ">0</p>
                        </div>
                    </div>
                </div>
                {/* Second section/ Right side */}
                <div class=" mt-2 ml-1 w-[50%] h-[168px] bg-[rgba(151,151,151,0.14)] rounded-[10px]">
                    <div class="flex flex-row">
                        <p class="ml-3 mt-2 text-[#333] text-[12px] not-italic font-medium leading-[22px] tracking-[0.5px];
  font-family: Inter;">Date Range:</p>
                        <select class=" mt-3 ml-3 w-[67px] h-[14px] rounded-[5px]">
                        </select>
                        {/*Add chart here */}
                    </div>

                </div>
            </div>
        </section >
    )
}