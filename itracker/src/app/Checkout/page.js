"use client"
import Search from "../Search/page";
import Link from "next/link";
export default function Check() {
    return (
        <section>
            <div class=" ml-5 border-gray-200  dark:border-gray-700 w-[350px]">
                <div class="flex flex-row">
                    <h1 class="ml-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter; "> Loans</h1>
                    <Link href="/CheckIn" class=" pl-20 ml-20 text-sm text-red-500">
                        <p>Check in</p>
                    </Link>
                </div>
                <p class="ml-3">
                    Select an asset to checkout or check in a loaned asset by ID </p>
            </div>
            <div class="ml-5">
                {/* Add Search here */}

            </div>

        </section>
    )
}
function CheckOut() {
    return (
        <section>

        </section>
    )
}