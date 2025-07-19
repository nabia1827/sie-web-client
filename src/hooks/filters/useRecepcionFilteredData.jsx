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
    fechaRecepcion: "",

};

function useRecepcionFilteredData(
    customApiCall,
    initialRequestState = initialCommonRequestState
) {
    const [request, setRequest] = useState(initialRequestState);
    const [paginador, setPaginador] = useState(initialPaginadorState);
    const [loading, setLoading] = useState(false);

    const { usuId } = useSelector((state) => state.auth.user);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            console.log("usuId: ", usuId);

            const filteredRequest = Object.fromEntries(
                Object.entries(request).filter(([key, value]) => {
                    return value !== "" && value !== null && value !== 0;
                })
            );

            filteredRequest.usuarioId = usuId;

            try {
                const response = await customApiCall(filteredRequest);
                console.log("response: ", response);
                setPaginador(response);
            } catch (error) {
                console.log("E-R-R-O-R: ", error);
            } finally {
                setLoading(false);
            }
        };

        if(usuId > 0){
            fetchData(); // Llamamos la función
        }
        
    }, [request, usuId]);


    const reloadData = async () => {
        setLoading(true);

        const filteredRequest = Object.fromEntries(
            Object.entries(request).filter(([key, value]) => {
                return value !== "" && value !== null && value !== 0;
            })
        );

        filteredRequest.usuarioId = usuId


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
        console.log("Estoy harttaaaaaaa: ")
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
            fechaRecepcion: "",
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

export default useRecepcionFilteredData;
