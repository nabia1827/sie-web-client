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
import { Perfiles } from "../utils/constants";
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
import { getMenuItemsForUser } from "../utils/generalFunctions";

function SiderLayout(props) {
    const {collapsed,setCollapsed} = props;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    console.log("BREAKPOINT!!!", screens);
    const { perfilId } = useSelector((state) => state.auth.user);
    const items = getMenuItemsForUser(perfilId);

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
            {!screens.md && !screens.xl && !screens.xxl? (
                <Drawer
                    placement="left"
                    onClose={() => setCollapsed(false)}
                    width={"250px"}
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
                <Sider breakpoint="md" width="280px" style={siderStyle} collapsedWidth="75px" collapsible onCollapse={onCollapse}>
                    <Flex vertical gap={"middle"} justify="flex-start" align="center" style={{ width: "100%", height: "100vh", padding: "4.0em 0.0em", overflow: "auto" }}>
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