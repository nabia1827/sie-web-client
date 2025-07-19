import React, { useEffect, useState } from "react";
import { Grid, notification } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';
const { useBreakpoint } = Grid;
import ListadoDocsMobile from "./ListadoDocsMobile";
import ListadoDocsWeb from "./ListadoDocsWeb";
import apiNet from "../../../../services/api";
import useRecepcionFilteredData from "../../../../hooks/filters/useRecepcionFilteredData";
import { switchOnFieldsChange } from "../../../../utils/recepcionLegajos/switchOnFieldsChange";
import DocsFilter from "../../../../components/recepcionLegajo/DocsFilter";
import { endpoints, paths } from "../../../../utils/paths";
import { useSelector } from "react-redux";
import { TipoProcesamiento } from "../../../../utils/constants";

function ListadoDocsPage(props) {
    const screens = useBreakpoint();
    const [api, contextHolder] = notification.useNotification();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const navigate = useNavigate();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { recepcionEnprogreso, notiRecepcionFinalizada } = useSelector((state) => state.recepcionLegajos)
    const customApiCall = async (filteredRequest) => {
        const response = await apiNet.RecepcionLegajos.ListDocsSubidos(filteredRequest);
        return response;
    };
    const {
        paginador,
        loading,
        onChange,
        request,
        setRequest,
        onReset,
        form,
        reloadData,
        usuId
    } = useRecepcionFilteredData(customApiCall);

    useEffect(() => {
        console.log("Inicializacion: ", recepcionEnprogreso," - ",notiRecepcionFinalizada)

        if (recepcionEnprogreso === true) {
            console.log("Entroooooo")
            reloadData()
            setButtonDisabled(true);
        } else if (recepcionEnprogreso === false && notiRecepcionFinalizada) {
            openRecepcionNoti(notiRecepcionFinalizada)
            reloadData()
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(false);
        }

    }, [recepcionEnprogreso, notiRecepcionFinalizada]);

    const onClickEdit = (record) => {
        const { legajoId, docId, audienciaId } = record;

        if (record.tipoProcesamiento == TipoProcesamiento.NUEVO_LEGAJO) {
            navigate(paths.NUEVO_LEGAJO(legajoId, docId, audienciaId))
        }
        else if (record.tipoProcesamiento == TipoProcesamiento.ADICIONAR_DOCUMENTO) {
            navigate(paths.ADICIONAR_LEGAJO(legajoId, docId, audienciaId))
        }
    }

    const onClickAdd = () => {
        navigate(endpoints.UPLOAD_LEGAJOS);
    }

    const handleOnFieldsChange = (changeFields, allFields) => {
        const campo = changeFields[0].name[0];
        switchOnFieldsChange(campo, changeFields, setRequest);
    };

    const onChangeCollapse = (key) => {
        //f

    };

    const openRecepcionNoti = (notiData) => {
        api[notiData.type]({
        message: notiData.title,
        description:
            notiData.description,
        });
    };

    return (
        <>
        {contextHolder}
            <DocsFilter
                onChangeCollapse={onChangeCollapse}
                form={form}
                onReset={onReset}
                handleOnFieldsChange={handleOnFieldsChange}
            ></DocsFilter>
            {screens.xl === false && screens.xxl === false && screens.lg === false ?
                <>
                    <ListadoDocsMobile
                        paginador={paginador}
                        onPaginationChange={onChange}
                        dataLoading={loading}
                        addButtonLoading={buttonLoading}
                        onClickEdit={onClickEdit}
                        onClickAdd={onClickAdd}
                    />
                </>
                :
                <>
                    <ListadoDocsWeb
                        paginador={paginador}
                        onPaginationChange={onChange}
                        dataLoading={loading}
                        addButtonLoading={buttonLoading}
                        onClickEdit={onClickEdit}
                        onClickAdd={onClickAdd}
                    />
                </>

            }
        </>
    );

}

export default ListadoDocsPage;