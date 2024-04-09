import { useState } from 'react'
export default function UserCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    setCartCourses,
}) {
    const [openCart, setOpenCart] = useState(false);

    return (
        <section>
            {openCart ? (
                <div>
                    empty
                </div>
            ) : (
                <div>
                    {cartCourses.map((item) => (
                        <div key={item.product.id} className="cart-item">
                            <div>
                                <div className="item-info">
                                    <div className="item-image">

                                        {/* <img src={item.product.image}
                                                alt={item.product.assetName} /> */}
                                    </div>
                                    <div id="item-details" class="flex flex-row">
                                        <h3>{item.product.assetName}</h3>
                                        <h2>{item.Quantity}</h2>
                                        {/* <p>Price: ₹{item.product.price}</p> */}
                                    </div>
                                </div>
                                <div>
                                    <div className="item-actions">
                                        <button
                                            className=""
                                            id="remove-button"
                                            onClick={() =>
                                                deleteCourseFromCartFunction(item.product)}>
                                            Remove Product
                                        </button>
                                        <div className="quantity">
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
                                                }}>+</button>
                                            <p className='quant'>{item.quantity} </p>
                                            <button
                                                onClick={(e) => {
                                                    setCartCourses((prevCartCourses) => {
                                                        const updatedCart = prevCartCourses.map(
                                                            (prevItem) =>
                                                                prevItem.product.id === item.product.id
                                                                    ? {
                                                                        ...prevItem, quantity:
                                                                            Math.max(item.quantity - 1, 0)
                                                                    }
                                                                    : prevItem
                                                        );
                                                        return updatedCart;
                                                    })
                                                }}>-</button>
                                        </div>
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