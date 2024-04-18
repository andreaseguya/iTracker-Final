"use client"
import { useState } from 'react'
import SearchBar from '../AssetSearch/page'
export default function Admin() {
    const [users, setUsers] = useState([])
    return (
        <section>
            <div class="ml-3 w-[330px]">
                <h1 class=" text-black text-[22px] not-italic font-bold leading-7 tracking-[0.35px];
  font-family: Inter;">Admin</h1>
                <p>Reports can be generated here as well as changes to user accounts.</p>

            </div>
        </section>
    )
}