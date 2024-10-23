import React from "react";
import ActorCivilWeb from "./actorCivil/ActorCivilWeb";
import DenunciaWeb from "./denuncia/DenunciaWeb";
import QuejaWeb from "./queja/QuejaWeb";
import { ClaseDoc } from "../../../../../utils/constants";
import { colors } from "../../../../../utils/colors";
import { Flex } from "antd";

function CrearDocWeb(props){
    const { claseDocId,acForm,onFinishAc,onCancelAc,loadingAc,
        qjForm,onFinishQj,onCancelQj,loadingQj,
        dnForm,onFinishDn,onCancelDn,loadingDn,provincias,onFieldsChangeDn,delitos
     } = props;

    const renderDocumentoComponent = () => {
        console.log("aaaaa cd",claseDocId)
        switch (+claseDocId) {
            case ClaseDoc.ACTOR_CIVIL:
                return <ActorCivilWeb form = {acForm} onFinishAc={onFinishAc} onCancelAc={onCancelAc} loadingAc={loadingAc}/>;
            case ClaseDoc.DENUNCIA:
                return <DenunciaWeb form = {dnForm} onFinishDn={onFinishDn} onCancelDn={onCancelDn} loadingDn={loadingDn} provincias={provincias} onFieldsChangeDn={onFieldsChangeDn} delitos={delitos}/>;
            case ClaseDoc.QUEJA:
                return <QuejaWeb form = {qjForm} onFinishQj ={onFinishQj} onCancelQj={onCancelQj} loadingQj ={loadingQj}/>;
            default:
                return <>Web</>;
        }
    };

    return (
        <>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", backgroundColor: colors.white, borderRadius: "0.7em", padding: "1.8em 2.6em",minHeight:"77vh" }}>
                {renderDocumentoComponent()}
            </Flex>
        </>
    );

}

export default CrearDocWeb;