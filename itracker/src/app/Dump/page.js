"use client"
import React, { createContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
// import { FaRegUserCircle } from "react-icons/fa";
import Select from "react-select";
import { BsCart4 } from "react-icons/bs";
import { useFieldArray, Controller, useForm } from "react-hook-form"
import api from '../api/assetList'
let count = 1;

const Loan = (props) => {
    const {
        _id,
        loaneeName,
        loaneeEmail,
        staffAssigned,
        dueDate,
        assets,
        indefinite
    } = props.obj
    return (
        <div></div>
    )
}
function Search({ searchL, searchU, setAsL }) {
    const [users, setUsers] = useState([]);
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
    return (
        <div>
            {/* Search Bar */}
            <input type="text"
                class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                value={searchL}
                onChange={searchU}
                placeholder="Search for user or location"></input>
            {/* Results */}
            <div>
                {users
                    .filter((user) => {
                        if (searchL == "") {
                            return "";
                        }
                        else if (user.Name.toLowerCase().includes(searchL.toLowerCase()))
                            return user
                    })
                    .map((user) => {
                        if (user.Name.toLowerCase().includes(searchL.toLowerCase())) {
                            return (
                                <div key={user.id} class="ml-2 mt-2">
                                    <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                    <h1 class="ml-3 mt-0.5 w-[70px]">{user.Name}</h1>
                                    <button
                                        className="mt-3 ml-2 w-[100px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                        onClick={() => setAsL(user)}
                                    >
                                        Select
                                    </button>
                                </div>
                            )
                        }
                    })
                }

            </div>
        </div>
    )
}
function Loanee({ users, setLoanee }) {
    const [searchLoanee, setSearchLoanee] = useState('');
    const [editing, setIsEditing] = useState(false);

    const searchUser = (event) => {
        setSearchLoanee(event.target.value)
    }
    const setAsLoanee = (item) => {
        alert("Loanee has been updated. Click save to go back")

        setLoanee([item])
    }
    const ChangeLoanee = () => {
        setIsEditing(true);
    }
    const SaveLoanee = () => {
        setIsEditing(false)
    }

    return (
        <div>
            {editing ? (
                <div class="flex flex-row">
                    <Search searchL={searchLoanee} searchU={searchUser} setAsL={setAsLoanee} />
                    <button onClick={SaveLoanee} class=" ml-2 w-[50px] h-9 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Save</button>
                </div>
            ) : (
                <div>
                    {users.map((loanees, index) => {
                        if (index == 0) {
                            return (
                                <div class="flex flex-row rounded-[20px] p-3 w-[300px] bg-[rgba(151,151,151,0.14)]">
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
                </div>
            )}
        </div>
    )
}
export default function CheckOut() {
    const [APIData, setAPIData] = useState([]);
    const [quantity, setQuantity] = useState(count);
    const [searchC, setSearchCourse] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [Loan, setLoan] = useState([]);
    //setUsers now contains only one Loanee at a time
    const [users, setUsers] = useState([]);
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
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };

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
    const PostData = async (e) => {
        alert("Processing Loan...")
        //hideForm(true)
        e.preventDefault();
        const id = Loan.length;
        const newLoan = { id, cartAssets, users }
        try {
            const res = await api.post('/loans', newLoan);
            const allLoans = [...Loan, res.data];
            setLoan(allLoans)
        }
        catch (err) {
            console.log(`Failed to post to API Error: ${err.message}`);
        }

    }
    const onSubmit = (data) => {
        console.log("loanee:", users);
        console.log("cart:", data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Loanee users={users} setLoanee={setUsers} />
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            <div class="flex flex-row ">
                <div class="px-1 border-r-2" >
                    <p>Due date</p>
                    <input type="date" {...register("dueDate")}></input>
                </div>
                <div class="px-3 ">
                    <p>Indefinite Loan</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox"{...register("Indefinite")} value="" class="sr-only peer" />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                        {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                    </label>
                </div>
            </div>
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            {/* Search */}
            <div class="flex flex-row  gap-4">
                <input
                    type="text"
                    class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                    placeholder="Search and add assets to check out"
                    value={searchC}
                    onChange={courseSearchUserFunction}
                />
                <button onClick={toggleModal}><BsCart4 size={24} class="hover:fill-red-600" /></button>
            </div>
            {/* Cart  */}
            <div class=" mt-3 w-[300px] flex flex-row gap-3 flex-wrap">
                {APIData
                    .filter((asset) => {
                        if (searchC == "") {
                            return "";
                        }
                        else if (asset.assetName.toLowerCase().includes(searchC.toLowerCase()))
                            return asset

                    })
                    .map((asset) => {
                        if (asset.assetName.toLowerCase().includes(searchC.toLowerCase())) {
                            return (
                                <div key={asset.id} class="">
                                    <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                    <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                    <button
                                        className="mt-3 ml-2 w-[50px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                        onClick={() => {
                                            append(asset);
                                            alert("Asset Added! Check shopping cart for full list of selected assets")
                                            setQuantity(count);
                                        }}
                                    // onClick={() => {
                                    //     append({ assetName: "", Quantity: 1 });
                                    // }}
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
                                    <button onClick={closeModal} class="ml-5 mt-5">
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


            <input type="submit" />
        </form>
    );
}
