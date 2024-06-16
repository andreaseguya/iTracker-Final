"use client"
import React, { useState, useEffect } from "react";
import api from '../api/assetList'
import { useFieldArray, useForm } from "react-hook-form"
function StepControls(){
   
    
    return (
        <section>
            
        </section>
    );
}
export default function Kits(){
    const [Assets,setAssets]=useState([])
    const [search,setSearch]=useState('')
    const [showModal, setShowModal] = useState(false); 
    const [step, setStep] = useState(1);
    const handleNext = () => { setStep(step + 1);  };
    const handleBack = () => { setStep(step - 1); };
    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNext={handleNext} />;
            case 2:
                return <Step2 onBack={handleBack} onNext={handleSubmit} />;
            default:
                return null;
        }
    };
  
    useEffect(() => {
        api.get(`/assets`)
            .then((response) => {
                setAssets(response.data);
            })
    }, [])
    const { register, control, unregister, handleSubmit, reset, watch, errors } = useForm({
        defaultValues: {
            cartAssets: [],
        }
    })
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "cartAssets"
    });
    const toggleModal = () => {setShowModal(!showModal);};
    const closeModal = () => {setShowModal(false); };
    
    const Step1 = ({ onNext }) => {
        return(
            <section>
                 <div class="mb-2 flex flex-row gap-[220px]">
                    <h2 class="mt-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits</h2>
                    {/* <button class="" onClick={toggleModal}>
                        <BsCart4 size={24} class="hover:fill-red-600" />
                    </button> */}
                </div>
            <div class="w-[330px]">
            <p class=" w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
            <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
            </div>
            {/* <form onSubmit={postData}> */}
            <div class="flex flex-row mt-5 mb-2 ">
            <p class="text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Kit name:</p>
            <input type="text" {...register("kitName")} class=" -mt-3 ml-3 w-[230px] h-8 rounded-lg bg-gray-100"></input>
                </div>
            {/* </form> */}
                
            <button class="mt-3" onClick={onNext}>Next step</button>
            </section>
        )
    }
    const Step2 = ({ onBack, onSubmit }) => {
        return(
            <section>2
                 <button class="mr-3" onClick={onBack}>Back</button>
                 <button onClick={onSubmit}>Create Kit</button>
            </section>
        )
    }
    return (<section> {renderStep()} </section>)
}