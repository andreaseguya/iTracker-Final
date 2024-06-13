"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useFieldArray, useForm } from "react-hook-form"
import api from '../api/assetList'
let count = 1
// TODO: Adjust quantity after checkout
export default function Loans() {
    // Loanee Controls & Search
    const [users, setUsers] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const [APIData, setAPIData] = useState([]);
    const [editing, setIsEditing] = useState(false);
    const [searchAsset, setSearchAsset] = useState('')
    const [searchLoanee, setSearchLoanee] = useState('');
    const [showModal, setShowModal] = useState(false);
    const increment = () => {

        setQuantity(quantity + 1)
    }
    const searchHelper = (event) => {
        setSearchAsset(event.target.value)
    }
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const [loanee, setLoanee] = useState([{
        "id": "0",
        "Name": "No Loanee",
        "AlertEmail": "ITSupport",
        "Badge#": "0000",
        "Department": "IT"
    }]);
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await api.get('/assets');
                setAPIData(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }
        fetchAssets();
    }, [])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }
        fetchUsers();
    }, [])

    const searchUser = (event) => {
        setSearchLoanee(event.target.value)
    }
    const setAsLoanee = (item) => {
        alert("Loanee has been updated. Click save to go back")
        console.log("current loanee: ", item)
        setLoanee([item])
    }

    const ChangeLoanee = () => {
        setIsEditing(true);
    }
    const SaveLoanee = () => {
        setIsEditing(false)
    }
    const { register, control, unregister, handleSubmit, reset, watch, errors } = useForm({
        defaultValues: {
            cartAssets: [],
        }
    })
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "cartAssets"
    });
    const watchIndefinite = watch("Indefinite")
    useEffect(() => {
        if (watchIndefinite) {
            register("dueDate")
        } else {
            unregister("dueDate")
        }
    }, [register, unregister, watchIndefinite])
    //TODO:Debating whether to use async
    const onSubmit = async (data) => {
        // data.preventDefault();
        // console.log("loanee:", loanee);
        // console.log("cart:", data);

        alert("Items have been checked out.")
        const newLoan = { loanee, data }
        try {
            const res = await api.post("/loans", newLoan);
        }
        catch (err) {
            alert(`Error posting to server: ${err.message}`);
        }
    }
    return (
        <div>
            {/* Loanee search controls */}
            {editing ? (
                <div class="" >
                    {/* Search Bar */}
                    <div class="flex flex-row rounded-[20px] p-3 w-[320px] bg-[rgba(151,151,151,0.14)]">
                        <input class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                            value={searchLoanee} onChange={searchUser} setAsL={setAsLoanee}></input>
                        <button type="button" onClick={SaveLoanee} class=" ml-2 w-[50px] h-9 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Save</button>
                    </div>

                    {/* Results */}
                    <div>
                        {users
                            .filter((user) => {
                                if (searchLoanee == "") {
                                    return "";
                                }
                                else if (user.Name.toLowerCase().includes(searchLoanee.toLowerCase()))
                                    return user
                            })
                            .map((user) => {
                                if (user.Name.toLowerCase().includes(searchLoanee.toLowerCase())) {
                                    return (
                                        <div key={user.id} class="ml-2 mt-2">
                                            <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                            <h1 class="ml-3 mt-0.5 w-[70px]">{user.Name}</h1>
                                            <button
                                                type="button"
                                                className="mt-3 ml-2 w-[100px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                                onClick={() => setAsLoanee(user)}
                                            >
                                                Select
                                            </button>
                                        </div>
                                    )
                                }
                            })
                        }

                    </div>

                </div>) : (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Loanee section */}
                        {loanee.map((loanees, index) => {
                            if (index == 0) {
                                return (
                                    <div key="id" class="flex flex-row rounded-[20px] p-3 w-[300px] bg-[rgba(151,151,151,0.14)]">
                                        <div class="rounded-[50%] bg-[#fff] w-[70px] h-[70px]">.</div>
                                        <div class="ml-5">
                                            <h1 class=" text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px]
                                font-family: Inter;">{loanees.Name}</h1>
                                            <p class="text-black text-[13px] not-italic font-medium leading-5 tracking-[-0.24px];
                                font-family: Inter">{loanees.AlertEmail}@snocasino.com</p>
                                            {/* <Link href="/UpdateAsset"> */}
                                            <button type="button" onClick={ChangeLoanee} class=" mt-1 w-[100px] h-6 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]" type="button">Change</button>
                                            {/* </Link> */}
                                            <button type="button" class="ml-1 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]" type="button">Edit</button>
                                        </div>

                                    </div>
                                )
                            }
                        })}
                        {/* search bar */}
                        <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
                        <div class="flex flex-row  gap-4">
                            <input
                                type="text"
                                class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                                placeholder="Search and add assets to check out"
                                value={searchAsset}
                                onChange={searchHelper}
                            />
                            <button type="button" onClick={toggleModal}><BsCart4 size={24} class="hover:fill-red-600" /></button>
                        </div>
                        {/* Cart */}
                        <div class=" mt-3 w-[300px] flex flex-row gap-3 flex-wrap">
                            {APIData
                                .filter((asset) => {
                                    if (searchAsset == "") {
                                        return "";
                                    }
                                    else if (asset.assetName.toLowerCase().includes(searchAsset.toLowerCase()))
                                        return asset

                                })
                                .map((asset) => {
                                    if (asset.assetName.toLowerCase().includes(searchAsset.toLowerCase())) {
                                        return (
                                            <div key={asset.id} class="">
                                                <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                                <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                                {/* <h1 class="ml-3 mt-0.5 w-[70px]">{quantity}</h1> */}
                                                <button
                                                    type="button" className="mt-3 ml-2 w-[50px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                                    onClick={() => {
                                                        append(asset);
                                                        alert("Asset Added! Check shopping cart for full list of selected assets")
                                                        setQuantity(count);
                                                    }}

                                                >
                                                    Add
                                                </button>
                                            </div>
                                        )
                                    }
                                }
                                )
                            }
                        </div>
                        {/* Cart Animations */}
                        <div>
                            <AnimatePresence>
                                {showModal && (
                                    <motion.div>
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
                                                <button type="button" onClick={closeModal} class="ml-5 mt-5">
                                                    <AiOutlineClose size={24} class="fill-[#000] hover:fill-red-600" />
                                                </button>
                                                <div class="flex flex-row gap-4">
                                                    {fields.map((item, index) => (
                                                        <div key={item.id}>
                                                            <div class="w-[121px] h-[102px] bg-[#F6F7FC] rounded-[10px]"></div>
                                                            <p>{item.assetName}</p>
                                                            <p>{quantity}</p>
                                                            {/* <div class="flex flex-row gap-2">
                                                <input
                                                    class=" w-[122px] bg-[#F6F7FC] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-xs px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                                                    type="number"
                                                    placeholder="Enter Quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItemQuantity(item.id, e.target.value)}
                                                />
                                            </div> */}
                                                            <div>
                                                                <button type="button" onClick={() => remove(index)} className="mt-3 ml-2 w-[100px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1" >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
                        {/* Due Dates */}
                        <div class="flex flex-row ">
                            <div class="px-2 ">
                                <p>Returnable </p>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox"{...register("Indefinite")} value="" class="sr-only peer" />
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                                    {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                                </label>
                            </div>
                            {watchIndefinite ? (
                                <div class="px-3 border-l-2" >
                                    <p>Due date</p>
                                    <input type="date" {...register("dueDate")}></input>

                                </div>
                            ) : null}
                        </div>
                        {/* Staff Assigned */}
                        <div class="mt-1 flex w-[300px] h-[1px] bg-gray-200 mb-1"></div>
                        <div class="flex flex-row ml-4">
                            <p class="mt-2 mr-2">Staff Assigned:</p>
                            <div class=" flex flex-row flex-wrap p-3 w-[160px] h-[42px] rounded-[6px] bg-[rgba(151,151,151,0.14)]">
                                <p class=" text-sm">Andrea Seguya</p>
                                <div class="ml-3 float-right">
                                    <FaRegUserCircle size={22} fill="grey" />
                                </div>
                            </div>
                        </div>
                        <div class="mt-1 flex w-[300px] h-[1px] bg-gray-200 mb-1"></div>
                        {/* Submit button */}
                        <div class="flex flex-row gap-5">
                            {/* <button type="button" onClick={() => reset()} class=" mt-1 w-[120px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Reset</button> */}
                            <button type="submit" class=" mt-1 w-[150px] ml-[150px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Finish checkout</button>
                        </div>

                    </form>


                </div>
            )}
        </div>
    )
}