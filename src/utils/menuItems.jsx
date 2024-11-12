import React from "react";
import {
    Lightning,
    Funnel,
    SignOut,
    Bell,
    FileText,
    CalendarBlank,
    ChartBar,
    HandArrowDown,
    EnvelopeSimple,
    MicrosoftExcelLogo
} from "@phosphor-icons/react";
import { Perfiles } from "./constants";
import { paths } from "./paths";
export const items = [
    {
        key: 'sub1',
        label: 'Consulta Legajos',
        icon: <FileText size={20} weight="fill" />,
        profiles: [Perfiles.ABOGADO, Perfiles.ADMIN, Perfiles.MESA_PARTES, Perfiles.PROCURADOR],
        children: [
            {
                key: paths.MIS_LEGAJOS,
                label: 'Consultar mis Legajos',
                profiles: [Perfiles.ABOGADO, Perfiles.ADMIN],
            },
            {
                key: paths.TODOS_LEGAJOS,
                label: 'Todos los Legajos',
                profiles:[Perfiles.ABOGADO, Perfiles.ADMIN, Perfiles.MESA_PARTES, Perfiles.PROCURADOR],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Ver Audiencias',
        icon: <CalendarBlank size={20} weight="fill" />,
        profiles: [Perfiles.ABOGADO, Perfiles.ADMIN, Perfiles.MESA_PARTES, Perfiles.PROCURADOR],
        children: [
            {
                key: paths.MIS_AUDIENCIAS,
                label: 'Mis Audiencias',
                profiles: [Perfiles.ABOGADO, Perfiles.ADMIN],
            },
            {
                key: paths.TODAS_AUDIENCIAS,
                label: 'Todos las Audiencias',
                profiles:[Perfiles.ADMIN, Perfiles.MESA_PARTES, Perfiles.PROCURADOR],
            },
        ],
    },
    {
        key: 'sub3',
        label: 'Reporte Legajos',
        icon: <ChartBar size={20} weight="fill" />,
        profiles: [Perfiles.ADMIN, Perfiles.PROCURADOR],
        children: [
            {
                key: paths.REPORTE_GENERAL,
                label: 'Reporte General',
                profiles: [Perfiles.ADMIN, Perfiles.PROCURADOR],
            },
            {
                key: paths.SEGUIMIENTO,
                label: 'Seguimiento',
                profiles: [Perfiles.ADMIN, Perfiles.PROCURADOR],
            },
        ],
    },
    {
        key: 'sub4',
        icon: <HandArrowDown size={20} weight="fill" />,
        label: 'Recepción Legajos',
        profiles: [Perfiles.ADMIN, Perfiles.MESA_PARTES],
        children: [
            {
                key: paths.RECEPCION_LEGAJOS,
                label: 'Recepcionar',
                profiles: [Perfiles.ADMIN, Perfiles.MESA_PARTES],
            },


        ],
    },
    {
        key: 'logout',
        icon: <SignOut size={20} weight="fill" />,
        label: 'Cerrar Sesión',
        profiles: [Perfiles.ABOGADO, Perfiles.ADMIN, Perfiles.MESA_PARTES, Perfiles.PROCURADOR],
    },
];