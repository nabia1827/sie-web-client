import React, { useState, useEffect } from "react";
import { Flex, Grid} from "antd";
import HomeMobile from "./HomeMobile";
import HomeWeb from "./HomeWeb";
import { AnclarDesanclarLegajo, GetLegajosAnclados,
    GetMetricasMesActual, GetMisAudienciasByDate } from "../../../utils/home/dinamicCalls";
import { useSelector } from "react-redux";
import esES from "antd/locale/es_ES"; // Importar la localización en español
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar el locale de dayjs en español
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/paths";

dayjs.locale("es"); // Establecer dayjs en español
const { useBreakpoint } = Grid;

function HomePage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { user } = useSelector((state) => state.auth);
    const [anclados, setAnclados] = useState([]);
    const [audiencias, setAudiencias] = useState([]);
    const [metricas, setMetricas] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs().format("DD/MM/YYYY"))
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const onAncladosChange = (value) =>{
        setCurrentPage(value)
    }

    const fetchAnclados = async (usuId) => {
        const response = await GetLegajosAnclados(usuId);
        setAnclados(response.data);
    }

    const fetchAudiencias = async(usuId,fecha) =>{
        const response = await GetMisAudienciasByDate(usuId,fecha);
        setAudiencias(response.data);
    }

    const fetchMetricas = async(usuId) =>{
        const response = await GetMetricasMesActual(usuId);
        setMetricas(response.data);
    }

    const fetchAllData = async() => {
        setLoading(true);
        await Promise.all([
            fetchAnclados(user.usuId),
            fetchAudiencias(user.usuId,selectedDate),
            fetchMetricas(user.usuId)
        ]);
        setLoading(false);
    }

    const onDateChange = (value) =>{
        setSelectedDate(value.format('DD/MM/YYYY'));
    }
    const onPinClick = () => {
        AnclarDesanclarLegajo(user.usuId).then((response)=>{
            if(response.isSuccess){
                setLoading(true);
                fetchAnclados(user.usuId).then(()=>{
                    setLoading(false);
                });
            }
        });
    }

    useEffect(() => {
        if(user.usuId>0){
            fetchAllData()
        }
    }, [user.usuId]);

    useEffect(() => {
        if (selectedDate && selectedDate != "") {
            setLoading(true);
            fetchAudiencias(user.usuId,selectedDate).then(()=>{
                setLoading(false);
            });
        }
    }, [selectedDate]);

    const onClickVerTodo = () => {
        navigate(paths.MIS_AUDIENCIAS)
    }

    return <>{isXsScreen ?
        <HomeMobile
        /> :
        <HomeWeb
        anclados = {anclados}
        audiencias = {audiencias}
        metricas = {metricas}
        onAncladosChange = {onAncladosChange}
        currentPage = {currentPage}
        onDateChange = {onDateChange}
        onClickVerTodo = {onClickVerTodo}
        onPinClick = {onPinClick}
        />
    }
        
    </>;
}

export default HomePage;