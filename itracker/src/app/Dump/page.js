"use client"
import React, { createContext, useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import api from '../api/assetList'
export default function Dump() {
    const [showCart, setShowCart] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <section class="flex flex-row">
            <CartProvider>
                <Cart />
            </CartProvider>
        </section>
    )
}
const CartContext = createContext();
function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };
    // const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    // useEffect(() => {
    //     const cartItems = localStorage.getItem("cartItems");
    //     if (cartItems) {
    //     setCartItems(JSON.parse(cartItems));
    //     }
    // }, []);
    const addItemToCart = (item) => {
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
                    // Not in the 200 response range 
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
                class="w-[350px]  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                placeholder="Search and add assets to check out"
                value={searchC}
                onChange={CSF}
            />   
            <div class=" mt-3 w-[370px] flex flex-row gap-3 flex-wrap">
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
                                        className="add-to-cart-button"
                                        onClick={() => addAtoC(asset)}
                                    >
                                        Add to C
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
    const [showModal,setShowModal]=useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <button onClick={toggleModal}><BsCart4 size={24} class="hover:fill-red-600" /></button>
            {/* <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.assetName}</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateItemQuantity(item.id, e.target.value)}
                                />

                                <button onClick={() => removeItemFromCart(item.id)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

        </div>
    )
}