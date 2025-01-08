// Importing hooks from react-redux
import { useSelector, useDispatch } from 'react-redux';
// Importing actions from  cart.slice.js
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} from '@/app/Redux/cart.slice';
const CartPage = () => {
    // Extracting cart state from redux store 
    const cart = useSelector((state) => state.cart);
    // Reference to the dispatch function from redux store
    const dispatch = useDispatch();
    return (
        <div>
            {cart.length === 0 ? (
                <div class="bg-[#000000] w-[328px] mt-1   rounded-[10px]">

                    <h1 class='ml-2 text-white'>Cart is empty</h1>
                </div>

            ) : (
                <div class="flex flex-row gap-2">

                    {cart.map((item) => (
                        <div class="">
                            <div class="ml-1">
                                <button onClick={() => dispatch(removeFromCart(item.id))} class="float-right">
                                    <IoMdClose size={20} class="fill-white" />
                                </button>
                                <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] mr-4 "> </div>
                                <p class="text-white">{item.assetName}</p>

                                {/* Buttons for quantity control */}
                                <div className="flex flex-row gap-3">
                                    <button onClick={() => dispatch(incrementQuantity(item.id))}>
                                        <IoMdAddCircleOutline size={20} class="fill-white" />
                                    </button>
                                    <p class="text-white">{item.quantity}</p>
                                    <button onClick={() => dispatch(decrementQuantity(item.id))}>
                                        <IoMdRemoveCircleOutline size={20} class="fill-white" />
                                    </button>

                                </div>
                            </div>


                        </div>

                    ))}
                </div>
            )}
        </div>
    )
}
export default CartPage;