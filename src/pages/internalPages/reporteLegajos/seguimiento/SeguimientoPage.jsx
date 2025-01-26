import React, { useState, useEffect } from "react";
import { Flex, Grid} from "antd";
import SeguimientoMobile from "./SeguimientoMobile";
import SeguimientoWeb from "./SeguimientoWeb";
import { useSelector } from "react-redux";
import { GetSeguimientoAudiencias, GetSeguimientoLegajos, GetSeguimientoRecursosLegales } from "../../../../utils/reporteLegajos/dinamicCalls";

const { useBreakpoint } = Grid;

function SeguimientoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    const [dataLeg, setDataLeg] = useState([]);
    const [dataAud, setDataAud] = useState([]);
    const [dataRl, setDataRl] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSeguimientoAudiencias = async () => {
        //setLoadingInfo(true);
        try {
            const response = await GetSeguimientoAudiencias()
            setDataAud(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };
    const fetchSeguimientoLegajos = async () => {
        //setLoadingInfo(true);
        try {
            const response = await GetSeguimientoLegajos()
            setDataLeg(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };

    const fetchSeguimientoRecursosLegales = async () => {
        //setLoadingInfo(true);
        try {
            const response = await GetSeguimientoRecursosLegales()
            setDataRl(response.data)
        } finally {
            //setLoadingInfo(false);
        }
    };

    useEffect(() => {
        
        const fetchAllData = async () => {
            
            try {
                setLoading(true)
                await Promise.all([
                    fetchSeguimientoAudiencias(),
                    fetchSeguimientoLegajos(),
                    fetchSeguimientoRecursosLegales(),
                ]);
                setLoading(false)

            } catch (error) {
                console.error("Error al realizar las llamadas fetch seg:", error);
            }
        };
    
        fetchAllData();
    }, []);


    return <>{isXsScreen ?
        <SeguimientoMobile
        dataLeg = {dataLeg}
        dataAud = {dataAud}
        dataRl = {dataRl}
        loading = {loading}
        /> :
        <SeguimientoWeb
        dataLeg = {dataLeg}
        dataAud = {dataAud}
        dataRl = {dataRl}
        loading = {loading}
        />
    }
        
    </>;
}

export default SeguimientoPage;