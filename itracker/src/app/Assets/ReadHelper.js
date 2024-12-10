"use client"
import Read from "./read"
import Link from "next/link"
import Import from "./import"
import Export from './export';

export function ReadHelper() {
    return (
        <section class="flex flex-col">
            <div class="grid grid-cols-2 gap-[30px] w-[450px]">
                <h2 class="mt-3 ml-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">All Assets</h2>
                <Link href="/Assets" class="">
                    <button class="mt-3 ml-20 bg-[url(/images/add.svg)] bg-no-repeat bg-center w-[30px] h-[30px]"></button>
                </Link>

            </div>
            <p class="ml-3 w-[400px] text-black text-[15px] not-italic font-normal leading-[30px] tracking-[0.35px]
  font-family: Inter;">This includes all assets regardless of loan or kit status. Assets can be checkout and updated as needed.To update an asset, click the respective profile and apply edits.
            </p>
            <div class="flex flex-row w-[350px]  gap-[100px] mt-2">
                <div  >
                    {/* <button class=" hover:text-white text-black text-[15px] not-italic font-semibold leading-5 tracking-[-0.24px]
  font-family: Inter">+IMPORT</button> */}
                    <Import />
                </div>

                {/* <div class=" bg-[#979797] rounded-[10px] text-center w-[97px] ml-10">
                    <button class="text-center hover:text-white text-black text-[15px] not-italic font-semibold leading-5 tracking-[-0.24px]
  font-family: Inter">- EXPORT</button>
                </div> */}
                <div><Export /></div>
            </div>
            <section class="mt-5"><Read /></section>

        </section>
    )
}