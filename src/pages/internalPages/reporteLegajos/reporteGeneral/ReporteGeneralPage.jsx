import React, { useState, useEffect } from "react";
import { Flex, Grid, Form} from "antd";
import ReporteGeneralMobile from "./ReporteGeneralMobile";
import ReporteGeneralWeb from "./ReporteGeneralWeb";
import { 
    GetCantidadAudiencias, 
    GetCantidadLegajos, 
    GetChartBarsData, 
    GetChartLineData, 
    GetChartMapData, 
    GetChartPieData,
    GetChartStackedBarsData,
    GetLugarMasComun 
} from "../../../../utils/reporteLegajos/dinamicCalls";

const { useBreakpoint } = Grid;

function ReporteGeneralPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const [form] = Form.useForm();
    //Charts
    const [dataLineChart, setDataLineChart] = useState(null);
    const [dataStackedChart, setDataStackedChart] = useState(null);
    const [dataPieChart, setDataPieChart] = useState(null);
    const [dataBarChart, setDataBarChart] = useState(null);
    const [dataMapChart, setDataMapChart] = useState(null);

    //Card
    const [dataLegajoCard, setDataLegajoCard] = useState(null);
    const [dataAudienciaCard, setDataAudienciaCard] = useState(null);
    const [dataLugarCard, setDataLugarCard] = useState(null);

    //Filtros (IDS)
    const [anio, setAnio] = useState(0);
    const [mes, setMes] = useState(0);
    const [delitoId, setDelitoId] = useState(0);

    //Loading
    const [loading, setLoading] = useState(false);

    const handleOnFieldsChange = (changeFields, allFields) =>{
        const campo = changeFields[0].name[0]?changeFields[0].name[0]:0;
        const valor = changeFields[0].value?changeFields[0].value:0;
        switch(campo){
            case "anio":
                setAnio(valor)
                break;
            case "mes":
                setMes(valor)
                break;
            case "delitoId":
                setDelitoId(valor)
                break;
        }
    }

    const fetchDataLineChart = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetChartLineData(pAnio, pMes, pDelitoId)
            setDataLineChart(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataStackedChart = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetChartStackedBarsData(pAnio, pMes, pDelitoId);
            setDataStackedChart(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataPieChart = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetChartPieData(pAnio, pMes, pDelitoId)
            setDataPieChart(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataBarChart = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetChartBarsData(pAnio, pMes, pDelitoId)
            setDataBarChart(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataMapChart = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetChartMapData(pAnio, pMes, pDelitoId)
            setDataMapChart(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataLegajoCard = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetCantidadLegajos(pAnio, pMes, pDelitoId)
            setDataLegajoCard(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataAudienciaCard = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetCantidadAudiencias(pAnio, pMes, pDelitoId)
            setDataAudienciaCard(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchDataLugarCard = async (pAnio, pMes, pDelitoId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetLugarMasComun(pAnio, pMes, pDelitoId)
            setDataLugarCard(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    useEffect(() => {
        
        const fetchAllData = async () => {
            
            if (anio !== null && mes !== null && delitoId !== null) {
                try {
                    console.log("iniciooooooo a")
                    setLoading(true)
                    await Promise.all([
                        fetchDataLineChart(anio, mes, delitoId),
                        fetchDataStackedChart(anio, mes, delitoId),
                        fetchDataPieChart(anio, mes, delitoId),
                        fetchDataBarChart(anio, mes, delitoId),
                        fetchDataMapChart(anio, mes, delitoId),
                        fetchDataLegajoCard(anio, mes, delitoId),
                        fetchDataAudienciaCard(anio, mes, delitoId),
                        fetchDataLugarCard(anio, mes, delitoId)
                    ]);
                    
                    setLoading(false)
                    console.log("finnnnnnnnnnn a")
                } catch (error) {
                    console.error("Error al realizar las llamadas fetch:", error);
                }
            }
        };
    
        fetchAllData();
    }, [anio, mes, delitoId]);
    

    return <>{isXsScreen ?
        <ReporteGeneralMobile
            form={form}
            handleOnFieldsChange = {handleOnFieldsChange}
            loading = {loading}
            dataLineChart = {dataLineChart}
            dataStackedChart = {dataStackedChart}
            dataPieChart = {dataPieChart}
            dataBarChart = {dataBarChart}
            dataMapChart = {dataMapChart}
            dataLegajoCard  = {dataLegajoCard}
            dataAudienciaCard = {dataAudienciaCard}
            dataLugarCard = {dataLugarCard}
        /> :
        <ReporteGeneralWeb
            form = {form}
            handleOnFieldsChange = {handleOnFieldsChange}
            loading = {loading}
            dataLineChart = {dataLineChart}
            dataStackedChart = {dataStackedChart}
            dataPieChart = {dataPieChart}
            dataBarChart = {dataBarChart}
            dataMapChart = {dataMapChart}
            dataLegajoCard  = {dataLegajoCard}
            dataAudienciaCard = {dataAudienciaCard}
            dataLugarCard = {dataLugarCard}
        />
    }
        
    </>;
}

export default ReporteGeneralPage;