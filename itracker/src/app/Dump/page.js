"use client"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]


export default function Example() {
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [query, setQuery] = useState('')
    const [Data, setData] = useState([]);
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await api.get('/assets');
                setData(response.data);
            } catch (err) {
                if (err.response) {
                    // Not in the 200 response range 
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }

        fetchAssets();
    }, [])

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson} onClose={() => setQuery('')}>
            <ComboboxInput
                aria-label="Assignee"
                displayValue={(person) => person?.name}
                onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxOptions anchor="bottom" className="empty:hidden">
                {filteredPeople.map((person) => (
                    <ComboboxOption key={person.id} value={person} className="group flex gap-2 bg-white data-[focus]:bg-blue-100">
                        {/* <CheckIcon className="invisible size-5 group-data-[selected]:visible" /> */}
                        {person.name}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    )
}