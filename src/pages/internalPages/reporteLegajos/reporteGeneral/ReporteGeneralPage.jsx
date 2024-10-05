import React, { useState } from "react";
import { Flex, Grid} from "antd";
import ReporteGeneralMobile from "./ReporteGeneralMobile";
import ReporteGeneralWeb from "./ReporteGeneralWeb";

const { useBreakpoint } = Grid;

function ReporteGeneralPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <ReporteGeneralMobile
        /> :
        <ReporteGeneralWeb
        />
    }
        
    </>;
}

export default ReporteGeneralPage;