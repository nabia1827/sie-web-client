import React, { useEffect, useState } from "react";
import { Grid } from "antd";
import DocsIngresoMobile from "./DocsIngresoMobile";
import DocsIngresoWeb from "./DocsIngresoWeb";
import { useParams } from 'react-router-dom';
import { GetInfoLegajoById, ListarDocsEntrada, } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLegajoCod } from "../../../../../store/actions/consultaLegajos/consultaLegajosActionSync";
import { onDownloadDocPDF } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { TipoDoc } from "../../../../../utils/constants";
const { useBreakpoint } = Grid;

function DocsIngresoPage() {
    const screens = useBreakpoint();
    const dispacth = useDispatch();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { id } = useParams();
    const [loadingsPDF, setLoadingsPDF] = useState([]);

    const enterLoading = (index, value) => {
        setLoadingsPDF((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = value;
          return newLoadings;
        });
        
    };

    const onClickDownload = async (index, docId) => {
        enterLoading(index,true);
        try {
            onDownloadDocPDF(docId,TipoDoc.DOCUMENTO_INGRESO).then(()=>{
                enterLoading(index,false);
            });
        } catch (error) {
            message.error("Error al descargar el PDF");
        }
    }
    //Documentos de Entrada 
    const [legajo, setLegajo] = useState(null);
    const [docsEntrada, setDocsEntrada] = useState(null);
    const [loadingDocsEntrada, setLoadingDocsEntrada] = useState(true);

    const fetchDocsEntrada = async (id) => {
        setLoadingDocsEntrada(true);
        try {
            const response = await GetInfoLegajoById(id);
            setLegajo(response.data);

            const response2 = await ListarDocsEntrada(id);
            setDocsEntrada(response2.data);
        } finally {
            setLoadingDocsEntrada(false);
        }
    };


    useEffect(() => {
        if (id !== null && id !== undefined) {
            fetchDocsEntrada(id);
        }
    }, [id]);

    useEffect(() => {
        if (legajo) {
            dispacth(setCurrentLegajoCod(legajo.codigoLegajo))
        }
    }, [legajo]);

    return <>{isXsScreen ?
        <DocsIngresoMobile
            legajo={legajo}
            docsEntrada={docsEntrada}
            loadingDocsEntrada={loadingDocsEntrada}
            onClickDownload = {onClickDownload}
            loadingsPDF = {loadingsPDF}
        /> :
        <DocsIngresoWeb
            legajo={legajo}
            docsEntrada={docsEntrada}
            loadingDocsEntrada={loadingDocsEntrada}
            onClickDownload = {onClickDownload}
            loadingsPDF = {loadingsPDF}
        />
    }</>;
}

export default DocsIngresoPage;