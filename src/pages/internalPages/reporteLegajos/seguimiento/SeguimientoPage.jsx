import React, { useState } from "react";
import { Flex, Grid} from "antd";
import SeguimientoMobile from "./SeguimientoMobile";
import SeguimientoWeb from "./SeguimientoWeb";

const { useBreakpoint } = Grid;

function SeguimientoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <SeguimientoMobile
        /> :
        <SeguimientoWeb
        />
    }
        
    </>;
}

export default SeguimientoPage;