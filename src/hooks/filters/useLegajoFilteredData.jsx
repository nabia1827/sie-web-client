import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form } from "antd";

const initialPaginadorState = {
    pageCount: 0,
    pageIndex: 0,
    pageSize: 0,
    count: 0,
    message: "",
    isSuccess: false,
    data: [],
};

const initialCommonRequestState = {
    pagina: 1,
    cantidadRegistrosPorPagina: 10,
    codigoLegajo: "",
    tipoCaso: 0,
    nroCaso: "",
    fechaRegistro: {
        fechaRegistroInicio: "",
        fechaRegistroFin: "",
    },
    abogadoId: "",

};

function useLegajoFilteredData(
    customApiCall,
    allLegajos,
    initialRequestState = initialCommonRequestState
) {
    const [request, setRequest] = useState(initialRequestState);
    const [paginador, setPaginador] = useState(initialPaginadorState);
    const [loading, setLoading] = useState(false);

    const {usuId} = useSelector((state) => state.auth.user);


    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log("request aaa: ",request);

            const filteredRequest = Object.fromEntries(
                Object.entries(request).filter(([key, value]) => {
                    if (key === "fechaRegistro") {
                        return value.fechaRegistroInicio !== "" && value.fechaRegistroFin !== "";
                    } else {
                        return value !== "" && value !== null && value !== 0;
                    }
                })
            );

            if (filteredRequest.fechaRegistro) {
                const { fechaRegistroInicio, fechaRegistroFin } = filteredRequest.fechaRegistro;
                filteredRequest.fechaRegistroInicio = fechaRegistroInicio;
                filteredRequest.fechaRegistroFin = fechaRegistroFin;
                delete filteredRequest.fechaRegistro;
            }

            
            if(!allLegajos){
                filteredRequest.abogadoId = usuId;
            }
            

            try {
                const response = await customApiCall(filteredRequest);
                setPaginador(response);
            } catch (error) {
                // Handle error as needed
            } finally {
                setLoading(false);
            }
        })();
    }, [request]);

    const reloadData = async () => {
        setLoading(true);

        const filteredRequest = Object.fromEntries(
            Object.entries(request).filter(([key, value]) => {
                if (key === "fechaRegistro") {
                    return value.fechaRegistroInicio !== "" && value.fechaRegistroFin !== "";
                } else {
                    return value !== "" && value !== null && value !== 0;
                }
            })
        );

        if (filteredRequest.fechaRegistro) {
            const { fechaInicio, fechaFin } = filteredRequest.fechaRegistro;
            filteredRequest.fechaRegistroInicio = fechaInicio;
            filteredRequest.fechaRegistroFin = fechaFin;
            delete filteredRequest.fechaRegistro;
        }

        
        if(!allLegajos){
            filteredRequest.abogadoId = usuId;
        }

        try {
            const response = await customApiCall(filteredRequest);
            setPaginador(response);
        } catch (error) {
            // Handle error as needed
        } finally {
            setLoading(false);
        }
    };

    const onChange = (pageNumber, pageSize) => {
        setRequest((prevState) => ({
            ...prevState,
            pagina: pageNumber,
            cantidadRegistrosPorPagina: pageSize,
        }));
    };

    // Logic to handle filter's fields change
    const [form] = Form.useForm();

    const onReset = () => {
        setRequest((prevState) => ({
            ...prevState,
            codigoLegajo: "",
            tipoCaso: 0,
            nroCaso: "",
            fechaRegistro: {
                fechaRegistroInicio: "",
                fechaRegistroFin: "",
            },
            abogadoId: "",
        }));
        form.resetFields();
    };

    return {
        paginador,
        loading,
        onChange,
        request,
        setRequest,
        onReset,
        form,
        reloadData,
        usuId
    };
}

export default useLegajoFilteredData;
