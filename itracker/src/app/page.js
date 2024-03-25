"use client"
import { Tabs, Tab } from './nav';
import { BsQrCodeScan } from "react-icons/bs";
import { GrDropbox } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { BsDatabaseFillGear } from "react-icons/bs";
import { ReadHelper } from './Assets/ReadHelper';

export default function Home() {
  return (
    <main className="mx-10 my-10">
      <Tabs >
        <Tab label="asset" id=<GrDropbox class="ml-4 size-[20px] fill-white" />>
          <section className="py-4">
            <ReadHelper />
          </section>
        </Tab>
        <Tab label="test2" id=<RiAdminLine class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" ></section>
        </Tab>
        <Tab label="test3" id=<BsQrCodeScan class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" ></section>
        </Tab>
        <Tab label="test4" id=<BsCart4 class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" ></section>
        </Tab>
        <Tab label="test5" id=<BsDatabaseFillGear class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" ></section>
        </Tab>
      </Tabs>

    </main>
  );
}
