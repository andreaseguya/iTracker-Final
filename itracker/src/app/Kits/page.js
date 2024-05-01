"use client"
import api from '../api/assetList'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { BsCart4 } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import UserCartComponent from './UserCartComponent';
import SearchComponent from './SearchComponent';
import Select from "react-select";

export default function KitForm() {
    const [step, setStep] = useState(1);
    const [kitAnswers, setKitAnswers] = useState([]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNext={handleNext} />;
            case 2:
                return <Step2 onBack={handleBack} onNext={handleNext} />;
            case 3:
                return <Step3 onBack={handleBack} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };
    const handleSubmit = (data) => {
        data.preventDefault();
        console.log("complete")
    }
    return (
        <section>
            {renderStep()}
        </section>
    );
};
const Step1 = ({ onNext }) => {
    const [courses, setCourses] = useState([]);
    const [kitName, setKitName] = useState('')
    const [cartCourses, setCartCourses] = useState([]);
    // const [users, setUsers] = useState(['Admin, Drip Supervisor']);
    const [searchCourse, setSearchCourse] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        api.get(`/assets`)
            .then((response) => {
                setCourses(response.data);
            })
        // api.get('/users')
        //     .then((res) => {
        //         setUsers(res.data);
        //     })

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
            {/* Page 1 */}
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
                    <input value={kitName}
                        onChange={(e) => setKitName(e.target.value)}
                        class=" -mt-3 ml-3 w-[230px] h-8 rounded-lg bg-gray-100"></input>
                </div>
                <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                <SearchComponent searchCourse={searchCourse}
                    courseSearchUserFunction={courseSearchUserFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                />
                <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                <h2 class="mt-3 text-black text-[20px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Loanee details</h2>
                <p class="w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Next, assign the kit to a loanee or location or select other below</p>
            </div>
            <div>

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
            <div>
                <button onClick={onNext}>Next step</button>
            </div>

        </section>
    )
};
function SelectUsers(){
    const [value, setValue]=useState<any>({});
    return(
        <div>

        </div>
    )
}
const Step2 = ({ onBack, onNext }) => {
    const [email, setEmail] = useState('');

    return (
        <div>
            <h1>Step 2</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
};

const Step3 = ({ onBack, onSubmit }) => {
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Step 3</h1>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onBack}>Back</button>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};