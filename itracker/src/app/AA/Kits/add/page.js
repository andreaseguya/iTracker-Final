"use client";
import { useState, useEffect } from 'react';
import Select from "react-select";
export default function AddKit() {
    const [apidata, setapidata] = useState([]);
    const [kitName, setKitName] = useState('');
    const [kitAssets, setkit] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [Loanee, setLoanee] = useState([])
    const [returnDate, setReturn] = useState();
    const [EventType, setEvent] = useState();
    const [staff, setStaff] = useState('')
    const [notes, setNotes] = useState('')
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetchAssets();
        fetchData();
    }, [])
    async function fetchData() {
        // Fetch data
        let data = await fetch(`/api/users`, { method: "GET" });
        const results = []
        // Store results in the results array
        data.forEach((value) => {
            results.push({
                key: value.name,
                value: value.id,
            });
        });
        // Update the options state
        setLoanee([
            { key: 'Select a loanee', value: '' },
            ...results
        ])
    }
    // const fetchLoanee=async function fetchData(){
    //     //Fetch users from API
    //     let data = await fetch(`/api/users`,{method:"GET"});
    //     data=await data.json();
    //     const results=[]
    //     //store results in Results array 
    //     data.forEach((value)=>{results.push({key:value.Name, value:value.id})  })
    //    setLoanee([ {key:'Select a loanee', value:''}, ...results])
    //    //trigger:
    //    fetchLoanee()

    // }, []);
    const fetchAssets = async (searchValue = '') => {
        let data = await fetch(`/api/assets?search=${searchValue}`, {
            method: "GET"
        });

        data = await data.json();
        setapidata(data.data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newKit = {
            kitName: kitNName,
            kitAssets: kitAssets,
            Loanee: Loanee,
            returnDate: returnDate,
            EventType: EventType,
            staff: staff,
            notes: notes,
        };
    }

    return (
        <section>
            <form onSubmit={handleSubmit} class="w-[400px]">
                <div class="flex flex-row mt-5 mb-2 ">
                    <p class="text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Kit name:</p>
                    <input
                        type="text"
                        value={kitName}
                        onChange={(e) => setKitName(e.target.value)}
                        class=" -mt-3 ml-3 w-[230px] h-8 rounded-lg bg-gray-100"
                        placeholder=" "
                        required
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
                    <Select>
                        {Loanee.map((user) => {
                            return (
                                <option key={user.value} value={user.value}>{user.key}</option>
                            )
                        })}
                    </Select>

                </div>
            </form>
        </section>
    )

}