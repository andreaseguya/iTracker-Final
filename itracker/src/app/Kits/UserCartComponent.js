import { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
export default function UserCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    setCartCourses,
}) {
    const [openCart, setOpenCart] = useState(false);

    return (
        <section>
            <h2 class="mt-3 ml-10 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Current Kit Assets</h2>
            {openCart ? (
                <div>
                    <h1 class="text-black">No assets have been added to this kit</h1>
                </div>
            ) : (
                <div className="flex flex-row gap-5 ml-10" >
                    {cartCourses.map((item) => (
                        <div key={item.product.id} id="cart-item">
                            <div>
                                <div className="mt-3" id="item-info">
                                    <div class="w-[104px] h-[102px] bg-[#F6F7FC] rounded-[10px]"></div>
                                    {/* <img src={item.product.image}
                                                alt={item.product.assetName} /> */}
                                    <div id="item-details" class="flex flex-row">
                                        <h3>{item.product.assetName}</h3>
                                        <h2>{item.Quantity}</h2>
                                        {/* <p>Price: ₹{item.product.price}</p> */}
                                    </div>
                                </div>
                                <div>
                                    <div className="item-actions">
                                        <div className="flex flex-row" id="quantity">
                                            <button style={{ margin: "1%" }}
                                                onClick={(e) => {
                                                    setCartCourses((prevCartCourses) => {
                                                        const updatedCart = prevCartCourses.map(
                                                            (prevItem) =>
                                                                prevItem.product.id === item.product.id
                                                                    ? {
                                                                        ...prevItem, quantity:
                                                                            item.quantity + 1
                                                                    }
                                                                    : prevItem
                                                        );
                                                        return updatedCart;
                                                    })
                                                }}><IoIosAddCircleOutline size={24} /></button>
                                            <h2 className="m-3" id='quant'>{item.quantity} </h2>
                                            <button
                                                onClick={(e) => {
                                                    setCartCourses((prevCartCourses) => {
                                                        const updatedCart = prevCartCourses.map(
                                                            (prevItem) =>
                                                                prevItem.product.id === item.product.id
                                                                    ? {
                                                                        ...prevItem, quantity:
                                                                            Math.max(item.quantity - 1, 1)
                                                                    }
                                                                    : prevItem
                                                        );
                                                        return updatedCart;
                                                    })
                                                }}><IoIosRemoveCircleOutline size={24} /></button>

                                        </div>
                                        <button
                                            className="ml-2 w-[100px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                            id="remove-button"
                                            onClick={() =>
                                                deleteCourseFromCartFunction(item.product)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </section>
    )

}