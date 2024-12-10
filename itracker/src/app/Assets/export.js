"use client"
import React, { useState, useEffect } from 'react';
import api from '../api/assetList'
import { CSVLink } from 'react-csv';
export default function Export() {
    const [jsonData, setJsonData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/assets');
                setJsonData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'Asset Name', key: 'assetName' },
        { label: 'Quantity', key: 'Quantity' },
        { label: 'Minimum Quantity', key: 'minQuantity' },
        { label: 'Storage Location', key: 'StorageLocation' },
        // Add more headers as needed
    ];
    // useEffect(() => {
    //     api.get('/assets').then(res => setJsonData(res));
    // }, []);
    return (
        <div>

            <div class=" bg-[#979797] rounded-[10px] text-center w-[97px] ml-10">
                <CSVLink data={jsonData} headers={headers} filename="assets.csv">
                    <button class="text-center hover:text-white text-black text-[15px] not-italic font-semibold leading-5 tracking-[-0.24px]
  font-family: Inter">- EXPORT</button>
                </CSVLink>

            </div>

        </div>

    )
}