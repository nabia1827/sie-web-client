import React from "react";
import { message, Modal } from "antd";
import { EditFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";


const { confirm } = Modal;

export const switchOnFieldsChange = (campo, changeFields, setRequest) => {

    console.log("aaaa: ", campo, " - ", changeFields)
    switch (campo) {
        case "codigoLegajo":
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
                codigoLegajo: changeFields[0].value,
            }));
            break;
        case "tipoCaso":
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
                tipoCaso: changeFields[0].value,
            }));
            break;
        case "nroCaso":
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
                nroCaso: changeFields[0].value,
            }));
            break;

        case "fechaRegistro":
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
                fechaRegistro: {
                    fechaRegistroInicio: changeFields[0].value
                        ? dayjs(changeFields[0].value[0]).format("YYYY-MM-DD")
                        : "", // Si el valor es null, se asigna null
                    fechaRegistroFin: changeFields[0].value
                        ? dayjs(changeFields[0].value[1]).format("YYYY-MM-DD")
                        : "", // Lo mismo para la fecha de fin
                },
            }));
            break;
        case "abogadoId":
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
                abogadoId: changeFields[0].value,
            }));
            break;
        default:
            setRequest((prev) => ({
                ...prev,
                pageNumber: 1,
            }));
    }
};





