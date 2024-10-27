import { ViewType, SummaryPos } from './default';

export default {
  schedulerWidth: '79%',
  besidesWidth: 20,
  schedulerMaxHeight: '100%',
  tableHeaderHeight: 70,
  schedulerContentHeight: '500px',

  responsiveByParent: false,

  agendaResourceTableWidth: 160,
  agendaMaxEventWidth: 100,

  dayResourceTableWidth: '23%',
  weekResourceTableWidth: '23%',
  monthResourceTableWidth: '23%',
  quarterResourceTableWidth: '23%',
  yearResourceTableWidth: '23%',
  customResourceTableWidth: '22%',

  dayCellWidth: '12%',
  weekCellWidth: '12%',
  monthCellWidth: '12%',
  quarterCellWidth: '12%',
  yearCellWidth: '12%',
  customCellWidth: '12%',

  dayMaxEvents: 99,
  weekMaxEvents: 99,
  monthMaxEvents: 99,
  quarterMaxEvents: 99,
  yearMaxEvents: 99,
  customMaxEvents: 99,

  eventItemPopoverTrigger: 'hover',
  eventItemPopoverPlacement: 'bottomLeft',
  eventItemPopoverWidth: 300,

  eventItemHeight: 60,
  eventItemLineHeight: 60,
  nonAgendaSlotMinHeight: 0,
  dayStartFrom: 0,
  dayStopTo: 23,
  // defaultEventBgColor: '#80C5F6',
  selectedAreaColor: '#7EC2F3',
  // nonWorkingTimeHeadColor: '#999999',
  // nonWorkingTimeHeadBgColor: '#fff0f6',
  // nonWorkingTimeBodyBgColor: '#fff0f6',
  summaryColor: '#666',
  summaryPos: SummaryPos.TopRight,
  groupOnlySlotColor: '#F8F8F8',

  startResizable: true,
  endResizable: true,
  movable: true,
  creatable: true,
  crossResourceMove: true,
  checkConflict: false,
  scrollToSpecialDayjsEnabled: true,
  eventItemPopoverEnabled: true,
  calendarPopoverEnabled: true,
  calendarLeftEnabled: true,
  calendarRightEnabled: true,
  calendarRightEnabledLimited: false, //para controlar que el usuario solo pueda avanzar hasta la semana actual
  recurringEventsEnabled: true,
  viewChangeSpinEnabled: true,
  dateChangeSpinEnabled: true,
  headerEnabled: true,
  resourceViewEnabled: true,
  displayWeekend: true,
  relativeMove: true,
  defaultExpanded: true,
  dragAndDropEnabled: true,

  schedulerHeaderEventsFuncsTimeoutMs: 200,

  resourceName: '',
  taskName: 'Task Name',
  agendaViewHeader: 'Agenda',
  addMorePopoverHeaderFormat: 'D MMM, YYYY dddd',
  eventItemPopoverDateFormat: 'D MMM',
  nonAgendaDayCellHeaderFormat: 'ha',
  nonAgendaOtherCellHeaderFormat: 'ddd D/M',

  minuteStep: 60,
  grupoTipoTrab: 5, // Garantía
  etapaOS: 1, // Desarme
  pseudoEtapa: [
    { grupoTipoTrab: 5, etapaOS: 1 }, // Garantía - Desarme
    { grupoTipoTrab: 1, etapaOS: 2 }, // ASR - Armado
    { grupoTipoTrab: 1, etapaOS: 3 }, // ASR - Desarme
  ],

  views: [
    // { viewName: 'Day', viewType: ViewType.Day, showAgenda: false, isEventPerspective: false },
    // { viewName: 'Week', viewType: ViewType.Week, showAgenda: false, isEventPerspective: false },
    // { viewName: 'Month', viewType: ViewType.Month, showAgenda: false, isEventPerspective: false },
    // { viewName: 'Quarter', viewType: ViewType.Quarter, showAgenda: false, isEventPerspective: false },
    // { viewName: 'Year', viewType: ViewType.Year, showAgenda: false, isEventPerspective: false },
  ],
};
