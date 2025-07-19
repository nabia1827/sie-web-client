import React from "react";
import { Grid, Flex, Button, Table, Typography } from "antd";
import { ColumnsDocs } from "../../../../utils/recepcionLegajos/columnsDocs";
import { colors } from "../../../../utils/colors";
import {
    Plus
} from "@phosphor-icons/react";
const {Text} = Typography;

function ListadoDocsWeb(props) {
    const { paginador, onPaginationChange, dataLoading, addButtonLoading, onClickEdit, onClickAdd} = props;

    const columns = ColumnsDocs(onClickEdit);


    return (
        <>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", backgroundColor: colors.white, margin: "1.0em 0.0em", borderRadius: "0.7em", padding: "1.5em" }}>
                <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                    <Text className="sie-content-title">Documentos Subidos</Text>
                    <Button
                        loading={addButtonLoading}
                        onClick={onClickAdd}
                        type="primary"
                        icon={<Plus size={16}  color="white" />}
                    >Añadir</Button>
                </Flex>
                <br></br>
                <Table
                    style={{ width: "100%" }}
                    loading={dataLoading}
                    rowKey="docId"
                    columns={columns}
                    dataSource={paginador?.data}
                    pagination={{
                        onChange:onPaginationChange,
                        total: paginador?.count,
                        pageSize: paginador?.pageSize,
                        current: paginador?.pageIndex,
                        showSizeChanger: true,
                        showTotal: (total) => `Hay ${total} registros`,
                    }}
                    size="small"

                />
            </Flex>
        </>
    );

}

export default ListadoDocsWeb;