"use client"
import React, { useState, useEffect } from "react";
import api from '../api/assetList'
export default function Returns() {
    const [allLoans, setLoans] = useState([])
    const [searchLoanee, setSearchLoanee] = useState('')
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await api.get('/loans');
                setLoans(response.data);
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
        fetchLoans();
    }, [])
    const LoaneeSearch = (e) => {
        setSearchLoanee(e.target.value)
    }
    return (
        <section>
            <div class="ml-5 mt-3">
                {/* Search Bar & results */}
                <input class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                    type="search" placeholder="Search for loanee name to find loan" value={searchLoanee} onChange={LoaneeSearch}></input>
                {/* Results */}
                <div class="flex flex-row flex-wrap gap-3 mt-3">
                    {allLoans.map((loan) => {
                        return loan.loanee
                            .filter((loaner) => {
                                if (searchLoanee == "") {
                                    return ""
                                } else if (loaner.Name.toLowerCase().includes(searchLoanee.toLowerCase())) {
                                    return loaner
                                }
                            })
                            .map((loaner) => {
                                if (loaner.Name.toLowerCase().includes(searchLoanee.toLowerCase())) {
                                    return (
                                        <div key={loaner.id} class="bg-[rgba(151,151,151,0.86)] p-2 rounded-[5px]">
                                            <div class="w-[60px] h-[60px] bg-[#FFFF] rounded-[10px] ml-1"></div>
                                            <h1 class="text-[#ffff] ml-2 ">{loaner.Name}</h1>
                                        </div>
                                    )
                                }
                            })
                    })}
                </div>
            </div>
            <div class="mt-2 ml-4 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
            <div class="ml-4 rounded-[10px] p-3 w-[320px] mt-2 bg-[#000]">
                <div class="">
                    {/* <div>
                        <h1 class="text-[#979797] text-l not-italic font-medium leading-[normal]">Overdue Loans</h1>
                    </div> */}
                    <h1 class="text-[#ffff] mb-3 ml-[70px] text-l not-italic font-medium leading-[normal] ">Current Loans</h1>
                    <div class="flex flex-row flex-wrap gap-2">
                        {allLoans.map((loan) => {
                            return loan.loanee.map((loanee) => {
                                // Getting assets & Loanees  from Loan API
                                return (
                                    <div class="bg-[rgba(151,151,151,0.86)] p-2 rounded-[5px]">
                                        <div class="w-[60px] h-[60px] bg-[#FFFF] rounded-[10px] ml-1"></div>
                                        <h1 class="text-[#ffff] ">{loanee.Name}</h1>
                                        <button className="mt-3 ml-2 w-[60px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1">Return</button>
                                    </div>
                                )
                            })
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}