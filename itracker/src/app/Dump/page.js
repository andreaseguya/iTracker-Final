"use client"
import React, { createContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useFieldArray, Controller, useForm } from "react-hook-form"
import api from '../api/assetList'
function Dump(props) {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            Loanee: "",
            dueDate: "",
            Returnable: true,
            cart: [],
            Staff: ""
        },
    })
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "cart"
    })
    // Submit your data into Redux store
    //   const onSubmit = (data) => props.updateAction(data)
    const onSubmit = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("Loanee")} />
            <input {...register("dueDate")} />
            <input {...register("Loanee")} />
            <input {...register("dueDate")} />
            <input type="submit" />
        </form>
    )
}
let count = 1;

export default function CartControls() {
    const [APIData, setAPIData] = useState([]);
    const [quantity, setQuantity] = useState(count);
    const [searchC, setSearchCourse] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [Loanee, setloanee] = useState('Admin');

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
            cartAssets: [{ assetName: "test" }]
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
    const LoaneeEdit = ({ loanee, setLoanee }) => {
        const [editingValue, setEditingValue] = useState(loanee);
        const onChange = (event) => setEditingValue(event.target.value);
        const onKeyDown = (event) => {
            if (event.key === "Enter" || event.key === "Escape") {
                event.target.blur();
            }
        }
        const onBlur = (event) => {
            if (event.target.value.trim() === "") {
                setLoanee(loanee);
            } else {
                setLoanee(event.target.value)
            }
        }

        return (
            <input
                type="text"
                aria-label="Loanee name"
                value={editingValue}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
            />
        )
    }
    const onSubmit = (data) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <LoaneeEdit loanee={Loanee} setLoanee={setloanee} />
            </div>
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
                                    <button onClick={closeModal} class="ml-5 mt-5">
                                        <AiOutlineClose size={24} class="fill-[#000] hover:fill-red-600" />
                                    </button>
                                    <div class="flex flex-row gap-4">
                                        {fields.map((item, index) => (
                                            <div key={item.id}>
                                                <div class="w-[121px] h-[102px] bg-[#F6F7FC] rounded-[10px]"></div>
                                                <p>{item.assetName}</p>
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
            {/* Append and reset functionality */}
            <section>
                <button
                    class="mr-2"
                    type="button"
                    onClick={() => {
                        append({ assetName: "", Quantity: 1 });
                    }}
                >
                    append
                </button>

                <button
                    type="button"
                    onClick={() =>
                        reset({
                            cartAssets: [{ assetName: "newAsset" }]
                        })
                    }
                >
                    reset
                </button>
            </section>

            <input type="submit" />
        </form>
    );
}
