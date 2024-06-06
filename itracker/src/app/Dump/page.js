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
const LoaneeSelect = () => {
    const [Loanee, setloanee] = useState('Admin');
    const [isEditing, setIsEditing] = useState(false);
    const handleDoubleClick = () => {
        setIsEditing(true);
    }
    const handleChange = (event) => {
        setloanee(event.target.value);
    }
    const handleBlur = () => {
        setIsEditing(false);
    }
    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={Loanee}
                    onChange={handleChange}
                    onBlur={handleBlur}>

                </input>
            ) : (
                <span onDoubleClick={handleDoubleClick}>{Loanee}</span>
            )}
        </div>
    )
}
const Loanee = () => {
    const [users, setUsers] = useState([])
    const [loanee, setLoanee] = useState('');
    useEffect(() => {
        api.get(`/users`)
            .then((response) => {
                setUsers(response.data);
            })
    }, [])
    const [selectedOptions, setSelected] = useState([])
    const getOptions = async () => {
        const res = await api.get('/users')
        const data = res.data
        const options = data.map(d => ({
            "value": d.id,
            "label": d.Name
        }))
        setSelected(options)
    }
    getOptions();

    

    // const [Loanee, setloanee] = useState('Admin');
    const [isEditing, setIsEditing] = useState(false);
    const handleClick = () => {
        setIsEditing(true);
    }
    const handleChange = (event) => {
        setloanee(event.target.value);
    }
    const handle=(e)=>{
        setSelected(e)
    }
    const handleBlur = () => {
        setIsEditing(false);
    }

    return (
        <div>
            {isEditing ? (
                <div class="flex flex-row rounded-[20px] p-3 w-[300px] bg-[rgba(151,151,151,0.14)]">
                   <div class="w-[328px]">
                    <Select options={selectedOptions}
                     onChange={(e) => setSelected({ id: e.value, Name: e.label })}
                    // onChange={handle}
                    // closeMenuOnSelect={false}
                    // isMulti={true}
                      />
                </div>
                    <button onClick={handleBlur} class="ml-1 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]"> Save</button>
                </div>
            ) : (
                <div id="Loanee" class="flex flex-row rounded-[20px] p-3 w-[300px] bg-[rgba(151,151,151,0.14)]">
                    <div class="rounded-[50%] bg-[#fff] w-[70px] h-[70px]">.
                    </div>
                    <div class="ml-5 " >
                        <h1 class="text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px]
font-family: Inter;"></h1>
                        <p class="text-black text-[13px] not-italic font-medium leading-5 tracking-[-0.24px];
font-family: Inter">ITSupport@snocasino.com</p>
                        {/* <Link href="/UpdateAsset"> */}
                        <button onClick={handleClick} class=" mt-1 w-[100px] h-6 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Change</button>
                        {/* </Link> */}
                        <button class="ml-1 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Edit</button>
                    </div>

                </div>
            )}
        </div>

    )
}
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
export default function CheckOut() {
    const [APIData, setAPIData] = useState([]);
    const [quantity, setQuantity] = useState(count);
    const [searchC, setSearchCourse] = useState('');
    const [showModal, setShowModal] = useState(false);


    const LoaneeDisplay = () => {
        return users.map((res, i) => {
            if (i + 1 == id) {
                return <Loanee obj={res} key={i} />
            }
        })
    }
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

    const onSubmit = (data) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Loanee section */}
            {/* <div>{LoaneeDisplay()}</div> */}
            <Loanee />
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
