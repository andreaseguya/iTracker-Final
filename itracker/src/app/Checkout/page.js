"use client"
import Link from "next/link"
import Search from "../search"

export default function Check() {
    return (
        <section>
            <div class="flex flex-row w-[390px] ml-3 ">

                <Link href="./" class="basis-1/2 hover:border-b-4">
                    <p>Check out</p>
                </Link>

                <Link href="./CheckIn" class="basis-1/2 hover:border-b-4 radio">
                    <p>Check in</p>
                </Link>
            </div>
            <div class="mt-5">
                <Search />
            </div>
        </section>
    )
}