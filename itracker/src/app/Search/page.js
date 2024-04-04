"use client"
import { useState, useEffect } from "react"
import axios from "axios"
const SelectedAssets = [];

function Selected() {
  const [selected, setSelected] = useState(false);
  function handleChecked(e) {
    setSelected(e.target.selected);
  }
  return (
    <div>
      <input type="checkbox"></input>
    </div>
  )
}
export default function Search() {

  const [assetList, setAssetList] = useState([]);
  const [search, setSearch] = useState("");

  let counter = 1;
  const url = new URL(`https://65f8f806df151452461037b3.mockapi.io/Asset`);
  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setAssetList(response.data);
      })
  }, []);

  return (
    <div class="w-[370px]">
      <input type="text"
        class=" w-[310px] ml-3 peer mt-2  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
        placeholder="Search for assets by name" onChange={(e) => setSearch(e.target.value)}>
      </input>
      <div class="mt-3 ml-3 flex flex-row flex-wrap gap-[4px]">
        {assetList.filter((item) => {
          if (search === "") {
            return item
          }
          else if (item.assetName.toLowerCase().includes(search.toLowerCase())) {
            return item
          }
        })
          .map((item) => {
            return (
              <div key={item.ID} class="ml-2">
                <div class="w-[100px] " id="assets">
                  <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] ">
                    {/* <input type="checkbox" class="float-right" onChange={handleChecked}></input> */}
                    <Selected />
                  </div>
                  <h1 class="ml-3 mt-0.5 w-[70px]">{item.assetName}</h1>
                </div>

              </div>

            )


          }
          )

        }

      </div>

    </div>
  )
}


