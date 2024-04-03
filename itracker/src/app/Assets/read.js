
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [assetID, setAssetID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    let counter = 1;
    if (assetID != null) {
        console.log("AssetID: ", assetID);
    }
    function increment() {
        counter = counter + 1;
        return counter;
    }
    useEffect(() => {
        axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset?page=${currentPage}&limit=${itemsPerPage}`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [currentPage, itemsPerPage])


    const setData = (data) => {
        let { ID, assetName, AlertEmail, checkbox } = data;
        localStorage.setItem('ID', ID);
        localStorage.setItem("Asset Name", assetName);
        localStorage.setItem("Alert Email", AlertEmail);
        localStorage.setItem("Checkbox", checkbox);

    }
    const totalPages = Math.ceil(APIData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = APIData.slice(startIndex, endIndex);

    return (
        <section class=" w-[365px]">

            <div class="flex flex-row flex-wrap">
                {APIData.map((data) => {
                    return (
                        <div key="ID" class="mx-2 my-2">
                            <div class="w-[104px] h-[102px] bg-[#F6F7FC] rounded-[10px]">
                                {/* <input type="checkbox" class="w-[20px] m-2 float-right rounded-[10px] " checked={isChecked} onChange={handleChange} ></input> */}
                                <DisplayAsset />

                            </div>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.assetName}</p>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.Quantity} unit(s)</p>
                        </div>
                    )
                })}
                <div class="mt-5 ml-5">
                    <button class="mr-3" onClick={(e) => setCurrentPage(counter + 1)}> next page</button>
                    <button onClick={(e) => setCurrentPage(counter)}> previous page</button>
                </div>
            </div>



        </section>
    )
}

const DisplayAsset = () => {
    const [display, setDisplay] = useState(false);
    return (
        <div>
            {display ? (
                <div></div>
            ) : (
                < Link href="/AssetDetails" >
                    <button
                        onClick={(e) => setDisplay(true)}
                        class="fill-[#979797] w-[20px] m-2 float-right bg-[url(/images/edit.svg)] bg-no-repeat bg-center h-[20px]">
                    </button>
                </Link >
            )}
        </div>

    )
}



