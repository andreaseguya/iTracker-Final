"use client"
import { useState, useEffect } from "react"
import axios from "axios"


import Link from "next/link";
export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const url = new URL(`https://65f8f806df151452461037b3.mockapi.io/Asset?page=${currentPage}&limit=${itemsPerPage}`);
  const [assetList, setAssetList] = useState([]);
  const [search, setSearch] = useState("");
  let counter = 1;
  function increment() {
    counter = counter + 1;
    return counter;
  }
  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setAssetList(response.data);
      })
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(assetList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = assetList.slice(startIndex, endIndex);

  return (
    <div class=" ml-3 w-[370px]">
      <input type="text"
        class=" w-[310px] ml-3 peer mt-2  bg-gray-100 text-blue-gray-700 font-inter font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1  text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
        placeholder="Search for assets by page" onChange={(e) => setSearch(e.target.value)}>
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
              <div key={item.ID} class="ml-2 ">
                <Link href="/Asset">
                  <div class="w-[100px] " id="assets">
                    <div class="bg-gray-200 rounded-[50%] w-[70px] h-[70px] "></div>
                    <h1 class="ml-3 mt-0.5 w-[70px]">{item.assetName}</h1>
                  </div>
                </Link>

              </div>

            )
          })

        }


      </div>
      <div class="mt-5 ml-5">
        <button class="mr-3" onClick={(e) => setCurrentPage(counter + 1)}> next</button>
        <button onClick={(e) => setCurrentPage(counter)}> previous</button>
      </div>
    </div>
  )
}


