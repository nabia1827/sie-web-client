import React, { useState } from "react";
import { Flex, Grid} from "antd";
import MisAudienciasMobile from "./MisAudienciasMobile";
import MisAudienciasWeb from "./MisAudienciasWeb";
const { useBreakpoint } = Grid;

function MisAudienciasPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <MisAudienciasMobile
        /> :
        <MisAudienciasWeb
        />
    }
        
    </>;
}

export default MisAudienciasPage;