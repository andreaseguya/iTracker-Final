
"use client"
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import moment from "moment";
import { BsCart4 } from "react-icons/bs";
import { StateMachineProvider, createStore } from "little-state-machine";
import { useStateMachine } from "little-state-machine"
import updateAction from "./updateAction";
createStore({});

export default function Kits() {
    const [currentPage, setCurrentPage] = useState(1);
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

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    };

    const renderStep = () => {
        switch (currentPage) {
            case 1:
                return <Step1 />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            default:
                return null;
        }
    };

    const Step1 = () => {
        const [assets, setAssets] = useState([]);
        const [searchAsset, setSearchAsset] = useState('')
        const [showModal, setShowModal] = useState(false);
        const { actions, state } = useStateMachine({ updateAction });
        useEffect(() => {
            const fetchAssets = async () => {
                try {
                    const response = await api.get('/assets');
                    setAssets(response.data);
                } catch (err) {
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else {
                        console.log(`Error: ${err.message}`);
                    }
                }
            }
            fetchAssets();
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
        const searchHelper = (event) => {
            setSearchAsset(event.target.value)
        }
        const toggleModal = () => {
            setShowModal(!showModal);
        };
        const closeModal = () => {
            setShowModal(false);
        };
        const addtoCart = (newAsset) => {
            cartAssets.append(newAsset)
        }
        const onSubmit = (data) => {
            actions.updateAction(data);
            // props.history.push("./step2");
        };
        return (
            <div>
                <div class="mb-2 flex flex-row gap-[220px]">
                    <h2 class="mt-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits</h2>
                    <button class="" onClick={toggleModal}>
                        <BsCart4 size={24} class="hover:fill-red-600" />
                    </button>
                </div>
                <div class="w-[330px]">
                    <p class=" w-[320px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits cater to bundling assets together into one loanable item. They can be checked out to a asset or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan a bar code to add  item</p>
                    <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="flex flex-row mt-5 mb-2 ">
                        <p class="text-black text-[15px] not-italic font-semibold leading-4 tracking-[-0.41px];
  font-family: Inter;">Kit name:</p>
                        <input {...register("kitName")} defaultValue={state.kitName} class=" -mt-3 ml-3 w-[230px] h-8 rounded-lg bg-gray-100" />
                    </div>
                    <div class="flex w-[320px] h-[1px] bg-gray-200"></div>
                    {/* Search Bar */}
                    {/* search bar */}
                    <div class="mt-2 flex w-[300px] h-[1px] bg-gray-200 mb-2"></div>
                    <div class="flex flex-row  gap-4">
                        <input
                            type="text"
                            class="w-[300px]  bg-[rgba(151,151,151,0.14)] text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                            placeholder="Search and add assets to check out"
                            value={searchAsset}
                            onChange={searchHelper}
                        />
                        <button type="button" onClick={toggleModal}><BsCart4 size={24} class="hover:fill-red-600" /></button>
                    </div>
                    {/* Cart */}
                    <div class=" mt-3 w-[300px] flex flex-row gap-3 flex-wrap">
                        {assets
                            .filter((asset) => {
                                if (searchAsset == "") {
                                    return "";
                                }
                                else if (asset.assetName.toLowerCase().includes(searchAsset.toLowerCase()))
                                    return asset

                            })
                            .map((asset) => {
                                if (asset.assetName.toLowerCase().includes(searchAsset.toLowerCase())) {
                                    return (
                                        <div key={asset.id} class="">
                                            <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "> </div>
                                            <h1 class="ml-3 mt-0.5 w-[70px]">{asset.assetName}</h1>
                                            {/* <h1 class="ml-3 mt-0.5 w-[70px]">{quantity}</h1> */}
                                            <button
                                                type="button" className="mt-3 ml-2 w-[50px] text-white rounded-[5px] bg-black hover:bg-red-500 p-1"
                                                onClick={() => {
                                                    append(asset);
                                                    alert("Asset Added! Check shopping cart for full list of selected assets")
                                                    // setQuantity(count);
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    )
                                }
                            }
                            )
                        }
                    </div>
                    <div class="mt-2 flex w-[320px] h-[1px] bg-gray-200"></div>

                    <input type="submit" />
                </form>

            </div>
        );
    };

    const Step2 = () => {
        const { register, handleSubmit } = useForm();
        const { state, actions } = useStateMachine({ updateAction });
        const [startDate, setStartDate] = useState(new Date());
        const onSubmit = (data) => {
            actions.updateAction(data);
            //   props.history.push("./result");
        };

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 class=" h-12 flex-col justify-center text-slate-800 text-2xl not-italic font-semibold leading-[26px] tracking-[0.3px]">Let's finalize this deployment</h1>
                <p class="  flex-col justify-center text-slate-800 text-base not-italic font-medium leading-[26px] tracking-[0.3px]">Select return date</p>

                <input type="submit" />
            </form>
        );
    };

    const Step3 = () => {
        const { state } = useStateMachine(updateAction);
        return (
            <>
                <h2>Result:</h2>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </>
        );
    };

    return (
        <div>
            <StateMachineProvider>

                <div className="wizard-content">
                    {renderStep()}
                </div>
                <div className="wizard-footer" class="flex flex-row gap-4">
                    <button onClick={handleBack} disabled={currentPage === 1}>
                        Back
                    </button>
                    <button onClick={handleNext} disabled={currentPage === 3}>
                        Next
                    </button>
                </div>
            </StateMachineProvider>

        </div>
    );
};

