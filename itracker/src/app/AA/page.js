"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
export default function Loans() {
    const [apidata, setapidata] = useState([]);
    const [kits, setkits] = useState([])
    const [search, setSearch] = useState('');

    const router = useRouter();
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
    const deleteAsset = async (id) => {
        let isConfirm = confirm("Are you sure you want to delete this asset?")
        if (!isConfirm) return
        let response = await fetch(`/api/assets`, {
            method: "DELETE",
            body: JSON.stringify(id),
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response.success) {
            alert(response.message)
            return fetchProducts()
        }
        return alert(response.message)
    }
    return (
        <section>
            <div class="mb-2 flex flex-row gap-[220px] ">
                <h2 class="mt-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits</h2>
                <Link href="" class="">
                    <button class="mt-3 ml-5 bg-[url(/images/add.svg)] bg-no-repeat bg-center w-[30px] h-[30px]"></button>
                </Link>
            </div>
            <div class="w-[330px]">
                <p class=" w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
                <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
            </div>
            {/* Search Bar for Kits */}
            <div class="mt-1">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        const newSearchValue = e.target.value;
                        setSearch(newSearchValue);
                        fetchAssets(newSearchValue);
                    }}
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for Kits"
                />
            </div>
            <div>
                {/* Change to kits when youre done troubleshooting */}
                {apidata.map((item) => (
                    <div key={item.id}>

                        <h1>{item.assetName}</h1>
                    </div>
                ))}
            </div>
        </section>
    )
}