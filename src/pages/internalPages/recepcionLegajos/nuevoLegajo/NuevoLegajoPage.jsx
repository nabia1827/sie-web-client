import React, { useState } from "react";
import { Flex, Grid} from "antd";
import NuevoLegajoMobile from "./NuevoLegajoMobile";
import NuevoLegajoWeb from "./NuevoLegajoWeb";

const { useBreakpoint } = Grid;

function NuevoLegajoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <NuevoLegajoMobile
        /> :
        <NuevoLegajoWeb
        />
    }
    </>;
}

export default NuevoLegajoPage;