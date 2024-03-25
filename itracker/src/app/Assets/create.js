"use client"
import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import Home from '../page';
import Link from 'next/link';

export default function Create() {

    const [assetImage, setassetImage] = useState('');
    const [assetName, setassetName] = useState('');
    const [AlertEmail, setAlertEmail] = useState('');
    const [Quantity, setQuantity] = useState(1);
    const [StorageLocation, setStorageLocation] = useState('');
    const [minQuantity, setminQuantity] = useState(4);
    const [status, setStatus] = useState();
    const [checkbox, setCheckbox] = useState(false);
    const [showForm, hideForm] = useState(true);

    const PostData = () => {
        alert("Asset successfully created");
        hideForm(false);
        axios.post(`https://65f8f806df151452461037b3.mockapi.io/Asset`, {
            assetName,
            AlertEmail,
            Quantity,
            StorageLocation,
            minQuantity,
            status,
            checkbox
        })


    }
    return (
        <section>
            {showForm ? (
                <Form className="create-form mx-10 my-10 flex flex-col" >
                    {/* <Form.Field class="mb-5 w-[355px] h-[150px] rounded-[34px] bg-gray-200">
                        <button class="bg-[] w-[30px] h-[30px]"></button>
                    </Form.Field> */}
                    <div class="w-[330px]">
                        <Link href="./">
                            <button class="text-black float-right font-bold">X</button>
                        </Link>

                    </div>
                    <h1 class="mt-3 ml-1 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.05px]
  font-family: Inter;">Create an Asset</h1>
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
                                pattern=".+@example\.com"
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
                        <label class="text-black">Status: </label>
                        <br></br>
                        <select value={status} class="text-black rounded bg-gray-200 border-gray-200  px-4 py-2 pr-8 shadow leading-tight
                            focus:outline-none focus:shadow-outline">
                            <option value={status} onChange={(e) => setStatus(e.target.value)} > Ready to be deployed </option>
                            <option value={status} onChange={(e) => setStatus(e.target.value)} > Damaged/Lost </option>
                        </select>

                    </Form.Field>

                    <br></br>
                    <Button type='submit' onClick={PostData}
                        disabled={!assetName || !AlertEmail}
                        className="mx-3 w-[173px] h-[34px] rounded
                 bg-[black] text-[white] disabled:bg-[grey] hover:bg-[#087EA4]">Submit</Button>
                </Form>
            ) : (
                <section>
                    <Home />
                </section>
            )}
        </section>

    )

}