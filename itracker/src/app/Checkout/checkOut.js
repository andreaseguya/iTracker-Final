"use client"
import { useState, useEffect } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/Redux/cart.slice';
import CartPage from "../Kits/add/kitCart";
import { FaRegUserCircle } from "react-icons/fa";
export default function Loans() {
    const [assets, setAssets] = useState([])
    const [loanee, setLoanees] = useState([
        { name: 'Aarav Sharma' },
        { name: 'Vivaan Patel' },
        { name: 'Aditya Verma' },
        { name: 'Vihaan Kumar' },
        { name: 'Reyansh Gupta' },
        { name: 'Aanya Singh' },
        { name: 'Isha Reddy' },
        { name: 'Mira Nair' },
        { name: 'Saanvi Joshi' }])
    const [search, setSearch] = useState('');
    const [selectedLoanee, setSelectedLoanee] = useState('');
    const [selectedAssetId, setSelectedAssetId] = useState('');
    const [editing, setIsEditing] = useState(false);
    const [returnDate, setReturn] = useState(new Date());
    const [skipDate, setSkip] = useState(true)
    const [staff, setStaff] = useState('Andrea Seguya')
    useEffect(() => {
        fetchAssets();
    }, [])
    const fetchAssets = async (searchValue = '') => {
        let data = await fetch(`/api/assets?search=${searchValue}`, {
            method: "GET"
        });

        data = await data.json();
        setAssets(data.data);
    }
    const handleLoaneeChange = (e) => {
        setSelectedLoanee(e.target.value)
    }
    const ChangeLoanee = () => {
        setIsEditing(true);
    }
    const SaveLoanee = () => {
        setIsEditing(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost(e));// Sends the 'addPost' action with 'newPost' payload
        const newLoan = {
            Loanee: selectedLoanee,
            returnDate: returnDate,
            staff: staff,

        }

    }
    // Redux
    const dispatch = useDispatch();

    return (
        <section>
            {editing ? (<div>
                <h2 class="mb-1">Select a Loanee to assign items</h2>
                <select
                    id="student"
                    className="form-select"
                    value={selectedLoanee}
                    onChange={handleLoaneeChange}
                >
                    <option value="">Select Loanee</option>
                    {loanee.map((student, index) => (
                        <option key={index} value={student.name}>
                            {student.name}
                        </option>
                    ))}
                </select>
                <button onClick={SaveLoanee}>Save</button>
            </div>) : (<div>
                <div key="id" class="flex flex-row rounded-[20px] p-3 w-[300px] bg-[rgba(151,151,151,0.14)]">
                    <div class="rounded-[50%] bg-[#fff] w-[70px] h-[70px]">.</div>
                    <div class="ml-5">
                        <h1 class=" text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px]
                                font-family: Inter;">{selectedLoanee}</h1>
                        <p class="text-black text-[13px] not-italic font-medium leading-5 tracking-[-0.24px];
                                font-family: Inter">ex@snocasino.com</p>
                        {/* <Link href="/UpdateAsset"> */}
                        <button type="button" onClick={ChangeLoanee} class=" mt-1 w-[100px] h-6 bg-[black] rounded-[5px] text-white hover:text-black hover:bg-[white]">Change</button>
                        {/* </Link> */}
                        {/* <button type="button" class="ml-1 mt-1 w-[65px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]" type="button">Edit</button> */}
                    </div>

                </div>
            </div>)}
            {/* Separator */}
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            {/* Search & Add */}
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    const newSearchValue = e.target.value;
                    setSearch(newSearchValue);
                    fetchAssets(newSearchValue);
                }}
                className="block p-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for Assets to check out"
            />
            <div class="flex flex-row">
                {/* Change to kits when youre done troubleshooting */}
                {assets
                    .filter((item) => {
                        if (search == "") {
                            return "";
                        }
                        else return item
                    })
                    .map((item) => (

                        <div key={item.id} class="mt-2">
                            <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                            <h1 class="ml-3 mt-0.5 w-[70px]">{item.assetName}</h1>
                            <button type="button" class="text-white bg-black p-2 rounded-[5px] ml-3" onClick={() => dispatch(addToCart(item))}>Add</button>
                        </div>
                    ))}
            </div>
            {/* Separator */}
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            {/* Return Date */}
            <div class="flex flex-row gap-3 mt-1">
                <p class="   text-black text-[17px] not-italic font-semibold "> Return date: </p>
                {skipDate ? (<DatePicker class="picker" selected={returnDate} onChange={(date) => setReturn(date)} />) : (<p>N/A</p>)}

            </div>
            {/* Skip Time button */}
            {/* TODO: skip time hides when  */}
            <div class="flex flex-row">
                <div class="flex flex-row">
                    <input type="checkbox" onChange={(hide) => setSkip(false)}></input>
                </div>
                <label class="ml-1">Skip date</label>
            </div>
            {/* Separator */}
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            <div class="bg-black rounded-[10px] w-[329px] ">
                <h2 class='ml-2 "mt-3 text-white text-[20px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;'>Currently Selected: </h2>
                <CartPage />
            </div>
            {/* Separator */}
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            {/* Staff Assigned */}
            <div class="flex flex-row ml-4">
                <p class="mt-2 mr-2">Staff Assigned:</p>
                <div class=" flex flex-row flex-wrap p-3 w-[160px] h-[42px] rounded-[6px] bg-[rgba(151,151,151,0.14)]">
                    <p class=" text-sm">{staff}</p>
                    <div class="ml-3 float-right">
                        <FaRegUserCircle size={22} fill="grey" />
                    </div>
                </div>
            </div>
            {/* Separator */}
            <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            <button type="button" class=" mt-1 w-[150px] ml-[150px] h-6 bg-[black] rounded-[5px] text-white  hover:text-black hover:bg-[red]">Finish checkout</button>
        </section>
    )
}