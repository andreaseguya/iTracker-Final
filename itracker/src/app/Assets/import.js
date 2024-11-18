"use client"
import { useState } from "react";
import { useRef } from "react";
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import './importdata.css'
import Papa from 'papaparse';
import api from '../api/assetList'
function Import() {
    const [csvData, setCsvData] = useState([]);
    const [jsonData, setJsonData] = useState(null);
    const [importData, setImportData] = useState([]);
    const formData = new FormData();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        // reader.onload = (event) => {
        //     const csvText = event.target.result;
        //     const rows = csvText.split('\n');
        //     const headers = rows[0].split(',');
        //     const data = rows.slice(1).map((row) => {
        //         const values = row.split(',');
        //         return headers.reduce((obj, header, index) => {
        //             obj[header] = values[index];
        //             return obj;
        //         }, {});
        //     });

        //     setCsvData(data);
        //     setJsonData(JSON.stringify(data));
        // };

        // reader.readAsText(file);
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'csv') {
            alert('Please upload a CSV file.');
            return;
        }
        Papa.parse(file, {
            complete: (result) => {
                setCsvData(result.data);
            },
            header: true,
        });
        const res = JSON.stringify(csvData, null, 2);
        setJsonData(res)
    };
    const FileUploader = ({ newAsset }) => {
        // Create a reference to the hidden file input element
        const hiddenFileInput = useRef(null);
        const handleClick = (event) => {
            hiddenFileInput.current.click();
        };

        return (
            <div class="  bg-[#979797] rounded-[10px] text-center w-[97px] ml-2">
                <button className="button-upload" onClick={handleClick} class=" hover:text-white text-black text-[15px] not-italic font-semibold leading-5 tracking-[-0.24px]
 font-family: Inter"> +IMPORT </button>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv"
                    ref={hiddenFileInput}
                    style={{ display: "none" }} // Make the file input element invisible
                />
            </div>
        )
    }
    //TODO: will post but with additional lines and content
    const PostData = async (e) => {
        e.preventDefault();
        const newAsset = jsonData;
        try {
            const res = await api.post('/imports', csvData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    const FileViewer = () => {
        const [modalIsOpen, setIsOpen] = useState(true)
        function openModal() {
            setIsOpen(true);
        }
        function afterOpenModal() {
            // references are now sync'd and can be accessed.
            // subtitle.style.color = '#f00';
        }
        function closeModal() {
            setIsOpen(false);
        }
        return (
            <div>

                <Modal classname="FileModal" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal}>
                    <div class="float-end">
                        <button onClick={closeModal}>
                            <IoClose class="size-[30px]" />
                        </button></div>
                    <table id="imports">
                        <thead>
                            <tr>
                                {csvData[0] && Object.keys(csvData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div class="ml-2 flex flex-row gap-2">
                        <button onClick={PostData} >Add to Inventory</button>
                        <button onClick={closeModal}>Cancel Import</button>
                    </div>

                </Modal>
            </div>
        )
    }
    const AssetCreater = () => {

        return (
            <div>

            </div>
        )
    }
    return (
        <div>
            <FileUploader />
            {csvData.length > 0 && (
                <div>
                    <FileViewer />
                </div>
            )}



        </div>
    );
}


export default Import;