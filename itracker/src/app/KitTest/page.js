"use client"
import api from '../api/assetList'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { BsCart4 } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import UserCartComponent from '../Kits/UserCartComponent';
import SearchComponent from '../Kits/SearchComponent';

const KitForm = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNext={handleNext} />;
            case 2:
                return <Step2 onBack={handleBack} onNext={handleNext} />;
            case 3:
                return <Step3 onBack={handleBack} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("complete")
    }
    return (
        <section>
            {renderStep()}
        </section>
    );
};

const Step1 = ({ onNext }) => {
    const [name, setName] = useState('');
    return (
        <div class="ml-3 ">
            {/* <h1>Step 1</h1> */}
            <div class="mb-2  flex flex-row gap-[220px]">
                <h2 class="mt-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits</h2>
                <button class="">
                    <BsCart4 size={24} class="hover:fill-red-600" />
                </button>
            </div>
            <div>
                <p class=" w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
            </div>
            <div class="flex flex-row mt-5 mb-2 ">
                <p class="text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Kit name:</p>
                <input
                    type="text"
                    // placeholder="Kit Name"
                    class=" -mt-3 ml-3 w-[130px] h-8 rounded-lg bg-gray-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>
            <button onClick={onNext}>Next step</button>
        </div>
    );
};

const Step2 = ({ onBack, onNext }) => {
    const [email, setEmail] = useState('');

    return (
        <div>
            <h1>Step 2</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
};

const Step3 = ({ onBack, onSubmit }) => {
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>Step 3</h1>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onBack}>Back</button>
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default KitForm;