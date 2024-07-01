"use client"
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../api/assetList'
import Home from '../page';
import Link from 'next/link';
export default function Update() {

    // const [assetImage, setassetImage] = useState('');
    const [assetName, setassetName] = useState('');
    const [AlertEmail, setAlertEmail] = useState('');
    const [Quantity, setQuantity] = useState(1);
    const [StorageLocation, setStorageLocation] = useState('');
    const [minQuantity, setminQuantity] = useState(4);
    const [status, setStatus] = useState();
    const [checkbox, setCheckbox] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [id, setID] = useState(null);

    useEffect(() => {
        Setters()
    }, []);
    function Setters() {
        setID(localStorage.getItem('ID'))
        setassetName(localStorage.getItem('Asset Name'));
        setAlertEmail(localStorage.getItem('Email'));
        setQuantity(localStorage.getItem('Quantity'));
        setminQuantity(localStorage.getItem('MinQuantity'));
        setStatus(localStorage.getItem('Status'));
        setCheckbox(localStorage.getItem('Returnable'));
        setStorageLocation(localStorage.getItem('Location'));
    }
    const updateAPIData = () => {
        setShowForm(true)
        alert("Asset has been updated")
        const updatedAsset = { assetName, AlertEmail, Quantity, minQuantity, status, checkbox, StorageLocation }
        api.put('/assets/' + id, updatedAsset)
    }


    return (
        <section>
            {/* Update form */}
            {showForm ? (<Home />) : (<div>
                <Form className="mx-10 my-10 flex flex-col" >

                    <div class="w-[330px]">
                        <Link href="./">
                            <AiOutlineClose size={24} class="fill-[#000] hover:fill-red-600 float-right" />
                        </Link>

                    </div>
                    <h1 class="mt-3 ml-1 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.05px]
font-family: Inter;">Update Asset</h1>
                    <p class="ml-1 mb-3  w-[340px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
font-family: Inter;">Please use this form to create an asset. The form will not submit without an asset name or email. Kindly specify if an asset is returnable to aid in stock management.</p>
                    <div class="flex flex-row gap-5 ">
                        <Form.Field>
                            <label class="text-black">Asset Name</label>
                            <input aria-invalid="true" aria-describedby='reqerrmsg' value={assetName} onChange={(e) => setassetName(e.target.value)} className='text-black flex w-[175px] h-[20px] pl-3 py-[17px] rounded
bg-gray-200  text-black-700' />

                            <p id="reqerrmsg" class="text-red-500">Required</p>
                        </Form.Field>
                        <Form.Field>
                            <label class="text-black">Alert Email</label>
                            <input value={AlertEmail}
                                // pattern=".+@example\.com"
                                onChange={(e) => setAlertEmail(e.target.value)}
                                className='text-black flex w-[175px] h-[20px] pl-3 py-[17px] rounded
bg-gray-200  text-black-700'/>
                            <p id="reqerrmsg" class="text-red-500">Required</p>

                        </Form.Field>
                    </div>
                    <div class="flex flex-row gap-5 ">
                        <Form.Field>
                            <label class="text-black">Storage Location</label>
                            <input value={StorageLocation} placeholder="ex: MIS 1 Shelf A1" onChange={(e) => setStorageLocation(e.target.value)} className='text-black flex w-[175px] h-[20px] pl-3 py-[17px] rounded
bg-gray-200  text-black-700'/>
                            <p id="reqerrmsg" class="text-red-500">Required</p>
                        </Form.Field>
                        <Form.Field>
                            <label class="text-black">Quantity</label>
                            <input value={Quantity} type="number" onChange={(e) => setQuantity(e.target.value)} className='text-black flex w-[175px] h-[20px] pl-3 py-[17px] rounded
bg-gray-200  text-black-700'/>

                        </Form.Field>
                    </div>
                    <div class="flex flex-row gap-5 ">
                        <Form.Field>
                            <label class="text-black" >Minimum Quantity</label>
                            <input value={minQuantity} type="number" onChange={(e) => setminQuantity(e.target.value)} className='text-black flex w-[175px] h-[20px] pl-3 py-[17px] rounded
bg-gray-200  text-black-700'/>

                        </Form.Field>
                        <Form.Field class="mt-7">
                            <label class="text-black">Returnable:</label>
                            <input value={Checkbox} type="checkbox" onChange={(e) => setCheckbox(!checkbox)} class="ml-2 text-black  w-[15px]" ></input>
                        </Form.Field>

                    </div>
                    <Form.Field>
                        <label class="text-black"> Status: </label>
                        <br></br>
                        <select value={status} class="text-black rounded bg-gray-200 border-gray-200  px-4 py-2 pr-8 shadow leading-tight
        focus:outline-none focus:shadow-outline">
                            <option value={status} onChange={(e) => setStatus(e.target.value)} > Ready to be deployed </option>
                            <option value={status} onChange={(e) => setStatus(e.target.value)} > Damaged/Lost </option>
                        </select>

                    </Form.Field>
                    <br></br>
                    <Button type='submit' onClick={updateAPIData}
                        disabled={!assetName || !AlertEmail}
                        className="mx-3 w-[173px] h-[34px] rounded
                 bg-[black] text-[white] disabled:bg-[grey] hover:bg-[#087EA4]">Update</Button>
                </Form>
            </div>)}

        </section>
    )
}