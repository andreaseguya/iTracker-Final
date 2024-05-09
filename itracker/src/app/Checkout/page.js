"use client"
import SearchBar from "../AssetSearch/page";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
export default function Check() {
    return (
        <section class="w-[350px] ml-3">
            <div class="flex flex-row">
                <h1 class=" text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
                    font-family: Inter; "> Loans</h1>
                <p class=" pl-20 ml-[110px] text-sm text-red-500 hover:text-black">Check in</p>
            </div>
            <div >
                <p class="w-[350px]">
                    Search for an asset to checkout or click check in to return a borrowed asset </p>
                <div class="mt-2 w-[320px]">
                    <SearchBar />
                </div>
            </div>
            <div>
                <Tabs>
                    <TabList>
                        <div class="flex flex-row gap-[50%] h-10 pl-2 pt-2 pb-1 rounded-[10px] bg-[#DFDFDF]">
                            <Tab>Check out</Tab>
                            <Tab >Check in</Tab>
                        </div>
                    </TabList>
                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    )
}


function Loans() {
    return (
        <section>

        </section>
    )
}