"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import DatePicker from "react-datepicker";
import Link from "next/link"
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// redux 
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/Redux/cart.slice';
import CartPage from './kitCart';
export default function AddKit({ kitAsset }) {
    const [apidata, setapidata] = useState([]);
    const [skipDate, setSkip] = useState(true)
    const [kitName, setKitName] = useState('');
    // const [kitAssets, setkit] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [Loanee, setLoanee] = useState([])
    const [returnDate, setReturn] = useState(new Date());
    const [EventType, setEvent] = useState(null);
    const [staff, setStaff] = useState('')
    const [notes, setNotes] = useState('')
    const [search, setSearch] = useState('');
    const options = [
        { value: 'Event', label: 'Event' },
        { value: 'Drawing', label: 'Drawing' },
        { value: 'Promotion', label: 'Promotion' },
        { value: 'Other', label: 'Other' }
    ]
    useEffect(() => {
        fetchAssets();
    }, [])
    const fetchAssets = async (searchValue = '') => {
        let data = await fetch(`/api/assets?search=${searchValue}`, {
            method: "GET"
        });

        data = await data.json();
        setapidata(data.data);
    }
    // Redux
    const dispatch = useDispatch();

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newKit = {
            kitName: kitName,
            // kitAssets: kitAssets,
            Loanee: Loanee,
            returnDate: returnDate,
            EventType: EventType,//category
            staff: staff,//staff assigned
            // notes: notes,
        };
        let response = await fetch('/api/kits/add', {
            method: "POST",
            body: JSON.stringify(newKit),
            headers: {
                "content-type": "application/json"
            }
        })
        // TODO:no post on kits 
        response = await response.json()

        if (response.success) {
            setkitName();
            // setkit([]);
            setLoanee();
            setReturn();
            setEvent();
            setStaff();
            // setNotes('')
            return alert(response.message)
        };
    }

    return (

        <section class="w-[400px]">
            <Link href="/">
                <IoMdCloseCircle size={24} class="hover:fill-red-600" />
            </Link>

            <form onSubmit={handleSubmit} class="ml-6">

                <div class="flex flex-row mt-5 mb-2 ">
                    <p class="text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Kit name:</p>
                    <input
                        type="text"
                        value={kitName}
                        onChange={(e) => setKitName(e.target.value)}
                        class=" -mt-3 ml-3 w-[230px] h-8 rounded-lg bg-gray-100"
                        placeholder=" "

                    />
                </div>
                {/* separator */}
                <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                {/* Search Section */}
                <div>
                    <div class="mt-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                const newSearchValue = e.target.value;
                                setSearch(newSearchValue);
                                fetchAssets(newSearchValue);
                            }}
                            className="block p-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for Assets to add to kit"
                        />
                    </div>
                    <div class="flex flex-row">
                        {/* Change to kits when youre done troubleshooting */}
                        {apidata
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
                                    <button onClick={() => dispatch(addToCart(item))} class="text-white bg-black p-2 rounded-[5px] ml-3">Add</button>
                                </div>
                            ))}
                    </div>
                </div>
                {/* separator */}
                <div class="flex w-[320px] mt-1 h-[1px] bg-gray-200"></div>
                {/* Loanee Details */}
                <h2 class="mt-3 text-black text-[20px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Loanee details</h2>
                <p class="w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Next, assign the kit to a loanee or location or select other below</p>
                <div class="w-[328px]">
                    <Select></Select>
                </div>
                {/* separator */}
                <div class="flex w-[320px] mt-2 h-[1px] bg-gray-200"></div>
                {/* Return Date */}
                <div></div>
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
                {/* separator */}
                <div class="flex w-[320px] mt-2 h-[1px] bg-gray-200"></div>
                {/* Category  & Staff*/}
                <div class="mt-3 flex flex-row gap-5">
                    <div class="w-[164px]">
                        <p class=" w-32 flex-col justify-center text-slate-800 text-base not-italic font-medium leading-[26px] tracking-[0.3px]">Category</p>
                        <Select value={EventType} onChange={setEvent} options={options} />
                    </div>
                    <div>
                        <p class=" w-32 flex-col justify-center text-slate-800 text-base not-italic font-medium leading-[26px] tracking-[0.3px]">Staff Assigned: </p>
                        <div class="flex flex-row gap-3">
                            <Select />
                        </div>
                    </div>
                </div>
                {/* separator */}
                <div class="flex w-[320px] mt-2 h-[1px] bg-gray-200"></div>
                {/* Notes */}
                {/* <div class="mt-2 mb-3">
                    <p class=" w-32 flex-col justify-center text-slate-800 text-base not-italic font-medium leading-[26px] tracking-[0.3px]">Notes: </p>
                    <input class="bg-[#F4F4F4] w-[328px] h-[68px] rounded-[10px]"></input>

                </div> */}
                <div class="bg-black rounded-[10px] w-[329px]">
                    <h2 class='ml-2 "mt-3 text-white text-[20px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;'>Current Kit Items: </h2>
                    <CartPage />
                </div>
                {/* Buttons */}
                <div class="flex flex-row">
                    <button type="submit" className="mt-3 ml-2 p-2 text-white rounded-[5px] bg-black hover:bg-red-500 ">Create a Kit</button>
                </div>
            </form>


        </section>


    )

}




// const options = [
//     { value: 'Event', label: 'Event' },
//     { value: 'Drawing', label: 'Drawing' },
//     { value: 'Promotion', label: 'Promotion' },
//     { value: 'Other', label: 'Other' }
// ]