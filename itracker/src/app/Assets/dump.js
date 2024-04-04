import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

const terms = 'By sending your information, you agree to the following';
const termsLink = ' terms and conditions.';

const tc = 'By clicking the "Submit" button below, I confirm that I have read, understood, and given my consent for the company and its affiliates, representatives, agents, third-party service providers, contractors, and/or appointed distribution/business partners (collectively referred to as "the Company") to collect, use, disclose, and/or process my personal data for the purpose of Asseting me about products and services offered by the Company through marketing activities via all channels including but not limited to SMS, social media, in-app push notifications, phone calls, etc., and perusing my Asset details which the Company has in its records from time to time and in accordance with the Company\'s Data Privacy Notice, which is available at [Privacy Notice URL]. I hereby expressly understand and agree that my given consents herein do not supersede or replace any other consents and/or previous consents which I may have previously given to the Company in respect of my personal data and are without prejudice to any legal rights available to the Company to collect, use, or disclose my personal data. I understand that I can refer to the Company\'s Data Privacy Notice, which is available at [Privacy Notice URL] for more information. I may Asset [Representative Name], a representative of the Company, at [Representative Asset Number] on how I may access and correct my personal data or withdraw consent to the collection, use, or disclosure of my personal data.';

const Asset = (props) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div id="Asset" className={`relative min-h-screen flex bg-orange-200`}>
            <div className="container max-w-screen-xl mx-auto flex items-center justify-center text-center relative z-10">
                <div className="  flex mt-4 text-sm ">
                    <div>{terms}&nbsp;</div>
                    <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleModal}>
                        {termsLink}
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className=" w-2/3 bg-amber-100 p-8 rounded-3xl relative"
                            initial={{ y: '100vh', opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.5 } }}
                            exit={{ y: '100vh', opacity: 0, transition: { type: 'spring', stiffness: 100, damping: 20, duration: 2 } }}
                        >
                            <h2 className="flex justify-center text-xs text-textColorTertiary font-light leading-loose">
                                {tc}
                            </h2>
                            <div className="flex justify-center">
                                <button onClick={closeModal} className="mt-12 w-8 h-8">
                                    <AiOutlineClose size={24} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Asset;