import React, { useState, useEffect } from "react";
import { Flex, Grid, Typography, Layout, Form, Menu, message, Collapse, Input, Select, DatePicker, Table } from "antd";
import ListadoLegajosMobile from "./ListadoLegajosMobile";
import ListadoLegajosWeb from "./ListadoLegajosWeb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UpdateEstadoLegajo } from "../../../../utils/consultaLegajos/dinamicCalls";
import ModalEstado from "../../../../components/consultaLegajos/ModalEstado";
import { paths } from "../../../../utils/paths";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
import api from "../../../../services/api";
import useLegajoFilteredData from "../../../../hooks/filters/useLegajoFilteredData";
import { onDownloadLegajoPDF, onDownloadExcel } from "../../../../utils/consultaLegajos/dinamicCalls";
import { AnclarDesanclarLegajo } from "../../../../utils/home/dinamicCalls";
function ListadoLegajosPage(props) {
    const { allLegajos } = props;
    const screens = useBreakpoint();
    const navigate = useNavigate();

    const [editEstadoForm] = Form.useForm();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    const { abogados } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.auth);
    const [loadingsPDF, setLoadingsPDF] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [excelLoading, setExcelLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const customApiCall = async (filteredRequest) => {
        const response = await api.ListaLegajos.ListarLegajos(filteredRequest);
        return response;
    };

    const {
        paginador,
        loading,
        onChange,
        request,
        setRequest,
        onReset,
        form,
        reloadData,
        usuId
    } = useLegajoFilteredData(customApiCall, allLegajos);

    const onClickDetalle = (legajoId) => {
        console.log(legajoId)
        navigate(paths.DETALLE_LEGAJO(legajoId))
    }

    const onClickDocsIngreso = (legajoId) => {
        navigate(paths.DOCS_INGRESO_LEGAJO(legajoId))
    }

    const onClickDocsSalida = (legajoId) => {
        navigate(paths.DOCS_SALIDA_LEGAJO(legajoId))
    }

    const onClickEstado = (record) => {

        setCurrentRecord(record)

    }
    const onClickDownload = async (index, legajoId) => {
        enterLoading(index, true);
        try {
            onDownloadLegajoPDF(legajoId).then(() => {
                enterLoading(index, false);
            });
        } catch (error) {
            message.error("Error al descargar el PDF");
        }
    }

    const onClickExcel = async () => {
        setExcelLoading(true)
        try {
            onDownloadExcel(request, paginador, usuId, allLegajos).then(() => {
                setExcelLoading(false)
            });
        } catch (error) {
            message.error("Error al descargar el Excel");
        }
    }

    const handleOk = () => {
        setModalLoading(true);
        const params = {
            legajoId: currentRecord.legajoId,
            estadoId: editEstadoForm.getFieldValue("estadoId"),
            subfaseId: editEstadoForm.getFieldValue("subfaseId"),
            usuarioId: user.usuId
        };
        UpdateEstadoLegajo(params).then(
            (response) => {
                if (response.isSuccess) {
                    setModalLoading(false);
                    setCurrentRecord(null);
                    reloadData();
                    setModalOpen(false);
                } else {
                    setModalLoading(false);
                    message.error("Error al actualizar el estado del legajo");
                }

            }
        )

    };

    const handleCancel = () => {
        setCurrentRecord(null);
        editEstadoForm.resetFields();
        setModalOpen(false);
    };

    const onChangeCollapse = (key) => {
        //f

    };

    const enterLoading = (index, value) => {
        setLoadingsPDF((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = value;
            return newLoadings;
        });

    };



    useEffect(() => {
        console.log("record estado: ", currentRecord)
        if (currentRecord !== null && currentRecord !== undefined) {
            setModalOpen(true);
        }

    }, [currentRecord]);

    const onPinClick = (legajoId) => {
        AnclarDesanclarLegajo(user.usuId, legajoId).then((response) => {
            if (response.isSuccess) {
                reloadData();
            }
        });
    }

    return <>{isXsScreen ?
        <ListadoLegajosMobile
            onClickDetalle={onClickDetalle}
            onClickDocsIngreso={onClickDocsIngreso}
            onClickDocsSalida={onClickDocsSalida}
            onClickEstado={onClickEstado}
            onClickDownload={onClickDownload}
            onChangeCollapse={onChangeCollapse}
            allLegajos={allLegajos}
            abogados={allLegajos ? abogados : null}
            paginador={paginador}
            loading={loading}
            onChange={onChange}
            request={request}
            setRequest={setRequest}
            onReset={onReset}
            form={form}
            loadingsPDF={loadingsPDF}
            onClickExcel={onClickExcel}
            excelLoading={excelLoading}
            onPinClick = {onPinClick}
        /> :
        <ListadoLegajosWeb
            onClickDetalle={onClickDetalle}
            onClickDocsIngreso={onClickDocsIngreso}
            onClickDocsSalida={onClickDocsSalida}
            onClickEstado={onClickEstado}
            onClickDownload={onClickDownload}
            onChangeCollapse={onChangeCollapse}
            allLegajos={allLegajos}
            abogados={allLegajos ? abogados : null}
            paginador={paginador}
            loading={loading}
            onChange={onChange}
            request={request}
            setRequest={setRequest}
            onReset={onReset}
            form={form}
            loadingsPDF={loadingsPDF}
            onClickExcel={onClickExcel}
            excelLoading={excelLoading}
            onPinClick = {onPinClick}
        />
    }
        <ModalEstado
            modalOpen={modalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            modalLoading={modalLoading}
            currentRecord={currentRecord}
            form={editEstadoForm}

        ></ModalEstado>
    </>;
}

export default ListadoLegajosPage;