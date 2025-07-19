import React from "react";
import { message, Modal } from "antd";
import { EditFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";


const { confirm } = Modal;

export const switchOnFieldsChange = (campo, changeFields, setRequest) => {
    switch (campo) {
        case "fechaRecepcion":
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
                fechaRecepcion: changeFields[0].value?dayjs(changeFields[0].value).format("DD/MM/YYYY"):"",
            }));
            break;
        
        default:
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
            }));
    }
};





