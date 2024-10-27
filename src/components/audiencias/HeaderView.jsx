import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { CellUnit } from "../../utils/audiencias/default";

import weekOfYear from 'dayjs/plugin/weekOfYear';

// Extender Day.js con el plugin
dayjs.extend(weekOfYear);


function HeaderView({ schedulerData, nonAgendaCellHeaderTemplateResolver }) {
  const { headers, cellUnit, config, localeDayjs } = schedulerData;
  const headerHeight = schedulerData.getTableHeaderHeight();
  const cellWidth = schedulerData.getContentCellWidth();
  const minuteStepsInHour = schedulerData.getMinuteStepsInHour();

  let headerList = [];
  let style = {};
  
  if (cellUnit === CellUnit.Hour) {
    headers.forEach((item, index) => {
      if (index % minuteStepsInHour === 0) {
        const datetime = localeDayjs(new Date(item.time));

        style = item.nonWorkingTime
          ? {
              width: cellWidth * minuteStepsInHour,
              color: config.nonWorkingTimeHeadColor,
              backgroundColor: config.nonWorkingTimeHeadBgColor,
            }
          : {
              width: cellWidth * minuteStepsInHour,
            };

        if (index === headers.length - minuteStepsInHour) {
          style = item.nonWorkingTime
            ? {
                color: config.nonWorkingTimeHeadColor,
                backgroundColor: config.nonWorkingTimeHeadBgColor,
              }
            : {};
        }

        const pFormattedList = config.nonAgendaDayCellHeaderFormat
          .split("|")
          .map((item) => datetime.format(item));
        let element;

        if (typeof nonAgendaCellHeaderTemplateResolver === "function") {
          element = nonAgendaCellHeaderTemplateResolver(
            schedulerData,
            item,
            pFormattedList,
            style
          );
        } else {
          const pList = pFormattedList.map((item, index) => (
            <div key={index}>{item}</div>
          ));

          element = (
            <th key={item.time} className="header3-text" style={style}>
              <div>{pList}</div>
            </th>
          );
        }

        headerList.push(element);
      }
    });
  } else {
    headerList = headers.map((item, index) => {
      const datetime = localeDayjs(new Date(item.time));
      style = item.nonWorkingTime
        ? {
            width: cellWidth,
            color: config.nonWorkingTimeHeadColor,
            backgroundColor: config.nonWorkingTimeHeadBgColor,
          }
        : { width: cellWidth };
      if (index === headers.length - 1) {
        style = item.nonWorkingTime
          ? {
              color: config.nonWorkingTimeHeadColor,
              backgroundColor: config.nonWorkingTimeHeadBgColor,
            }
          : {};
      }

      const pFormattedList = config.nonAgendaOtherCellHeaderFormat
        .split("|")
        .map((item) => datetime.format(item));

      if (typeof nonAgendaCellHeaderTemplateResolver === "function") {
        return nonAgendaCellHeaderTemplateResolver(
          schedulerData,
          item,
          pFormattedList,
          style
        );
      }

      const pList = pFormattedList.map((item, index) => (
        <div key={index}>{item}</div>
      ));

      return (
        <th key={item.time} className="header3-text" style={style}>
          <div>{pList}</div>
        </th>
      );
    });
  }

  /* Calculamos el número de semana en base a las fechas de las celdas de la tabla */

  // Almacenamos los grupos de semanas
  const weekGroups = headers.reduce((groups, header, index) => {
    const weekNumber = dayjs(header.time).isoWeek();

    // Si es el primer grupo o la semana es diferente a la anterior, creamos un nuevo grupo
    if (
      groups.length === 0 ||
      weekNumber !== groups[groups.length - 1][0].weekNumber
    ) {
      groups.push([]);
    }

    // Agregamos el índice y el número de semana al grupo actual
    groups[groups.length - 1].push({ index, weekNumber });

    return groups;
  }, []);

  const weekGroupsList = weekGroups.map((weekGroup, groupIndex) => {
    const colspan = weekGroup.length;
    return (
      <th key={groupIndex} colSpan={colspan}>
        Semana {weekGroup[0].weekNumber}
      </th>
    );
  });

  // Puede servir para no mostrar los grupos de semana en la vista "Semanal"
  // const isNotWeeklyView = schedulerData.viewType !== 1 && schedulerData.viewType !== 7;

  return (
    <thead style={{ height: headerHeight }}>
      <tr>{weekGroupsList}</tr>
      <tr>{headerList}</tr>
    </thead>
  );
}

HeaderView.propTypes = {
  schedulerData: PropTypes.object.isRequired,
  nonAgendaCellHeaderTemplateResolver: PropTypes.func,
};

export default HeaderView;
