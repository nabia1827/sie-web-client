import React, { useState } from "react";
import { Flex, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Avatar, Badge, Collapse, Input, Select, DatePicker, Table } from "antd";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

import { siderStyle, headerStyle, contentStyle, subcontentStyle  } from "../utils/styles";

import HeaderLayout from "./HeaderLayout";
import SiderLayout from "./SiderLayout";

function BaseLayout({children}) {

    return (
        <>
            <Layout style={{ width: "100%", height: "100vh", backgroundColor: "white" }}>
                <SiderLayout></SiderLayout>
                <Layout>
                    <HeaderLayout></HeaderLayout>
                    <Content style={contentStyle}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default BaseLayout;