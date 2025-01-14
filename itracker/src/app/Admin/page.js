"use client"
import { useState, useEffect } from 'react'

export default function Admin() {

    return (
        <section>
            <div class="ml-3 w-[330px]">
                <h1 class=" text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px];
  font-family: Inter;">Admin</h1>
                <p>Reports can be generated here as well as changes to user accounts.</p>
            </div>
            <div class=" ml-3  mt-2 bg-[#F8F8F8] w-[308px] h-[150px] rounded-[14px] p-3 gap-3 flex flex-row">
                <div class=" w-[50%] h-[120px] bg-[#fff] rounded-[10px] ">
                    <div class="flex flex-row">
                        {/* First section */}
                        <p class=" mt-1 ml-1  text-[#333] text-[12px] not-italic font-medium leading-[22px] tracking-[0.5px];
  font-family: Inter;">Date Range:</p>
                        <select class=" mt-1 ml-1 w-[52px]  h-[14px] rounded-[5px]">
                        </select>
                    </div>
                </div>
                <div class=" w-[50%] h-[120px] bg-[#fff] rounded-[10px] ">
                    {/* Second Sectio/ Loan Section  */}
                    <div class="flex flex-row">
                        <p class=" mt-1 ml-1  text-[#333] text-[12px] not-italic font-medium leading-[22px] tracking-[0.5px];
  font-family: Inter;">Loans</p>
                        <select class=" mt-1 ml-1 w-[52px]  h-[14px] rounded-[5px]">
                        </select>
                    </div>
                    {/* <p class=" ml-3 text-black text-xl not-italic font-medium leading-7 tracking-[0.5px];">{loans.length}</p> */}
                    <p class=" mt-1 ml-1  text-[#333] text-[12px] not-italic font-medium leading-[22px] tracking-[0.5px];
  font-family: Inter;">Kits in Use</p>
                </div>
            </div>
            {/* Calendar */}

        </section>
    )
}