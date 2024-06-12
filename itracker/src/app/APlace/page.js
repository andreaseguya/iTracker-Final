"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCart4 } from "react-icons/bs";
import { useFieldArray, Controller, useForm } from "react-hook-form"
import api from '../api/assetList'

export default function Loans() {
    // Loanee Controls & Search
    const [users, setUsers] = useState([]);
    const [loanID,setLoanID]=useState(0)
    const [quantity,setQuantity]=useState(1)
    const [APIData, setAPIData] = useState([]);
    const [editing, setIsEditing] = useState(false);
    const [searchLoanee, setSearchLoanee] = useState('');
   const increment =()=>{

   }
    const [loanee, setLoanee] = useState([  {
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
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            cartAssets: []
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
    const onSubmit = (data) => {
        console.log("loanee:", finalLoanee);
        console.log("cart:", data);
        const newLoan={}
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
                        <button onClick={SaveLoanee} class=" ml-2 w-[50px] h-9 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Save</button>
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
                                        <button onClick={ChangeLoanee} class=" mt-1 w-[100px] h-6 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Change</button>
                                        {/* </Link> */}
                                        <button class="ml-1 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Edit</button>
                                    </div>

                                </div>
                            )
                        }
                    })}
                    </form>
                    
                    
                </div>
            )}
        </div>
    )
}