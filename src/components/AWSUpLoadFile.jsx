import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useState } from "react";
import UpLoadFile from "./UpLoadFile";
import toast from "react-hot-toast";

const client = new S3Client({ region: `${import.meta.env.VITE_AWS_S3_REGION}` });

function AWSUPLoadFile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop().toLowerCase();

    // 허용되는 확장자 목록
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif','webp'];

    if (!allowedExtensions.includes(fileExt)) {
      toast.error('jpg, jpeg, png, gif, webp 파일만 업로드가 가능합니다.');
      return;
    }

    setSelectedFile(file);
  };

  const uploadS3 = async () => {
    if (!selectedFile) return;

    const uploadParams = {
      Bucket: `${import.meta.env.VITE_AWS_S3_BUCKET_NAME}`,
      Key: `category/${selectedFile.name}`,
      Body: selectedFile,
    };

    try {
      const result = await client.send(new PutObjectCommand(uploadParams));
      console.log("Successfully uploaded file.", result);
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
    }
  };

  return (
    <>
      <UpLoadFile onChange={onFileChange} onClick={uploadS3} selectedFile={selectedFile}/>
    </>
  );
}

export default AWSUPLoadFile;
