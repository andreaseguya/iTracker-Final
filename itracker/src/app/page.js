"use client"
import { Tabs, Tab } from './nav';
import { BsQrCodeScan } from "react-icons/bs";
import { GrDropbox } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { BsDatabaseFillGear } from "react-icons/bs";
import { ReadHelper } from './Assets/ReadHelper';
import Inventory from './Stock/page';
import Kits from './Kits/page';
// import Kits from './KitsOld/page';
import Check from './Checkout/page';
import Admin from './Admin/page';

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
          <section className="py-4" ><Admin /></section>
        </Tab>
        <Tab label="test3" id=<BsQrCodeScan class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" >
            <Check />
          </section>
        </Tab>
        <Tab label="test4" id=<BsCart4 class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" >
            <Kits />
          </section>
        </Tab>
        <Tab label="test5" id=<BsDatabaseFillGear class="ml-4 size-[20px] fill-white" />>
          <section className="py-4" >
            <Inventory />
          </section>
        </Tab>
      </Tabs>

    </main>
  );
}
