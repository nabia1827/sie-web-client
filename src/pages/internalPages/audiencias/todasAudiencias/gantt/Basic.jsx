import React, { Component } from "react";
import { notification, message, Form } from "antd";
import dayjs from "dayjs";
import {
    HubConnection,
    HubConnectionBuilder,
    HttpTransportType,
    LogLevel
} from "@microsoft/signalr";
import { connect, useSelector } from "react-redux";
import {
    Scheduler,
    SchedulerData,
    ViewType,
    DATE_FORMAT,
    DATETIME_FORMAT,
    CellUnit,
    wrapperFun,
} from "./index";
import EventItemPopover from "../../../../../components/audiencias/EventItemPopover";
import api from "../../../../../services/api"
import ModalNuevaAudiencia from "../../../../../components/audiencias/ModalNuevaAudiencia";
import { InsertNuevasAudiencias, RemoveAudiencias, EditAudiencias } from "../../../../../utils/audiencias/dinamicCalls";
import _ from "lodash";
import ModalDetalleAudiencia from "../../../../../components/audiencias/ModalDetalleAudiencia";

class Basic extends Component {

    constructor(props) {
        super(props);

        const schedulerData = new SchedulerData(
            dayjs(),
            ViewType.Week,
            false,
            false,
            {
                dayMaxEvents: 99,
                weekMaxEvents: 9669,
                monthMaxEvents: 9669,
                quarterMaxEvents: 6599,
                yearMaxEvents: 9956,
                customMaxEvents: 9965,
                eventItemPopoverTrigger: "click",
                schedulerContentHeight: "100%",
                checkConflict: false,
                customCellWidth: 200,
                nonAgendaDayCellHeaderFormat: "D/M|HH:mm",
                views: [
                    {
                        viewName: "Día",
                        viewType: ViewType.Day,
                        showAgenda: false,
                        isEventPerspective: false,
                    },
                    {
                        viewName: "Semanal",
                        viewType: ViewType.Custom2,
                        showAgenda: false,
                        isEventPerspective: false,
                    },
                    {
                        viewName: "Quincenal",
                        viewType: ViewType.Custom1,
                        showAgenda: false,
                        isEventPerspective: false,
                    },
                    {
                        viewName: "Mensual",
                        viewType: ViewType.Month,
                        showAgenda: false,
                        isEventPerspective: false,
                    },
                ],
            },
            {
                getCustomDateFunc: this.getCustomDate,
                isNonWorkingTimeFunc: this.isNonWorkingTime,
            }
        );
        schedulerData.setSchedulerLocale("es-mx", { weekStart: 1 });
        schedulerData.setCalendarPopoverLocale("es_ES");

        this.state = {
            viewModel: schedulerData,
            isModalVisible: false,
            isDetalleVisible:false,
            detalleId:0,
            eventData: null,
            deleteItemsList: [],
            connection: null,
            events: [],
            eventIsMoving: false,
            loadingScheduler: true,
            isEditing: false,
            isDeleting: false,
            primeraCarga: true, //para manejar la primera carga de la pagina
        };
    }

    componentDidMount() {
        const connectBuilder = new HubConnectionBuilder()
            .configureLogging(LogLevel.None)
            //.withUrl("http://172.16.25.38:84/hubs/notifications", {
            .withUrl(`https://localhost:44393/hubs/notifications`, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        this.setState({ connection: connectBuilder }, () => {
            this.startS();
            this.changeHappened();
            this.deleteHappened();
            // this.insertHappened();
        });
        this.LoadData(this.state.viewModel);
    }

    componentDidUpdate(prevProps) {
        //------------
        //Sirve para que en la primera carga no se quede eternamente en el estado loading hasta que se presione un boton

        if (this.state.primeraCarga === true) {
            const { viewModel } = this.state;
            this.LoadData(viewModel);
            this.setState({ primeraCarga: false });
        }
        //------------
        /* RECARGA CADA VEZ QUE CAMBIA TALLER
        if (prevProps.selectedTaller !== this.props.selectedTaller) {
            const { viewModel } = this.state;
            this.LoadData(viewModel);
            this.setState({ loadingScheduler: true });
        }*/
    }

    startS = async () => {
        try {
            await this.state.connection.start();
            //console.log("SignalR Connected.");
            console.log("");
        } catch (err) {
            //console.log(err);
            setTimeout(() => this.startS, 5000);
        }
    };

    startIfNeeded = async () => {
        if (this.state.connection !== null) {
            if (this.state.connection.state === HubConnection.Disconnected) {
                this.state.connection.start();
            } else if (this.state.connection.state === HubConnection.Connected)
                //console.log("Connected state.");
                console.log("");
        }
    };

    changeHappened = () => {
        if (this.state.connection !== null) {
            this.startIfNeeded()
                .then(() => {


                    this.state.connection.on("ReceiveMessage", (data) => {
                        const scheduler = this.state.viewModel;
                        scheduler.removeEventById(data.id);
                        scheduler.addEvent(data);

                        this.setState({ viewModel: scheduler }, () => { });
                    });
                })
                .catch((error) => { console.log("") });
        }
    };

    deleteHappened = () => {
        if (this.state.connection !== null) {
            this.startIfNeeded()
                .then(() => {
                    this.state.connection.on("ReceiveDelete", (data) => {
                        const scheduler = this.state.viewModel;
                        scheduler.removeEventById(data.id);

                        this.setState({ viewModel: scheduler }, () => { });
                    });
                })
                .catch((error) => console.log(""));
        }
    };

    insertHappened = () => {
        if (this.state.connection !== null) {
            this.startIfNeeded()
                .then(() => {
                    this.state.connection.on("ReceiveInsert", (data) => {
                        const scheduler = this.state.viewModel;
                        this.setState({ viewModel: scheduler }, () => { });
                    });
                })
                .catch((error) => console.log(""));
        }
    };

    sendMessage = async (event) => {
        const data = "mensaje";

        if (this.state.connection) this.state.connection.send("SendMessage", event);
    };

    sendDelete = async (event) => {
        const data = "mensaje";

        if (this.state.connection) this.state.connection.send("SendDelete", event);
    };

    sendInsert = async (event) => {
        if (this.state.connection) this.state.connection.send("SendInsert", event);
    };

    LoadData = async (oldSchedulerData) => {

        //Verificación para que personas no autorizadas no puedan ver las semanas siguientes a la semana actual    

        let semanaActual = dayjs().isoWeek();
        let actualYear = dayjs().year();
        let semanaGantt = oldSchedulerData.startDate.isoWeek();
        let ganttYear = oldSchedulerData.startDate.year();


        if (true) {

            const { selectedTaller, user, talleresByUser } = this.props;
            let schedulerData;

            this.setState({ loadingScheduler: true });

            if (true) {
                // Call to API
                schedulerData = _.cloneDeep(oldSchedulerData);

                let daysToAdd =
                    oldSchedulerData.endDate.diff(oldSchedulerData.startDate, "day") + 1;


                await api.ListaLegajos.ListarAbogados()
                    .then((response) => {
                        response.data.map((item) => {
                            item.id = item.abogadoId;
                            item.name = item.abogadoNombre;
                            delete item.abogadoId;
                            delete item.abogadoNombre;
                            delete item.usuId;
                            return item;
                        });
                        schedulerData.setResources(response.data);
                    })
                    .catch((error) => {
                        // message.error(error.message);
                    });

                const date = dayjs;
                let mondayDate = schedulerData.startDate;


                const day = mondayDate.format("YYYYMMDD");

                await api.Audiencia.GetAudienciasByWeek(
                    day,
                    daysToAdd,
                    user.usuId
                )
                    .then((response) => {
                        response.data.map((item) => {
                            item.id = item.audienciaId;

                            const completeStartDate = item.startTime.split("T");
                            const startDateAux = `${completeStartDate[0]} ${completeStartDate[1]}`;

                            const completeEndDate = item.endTime.split("T");
                            const endDateAux = `${completeEndDate[0]} ${completeEndDate[1]}`;

                            item.start = startDateAux;
                            item.end = endDateAux;
                            item.title = item.audienciaTitle;
                            item.resourceId = item.abogadoId;
                            item.showPopover = item.showPopover;
                            item.startResizable = item.startResizable;
                            item.endResizable = item.endResizable;
                            item.movable = item.movable;
                            item.resizable = item.resizable;
                            item.bgColor = item.audienciaColor;
                            delete item.audienciaId;
                            delete item.startTime;
                            delete item.endTime;
                            delete item.audienciaTitle;
                            delete item.abogadoId;
                            delete item.showPopover;
                            delete item.startResizable;
                            delete item.endResizable;
                            delete item.movable;
                            delete item.resizable;
                            delete item.audienciaSubTitleHour;
                            
                            //delete item.schdRrule;
                            //delete item.schdOsId;
                            return item;
                        });
                        schedulerData.setEvents(response.data);
                        this.setState(({ viewModel }) => ({
                            viewModel: schedulerData,
                        }));

                        this.setState({ loadingScheduler: false });
                    })
                    .catch((error) => {
                        // message.error(error.message);
                        this.setState({ loadingScheduler: false });
                    });
                this.setState({ loadingScheduler: false });
            }
            return schedulerData;
        }
    };

    render() {
        const {
            viewModel,
            isModalVisible,
            isDetalleVisible,
            detalleId,
            eventData,
            loadingScheduler,
            isDeleting,
            isEditing,
        } = this.state;

        // setting the editing props based on the global state
        viewModel.config.startResizable = isEditing;
        viewModel.config.endResizable = isEditing;
        viewModel.config.movable = isEditing;
        viewModel.config.creatable = isEditing;
        viewModel.config.eventItemPopoverEnabled = !isDeleting && !isEditing;

        return (
            <>

                <Scheduler
                    loadingScheduler={loadingScheduler}
                    schedulerData={viewModel}
                    prevClick={this.prevClick}
                    nextClick={this.nextClick}
                    todayClick={this.todayClick}
                    onSelectDate={this.onSelectDate}
                    onViewChange={this.onViewChange}
                    viewEventClick={this.ops1}
                    viewEvent2Click={this.ops2}
                    updateEventStart={this.updateEventStart}
                    updateEventEnd={this.updateEventEnd}
                    moveEvent={this.moveEvent}
                    newEvent={this.newEvent}
                    eventItemClick={this.eventClicked}
                    onScrollLeft={this.onScrollLeft}
                    onScrollRight={this.onScrollRight}
                    onScrollTop={this.onScrollTop}
                    onScrollBottom={this.onScrollBottom}
                    toggleExpandFunc={this.toggleExpandFunc}
                    eventItemPopoverTemplateResolver={
                        this.eventItemPopoverTemplateResolver
                    }
                    eventItemTemplateResolver={this.eventItemTemplateResolver}
                    conflictOccurred={this.conflictOccurred}
                    isEditing={this.state.isEditing}
                    setIsEditing={this.setIsEditing}
                    handleConfirmEditScheduler={this.handleConfirmEditScheduler}
                    handleCancelEditScheduler={this.handleCancelEditScheduler}
                    isDeleting={this.state.isDeleting}
                    setIsDeleting={this.setIsDeleting}
                    deleteItemsList={this.state.deleteItemsList}
                    handleCheckAllDeletedItems={this.handleCheckAllDeletedItems}
                    removeItemsList={this.removeItemsList}
                    cleanItemsList={this.cleanItemsList}
                />
                <ModalNuevaAudiencia
                    modalOpen={isModalVisible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    eventData = {eventData}
                >

                </ModalNuevaAudiencia>
                <ModalDetalleAudiencia
                modalOpen={isDetalleVisible}
                handleOk={this.saveDetalle}
                handleCancel={this.closeDetalle}
                audienciaId = {detalleId}
                >

                </ModalDetalleAudiencia>

            </>
        );
    }

    eventItemPopoverTemplateResolver = (
        schedulerData,
        eventItem,
        title,
        start,
        end,
        statusColor
    ) => (
        <EventItemPopover
            schedulerData={schedulerData}
            eventItem={eventItem}
            title={title}
            start={start}
            end={end}
            statusColor={statusColor}
            loadData={this.LoadData}
        />
    );
    closeDetalle = () =>{
        this.setState({ isDetalleVisible: false });
        this.setState({ detalleId: 0 });
    }

    saveDetalle = () =>{
        const { viewModel } = this.state;
        this.setState({ isDetalleVisible: false });
        this.setState({ detalleId: 0 });
        this.LoadData(viewModel);
    }

    eventClicked = (schedulerData, event) => {
        const { deleteItemsList, isDeleting,isDetalleVisible, isEditing } = this.state;

        if (isDeleting) {
            const updatedDeleteItemsList = [...deleteItemsList];

            if (updatedDeleteItemsList.includes(event.id)) {
                const index = updatedDeleteItemsList.indexOf(event.id);
                updatedDeleteItemsList.splice(index, 1);
            } else {
                schedulerData.events.forEach((e) => {
                    if (e.id === event.id) {
                        updatedDeleteItemsList.push(e.id);
                    }
                });
            }

            this.setState({
                deleteItemsList: updatedDeleteItemsList,
                viewModel: schedulerData,
            });
        }else if(!isEditing){
            this.setState({ detalleId: event.id });
            this.setState({ isDetalleVisible: !isDetalleVisible });
        }
    };

    setIsDeleting = () => {
        this.setState({ isDeleting: true });
    };

    removeItems = async (itemsList) => {
        const { viewModel } = this.state;
        const { user } = this.props;
        this.setState({ loadingScheduler: true });
        try {
            const response = await RemoveAudiencias(itemsList, user.usuId);
            itemsList.forEach((e) => {
                const eventArr = viewModel.events.filter((elem) => elem.id === e);
                if (eventArr.length > 0) this.sendDelete(eventArr.pop());
            });
            response.isSuccess
                ? message.success(response.message)
                : message.error(response.message);
            this.deleteHappened();
            this.LoadData(viewModel);
        } catch (err) {
            message.error(err.response.data);
        } finally {
            this.setState({ loadingScheduler: false });
        }
    };

    removeItemsList = () => {
        this.removeItems(this.state.deleteItemsList);
        this.setState({ deleteItemsList: [], isDeleting: false });
    };

    cleanItemsList = () => {
        this.setState({ deleteItemsList: [], isDeleting: false });
    };

    handleCheckAllDeletedItems = (itemsList) => {
        this.setState({ deleteItemsList: itemsList });
    };

    //This method helps to change the state of the events when moving
    //without call the API to update the events
    changeEventStateWhenMoving = () => {
        const { events, viewModel } = this.state;
        // Se crea un mapa de eventos por "id" en viewModel.events
        const viewModelEventsMap = {};
        viewModel.events.forEach((event) => {
            viewModelEventsMap[event.id] = event;
        });

        // Mapear "events" y actualizar las propiedades específicas
        const updatedEvents = events.map((event) => {
            const matchingViewModelEvent = viewModelEventsMap[event.id];

            if (matchingViewModelEvent) {
                // Copiar las propiedades "id", "start", "end" y "resourceId" desde "matchingViewModelEvent"
                return {
                    ...event,
                    id: matchingViewModelEvent.id,
                    start: dayjs(matchingViewModelEvent.start).format(),
                    end: dayjs(matchingViewModelEvent.end).format(),
                    resourceId: matchingViewModelEvent.resourceId,
                };
            }
            return event;
        });

        this.setState({ events: updatedEvents });
    };

    setIsEditing = () => {
        this.setState({ isEditing: true });
    }

    handleConfirmEditScheduler = async () => {
        const { viewModel, events, eventIsMoving } = this.state;
        const { user } = this.props;
        this.setState({ loadingScheduler: true });

        try {
            if (events.length > 0) {
                await InsertNuevasAudiencias(events, user.usuId)
                    .then((response) => {
                        response.isSuccess
                            ? message.success(response.message)
                            : message.error(response.message);
                        if (response.failedData != null) {
                            message.success(response.failedData);
                        }
                    })
                    .catch((err) => {
                        message.error(err.response.data);
                    });
            } else if (eventIsMoving) {
                
                await EditAudiencias(viewModel.events, user.usuId)
                    .then((response) => {
                        response.isSuccess
                            ?
                            message.success(response.message)
                            : message.error(response.message);
                    })
                    .catch((err) => {
                        message.error(err.response.data);
                    });
            }

            if (events.length === 0 && !eventIsMoving)
                message.info("No hay cambios para guardar");

            this.setState({ events: [], eventIsMoving: false });
            this.LoadData(viewModel);
        } catch (err) {
            message.error(err.response.data);
        } finally {
            this.setState({ loadingScheduler: false });
        }
        this.setState({ events: [], eventIsMoving: false, isEditing: false });
    };

    handleCancelEditScheduler = () => {
        const { viewModel } = this.state;
        this.setState({ events: [], eventIsMoving: false, isEditing: false });
        this.LoadData(viewModel);
    };

    conflictOccurred = (
        schedulerData,
        action,
        event,
        type,
        slotId,
        slotName,
        start,
        end
    ) => {
        notification.error({
            message: "Error",
            description: `No puede ser asignado a ${slotName} porque ya tiene una audiencia asignada en esos días`,
            placement: "top",
        });
    };

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleOk = async (formData) => {
        const { viewModel, eventData, events } = this.state;
        const { tiposAudiencia } = this.props;

        console.log("formData ",formData);
        const objTitle = tiposAudiencia.find(t => t.tipoAudienciaId === formData.audienciaTipoId);


        let newFreshId = 0;
        viewModel.events.forEach((item) => {
            if (item.id >= newFreshId) newFreshId = item.id + 1;
        });

        const newEvent = {
            id: newFreshId,
            title: objTitle.descripcion,
            start: formData.startTime,
            end: formData.endTime,
            resourceId: eventData.resourceId,
            bgColor: formData.audienciaColor,
        };

        const newEventDB = {
            id: newFreshId,
            titleName: objTitle.descripcion,
            start: dayjs(formData.startTime).format(),
            end: dayjs(formData.endTime).format(),
            resourceId: eventData.resourceId,
            audienciaTipoId: formData.audienciaTipoId,
            legajoId:formData.legajoId,
            audienciaLink: formData.audienciaLink,
            audienciaObservaciones:formData.audienciaObservaciones,
            audienciaColor:formData.audienciaColor
            
        };
        console.log("newEvent ",newEvent);
        console.log("newEventDB ",newEventDB);
        viewModel.addEvent(newEvent);
        this.setState({
            isModalVisible: false,
            viewModel,
        });

        events.push(newEventDB);
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    todayClick = (schedulerData) => {
        schedulerData.setDate();
        this.LoadData(schedulerData);
    };

    prevClick = (schedulerData) => {
        schedulerData.prev();
        this.LoadData(schedulerData);
        this.setState({
            viewModel: schedulerData,
        });
    };

    nextClick = (schedulerData) => {
        schedulerData.next();
        this.LoadData(schedulerData);
    };

    onViewChange = (schedulerData, view) => {
        const start = new Date();
        schedulerData.setViewType(
            view.viewType,
            view.showAgenda,
            view.isEventPerspective
        );
        this.LoadData(schedulerData);

        function secondsBetween(date1, date2) {
            const diff = Math.abs(date1.getTime() - date2.getTime());
            return diff / 1000;
        }
    };

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        this.LoadData(schedulerData);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        this.setState({
            isModalVisible: true,
            eventData: {
                start,
                end,
                resourceId: slotId,
            },
        });
    };

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({ eventIsMoving: true });
        this.sendMessage(event);
        this.changeHappened();
        this.changeEventStateWhenMoving();
    };

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({ eventIsMoving: true });
        this.sendMessage(event);
        this.changeHappened();
        this.changeEventStateWhenMoving();
    };

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({ eventIsMoving: true });
        this.sendMessage(event);
        this.changeHappened();
        this.changeEventStateWhenMoving();
    };

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewType.Day) {
            schedulerData.next();
            this.LoadData(schedulerData);
            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    };

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewType.Day) {
            schedulerData.prev();
            this.LoadData(schedulerData);
            schedulerContent.scrollLeft = 10;
        }
    };

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log("");
    };

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log("");
    };

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData,
        });
    };

    setStop = (etapaId, codigo) => {
        console.log("");
    };

    getCustomDate = (schedulerData, num, date = undefined) => {
        const { viewType } = schedulerData;
        let selectDate = schedulerData.startDate;
        if (date !== undefined) selectDate = date;

        let startDate =
            num === 0
                ? selectDate
                : schedulerData
                    .localeDayjs(selectDate)
                    .add(2 * num, "days")
                    .format(DATE_FORMAT);
        let endDate = schedulerData
            .localeDayjs(startDate)
            .add(1, "days")
            .format(DATE_FORMAT);
        let cellUnit = CellUnit.Hour;
        if (viewType === ViewType.Custom1) {
            const monday = schedulerData
                .localeDayjs(selectDate)
                .startOf("week")
                .format(DATE_FORMAT);
            startDate =
                num === 0
                    ? monday
                    : schedulerData
                        .localeDayjs(monday)
                        .add(2 * num, "weeks")
                        .format(DATE_FORMAT);
            endDate = schedulerData
                .localeDayjs(startDate)
                .add(1, "weeks")
                .endOf("week")
                .format(DATE_FORMAT);
            cellUnit = CellUnit.Day;
        } else if (viewType === ViewType.Custom2) {
            const monday = schedulerData
                .localeDayjs(selectDate)
                .startOf("week")
                .format(DATE_FORMAT);
            startDate =
                num === 0
                    ? monday
                    : schedulerData
                        .localeDayjs(monday)
                        .add(1 * num, "weeks")
                        .format(DATE_FORMAT);
            endDate = schedulerData
                .localeDayjs(startDate)
                .add(0, "weeks")
                .endOf("week")
                .format(DATE_FORMAT);
            cellUnit = CellUnit.Day;
        }

        return {
            startDate,
            endDate,
            cellUnit,
        };
    };

    isNonWorkingTime = (schedulerData, time) => {
        const { localeDayjs } = schedulerData;
        if (schedulerData.cellUnit === CellUnit.Hour) {
            const hour = localeDayjs(time).hour();
            if (hour < 1) return true;
        } else {
            const dayOfWeek = localeDayjs(time).weekday();
            if (dayOfWeek === 0 || dayOfWeek === 6) return true;
        }

        return false;
    };
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    tiposAudiencia: state.app.tiposAudiencia,
    selectedTaller: "90",
    talleresByUser: [1, 23, 4],
});

export default connect(mapStateToProps)(wrapperFun(Basic));
