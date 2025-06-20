import { User2, Upload, Image, X } from "lucide-react";
import React, { useRef, useState } from "react";

const PhotoUpload = () => {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleClickUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* Upload Area */}
      <div
        className={`relative w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all
          ${
            isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }
          ${image ? "border-transparent" : ""}
        `}
        onClick={handleClickUpload}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="Profile preview"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            {isDragging ? (
              <span className="text-green-500">Drop image here</span>
            ) : (
              <>
                <User2 size={48} className="text-gray-400 mb-2" />
                <span className="text-sm">Click to upload</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* File Info */}
      {image && (
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 max-w-xs">
          <Image size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 truncate">
            {image.name}
          </span>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleClickUpload}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Upload size={16} />
        {image ? "Change Photo" : "Upload Photo"}
      </button>

      {/* Instructions */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p>File size maximum 1MB</p>
        <p>Allowed file types: JPG, PNG, GIF</p>
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/jpeg, image/png, image/gif"
      />
    </div>
  );
};

export default PhotoUpload;
