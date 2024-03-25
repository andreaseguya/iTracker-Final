
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    // const [recordsPerPage]=useState(6);
    // const indexOfLastRecord = currentPage * recordsPerPage;
    // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // const currentRecords = data.slice(indexOfFirstRecord, 
    //     indexOfLastRecord);

    useEffect(() => {
        axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    const setData = (data) => {
        let { ID, assetName, AlertEmail, checkbox } = data;
        localStorage.setItem('ID', ID);
        localStorage.setItem("Asset Name", assetName);
        localStorage.setItem("Alert Email", AlertEmail);
        localStorage.setItem("Checkbox", checkbox);
    }

    return (
        <section class=" w-[365px]">

            <div class="flex flex-row flex-wrap">
                {APIData.map((data) => {
                    return (
                        <div key="ID" class="mx-2 my-2">
                            <div class="w-[104px] h-[102px] bg-[#F6F7FC] rounded-[10px]">
                                {/* <input type="checkbox" class="w-[20px] m-2 float-right rounded-[10px] " checked={isChecked} onChange={handleChange} ></input> */}
                                <Link href="/Update">
                                    <button class="fill-[#979797] w-[20px] m-2 float-right bg-[url(/images/edit.svg)] bg-no-repeat bg-center h-[20px]">
                                    </button>
                                </Link>

                            </div>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.assetName}</p>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.Quantity} unit(s)</p>
                            {/* <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                 font-family: Inter" >{data.checkbox ? 'Checked' : 'Unchecked'}</p> */}

                            {/* Update button  */}
                            {/* <Button onClick={() => setData(data)} className=" mt-5 w-[100px] h-[34px] rounded
                        bg-[black] text-[white] disabled:bg-[grey] hover:bg-[#087EA4]" >Update</Button> */}

                        </div>
                    )
                })}
            </div>



        </section>
    )
}

