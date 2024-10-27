import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Spin,
  Radio,
  Space,
  Popover,
  Calendar,
  Button,
  Avatar,
  Select,
  Popconfirm,
  message,
  Checkbox,
  Tooltip,
} from "antd";
import {
  RightOutlined,
  LeftOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/audiencias/default";
import { viewDateButtons } from "../../utils/audiencias/AudienciaFunctions";
import { BotonesVistasGantt } from "../../utils/constants";

import { useSelector, useDispatch } from "react-redux";


import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const SchedulerHeader = ({
  goToday,
  goBack,
  goNext,
  schedulerData,
  onViewChange,
  onSelectDate,
  handleCheckAllDeletedItems,
  isEditing,
  setIsEditing,
  confirmEditScheduler,
  cancelEditScheduler,
  isDeleting,
  setIsDeleting,
  confirmDeleteItemsList,
  cleanDeleteItemsList,
  deleteItemsList,
}) => {
  
  const { viewType, showAgenda, isEventPerspective, config } = schedulerData;
  const dateLabel = schedulerData.getDateLabel();
  const selectDate = schedulerData.getSelectedDate();
  const calendarLocale = schedulerData.getCalendarPopoverLocale()?.default?.Calendar;
  const defaultValue = `${viewType}${showAgenda ? 1 : 0}${isEventPerspective ? 1 : 0}`;
  const [messageApi, contextHolder] = message.useMessage();
  const [viewSpinning, setViewSpinning] = useState(false);
  const [dateSpinning, setDateSpinning] = useState(false);
  const [visible, setVisible] = useState(false);


  const dispatch = useDispatch();

  const notificationMessage = (message) => {
    messageApi.info(message);
  };

  // Setting the configurations from "config.js"
  config.views = viewDateButtons(null, BotonesVistasGantt);
  config.calendarPopoverEnabled = true;
  config.calendarLeftEnabled = true;
  config.calendarRightEnabled = true;
  config.calendarRightEnabledLimited = true;

  //Variables to determine disabled property in right arrow
  let ganttLastDay = schedulerData.endDate.isoWeekday(7); //ultimo dia de la semana a la que el usuario se quiere mover
  let currLastday = dayjs().isoWeekday(7); //ultimo dia de la semana actual
  let ganttSem = schedulerData.endDate.isoWeek(); //numero de semana final a la que el usuario se quiere mover
  let currSem = dayjs().isoWeek(); //numero de semana actual
  let ganttYear = schedulerData.endDate.year(); //año al que el usuario se quiere mover //Startdate
  let currYear = dayjs().year(); //año actual}

  
  // Deprecated: usado para llenar las etapas sin condición de taller
  /* useEffect(() => {   
    // Get the etapas from api
    api.Etapa.GetEtapasByCondition(1)
      .then((etapa) => {
        setEtapa(etapa.data);
      })
      .catch((err) => message.err(err.message));
  }, []); */

  useEffect(() => {
    return () => {
      message.destroy("editMessage");
      message.destroy("deleteMessage");
    };
  }, []);

  //this method is used to generate the pdf of the gantt 
  const generatePdf = () => {
    
  };

  //this method is used to handle the events of the scheduler
  //like the next, back, today and type of view
  const handleEvents = (func, isViewSpinning, funcArg = undefined) => {
    const { config } = schedulerData;

    if (isViewSpinning) {
      if (config.viewChangeSpinEnabled) setViewSpinning(true);
    } else {
      if (config.dateChangeSpinEnabled) setDateSpinning(true);
    }

    const coreFunc = () => {
      if (funcArg !== undefined) func(funcArg);
      else func();

      if (isViewSpinning) {
        if (config.viewChangeSpinEnabled) setViewSpinning(false);
      } else {
        if (config.dateChangeSpinEnabled) setDateSpinning(false);
      }
    };

    if (config.viewChangeSpinEnabled || config.dateChangeSpinEnabled) {
      setTimeout(coreFunc, config.schedulerHeaderEventsFuncsTimeoutMs); // 100ms
    } else {
      coreFunc();
    }
  };

  //this method is used to get the start date of the week
  //using the week number
  const getStartDateOfWeek = (weekNo) => {
    const currentDate = dayjs();
    const daysPastSinceLastMonday = currentDate.day();
    const startOfWeek = currentDate
      .subtract(daysPastSinceLastMonday, "day")
      .isoWeek(weekNo);
    return startOfWeek.format(DATE_FORMAT);
  };

  //-----------------------//
  //Methods for edit items
  //-----------------------//
  const editScheduler = () => {
    setIsEditing();
    message.loading({
      content: "Editando...",
      key: "editMessage",
      duration: 0,
    });
  };

  const handleConfirmEditScheduler = () => {
    confirmEditScheduler();
    message.destroy("editMessage");
  };

  const handleCancelEditScheduler = () => {
    cancelEditScheduler();
    message.destroy("editMessage");
    message.info("Edición cancelada");
  };

  //-----------------------//
  //Methods for delete items
  //-----------------------//
  const handleDeleteItems = () => {
    setIsDeleting(true);
    message.loading({
      content: "Eliminando...",
      key: "deleteMessage",
      duration: 0,
    });
  };

  const confirmDeleteItems = () => {
    confirmDeleteItemsList(deleteItemsList);
    message.destroy("deleteMessage");
  };

  const cancelDeleteItems = () => {
    cleanDeleteItemsList(deleteItemsList);
    message.destroy("deleteMessage");
    message.info("Eliminación cancelada");
  };

  // Change the value of deleteItemsList using prop method "handleCheckAllDeletedItems"
  const onCheckAllChange = (e) => {
    const itemsList = e.target.checked
      ? schedulerData.events.reduce((acc, event) => {
        if (event.schdEstadoDuracion === 1) {
          acc.push(event.id);
        }
        return acc;
      }, [])
      : [];
    handleCheckAllDeletedItems(itemsList);
  };

  //Control the change of taller select component
  const handleChangeTaller = (value) => {
    //Change of taller
  };

  //-----------------------//
  //Methods for view change
  //-----------------------//  
  const popover = (
    <div className="popover-calendar">
      <Calendar
        locale={calendarLocale}
        defaultValue={dayjs(selectDate)}
        fullscreen={false}
        onSelect={(date) => {
          setVisible(false);
          handleEvents(onSelectDate, false, date.format(DATE_FORMAT));
        }}
      />
    </div>
  );
  const radioButtonList = config.views.map((item) => (
    <RadioButton
      key={`${item.viewType}${item.showAgenda ? 1 : 0}${item.isEventPerspective ? 1 : 0
        }`}
      value={`${item.viewType}${item.showAgenda ? 1 : 0}${item.isEventPerspective ? 1 : 0
        }`}
    >
      <span style={{ margin: "0px 8px" }}>{item.viewName}</span>
    </RadioButton>
  ));

  const generateWeekOptions = () => {
    const weekOptions = Array.from({ length: 52 }, (_, index) => index + 1).map(
      (weekNumber) => ({
        value: weekNumber.toString(),
        label: <span>Semana {weekNumber}</span>,
      })
    );
    return (
      <>
        {true ? (
          <Select
            size="large"
            value={schedulerData.startDate.isoWeek().toString()}
            suffixIcon={null}
            bordered={false}
            onChange={(date) => {
              handleEvents(onSelectDate, false, getStartDateOfWeek(date));
            }}
            options={weekOptions}
          />
        ) : (
          <h3>Semana {schedulerData.startDate.isoWeek()}</h3>
        )}
      </>
    );
  };

  const infoEtapa = (
    <Col>
      <div>Aqui va el info</div>
    </Col>
  );

  return (
    <div className="header-scheduler" style={{ width: "100%" }}>
      <Row>
        <Col span={8} align="left" >
          <Row gutter={16}>
            <Col>
              <Button onClick={() => handleEvents(goToday, false)}>Hoy</Button>
            </Col>
            {true && (
              <Col>
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleConfirmEditScheduler}
                      type="primary"
                      icon={<CheckOutlined />}
                    />
                    <Popconfirm
                      title="Se perderán los cambios"
                      description="¿Seguro que desea cancelar?"
                      onConfirm={handleCancelEditScheduler}
                      okText="Sí"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        icon={<CloseOutlined />}
                        danger
                        style={{ marginLeft: "10px" }}
                      />
                    </Popconfirm>
                  </>
                ) : (
                  <Button
                    style={isDeleting ? { display: "none" } : {}}
                    onClick={editScheduler}
                    type="primary"
                    icon={<EditOutlined />}
                  />
                )}
              </Col>
            )}
            {true && (
              <Col>
                {isDeleting ? (
                  <>
                    <Button
                      onClick={confirmDeleteItems}
                      type="primary"
                      icon={<CheckOutlined />}
                    />
                    <Popconfirm
                      title="Se perderán los cambios"
                      description="¿Seguro que desea cancelar?"
                      onConfirm={cancelDeleteItems}
                      okText="Sí"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        icon={<CloseOutlined />}
                        danger
                        style={{ marginLeft: "10px" }}
                      />
                    </Popconfirm>
                    <Checkbox
                      style={{ marginLeft: "10px" }}
                      onChange={onCheckAllChange}
                    >
                      Todo
                    </Checkbox>
                  </>
                ) : (
                  <Button
                    style={isEditing ? { display: "none" } : {}}
                    onClick={handleDeleteItems}
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                  />
                )}
              </Col>
            )}
          </Row>
        </Col>
        <Col span={8}>
          <Row align="center">
            <Col>
              <div className="header2-text">
                <Space>
                  <div>
                    <Button icon={<LeftOutlined
                      type="left"
                      style={{
                        marginRight: "8px",
                        display: `${config.calendarLeftEnabled ? "" : "none"
                          }`,
                      }}
                      className="icon-nav"
                      onClick={() => {
                        handleEvents(goBack, false);
                      }}
                    />} type="link"   ></Button>
                    {config.calendarPopoverEnabled ? (
                      <Popover
                        content={popover}
                        placement="bottomLeft"
                        trigger="click"
                        open={visible}
                        onOpenChange={setVisible}
                      >
                        <span
                          className="header2-text-label"
                          style={{ cursor: "pointer" }}
                        >
                          {dateLabel}
                        </span>
                      </Popover>
                    ) : (
                      <span className="header2-text-label">{dateLabel}</span>
                    )}
                    <Button icon={<RightOutlined
                      type="right"
                      style={{
                        marginLeft: "8px",
                        display: `${config.calendarRightEnabled || config.calendarRightEnabledLimited ? "" : "none"
                          }`,

                      }}
                      disabled={true}
                      className="icon-nav"
                      onClick={() => {
                        handleEvents(goNext, false);
                      }}
                    />} type="link"
                      disabled={!(
                        //Si eres técnico 
                        //boton avanzar limitado esta en el perfil && (la vista NO es quincenal && (semana y el año actual son mayores || semana actual es menor pero el año actual es mayor (Ej:es sem 1 del 2024 vs la sem 52 del 2023 )))
                        (config.calendarRightEnabledLimited) && ((/* viewType !== 6 && */ ((currSem > ganttSem && currYear >= ganttYear) || (currSem < ganttSem && currYear > ganttYear)))
                          /* || 
                          (viewType === 6 && ((currSem > ganttSem && currYear >= ganttLastDay) || (currSem < ganttSem))) */
                        )

                        ||

                        //Si no eres técnico
                        (config.calendarRightEnabled && !config.calendarRightEnabledLimited)
                      )}

                    >
                    </Button>
                    {/* <RightOutlined  
                      type="right"
                      style={{
                        marginLeft: "8px",
                        display: `${
                          config.calendarRightEnabled || config.calendarRightEnabledLimited? "" : "none"
                        }`,
                        
                      }}
                      disabled = {true}                     
                      className="icon-nav"
                      onClick={() => {
                        handleEvents(goNext, false);
                      }}
                    /> */}
                  </div>
                  <Spin spinning={dateSpinning} />
                  <Spin spinning={viewSpinning} />
                </Space>
                <Row align="center">{generateWeekOptions()}</Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          span={8}
          align="right"
          style={{
            fontSize: "24px",
            color: "#333333",
          }}
        >
          <Space>
            <RadioGroup
              buttonStyle="solid"
              defaultValue={defaultValue}
              size="default"
              onChange={(event) => {
                handleEvents(onViewChange, true, event);
              }}
            >
              {radioButtonList}
            </RadioGroup>
          </Space>
        </Col>
        
      </Row>

    </div>
  );
};

SchedulerHeader.propTypes = {
  onViewChange: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goToday: PropTypes.func.isRequired,
  onSelectDate: PropTypes.func.isRequired,
  schedulerData: PropTypes.object.isRequired,
  leftCustomHeader: PropTypes.object,
  rightCustomHeader: PropTypes.object,
};

export default SchedulerHeader;
