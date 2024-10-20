import React, { useState } from "react";
import { Flex, Typography, Layout, Menu, Drawer, Input, Select, DatePicker, Table, Grid} from "antd";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
import { siderStyle, headerStyle, contentStyle, subcontentStyle } from "../utils/styles";
import { useNavigate } from "react-router-dom";
import { colors } from "../utils/colors";
import { paths } from "../utils/paths";
import { startLogout } from "../store/actions/authActionAsync";
import { useDispatch, useSelector } from "react-redux";
const { useBreakpoint } = Grid;
import {
    Lightning,
    Funnel,
    SignOut,
    Bell,
    FileText,
    CalendarBlank,
    ChartBar,
    HandArrowDown,
    EnvelopeSimple,
    MicrosoftExcelLogo
} from "@phosphor-icons/react";
const items = [
    {
        key: 'sub1',
        label: 'Consulta Legajos',
        icon: <FileText size={20} weight="fill" />,
        children: [
            {
                key: paths.MIS_LEGAJOS,
                label: 'Consultar mis Legajos',
            },
            {
                key: paths.TODOS_LEGAJOS,
                label: 'Todos los Legajos',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Ver Audiencias',
        icon: <CalendarBlank size={20} weight="fill" />,
        children: [
            {
                key: paths.MIS_AUDIENCIAS,
                label: 'Mis Audiencias',
            },
            {
                key: paths.TODAS_AUDIENCIAS,
                label: 'Todos las Audiencias',
            },
        ],
    },
    {
        key: 'sub3',
        label: 'Reporte Legajos',
        icon: <ChartBar size={20} weight="fill" />,
        children: [
            {
                key: paths.REPORTE_GENERAL,
                label: 'Reporte General',
            },
            {
                key: paths.SEGUIMIENTO,
                label: 'Seguimiento',
            },
        ],
    },
    {
        key: 'sub4',
        icon: <HandArrowDown size={20} weight="fill" />,
        label: 'Recepción Legajos',
        children: [
            {
                key: paths.RECEPCION_LEGAJOS,
                label: 'Recepcionar',
            },


        ],
    },
    {
        key: 'logout',
        icon: <SignOut size={20} weight="fill" />,
        label: 'Cerrar Sesión',

    },
];

function SiderLayout(props) {
    const {collapsed,setCollapsed} = props;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const screens = useBreakpoint();

    const onCollapse = (collapsed, type) => {
        setCollapsed(collapsed);
    }
    const cerrarSesion = () => {
        dispatch(startLogout());
    };

    const handleMenuClick = (e) => {
        if (e.key == 'logout') {
            cerrarSesion()
        } else {
            const selectedItem = items.flatMap(item => item.children).find(child => child.key === e.key);
            if (selectedItem && selectedItem.key) {
                navigate(selectedItem.key);
            }
        }
    };

    return (
        <>
            {screens.xs || !screens.md ? (
                <Drawer
                    placement="left"
                    onClose={() => setCollapsed(false)}
                    width={"40vw"}
                    closable={false}
                    open={collapsed}
                    bodyStyle={{ backgroundColor: "#001529", padding: "0" }}
                >
                    <Flex vertical gap={"middle"} justify="flex-start" align="center" style={{ width: "100%", padding: "4.0em 0.0em" }}>
                        <Flex gap={"large"} justify="center" align="center" style={{ width: "100%", marginBottom: "3.0em" }}>
                            <Flex justify="center" align="center" style={{ width: "50px", height: "50px", background: colors.gradient, borderRadius: "5.0em" }}>
                                <Lightning size={28} weight="fill" color={colors.white} />

                            </Flex>
                            <Text className="sie-sider-logo">SIE App</Text>

                        </Flex>

                        <Menu onClick={handleMenuClick} style={{ backgroundColor: 'transparent' }} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} >

                        </Menu>
                    </Flex>
                </Drawer>
            ) : (
                <Sider breakpoint="md" width="18%" style={siderStyle} collapsedWidth="75px" collapsible onCollapse={onCollapse}>
                    <Flex vertical gap={"middle"} justify="flex-start" align="center" style={{ width: "100%", height: "100vh", padding: "4.0em 0.0em" }}>
                        <Flex gap={"large"} justify="center" align="center" style={{ width: "100%", marginBottom: "3.0em" }}>
                            <Flex justify="center" align="center" style={{ width: "50px", height: "50px", background: colors.gradient, borderRadius: "5.0em" }}>
                                <Lightning size={28} weight="fill" color={colors.white} />

                            </Flex>
                            {!collapsed && (
                                <Text className="sie-sider-logo">SIE App</Text>
                            )

                            }

                        </Flex>

                        <Menu onClick={handleMenuClick} style={{ backgroundColor: 'transparent' }} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} >

                        </Menu>
                    </Flex>


                </Sider>
            )}

        </>
    );
}

export default SiderLayout;