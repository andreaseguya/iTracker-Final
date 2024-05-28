"use client"
import React, { createContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCart4 } from "react-icons/bs";
import api from '../api/assetList'
export default function CheckOut() {
    const [loanee, setLoanee] = useState('');
    const [due, setDue] = useState();
    const [indefinite, setIndefinite] = useState(false);

    return (
        <section class="flex flex-row gap-2">
            <div>
                <div class="flex flex-row">
                    <div class="rounded-full"></div>
                </div>
            </div>
            <CartProvider>
                <div class="mt-1">
                    <Cart />
                </div>

            </CartProvider>
        </section>
    )
}
function AddLoanee() {
    const [changeLoanee, setChangeLoanee] = useState('');
    const [show, setShow] = useState(false)
    return (
        <div>

        </div>
    )
}
const CartContext = createContext();
function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };
    const addItemToCart = (item) => {
        alert("Asset added to checkout. Click cart icon to view all selected assets")
        setCartItems([...cartItems, item]);
    };
    const removeItemFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };
    const updateItemQuantity = (itemId, quantity) => {
        setCartItems(
            cartItems.map((item) => {
                if (item.id === itemId) {
                    item.quantity = quantity;
                }
                return item;
            })
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addItemToCart,
                removeItemFromCart,
                updateItemQuantity,
            }}
        >
            <Search searchC={searchCourse} CSF={courseSearchUserFunction} addAtoC={addItemToCart} />
            {children}
        </CartContext.Provider>
    );
};
function Search({ searchC, CSF, addAtoC }) {
    const [APIData, setAPIData] = useState([]);
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
    return (
        <div>
            <input
                type="text"
                class="w-[300px]  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                placeholder="Search and add assets to check out"
                value={searchC}
                onChange={CSF}
            />
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
                                        onClick={() => addAtoC(asset)}
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
        </div>
    )
}

function Cart() {
    const { cartItems, removeItemFromCart, updateItemQuantity } = React.useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <button onClick={toggleModal}><BsCart4 size={24} class="hover:fill-red-600" /></button>
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
                                    {cartItems.map((item) => (
                                        <div key={item.id}>
                                            <div class="w-[121px] h-[102px] bg-[#F6F7FC] rounded-[10px]"></div>
                                            <p>{item.assetName}</p>
                                            <div class="flex flex-row gap-2">
                                                <input
                                                    class=" w-[122px] bg-[#F6F7FC] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-xs px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                                                    type="number"
                                                    placeholder="Enter Quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItemQuantity(item.id, e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <button className="mt-3 ml-2 w-[100px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1" onClick={() => removeItemFromCart(item.id)}>
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
    )
}