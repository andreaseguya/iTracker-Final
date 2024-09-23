"use client"
import React, { useState } from 'react'
import Modal from "react-modal"
import Datetime from 'react-datetime';;
export default function AddModal({ isOpen, onClose, onEventAdded }) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event) => {
        event.preventdefault()
        onEventAdded({
            title,
            start,
            end
        })
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>

                <input placeholder='Title' type="text" value={title} onChange={e => setTitle(e.target)} />
                <div><Datetime value={start} onChange={date => setStart(date)} /></div>
                <div><Datetime value={end} onChange={date => setEnd(date)} /></div>

                <button>Add</button>
            </form>
        </Modal>

    )
}