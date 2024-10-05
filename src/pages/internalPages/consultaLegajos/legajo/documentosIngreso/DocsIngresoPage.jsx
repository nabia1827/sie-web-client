import React from "react";
import { Grid } from "antd";
import DocsIngresoMobile from "./DocsIngresoMobile";
import DocsIngresoWeb from "./DocsIngresoWeb";


const { useBreakpoint } = Grid;

function DocsIngresoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ? <DocsIngresoMobile /> : <DocsIngresoWeb />}</>;
}

export default DocsIngresoPage;