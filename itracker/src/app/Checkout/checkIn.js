import { useState, useEffect } from 'react'
export default function CheckIn() {
    const [loans, setLoans] = useState([]);
    const fetchLoans = async () => {
        try {
            const response = await api.get('/loans');
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
    fetchLoans();
    return (
        <section>

            <p class="mt-2 text-[14px] not-italic font-normal leading-6 w-[303px]">Scan tags or enter keywords to  return items</p>
            <Search />
            <div class="mt-1 flex w-[300px] h-[1px] bg-gray-200"></div>
            <div class="grid grid-cols-4 gap-4 content-between ... p-5 mb-3">
                {loans.map((data) => {
                    // while (data.expiredate <= today) {
                    //for ovedue loans
                    //     return (
                    //         <div key="ID" >
                    //             <div class="bg-[#DFDFDF] h-[62px] rounded-[50%] w-[63px]">
                    //                 {/* Asset image */}
                    //             </div>
                    //             <p class="ml-2">{data.assetName}</p>
                    //             <p class="text-[#F11919] ml-2">{data.Quantity} unit</p>
                    //         </div>
                    //     )
                    // }

                })}
            </div>
        </section>
    )
}

function Search({ searchC, CSF, addAtoC }) {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await api.get('/assets');
                setAPIData(response.data);
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
        fetchAssets();
    }, [])
    return (
        <div>
            <input
                type="text"
                class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                placeholder="Search with keywords or scan barcode"
                value={searchC}
                onChange={CSF}
            />
            <div class=" mt-3 w-[300px] flex flex-row gap-3 flex-wrap">
                {APIData
                    .filter((asset) => {
                        if (searchC == "") {
                            return "";
                        }
                        else if (asset.assetName.toLowerCase().includes(searchC.toLowerCase()))
                            return asset

                    })
                    .map((asset) => {
                        if (asset.assetName.toLowerCase().includes(searchC.toLowerCase())) {
                            return (
                                <div key={asset.id} class="">
                                    <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                    <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                    <button
                                        className="mt-3 ml-2 w-[50px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                        onClick={() => addAtoC(asset)}
                                    >
                                        Add
                                    </button>
                                </div>
                            )
                        }
                    }
                    )
                }
            </div>
        </div>
    )
}