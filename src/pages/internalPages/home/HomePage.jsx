import React, { useState } from "react";
import { Flex, Grid} from "antd";
import HomeMobile from "./HomeMobile";
import HomeWeb from "./HomeWeb";

const { useBreakpoint } = Grid;

function HomePage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <HomeMobile
        /> :
        <HomeWeb
        />
    }
        
    </>;
}

export default HomePage;