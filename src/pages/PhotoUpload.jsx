import { User2 } from "lucide-react";
import React, { useRef, useState } from "react";

const PhotoUpload = () => {
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const handleClickUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };
  return (
    <div>
      <>
        <div className="text-center flex flex-col gap-3 items-center mb-10">
          <label htmlFor="image-upload-input">
            {image ? image.name : "Choose an image "}
          </label>
          <div
            className="bg-gray-200  rounded-full h-35 w-35 flex items-center  justify-center cursor-pointer"
            onClick={handleClickUpload}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                size={80}
                className="text-green-500 w-full rounded-full  font-extralight h-full"
              />
            ) : (
              <User2
                size={80}
                className="text-green-500 font-extralight w-20"
              />
            )}
          </div>

          <button
            className="bg-green-500 text-white p-2 rounded-sm mt-4 cursor-pointer"
            onClick={handleClickUpload}
          >
            Upload
          </button>
          <input
            type="file"
            className="hidden border-1 border-gray-300 px-3 py-2  text-sm w-fit"
            placeholder=" Select Image"
            ref={inputRef}
            onChange={handleImageChange}
          />

          <p>File size maximum 1MB</p>
          <p>Allowed file types: JPG, PNG, GIF</p>
        </div>
      </>
    </div>
  );
};

export default PhotoUpload;
