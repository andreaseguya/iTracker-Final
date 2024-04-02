"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function AssetHelper() {
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
            else return ''
        //     return <Assets
        //         obj={res} key={i} />;
        });
    };
    // const DisplayByID = (id) => {
    //     // console.log(APIData.filter(ID, id));
    //     // return (
    //     //     APIData.filter((item))=>{

    //     //     }

    //     // )
    // };

    return (
        <section>
            {AssetDisplay()}
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