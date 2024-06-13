"use client"
import React, { useState, useEffect } from "react";
import api from '../api/assetList'
export default function Returns() {
    const [allLoans, setLoans] = useState([])
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
    return (
        <section>
            <div class="ml-4 rounded-[10px] p-3 w-[320px] mt-2 bg-[rgba(151,151,151,0.14)]">
                <div class="">
                    {/* <div>
                        <h1 class="text-[#979797] text-l not-italic font-medium leading-[normal]">Overdue Loans</h1>
                    </div> */}
                    <h1 class="text-[#979797] mb-2 ml-[70px] text-l not-italic font-medium leading-[normal] ">Current Loans</h1>
                    <div class="flex flex-row flex-wrap gap-10">
                        {allLoans.map((loan) => {
                            return loan.loanee.map((loanee) => {
                                // Getting assets & Loanees  from Loan API

                                return loanee.Name
                            })
                        })}

                    </div>
                </div>
            </div>
        </section>
    )
}