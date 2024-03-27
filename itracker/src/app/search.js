import axios from "axios"
import { useState } from "react";
import { Input } from "@material-tailwind/react";

export default function Search() {
    return (
        <div>
            <input type="search" class=""></input>
        </div>
    )
}

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        const response = await axios.get(`https://65f8f806df151452461037b3.mockapi.io/Asset`, {
            params: {
                query,
            },
        });

        setQuery(response.data);
        console.log(setQuery);
    };

    return (
        <div>
            <form>
                <Input
                    label="Search"
                    variant="static" placeholder="Static"
                    className=''
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button onClick={handleSearch}>Search</button>
            </form>

            <div>
                {query.map((result) => (
                    <div key={result.ID}>

                        <p>{result.assetName}</p> </div>
                ))}

            </div>

        </div>
    );
};

function comb() {

}