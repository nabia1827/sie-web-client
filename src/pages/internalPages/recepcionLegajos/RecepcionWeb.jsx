import React, { useState } from "react";
import { Table, Upload, Button } from "antd";

function RecepcionWeb() {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    return (
        <>
            <Upload {...props}>
                <Button >Select File</Button>
            </Upload>
        </>
    );

}

export default RecepcionWeb;