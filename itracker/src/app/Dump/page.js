"use client"
import { useState, useEffect } from 'react'
import Select from 'react-select'
import api from '../api/assetList'
export default function Loanee() {
    const [selectedOptions, setSelected] = useState([])
    const getOptions = async () => {
        const res = await api.get('/users')
        const data = res.data
        const options = data.map(d => ({
            "value": d.id,
            "label": d.Name
        }))
        setSelected(options)
    }
    getOptions();

    return (
        <div>
            <Select options={selectedOptions} onChange={(e) => setSelected({ id: e.value, Name: e.label })} />
        </div>
    )

}
