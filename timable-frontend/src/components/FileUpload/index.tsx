import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface FileUpload {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const FileUpload: React.FC<FileUpload> = ({ file, setFile }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const allowedFileExtensions = ["jpg", "jpeg", "png"];

  const validateFileExtension = (fileName: string) => {
    const splitFileName = fileName.split(".") ?? "";
    const fileExtension = splitFileName[splitFileName.length - 1];
    if (!allowedFileExtensions.includes(fileExtension.toLocaleLowerCase())) {
      return false;
    }
    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 1) {
      setErrorMessage("You are only allowed to upload one picture!");
      return;
    }
    const uploadedFile = e.target.files ? e.target.files[0] : null;
    const isFileExtensionValid = validateFileExtension(
      uploadedFile?.name ?? ""
    );

    if (!isFileExtensionValid) {
      setErrorMessage("File extension is not valid!");
      return;
    }

    if (isFileExtensionValid) {
      setErrorMessage("");
    }

    setFile(uploadedFile);
  };

  //   const handleUpload = async () => {
  //     try {
  //       if (!file) {
  //         console.error("No file selected");
  //         return;
  //       }

  //       const formData = new FormData();
  //       formData.append("file", file);

  //       // Replace the URL with your backend endpoint
  //       const response = await axios.post("http://example.com/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       console.log("File uploaded successfully:", response.data);
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
