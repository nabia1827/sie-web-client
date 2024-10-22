import React, { useState } from "react";
import { Flex, Typography, Layout, Grid, Breadcrumb, Button, Tooltip, Avatar, Badge, Collapse, Input, Select, DatePicker, Table } from "antd";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
import { siderStyle, headerStyle, contentStyle, subcontentStyle } from "../utils/styles";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { colors } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { PerfilesNombre } from "../utils/constants";
import {
    Lightning,
    Funnel,
    Bell,
    ArrowLeft,
    CalendarBlank,
    ChartBar,
    HandArrowDown,
    EnvelopeSimple,
    MicrosoftExcelLogo
} from "@phosphor-icons/react";
import { paths } from "../utils/paths";
import { setCurrentLegajoCod } from "../store/actions/consultaLegajos/consultaLegajosActionSync";
const { useBreakpoint } = Grid;

function HeaderLayout() {
    const { user } = useSelector((state) => state.auth);
    const { currentLegajoCod } = useSelector((state) => state.consultaLegajos);
    const navigate = useNavigate();
    const location = useLocation();
    const screens = useBreakpoint();
    const dispatch = useDispatch();
    const pathname = location.pathname

    const formatBreadcrumb = (value) => {
        return value
            .replace('-', ' ') // Reemplaza los guiones por espacios
            .toLowerCase() // Convierte todo a minúsculas
            .split(' ') // Divide la cadena en palabras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Convierte la primera letra de cada palabra en mayúscula
            .join(' '); // Une las palabras de nuevo
    };

    const getLegajoIdBc = (path) => {
        const pathnames = path.split('/').filter(x => x);
        return [{ title: "Inicio" }, { title: formatBreadcrumb(pathnames[0]) }, { title: formatBreadcrumb(pathnames[3]) }]
    }

    const getBreadcumbItems = (path) => {
        switch (path) {
            case paths.HOME:
                return [{ title: "Inicio" }];
            case paths.ROOT:
                return [{ title: "Inicio" }];
            case paths.MIS_LEGAJOS:
                return [{ title: "Inicio" }, { title: "Consulta Legajos" }];
            case paths.TODOS_LEGAJOS:
                return [{ title: "Inicio" }, { title: "Consulta Legajos" }];
            case paths.MIS_AUDIENCIAS:
                return [{ title: "Inicio" }, { title: "Audiencias" }];
            case paths.TODAS_AUDIENCIAS:
                return [{ title: "Inicio" }, { title: "Audiencias" }];
            case paths.REPORTE_GENERAL:
                return [{ title: "Inicio" }, { title: "Reporte Legajos" }];
            case paths.SEGUIMIENTO:
                return [{ title: "Inicio" }, { title: "Reporte Legajos" }];
            case paths.RECEPCION_LEGAJOS:
                return [{ title: "Inicio" }, { title: "Recepcionar Legajos" }];
            case paths.NUEVO_LEGAJO:
                return [{ title: "Inicio" }, { title: "Crear nuevo Legajo" }];
            case paths.ADICIONAR_LEGAJO:
                return [{ title: "Inicio" }, { title: "Adicionar Documentos" }];
            default:
                return getLegajoIdBc(pathname)
        }
    }

    const getLegajoIdTitle = (path) => {
        const title = currentLegajoCod!==""?`LP${currentLegajoCod}`:"";
        return "Legajo " + title
    }

    const getTitle = (path) => {
        switch (path) {
            case paths.HOME:
                return "Home";
            case paths.ROOT:
                return "Home";
            case paths.MIS_LEGAJOS:
                return "Mis Legajos";
            case paths.TODOS_LEGAJOS:
                return "Todos los Legajos";
            case paths.MIS_AUDIENCIAS:
                return "Mis Audiencias";
            case paths.TODAS_AUDIENCIAS:
                return "Todas las Audiencias";
            case paths.REPORTE_GENERAL:
                return "Reporte General";
            case paths.SEGUIMIENTO:
                return "Seguimiento";
            case paths.RECEPCION_LEGAJOS:
                return "Repceción de Legajos";
            case paths.ADICIONAR_LEGAJO:
                return "Adicionar documentos";
            case paths.NUEVO_LEGAJO:
                return "Crear nuevo Legajo";
            default:
                return getLegajoIdTitle(pathname)
        }
    }

    const showBackIcon = (path) => {
        switch (path) {
            case paths.HOME:
                return false;
            case paths.ROOT:
                return false;
            case paths.MIS_LEGAJOS:
                return false;
            case paths.TODOS_LEGAJOS:
                return false;
            case paths.MIS_AUDIENCIAS:
                return false;
            case paths.TODAS_AUDIENCIAS:
                return false;
            case paths.REPORTE_GENERAL:
                return false;
            case paths.SEGUIMIENTO:
                return false;
            case paths.RECEPCION_LEGAJOS:
                return false;
            case paths.ADICIONAR_LEGAJO:
                return false;
            case paths.NUEVO_LEGAJO:
                return false;
            default:
                return true;
        }
    }
    const onBack = () => {
        dispatch(setCurrentLegajoCod(""))
        navigate(-1)
    }

    return (
        <>
            <Header style={headerStyle}>
                <Flex justify="space-between" align="flex-start" style={{ background: colors.gradient, width: "100%", height: "98%", borderRadius: "0.8em", padding: "1.5em" }}>
                    <Flex vertical gap={0} justify="flex-start" align="flex-start" style={{ height: "100%" }}>
                        <Breadcrumb
                            items={getBreadcumbItems(pathname)}
                        />
                        <Flex justify="flex-start" align="center" >
                            {showBackIcon(pathname) &&
                                <Button onClick={onBack} size="middle" type="text" shape="circle" icon={<ArrowLeft size={20} color={colors.white} />} />
                            }
                            <Text className="sie-header-title">{getTitle(pathname)}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={"small"} justify="flex-end" align="center" >
                        <Tooltip title="Notificaciones">
                            <Badge count={1} size="small" offset={[-10, 3]}>
                                <Button size="large" type="text" shape="circle" icon={<Bell size={28} color={colors.white} />} />
                            </Badge>
                        </Tooltip>
                        <Tooltip title="Correo">
                            <Button size="large" type="text" shape="circle" icon={<EnvelopeSimple size={28} color={colors.white} />} />
                        </Tooltip>
                        <Tooltip title="Audiencias">
                            <Button size="large" type="text" shape="circle" icon={<CalendarBlank size={28} color={colors.white} />} />
                        </Tooltip>


                        {screens.lg  && (
                            <Flex vertical justify="flex-start" align="flex-start">
                                <Text className="sie-header-user">{`${user.usuNombre} ${user.usuApellidoPat}`}</Text>
                                <Text className="sie-header-rol">{`${PerfilesNombre[user.perfilId - 1]}`}</Text>
                            </Flex>
                        )

                        }
                        {user.usuImage ? (
                            <Avatar style={{ border: "2px solid white" }} size={36} src={<img src={user.usuImage} alt="avatar" />} />
                        ) : (
                            <Avatar style={{ backgroundColor: colors.lightBlack, color: 'white' }}>{user.usuNombre[0]}</Avatar>
                        )

                        }




                    </Flex>
                </Flex>

            </Header>
        </>
    );
}

export default HeaderLayout;
