"use client"
import {useState} from 'react'
export default function Admin(){
    const [users, setUsers]=useState([])
    return(
        <section>
            <div id="Header" class="flex flex-row">
                <div class="w-[104px] h-[104px] rounded-[50%] bg-[#DFDFDF]"></div>
                <div>
                    <h1>Admin</h1>
                </div>

            </div>
        </section>
    )
}