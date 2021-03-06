import React, { useState } from "react";
import "./App.css";
import ImageUploader from "react-images-upload";
import axios from "axios";

function App() {
  const uploadURL = "put url here, not added to github to hide url";

  const [currentImage, setCurrentImage] = useState(null);
  const [imageData, setImageData] = useState({});

  const selectImage = (failedImages, successImages) => {
    // console.log("successImages: ", successImages);
    const data = successImages[0];
    const parts = data.split(";");

    setImageData({
      mime: parts[0].split(":")[1],
      name: parts[1].split("=")[1],
      data: parts[2]
    });

    setCurrentImage(successImages);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    console.log("image upload data: ", imageData);
    await axios.post(uploadURL, {
      mime: imageData.mime,
      name: imageData.name,
      image: imageData.data
    });
  };

  return (
    <div className="App">
      <ImageUploader
        key="upload-from"
        withIcon={true}
        singleImage={true}
        withPreview={true}
        label="Maximum size file: 5MB"
        buttonText="Select Image"
        imgExtension={[".jpg", ".png", ".jpeg"]}
        maxFileSize={5242880}
        onChange={selectImage}
      ></ImageUploader>
      <button type="button" onClick={submitImage}>
        Upload Image
      </button>
      <img src={currentImage} alt="sample of what it will look like" />
    </div>
  );
}

export default App;
