import React from "react";
import { Flex } from "antd";
import ActorCivilMobile from "./actorCivil/ActorCivilMobile";
import DenunciaMobile from "./denuncia/DenunciaMobile";
import QuejaMobile from "./queja/QuejaMobile";
import { ClaseDoc } from "../../../../../utils/constants";
import { colors } from "../../../../../utils/colors";

function CrearDocMobile(props) {
    const { claseDocId,acForm } = props;

    const renderDocumentoComponent = () => {

        switch (+claseDocId) {
            case ClaseDoc.ACTOR_CIVIL:
                return <ActorCivilMobile></ActorCivilMobile>;
            case ClaseDoc.DENUNCIA:
                return <DenunciaMobile />;
            case ClaseDoc.QUEJA:
                return <QuejaMobile />;
            default:
                return <>Holap Mobile</>;
        }
    };

    return (
        <>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%",minHeight:"77vh", backgroundColor: colors.white, borderRadius: "0.7em", padding: "1.5em" }}>
                {renderDocumentoComponent()}
            </Flex>
        </>
    );

}

export default CrearDocMobile;