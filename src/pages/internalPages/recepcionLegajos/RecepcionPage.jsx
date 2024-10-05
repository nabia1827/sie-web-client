import React, { useState } from "react";
import { Flex, Grid} from "antd";
import RecepcionMobile from "./RecepcionMobile";
import RecepcionWeb from "./RecepcionWeb";

const { useBreakpoint } = Grid;

function RecepcionPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <RecepcionMobile
        /> :
        <RecepcionWeb
        />
    }
        
    </>;
}

export default RecepcionPage;