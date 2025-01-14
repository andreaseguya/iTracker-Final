"use client"
import { useState, useEffect } from "react";
import api from '../api/assetList'
function LowStock() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await api.get('/assets');
                setAPIData(response.data);
            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range 
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }
        fetchAssets();
    }, [])

    return (
        <div>
            <div class="grid grid-cols-4 gap-4 content-between ... p-5 mb-3">
                {APIData.map((data) => {
                    if (data.Quantity <= data.minQuantity) {
                        return (
                            <div key="ID" >
                                <div class="bg-[#DFDFDF] h-[62px] rounded-[50%] w-[63px]">
                                    {/* Asset image */}
                                </div>
                                <p class="ml-2">{data.assetName}</p>
                                <p class="text-[#F11919] ml-2">{data.Quantity} unit</p>
                            </div>
                        )
                    }

                })}
            </div>
        </div>
    )
}

export default function Inventory() {

    return (
        <section class="">
            <h1 class="ml-3 text-[#2F2F2F] text-xl not-italic font-semibold leading-[normal];
  font-family: Inter;">Low Stock Assets</h1>

            <div class="bg-[#F8F8F8] w-[350px] rounded-[14px]  mt-3">
                <LowStock />
            </div>
            <div class=" ml-3 w-[350px]">
                <p class="text-[#333] text-[15px] not-italic font-normal leading-[15px] tracking-[-0.5px];
  font-family: Inter">Ideally, a low stock notification is sent to an administrator or staff member assigned to an asset during creation. (You can edit the recipient in the asset tab)</p>
                <br></br>
                <p class="text-[#333] text-[15px] not-italic font-normal leading-[15px] tracking-[-0.5px];
  font-family: Inter">To send a reminder to an assigned staff member, toggle the option. To send an email to a new staff member, enter their email and wait for the confirmation that the email has been sent</p>
            </div>
        </section>
    )
}

