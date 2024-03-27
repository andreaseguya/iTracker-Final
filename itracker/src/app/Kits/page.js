"use client"
import axios from "axios"
import { useState, useEffect } from "react";


export default function Kits() {
    const [select, setSelect] = useState(true);
    return (
        <section>
            {select ? (
                <div class="w-[350px]">
                    <h1 class=" ml-3 text-black text-[22px] not-italic font-bold leading-[30px] tracking-[0.35px]
  font-family: Inter;">Kits</h1>
                    <p class=" ml-3 mt-2 text-black text-base not-italic font-normal leading-6
  font-family: Inter">Kits allow you to bundle consumables, accessories and assets together into one loanable item. They can be checked out to a user or location. To get started, select which items you would like to add to your first kit.  Alternatively, scan or enter a bar code to add  item</p>
                    <div>
                        {/* <KitAssets /> */}
                    </div>
                </div>
            ) :

                (<div>


                </div>)}

        </section>
    )


}

const KitAssets = () => {
    const [checked, setChecked] = useState(false);
    function handleChange(e) {
        setChecked(e.target.checked);
    }
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {

        axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset`)
            .then((response) => {
                setAPIData(response.data);
            })

    }, [])
    const setData = (data) => {
        let { assetName, Quantity, ID } = data;
        localStorage.setItem('Quantity', Quantity);
        localStorage.setItem("Asset Name", assetName);
        localStorage.setItem("ID", ID);

    }

    return (
        <section>
            {APIData.map((data) => {
                <div>
                    <div>

                    </div>
                    <p>{data.assetName}</p>
                    <p>{data.Quantity}</p>
                    <input value="KitItem" type="checkbox" onChange={handleChange} />
                </div>
            })}
        </section>
    )
}
const KitForm = () => {
    const [state, setState] = useState({
        assets: [],
        kitName: '',
        loanee: '',
        requestDate: '',
        returnDate: '',
        Returnable: true,
        Notes: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Send kit data to API
    }

}