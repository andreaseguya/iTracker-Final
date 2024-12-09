"use client"
import React, { useState, useEffect } from 'react';
import api from '../api/assetList'
export default function Export() {
    const [jsonData, setJsonData] = useState("");
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await api.get('/assets');
    //             setJsonData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(() => {
        api.get('/assets').then(res => setJsonData(res));
    }, []);
    return (
        <div>
            <div class=" bg-[#979797] rounded-[10px] text-center w-[97px] ml-10">
                <button class="text-center hover:text-white text-black text-[15px] not-italic font-semibold leading-5 tracking-[-0.24px]
  font-family: Inter">- EXPORT</button>
            </div>
            {jsonData && (
                <a href={`data:text/csv;charset=utf-8,${escape(jsonData)}`}
                    download="assets.csv"> download</a>
            )}
        </div>

    )
}