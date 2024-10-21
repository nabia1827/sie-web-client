import React, { useState } from "react";
import { Flex, Typography, Layout, FloatButton, Select, DatePicker, Table, Grid } from "antd";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
import { siderStyle, headerStyle, contentStyle, subcontentStyle } from "../utils/styles";
import {
    List
} from "@phosphor-icons/react";
import HeaderLayout from "./HeaderLayout";
import SiderLayout from "./SiderLayout";
import { MenuOutlined } from '@ant-design/icons';

function BaseLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    const screens = useBreakpoint();
    return (
        <>
            <Layout style={{ width: "100%", height: "100vh", backgroundColor: "white" }}>
                <SiderLayout collapsed={collapsed} setCollapsed={setCollapsed}></SiderLayout>
                <Layout>
                    <HeaderLayout></HeaderLayout>
                    <Content style={contentStyle}>
                        {children}
                    </Content>
                </Layout>
                {!screens.md && !screens.xl && !screens.xxl && (
                    <FloatButton type="primary" icon={<MenuOutlined />} onClick={() => setCollapsed(!collapsed)} />
                )

                }

            </Layout>
        </>
    );
}

export default BaseLayout;