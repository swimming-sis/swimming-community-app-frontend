import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useState } from "react";
import UpLoadFile from "./UpLoadFile";

const client = new S3Client({ region: "<region>" });

function AWSUPLoadFile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop().toLowerCase();

    // 허용되는 확장자 목록
    const allowedExtensions = ['jpg', 'jpeg', 'png'];

    if (!allowedExtensions.includes(fileExt)) {
      alert('jpg, jpeg, png 파일만 업로드가 가능합니다.');
      return;
    }

    setSelectedFile(file);
  };

  const uploadS3 = async () => {
    if (!selectedFile) return;

    const uploadParams = {
      Bucket: "<bucket-name>",
      Key: `upload/${selectedFile.name}`,
      Body: selectedFile,
    };

    try {
      const result = await client.send(new PutObjectCommand(uploadParams));
      console.log("Successfully uploaded file.", result);
    } catch (err) {
      console.error("Error occurred while uploading file:", err);
    }
  };

  return (
    <>
      <UpLoadFile onChange={onFileChange} onClick={uploadS3}/>
    </>
  );
}

export default AWSUPLoadFile;
