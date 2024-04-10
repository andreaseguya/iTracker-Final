"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { BsCart4 } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import UserCartComponent from './UserCartComponent';
import SearchComponent from './SearchComponent';
import axios from 'axios'
export default function Kits() {
    const [courses, setCourses] = useState([]);
    const [cartCourses, setCartCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset`)
            .then((response) => {
                setCourses(response.data);
            })

    }, [])
    const addCourseToCartFunction = (GFGcourse) => {
        const alreadyCourses = cartCourses
            .find(item => item.product.id === GFGcourse.id);
        if (alreadyCourses) {
            const latestCartUpdate = cartCourses.map(item =>
                item.product.id === GFGcourse.id ? {
                    ...item, quantity: item.quantity + 1
                }
                    : item
            );
            setCartCourses(latestCartUpdate);
        } else {
            setCartCourses([...cartCourses, { product: GFGcourse, quantity: 1 }]);
        }
    };
    const deleteCourseFromCartFunction = (GFGCourse) => {
        const updatedCart = cartCourses
            .filter(item => item.product.id !== GFGCourse.id);
        setCartCourses(updatedCart);
    };
    const courseSearchUserFunction = (event) => {
        setSearchCourse(event.target.value);
    };
    const filterCourseFunction = courses.filter((course) =>
        course.assetName.toLowerCase().includes(searchCourse.toLowerCase())
    );
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <section>
            <div class="ml-3">
                <div class="mb-2 flex flex-row gap-[220px]">
                    <h2 class="mt-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits</h2>
                    <button class="" onClick={toggleModal}>
                        <BsCart4 size={24} class="hover:fill-red-600" />
                    </button>
                </div>
                <div class="w-[330px]">
                    <p class=" w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
                    <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                </div>
                <div class="flex flex-row mt-5 mb-2 ">
                    <p class="text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Kit name:</p>
                    <input class=" -mt-3 ml-3 w-[200px] h-8 rounded-lg bg-gray-100"></input>
                </div>
                <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                <SearchComponent searchCourse={searchCourse}
                    courseSearchUserFunction={courseSearchUserFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                />
            </div>
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

                                    <div>
                                        <UserCartComponent
                                            cartCourses={cartCourses}
                                            deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                                            setCartCourses={setCartCourses}
                                        />
                                    </div>
                                </motion.div>

                            </motion.div>


                        </motion.div>

                    )}
                </AnimatePresence>

            </div>

        </section>
    )
} 