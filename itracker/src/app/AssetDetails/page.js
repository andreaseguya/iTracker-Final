"use client"
import axios from "axios";
import { useState, useEffect } from "react";
export default function Asset() {
    const client = axios.create({
        baseURL: `https://65f8f806df151452461037b3.mockapi.io/Asset`
    });
    const [assetList, setAssetList] = useState([]);
    const [id, setID] = useState(0);

    const fetchAssetById = async (id) => {
        useEffect(() => {
            client.get(`/${id}`).then((response) => {
                setAssetList(response.data)
            })
        }, [])
        return assetList;
    }
    const account = fetchAssetById(3);
    console.log(account);
    return (
        <section>

        </section>
    )
}