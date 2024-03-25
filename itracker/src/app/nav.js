"use client"
import React, { useState } from 'react';


const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);
    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);

    };

    return (
        <section >
            <div className="py-4">
                {children.map(child => {
                    if (child.props.label === activeTab) {
                        return <section key={child.props.label}  >
                            {child.props.children}</section>;
                    }
                    return null;
                })}
            </div>
            <div id="navContainer" className="mt-10 h-[84px] w-[420px]  bg-[black]">
                <div className="flex">
                    {children.map(child => (

                        // button appearance for tabs
                        <button
                            key={child.props.label}
                            className={`${activeTab === child.props.label ? 'bg-[url(/images/navEllipse.svg)] h-[92px] w-full mt-[-46px] bg-no-repeat bg-center -mb-2.5 left-0' : ''
                                } flex-1 text-gray-400 font-medium py-2`}
                            onClick={e => handleClick(e, child.props.label)}
                        >
                            <div class="ml-4 w-[53px] h-[56px] bg-[#000] rounded-[50%] pt-3">
                                <div class="">
                                    {child.props.id}
                                </div>

                            </div>

                        </button>
                    ))}
                </div>

            </div>


        </section>
    );
};

const Tab = ({ label, children }) => {
    return (
        <section label={label} className="hidden">
            {children}
        </section>
    );
};



export { Tabs, Tab };