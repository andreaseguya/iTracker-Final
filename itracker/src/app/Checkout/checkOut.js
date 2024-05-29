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
        <section >
            <AddLoanee/>
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>  
              <div class="flex flex-row">
                <div>
                <p>Due date:</p>
                </div>
                <div>
                <p>Indefinite Loan</p>
                </div>
                
              </div>
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div> 
           <div class="flex flex-row gap-2">
           <CartProvider>
                <div class="mt-1">
                    <Cart />
                </div>
          </CartProvider>
           </div>  
           <div class="mt-1 flex w-[300px] h-[1px] bg-gray-200 mb-1"></div>     
        </section>
    )
}
function AddLoanee() {
    const [changeLoanee, setChangeLoanee] = useState('');
    const [show, setShow] = useState(false)
    return (
        <div>
        <div id="Loanee" class="flex flex-row rounded-[20px] p-3 w-[300px] bg-[rgba(151,151,151,0.14)]">
            <div class="rounded-[50%] bg-[#fff] w-[70px] h-[70px]">.
            </div>
            <div class="ml-5 " >
                <h1 class="text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px]
font-family: Inter;">Admin</h1>
                <p class="text-black text-[13px] not-italic font-medium leading-5 tracking-[-0.24px];
font-family: Inter">ITSupport@snocasino.com</p>
                {/* <Link href="/UpdateAsset"> */}
                    <button  class=" mt-1 w-[150px] h-6 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Change Loanee</button>
                {/* </Link> */}
                {/* <button  class="ml-2 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Delete</button> */}
            </div>

        </div>
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
                class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
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