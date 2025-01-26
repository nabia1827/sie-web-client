import React, { useState, useEffect } from "react";
import { Flex, Grid } from "antd";
import MisAudienciasMobile from "./MisAudienciasMobile";
import MisAudienciasWeb from "./MisAudienciasWeb";
import ModalNuevaAudiencia from "../../../../components/misAudiencias/ModalNuevaAudiencia";
import ModalDetalleAudiencia from "../../../../components/misAudiencias/ModalDetalleAudiencia";
import ModalBorrarAudiencia from "../../../../components/misAudiencias/ModalBorrarAudiencia";
import { GetMisAudienciasByWeek, EditMiAudiencia, NewMiAudiencia, DeleteMiAudiencia } from "../../../../utils/misAudiencias/dinamicCalls";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { useSelector } from "react-redux";
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import '../../../../css/personalSchedule.css'
import dayjs from 'dayjs';

const { useBreakpoint } = Grid;

function MisAudienciasPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { user } = useSelector((state) => state.auth);

    //Modal de nueva audiencia
    const [modalNewAudOpen, setModalNewAudOpen] = useState(false);

    const saveNewAudiencia = async (audiencia) => {
        //setLoadingInfo(true);
        try {
            const response = await NewMiAudiencia(audiencia)
            console.log("Audiencia mandada a BD: ", response.data)

        } finally {
            const { start, end } = calendar.calendarControls.getRange()
            fetchMisAudiencias(start, end, user.usuId)
        }
    };

    const onClickNewAudiencia = () => {
        setModalNewAudOpen(true);
    }

    const handleOkNewAud = (audiencia) => {
        saveNewAudiencia(audiencia)
        setModalNewAudOpen(false);
    }

    const handleCancelNewAud = () => {
        setModalNewAudOpen(false);
    }

    //Modal detalle Audincia
    const [modalDetAudOpen, setModalDetAudOpen] = useState(false);
    const [currAudienciaId, setCurrAudienciaId] = useState(0);

    const savEditedAudiencia = async (a) => {
        //setLoadingInfo(true);
        try {
            const response = await EditMiAudiencia(a.id, a.start, a.end, a.title, a.description, a.color, a.link, a.observaciones)
            console.log("Audiencia editada mandada a BD: ", response.data)

        } finally {
            const { start, end } = calendar.calendarControls.getRange()
            fetchMisAudiencias(start, end, user.usuId)
        }
    };

    const onClickDetAudiencia = (audiencia) => {
        setCurrAudienciaId(audiencia.id)
        setModalDetAudOpen(true);
    }

    const handleOkDetAud = () => {
        const { start, end } = calendar.calendarControls.getRange()
        fetchMisAudiencias(start, end, user.usuId)
        setCurrAudienciaId(0);
        setModalDetAudOpen(false);
    }

    const handleCancelDetAud = () => {
        setCurrAudienciaId(0);
        setModalDetAudOpen(false);
    }

    // Modal de Eliminar Audiencia
    const [modalDelAudOpen, setModalDelAudOpen] = useState(false);
    const removeMiAudiencia = async () => {
        //setLoadingInfo(true);
        try {
            const response = await DeleteMiAudiencia(currAudienciaId)
            console.log("Audiencia eliminada mandada a BD: ", response.data)

        } finally {
            calendar.eventsService.remove(currAudienciaId)
            setCurrAudienciaId(0);
            setModalDelAudOpen(false);
        }
    };

    const onClickDelAudiencia = () => {
        setModalDetAudOpen(false);
        setModalDelAudOpen(true);
    }

    const handleOkDelAud = () => {
        removeMiAudiencia();

    }

    const handleCancelDelAud = () => {
        setCurrAudienciaId(0);
        setModalDelAudOpen(false);
    }

    //Calendar
    const plugins = [createEventsServicePlugin(), createDragAndDropPlugin(), createResizePlugin(), createCalendarControlsPlugin()]

    const calendar = useCalendarApp({
        locale: 'es-ES',
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        dayBoundaries: {
            start: '05:00',
            end: '23:00',
        },
        callbacks: {
            /**
             * Is called when:
             * 1. Selecting a date in the date picker
             * 2. Selecting a new view
             * */
            onRangeUpdate(range) {
                console.log('new calendar range start date', range.start)
                console.log('new calendar range end date', range.end)
                fetchMisAudiencias(range.start, range.end, user.usuId)
            },

            //Is called when an event is updated through drag and drop
            onEventUpdate(updatedEvent) {
                console.log('onEventUpdate', updatedEvent)
                savEditedAudiencia(updatedEvent)
            },

            //Is called when an event is clicked
            onEventClick(calendarEvent) {
                onClickDetAudiencia(calendarEvent)
                console.log('onEventClick', calendarEvent)
            },

            //Is called when clicking a date in the month grid
            onClickDate(date) {
                console.log('onClickDate', date) // e.g. 2024-01-01
            },

            //Is called when clicking somewhere in the time grid of a week or day view
            onClickDateTime(dateTime) {
                console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
            },

            //Is called when selecting a day in the month agenda
            onClickAgendaDate(date) {
                console.log('onClickAgendaDate', date) // e.g. 2024-01-01
            },

            //Is called when double clicking a date in the month grid
            onDoubleClickDate(date) {
                console.log('onClickDate', date) // e.g. 2024-01-01
            },

            //Is called when double clicking somewhere in the time grid of a week or day view
            onDoubleClickDateTime(dateTime) {
                console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37
            },

            //Is called when clicking the "+ N events" button of a month grid-day
            onClickPlusEvents(date) {
                console.log('onClickPlusEvents', date) // e.g. 2024-01-01
            },

            //Is called when the selected date is updated
            onSelectedDateUpdate(date) {
                console.log('onSelectedDateUpdate', date)
            },

        }

    }, plugins)

    const fetchMisAudiencias = async (start, end, usuId) => {
        //setLoadingInfo(true);
        try {
            const response = await GetMisAudienciasByWeek(start, end, usuId)
            console.log("Mis Audiencias GET: ", response.data)
            calendar.eventsService.set(response.data);
        } finally {
            //setLoadingInfo(false);
        }
    };

    useEffect(() => {
        const { start, end } = calendar.calendarControls.getRange()

        fetchMisAudiencias(start, end, user.usuId)
    }, [])

    return <>
        {isXsScreen ?
            <MisAudienciasMobile
                onClickNewAudiencia={onClickNewAudiencia}
                calendar={calendar}
            /> :
            <MisAudienciasWeb
                onClickNewAudiencia={onClickNewAudiencia}
                calendar={calendar}
            />
        }
        <ModalNuevaAudiencia
            modalOpen={modalNewAudOpen}
            handleOk={handleOkNewAud}
            handleCancel={handleCancelNewAud}
        >
        </ModalNuevaAudiencia>
        <ModalDetalleAudiencia
            modalOpen={modalDetAudOpen}
            handleOk={handleOkDetAud}
            handleCancel={handleCancelDetAud}
            audienciaId={currAudienciaId}
            onClickDelAudiencia={onClickDelAudiencia}
        >
        </ModalDetalleAudiencia>
        <ModalBorrarAudiencia
            modalOpen={modalDelAudOpen}
            handleOk={handleOkDelAud}
            handleCancel={handleCancelDelAud}
        >

        </ModalBorrarAudiencia>
    </>;
}

export default MisAudienciasPage;