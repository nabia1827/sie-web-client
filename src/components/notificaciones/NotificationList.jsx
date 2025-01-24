import { Flex, Typography, List, Avatar } from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography
import { FileTextOutlined } from '@ant-design/icons';

function NotificationList(props) {
    const { notifications } = props;

    return (
        <>
            <List
                style={{width:"400px",paddingLeft:"10px"}}
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(notification, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: notification.isRead?colors.gray:colors.middleBlue }} icon={<FileTextOutlined />} />}
                            title={notification.titulo}
                            description={notification.mensaje}
                        />
                    </List.Item>
                )}
            />
        </>
    );

}

export default NotificationList;