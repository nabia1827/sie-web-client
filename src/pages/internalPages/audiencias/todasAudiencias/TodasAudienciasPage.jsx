import React, { useState } from "react";
import { Flex, Grid} from "antd";
import TodasAudienciasMobile from "./TodasAudienciasMobile";
import TodasAudienciasWeb from "./TodasAudienciasWeb";

const { useBreakpoint } = Grid;

function TodasAudienciasPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <TodasAudienciasMobile
        /> :
        <TodasAudienciasWeb
        />
    }
        
    </>;
}

export default TodasAudienciasPage;