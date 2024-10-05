import React, { useState } from "react";
import { Flex, Grid, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Avatar, Badge, Collapse, Input, Select, DatePicker, Table } from "antd";
import ListadoLegajosMobile from "./ListadoLegajosMobile";
import ListadoLegajosWeb from "./ListadoLegajosWeb";

import { useNavigate } from 'react-router-dom';

import ModalEstado from "../../../../components/consultaLegajos/ModalEstado";
import { paths } from "../../../../utils/paths";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

function ListadoLegajosPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const isXsScreen = screens.xs !== undefined && screens.xs;


    const [pageSize, setPageSize] = useState(5);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const onClickDetalle = (legajoId) => {
        navigate(paths.DETALLE_LEGAJO(legajoId))
    }

    const onClickDocsIngreso = (legajoId) => {
        navigate(paths.DOCS_INGRESO_LEGAJO(legajoId))
    }

    const onClickDocsSalida = (legajoId) => {
        navigate(paths.DOCS_SALIDA_LEGAJO(legajoId))
    }

    const onClickEstado = () => {
        setModalOpen(true);
    }
    const onClickDownload = () => {

    }

    const handleOk = () => {
        setModalLoading(true);
        setTimeout(() => {
            setModalLoading(false);
            setModalOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setModalOpen(false);
    };



    const onChangeCollapse = (key) => {
        if (key.length > 0) {
            setPageSize(3)
        } else {
            setPageSize(5)
        }

    };

    return <>{isXsScreen ?
        <ListadoLegajosMobile
            onClickDetalle={onClickDetalle}
            onClickDocsIngreso={onClickDocsIngreso}
            onClickDocsSalida={onClickDocsSalida}
            onClickEstado={onClickEstado}
            onClickDownload={onClickDownload}
            onChangeCollapse={onChangeCollapse}
            pageSize={pageSize}

        /> :
        <ListadoLegajosWeb
            onClickDetalle={onClickDetalle}
            onClickDocsIngreso={onClickDocsIngreso}
            onClickDocsSalida={onClickDocsSalida}
            onClickEstado={onClickEstado}
            onClickDownload={onClickDownload}
            onChangeCollapse={onChangeCollapse}
            pageSize={pageSize}

        />
    }
        <ModalEstado
            modalOpen={modalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            modalLoading={modalLoading}
        ></ModalEstado>
    </>;
}

export default ListadoLegajosPage;