import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography, Upload, Slider, message } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
import { UpdateUserEmail, GetUserImageUrl, RemoveUserImage, UpdateUserImage } from "../../utils/user/dinamicCalls";
import {
    EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../utils/colors";
const { Text } = Typography
const { TextArea } = Input;

function ModalEditarFoto(props) {
    const { modalOpen, handleClose, } = props;
    const { user } = useSelector((state) => state.auth);
    const [oldImage, setOldImage] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);


    useEffect(() => {
        if (user && user.usuId) {
            GetUserImageUrl(user.usuId).then((response) => {
                if (response.isSuccess) {
                    setOldImage(response.data)
                } else {
                    setOldImage(null);
                }
            });
        } else {
            setOldImage(null);
        }
    }, [user, modalOpen]);

    const [image, setImage] = useState(null); // Imagen cargada
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // Posición del recorte
    const [zoom, setZoom] = useState(1); // Zoom
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Datos del área recortada

    const onClickCancel = () => {
        setImage(null)
        setOldImage(null)
        handleClose()
    }

    const onClickRemove = () => {
        setOldImage(null)
        RemoveUserImage(user.usuId).then((response) => {
            if (response.isSuccess) {
                message.success(response.message)
            } else {
                message.error(response.message)
            }
            handleClose()
        });
    }


    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result); // Establece la imagen cargada
            setIsModalVisible(true); // Muestra el modal
        };
        reader.readAsDataURL(file);
    };

    const onClickOk = async () => {

        if (!image || !croppedAreaPixels) return;
        setModalLoading(true);
        const canvas = document.createElement("canvas");
        const img = new Image();
        img.src = image;

        img.onload = () => {
            const { width, height } = croppedAreaPixels;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                width,
                height,
                0,
                0,
                width,
                height
            );

            canvas.toBlob(
                async (blob) => {
                    if (!blob) return;

                    // Prepara el FormData
                    const formData = new FormData();
                    formData.append("file", blob, "profile.png"); // Nombre del archivo y tipo

                    UpdateUserImage(user.usuId, formData).then(()=>{
                        setImage(null);
                        setModalLoading(false);
                        handleClose();
                    });
                    
                },
                "image/png"
            );
        };
    };


    return (
        <>
            <Modal
                centered

                open={modalOpen}
                title={<Text className="sie-info-column-content" >Editar foto de perfil</Text>}
                onOk={onClickOk}
                onCancel={onClickCancel}
                footer={false}
            >
                <Flex vertical gap={"small"} justify="center" align="center">
                    {image ? (
                        <>
                            <div style={{ position: "relative", width: 300, height: 300 }}>
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1} // Define la relación de aspecto como cuadrado (1:1)
                                    cropShape="round" // Define el área de recorte como círculo
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <br></br>
                            <Flex style={{ width: "100%" }} gap={"small"} justify="space-between" align="center" >
                                <Flex gap={"small"} justify="center" align="center">
                                    <Text className="sie-info-column-label" >Zoom</Text>
                                    <Slider
                                        style={{ width: "80px" }}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(value) => setZoom(value)}
                                    />
                                </Flex>

                                <Button onClick={onClickOk} loading={modalLoading} style={enableModalButtonStyle} type="primary" >
                                    Confirmar
                                </Button>
                            </Flex>
                        </>
                    ) : (
                        <>
                            {oldImage ? (
                                <>
                                    <img src={oldImage} style={{ width: 300, height: 300, borderRadius: 200 }}>
                                    </img>
                                    <br></br>
                                    <Flex style={{ width: "100%" }} gap={"small"} justify="center" align="center" >
                                        <Button icon={<DeleteOutlined />} key="back" onClick={onClickRemove}>
                                            Retirar
                                        </Button>
                                        <Upload
                                            style={{ padding: 0 }}
                                            showUploadList={false}
                                            accept="image/*"
                                            customRequest={handleUpload} // Maneja el archivo cargado
                                        >
                                            <Button icon={<EditOutlined />}>Cambiar</Button>
                                        </Upload>

                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <div style={{ width: 300, height: 300, borderRadius: 200, backgroundColor: colors.lightBlack }}></div>
                                    <br></br>
                                    <Flex style={{ width: "100%" }} gap={"small"} justify="center" align="center" >
                                        <Upload
                                            style={{ padding: 0 }}
                                            showUploadList={false}
                                            accept="image/*"
                                            customRequest={handleUpload} // Maneja el archivo cargado
                                        >
                                            <Button icon={<EditOutlined />}>Cambiar</Button>
                                        </Upload>

                                    </Flex>
                                </>
                            )

                            }

                        </>
                    )}


                </Flex>

            </Modal>
        </>
    );

}

export default ModalEditarFoto;