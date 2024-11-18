"use client"
import React, { useState, useEffect } from 'react';

export default function Export() {
    const [jsonData, setJsonData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('YOUR_API_ENDPOINT');
                setJsonData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

}