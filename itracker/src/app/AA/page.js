"use client"
import { useState } from "react";
import { useRef } from "react";
export default function Importer() {
    const [fileName, setFileName] = useState("");
    const handleFile = (file) => {
        setFileName(file.name);
        console.log("testing output: ", fileName)
    };
    const FileUploader = ({ handleFile }) => {
        // Create a reference to the hidden file input element
        const hiddenFileInput = useRef(null);

        // Programatically click the hidden file input element
        // when the Button component is clicked
        const handleClick = (event) => {
            hiddenFileInput.current.click();
        };
        // Call a function (passed as a prop from the parent component)
        // to handle the user-selected file
        const handleChange = (event) => {
            const fileUploaded = event.target.files[0];
            handleFile(fileUploaded);
        };
        return (
            <>
                <div class="  bg-[#979797] rounded-[10px] text-center w-[97px] ml-2">
                    <button className="button-upload" onClick={handleClick} class=" hover:text-white text-black text-[15px] not-italic font-semibold leading-5 tracking-[-0.24px]
  font-family: Inter"> +IMPORT </button> </div>
                <input
                    type="file"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: "none" }} // Make the file input element invisible
                />
            </>
        );
    };
    return (
        <div>
            <FileUploader handleFile={handleFile} />
            {/* {fileName ? <p>Uploaded file: {fileName}</p> : null} */}
        </div>
    )
}
