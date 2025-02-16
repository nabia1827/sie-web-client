import React, { useState, useEffect } from "react";
import { Flex, Grid, Form} from "antd";
import SeguimientoMobile from "./SeguimientoMobile";
import SeguimientoWeb from "./SeguimientoWeb";
import { useSelector } from "react-redux";
import { GetSeguimientoAudiencias, GetSeguimientoLegajos, GetSeguimientoRecursosLegales } from "../../../../utils/reporteLegajos/dinamicCalls";

const { useBreakpoint } = Grid;

function SeguimientoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { listAnios } = useSelector((state) => state.app);

    //Variables generales
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    //Data de los desplegables
    const [selectedAnio, setSelectedAnio] = useState(0);
    const [selectedMes, setSelectedMes] = useState(0);
    const [listMeses, setListMeses]=useState([]);

    //Resultados de seguimiento
    const [dataLeg, setDataLeg] = useState([]);
    const [dataAud, setDataAud] = useState([]);
    const [dataRl, setDataRl] = useState([]);
    

    const fetchSeguimientoAudiencias = async (anio, mes) => {
        //setLoadingInfo(true);
        try {
            const response = await GetSeguimientoAudiencias(anio, mes)
            setDataAud(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };
    const fetchSeguimientoLegajos = async (anio, mes) => {
        //setLoadingInfo(true);
        try {
            const response = await GetSeguimientoLegajos(anio, mes)
            setDataLeg(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchSeguimientoRecursosLegales = async (anio, mes) => {
        //setLoadingInfo(true);
        try {
            const response = await GetSeguimientoRecursosLegales(anio, mes)
            setDataRl(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };
    const fetchListaMeses = async(anio) =>{
        //setLoadingInfo(true);
        try {
            const response = await GetMesesbyAnio(anio, mes)
            setListMeses(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    }

    const fetchAllData = async (anio, mes) => {
            
        try {
            setLoading(true)
            await Promise.all([
                fetchSeguimientoAudiencias(anio, mes),
                fetchSeguimientoLegajos(anio, mes),
                fetchSeguimientoRecursosLegales(anio, mes),
            ]);
            setLoading(false)

        } catch (error) {
            console.error("Error al realizar las llamadas fetch seg:", error);
        }
    };

    useEffect(() => {
        fetchAllData(selectedAnio,selectedMes);
    }, [selectedAnio,selectedMes]);

    useEffect(() => {
        fetchListaMeses(selectedAnio)

    }, [selectedAnio]);



    const handleOnFieldsChange = (changeFields, allFields) =>{
        const campo = changeFields[0].name[0]?changeFields[0].name[0]:0;
        const valor = changeFields[0].value?changeFields[0].value:0;
        switch(campo){
            case "anio":
                setSelectedAnio(valor)
                break;
            case "mes":
                setSelectedMes(valor)
                break;
        }
    }


    return <>{isXsScreen ?
        <SeguimientoMobile
        dataLeg = {dataLeg}
        dataAud = {dataAud}
        dataRl = {dataRl}
        loading = {loading}
        form = {form}
        handleOnFieldsChange = {handleOnFieldsChange}
        listAnios = {listAnios}
        listMeses = {listMeses}
        /> :
        <SeguimientoWeb
        dataLeg = {dataLeg}
        dataAud = {dataAud}
        dataRl = {dataRl}
        loading = {loading}
        form = {form}
        handleOnFieldsChange = {handleOnFieldsChange}
        listAnios = {listAnios}
        listMeses = {listMeses}
        />
    }
        
    </>;
}

export default SeguimientoPage;