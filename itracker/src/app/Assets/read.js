
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartData = {
    // labels: ['In', 'Out', 'Kits'],
    datasets: [
        {
            label: '# of Assets',
            data: [5, 1, 3],
            backgroundColor: [
                'rgb(133,147,237)',
                'rgb(199,206,255)',
                'rgb(90,106,207)'
            ]


        }
    ]
}
export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(3);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    let counter = 1;

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
    const handleNextPage = () => {
        return APIData.map((res, i) => {
            if (i + 1 == id) {
                return <Assets
                    obj={res} key={i} />;
            }
        });
    }
    const totalPages = Math.ceil(APIData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = APIData.slice(startIndex, endIndex);
    const AssetDisplay = () => {
        return APIData.map((res, i) => {
            if (i + 1 == id) {
                return <Assets
                    obj={res} key={i} />;
            }
        });
    };


    return (
        <section class=" w-[365px]">

            <div class="flex flex-row flex-wrap">
                {APIData.map((data) => {
                    return (
                        <div key="ID" class="mx-2 my-2">
                            <div class="w-[104px] h-[102px] bg-[#F6F7FC] rounded-[10px]" onClick={(e) => setId(data.id)}>
                                <button onClick={toggleModal} class="fill-[#979797] w-[20px] m-2 float-right bg-[url(/images/edit.svg)] bg-no-repeat bg-center h-[20px]">
                                </button>
                            </div>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.assetName}</p>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.Quantity} unit(s)</p>
                        </div>
                    )
                },)}
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            class=" fixed inset-0 z-50  bg-black bg-opacity-50 "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                class="bg-[#fff] w-[450px] ml-5 p-5  mt-5 rounded-[20px]"
                                initial={{ y: '100vh', opacity: 0 }}
                                animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.5 } }}
                                exit={{ y: '100vh', opacity: 0, transition: { type: 'spring', stiffness: 100, damping: 20, duration: 2 } }}
                            >
                                <div>
                                    <button onClick={closeModal} class="ml-5 mt-5">
                                        <AiOutlineClose size={24} class="fill-[#000] hover:fill-red-600" />
                                    </button>
                                </div>
                                <div class="mb-10">
                                    {AssetDisplay()}
                                </div>

                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
            <div class="mt-5 ml-5">
                <button class="mr-3" onClick={(e) => setCurrentPage(counter)} > previous</button>
                <button onClick={(e) => setCurrentPage(counter + 1)}> next </button>

            </div>



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
    const setData = (data) => {
        let { id, assetName, alertEmail, Quantity, minQuantity, Location } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Asset Name', assetName);
        localStorage.setItem('Alert Email', alertEmail);
        localStorage.setItem('Quantity', Quantity);
        localStorage.setItem('Minimum Quantity', minQuantity);
        localStorage.setItem('Location', Location);

    }

    return (
        <section class="ml-5 mt-5 w-[370px]">

            {/* Asset Header */}
            <div id="AssetHeader" class="flex flex-row rounded-[20px] p-5 w-[360px] bg-[rgba(151,151,151,0.14)]">
                <div class="rounded-[50%] bg-[#fff] w-[70px] h-[70px]">.
                </div>
                <div class="ml-5 " >
                    <h1 class="text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px]
  font-family: Inter;">{assetName}</h1>
                    <p class="text-black text-[15px] not-italic font-medium leading-5 tracking-[-0.24px];
  font-family: Inter">Last modified by Admin</p>
                    <Link href="/UpdateAsset">
                        <button onClick={() => setData()} class=" mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Edit</button>
                    </Link>
                    <button class="ml-2 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Delete</button>
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
                    <div class=" ml-7 w-[100px]">
                        <Doughnut data={ChartData} />
                        <div class="flex flex-row mt-2 gap-8 ml-3 ">
                            <div class="w-[9px] h-[9px] bg-[#5A6ACF] rounded-[50%]"></div>
                            <div class="w-[9px] h-[9px] bg-[#8593ED] rounded-[50%]"></div>
                            <div class="w-[9px] h-[9px] bg-[#C7CEFF] rounded-[50%]"></div>
                        </div>
                        <div class="flex flex-row mt-1 gap-7 ml-2 ">
                            <p class="text-[#121212] text-xs not-italic font-normal leading-3 tracking-[0.5px];
             font-family: Inter">In</p>
                            <p class="text-[#121212] text-xs not-italic font-normal leading-3 tracking-[0.5px];
             font-family: Inter">Out</p>
                            <p class="text-[#121212] text-xs not-italic font-normal leading-3 tracking-[0.5px];
             font-family: Inter">Kits</p>
                        </div>
                    </div>

                </div>
            </div>
            <div id="LastSection">
                <h1 class="ml-3 mt-3 w-[182px] text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px];
  font-family: Inter;">Loans</h1>
                <button class=" -mt-6 mr-2 float-right text-base hover:text-red-500">Check in</button>
                {/* Loans populate here */}
                <div class=" mt-3 flex w-[375px] h-[1px] bg-gray-200"></div>
                <div class="w-[343px] ">
                    <h2 class="ml-3 mt-3">No current loans</h2>
                </div>
                <div class=" mt-3 flex w-[375px] h-[1px] bg-gray-200"></div>
                <div class="mt-5 ml-3 flex flex-row">
                    <h2 class=" text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Low Stock Email:</h2>
                    <h2 class="ml-3 text-black text-[15px] not-italic font-normal leading-4 tracking-[-0.41px];
  font-family: Inter;">{AlertEmail}@snocasino.com</h2>
                </div>
                <div class="mt-5 ml-3 flex flex-row">
                    <h2 class=" text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Minimum Quantity:</h2>
                    <h2 class="ml-3 text-black text-[15px] not-italic font-normal leading-4 tracking-[-0.41px];
  font-family: Inter;">{minQuantity} units </h2>
                </div>
                <div>


                </div>
            </div>

        </section >
    )
}
