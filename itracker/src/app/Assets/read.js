
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const content ="We will edit this later"
const Open=()=>{
    return(
         <button class="fill-[#979797] w-[20px] m-2 float-right bg-[url(/images/edit.svg)] bg-no-repeat bg-center h-[20px]">
         </button>                          
    )
}
const close="Close"

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [assetID, setAssetID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    let counter = 1;
    if (assetID != null) {
        console.log("AssetID: ", assetID);
    }
    function increment() {
        counter = counter + 1;
        return counter;
    }
    useEffect(() => {
        axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset?page=${currentPage}&limit=${itemsPerPage}`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [currentPage, itemsPerPage])


    const setData = (data) => {
        let { ID, assetName, AlertEmail, checkbox } = data;
        localStorage.setItem('ID', ID);
        localStorage.setItem("Asset Name", assetName);
        localStorage.setItem("Alert Email", AlertEmail);
        localStorage.setItem("Checkbox", checkbox);

    }
    const totalPages = Math.ceil(APIData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = APIData.slice(startIndex, endIndex);

    return (
        <section class=" w-[365px]">

            <div class="flex flex-row flex-wrap">
                {APIData.map((data) => {
                    return (
                        <div key="ID" class="mx-2 my-2">
                            <div class="w-[104px] h-[102px] bg-[#F6F7FC] rounded-[10px]">
                                {/* <input type="checkbox" class="w-[20px] m-2 float-right rounded-[10px] " checked={isChecked} onChange={handleChange} ></input> */}
                                <Open/>
                                {/* TODO: Add the Modal  */}

                            </div>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.assetName}</p>
                            <p class="mt-1 ml-1 text-black text-[15px] not-italic font-normal leading-5 tracking-[-0.24px]
                         font-family: Inter">{data.Quantity} unit(s)</p>
                        </div>
                    )
                })}
                <div class="mt-5 ml-5">
                    <button class="mr-3" onClick={(e) => setCurrentPage(counter + 1)}> next page</button>
                    <button onClick={(e) => setCurrentPage(counter)}> previous page</button>
                </div>
            </div>



        </section>
    )
}

function AssetModal (props){
   const [showModal,setShowModal]=useState(false);
   const [APIData, setAPIData] = useState([]);
   const [id, setId] = useState(3);
   useEffect(() => {
       axios
           .get("https://65f8f806df151452461037b3.mockapi.io/Asset")
           .then(({ data }) => {
               setAPIData(data);
           })
           .catch((error) => {
               console.log(error);
           });
   }, []);
   const AssetDisplay = () => {
       return APIData.map((res, i) => {
           if(i==id){
               return <Assets
                       obj={res} key={i} />;
           }
          
       });
   };

   const openModal=()=>{
    setShowModal(true);
   }
   const closeModal = () => {
    setShowModal(false);
};
return(
    <section>

    </section>
)
}

const Assets = (props) => {
    const [singleAsset] = useState([]);
    const {
        _id,
        assetName,
        AlertEmail,
        Quantity,
        minQuantity,
        status,
        Returnable,
        StorageLocation
    } = props.obj;


    return (
        <section>
            <div id="AssetHeader">
                <div class="rounded-[50%] bg-gray-500 w-[50px] h-[50px]">.
                </div>
                <div class="" _id={1}>
                    <h1>{assetName}</h1>
                    <p>Last modified by ....</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div>

            </div>
        </section>
    )
}



