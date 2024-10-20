import React, { useState } from "react";
import { Flex, Grid} from "antd";
import AdicionarDocsMobile from "./AdicionarDocsMobile";
import AdicionarDocsWeb from "./AdicionarDocsWeb";

const { useBreakpoint } = Grid;

function AdicionarDocsPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <AdicionarDocsMobile
        /> :
        <AdicionarDocsWeb
        />
    }
    </>;
}

export default AdicionarDocsPage;