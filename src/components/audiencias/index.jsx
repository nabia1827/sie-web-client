import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Spin } from 'antd';
import EventItem from './EventItem';
import DnDSource from './DnDSource';
import DnDContext from './DnDContext';
import ResourceView from './ResourceView';
import HeaderView from './HeaderView';
import BodyView from './BodyView';
import ResourceEvents from './ResourceEvents';
import AgendaView from './AgendaView';
import AddMorePopover from './AddMorePopover';
import SchedulerData from './SchedulerData';
import SchedulerHeader from './SchedulerHeader';
import wrapperFun from './WrapperFun';

import {
  ViewType,
  CellUnit,
  DATETIME_FORMAT,
  DATE_FORMAT,
  SummaryPos,

} from '../../utils/audiencias/default';

import 'regenerator-runtime/runtime';

class Scheduler extends Component {
  constructor(props) {
    super(props);

    const { schedulerData, dndSources, parentRef } = props;
    let sources = [];
    sources.push(
      new DnDSource(
        props => props.eventItem,
        EventItem,
        schedulerData.config.dragAndDropEnabled,
      ),
    );
    if (dndSources != undefined && dndSources.length > 0) {
      sources = [...sources, ...dndSources];
    }
    const dndContext = new DnDContext(sources, ResourceEvents);

    this.currentArea = -1;
    this.state = {
      dndContext,
      contentScrollbarHeight: 17,
      contentScrollbarWidth: 17,
      resourceScrollbarHeight: 12,
      resourceScrollbarWidth: 17,
      documentWidth: 0,
      documentHeight: 0,
    };
    this.scrollLeft = 0;
    this.scrollTop = 0;

    if (
      (schedulerData.isSchedulerResponsive()
        && !schedulerData.config.responsiveByParent)
      || parentRef === undefined
    ) {
      schedulerData._setDocumentWidth(document.documentElement.clientWidth);
      window.onresize = this.onWindowResize;
    }
  }

  onWindowResize = e => {
    const { schedulerData } = this.props;
    schedulerData._setDocumentWidth(document.documentElement.clientWidth);
    this.setState({
      documentWidth: document.documentElement.clientWidth,
      documentHeight: document.documentElement.clientHeight,
    });
  };

  static propTypes = {
    parentRef: PropTypes.object,
    schedulerData: PropTypes.object.isRequired,
    todayClick: PropTypes.func.isRequired,
    prevClick: PropTypes.func.isRequired,
    nextClick: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
    onSelectDate: PropTypes.func.isRequired,
    onSetAddMoreState: PropTypes.func,
    updateEventStart: PropTypes.func,
    updateEventEnd: PropTypes.func,
    moveEvent: PropTypes.func,
    movingEvent: PropTypes.func,
    leftCustomHeader: PropTypes.object,
    rightCustomHeader: PropTypes.object,
    newEvent: PropTypes.func,
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    conflictOccurred: PropTypes.func,
    eventItemTemplateResolver: PropTypes.func,
    dndSources: PropTypes.array,
    slotClickedFunc: PropTypes.func,
    toggleExpandFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func,
    nonAgendaCellHeaderTemplateResolver: PropTypes.func,
    onScrollLeft: PropTypes.func,
    onScrollRight: PropTypes.func,
    onScrollTop: PropTypes.func,
    onScrollBottom: PropTypes.func,
  };

  componentDidMount(props, state) {
    const { schedulerData, parentRef } = this.props;

    this.resolveScrollbarSize();

    if (parentRef !== undefined) {
      if (schedulerData.config.responsiveByParent && !!parentRef.current) {
        schedulerData._setDocumentWidth(parentRef.current.offsetWidth);
        this.ulObserver = new ResizeObserver((entries, observer) => {
          if (parentRef.current) {
            const width = parentRef.current.offsetWidth;
            const height = parentRef.current.offsetHeight;
            schedulerData._setDocumentWidth(width);
            this.setState({
              documentWidth: width,
              documentHeight: height,
            });
          }
        });

        this.ulObserver.observe(parentRef.current);
      }
    }
  }

  componentDidUpdate(props, state) {
    this.resolveScrollbarSize();

    const { schedulerData } = this.props;
    const { localeDayjs, behaviors } = schedulerData;
    if (
      schedulerData.getScrollToSpecialDayjs()
      && !!behaviors.getScrollSpecialDayjsFunc
    ) {
      if (
        !!this.schedulerContent
        && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth
      ) {
        const start = localeDayjs(new Date(schedulerData.startDate)).startOf(
          'day',
        );
        const end = localeDayjs(new Date(schedulerData.endDate)).endOf('day');
        const specialDayjs = behaviors.getScrollSpecialDayjsFunc(
          schedulerData,
          start,
          end,
        );
        if (specialDayjs >= start && specialDayjs <= end) {
          let index = 0;
          schedulerData.headers.forEach(item => {
            const header = localeDayjs(new Date(item.time));
            if (specialDayjs >= header) index++;
          });
          this.schedulerContent.scrollLeft = (index - 1) * schedulerData.getContentCellWidth();

          schedulerData.setScrollToSpecialDayjs(false);
        }
      }
    }
  }

  render() {
    const {
      schedulerData,
      leftCustomHeader,
      rightCustomHeader,
      deleteItemsList,
      handleCheckAllDeletedItems,
      isEditing,
      setIsEditing,
      isDeleting,
      setIsDeleting,
    } = this.props;
    const { viewType, renderData, showAgenda, config } = schedulerData;
    const width = schedulerData.getSchedulerWidth();

    let tbodyContent = <tr />;
    if (showAgenda) {
      tbodyContent = <AgendaView {...this.props} />;
    } else {
      const resourceTableWidth = schedulerData.getResourceTableWidth();
      const schedulerContainerWidth = width - (config.resourceViewEnabled ? resourceTableWidth : 0);
      const schedulerWidth = schedulerData.getContentTableWidth() - 1;
      const DndResourceEvents = this.state.dndContext.getDropTarget(
        config.dragAndDropEnabled,
      );
      const eventDndSource = this.state.dndContext.getDndSource();

      const displayRenderData = renderData.filter(o => o.render);
      const resourceEventsList = displayRenderData.map(item => (
        <DndResourceEvents
          {...this.props}
          key={item.slotId}
          resourceEvents={item}
          dndSource={eventDndSource}
        />
      ));

      const { contentScrollbarHeight } = this.state;
      const { contentScrollbarWidth } = this.state;
      const { resourceScrollbarHeight } = this.state;
      const { resourceScrollbarWidth } = this.state;
      const contentHeight = config.schedulerContentHeight;
      const resourcePaddingBottom = resourceScrollbarHeight === 0 ? contentScrollbarHeight : 0;
      const contentPaddingBottom = contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0;
      let schedulerContentStyle = {
        overflowX: viewType === ViewType.Week ? 'hidden' : 'auto',
        overflowY: 'hidden',
        margin: '0px',
        position: 'relative',
        height: contentHeight,
        paddingBottom: contentPaddingBottom,
      };
      let resourceContentStyle = {
        height: contentHeight,
        overflowX: 'auto',
        overflowY: 'auto',
        width: resourceTableWidth + resourceScrollbarWidth - 2,
        margin: `0px -${contentScrollbarWidth}px 0px 0px`,
      };
      if (config.schedulerMaxHeight > 0) {
        schedulerContentStyle = {
          ...schedulerContentStyle,
          maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight,
        };
        resourceContentStyle = {
          ...resourceContentStyle,
          maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight,
        };
      }

      const resourceName = schedulerData.isEventPerspective
        ? config.taskName
        : config.resourceName;
      tbodyContent = (
        <tr>
          <td
            style={{
              display: config.resourceViewEnabled ? undefined : 'none',
              width: resourceTableWidth,
              verticalAlign: 'top',
            }}
          >
            <div className="resource-view">
              <div
                style={{
                  overflow: 'hidden',
                  borderBottom: '1px solid #e9e9e9',
                  height: config.tableHeaderHeight,
                }}
              >
                <div
                  style={{
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    margin: `0px 0px -${contentScrollbarHeight}px`,
                  }}
                >
                  <table className="resource-table">
                    <thead>
                      <tr style={{ height: config.tableHeaderHeight }}>
                        <th className="header3-text">{resourceName}</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <div
                style={resourceContentStyle}
                ref={this.schedulerResourceRef}
                onMouseOver={this.onSchedulerResourceMouseOver}
                onMouseOut={this.onSchedulerResourceMouseOut}
                onScroll={this.onSchedulerResourceScroll}
              >
                <ResourceView
                  {...this.props}
                  contentScrollbarHeight={resourcePaddingBottom}
                />
              </div>
            </div>
          </td>
          <td>
            <div
              className="scheduler-view"
              style={{ width: schedulerContainerWidth, verticalAlign: 'top' }}
            >
              <div
                style={{
                  overflow: 'hidden',
                  borderBottom: '1px solid #e9e9e9',
                  height: config.tableHeaderHeight,
                  borderRadius:"1.0em 1.0em 0 0"
                }}
              >
                <div
                  style={{
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                    margin: `0px 0px -${contentScrollbarHeight}px`,
                  }}
                  ref={this.schedulerHeadRef}
                  onMouseOver={this.onSchedulerHeadMouseOver}
                  onMouseOut={this.onSchedulerHeadMouseOut}
                  onScroll={this.onSchedulerHeadScroll}
                >
                  <div
                    style={{
                      paddingRight: `${contentScrollbarWidth}px`,
                      width: schedulerWidth + contentScrollbarWidth,
                    }}
                  >
                    <table className="scheduler-bg-table">
                      <HeaderView {...this.props} />
                    </table>
                  </div>
                </div>
              </div>
              <div
                style={schedulerContentStyle}
                ref={this.schedulerContentRef}
                onMouseOver={this.onSchedulerContentMouseOver}
                onMouseOut={this.onSchedulerContentMouseOut}
                onScroll={this.onSchedulerContentScroll}
              >
                <div style={{ width: schedulerWidth }}>
                  <div className="scheduler-content">
                    <table className="scheduler-content-table">
                      <tbody>{resourceEventsList}</tbody>
                    </table>
                  </div>
                  <div className="scheduler-bg">
                    <table
                      className="scheduler-bg-table"
                      style={{ width: schedulerWidth }}
                      ref={this.schedulerContentBgTableRef}
                    >
                      <BodyView {...this.props} />
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    let schedulerHeader = <div />;
    if (config.headerEnabled) {
      schedulerHeader = (
        <SchedulerHeader
          onViewChange={this.onViewChange}
          schedulerData={schedulerData}
          onSelectDate={this.onSelect}
          goNext={this.goNext}
          goBack={this.goBack}
          goToday={this.goToday}
          rightCustomHeader={rightCustomHeader}
          leftCustomHeader={leftCustomHeader}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          confirmEditScheduler={this.confirmEditScheduler}
          cancelEditScheduler={this.cancelEditScheduler}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          deleteItemsList={deleteItemsList}
          handleCheckAllDeletedItems={handleCheckAllDeletedItems}
          cleanDeleteItemsList={this.cleanDeleteItemsList}
          confirmDeleteItemsList={this.confirmDeleteItemsList}
        />
      );
    }

    return (
      <>
        {schedulerHeader}
        <Spin
          spinning={this.props.loadingScheduler}
          tip="Cargando trabajos..."
          size="large"
        >
          <table
            id="RBS-Scheduler-root"
            className="scheduler"
            style={{ width: `${width}px` }}
          >
            <tbody>{tbodyContent}</tbody>
          </table>
        </Spin>
      </>
    );
  }

  resolveScrollbarSize = () => {
    const { schedulerData } = this.props;
    let contentScrollbarHeight = 17;
    let contentScrollbarWidth = 17;
    let resourceScrollbarHeight = 17;
    let resourceScrollbarWidth = 17;
    if (this.schedulerContent) {
      contentScrollbarHeight = this.schedulerContent.offsetHeight - this.schedulerContent.clientHeight;
      contentScrollbarWidth = this.schedulerContent.offsetWidth - this.schedulerContent.clientWidth;
    }
    if (this.schedulerResource) {
      resourceScrollbarHeight = this.schedulerResource.offsetHeight
        - this.schedulerResource.clientHeight;
      resourceScrollbarWidth = this.schedulerResource.offsetWidth - this.schedulerResource.clientWidth;
    }

    let tmpState = {};
    let needSet = false;
    if (contentScrollbarHeight != this.state.contentScrollbarHeight) {
      tmpState = {
        ...tmpState,
        contentScrollbarHeight,
      };
      needSet = true;
    }
    if (contentScrollbarWidth != this.state.contentScrollbarWidth) {
      tmpState = { ...tmpState, contentScrollbarWidth };
      needSet = true;
    }
    if (resourceScrollbarHeight != this.state.resourceScrollbarHeight) {
      tmpState = {
        ...tmpState,
        resourceScrollbarHeight,
      };
      needSet = true;
    }
    if (resourceScrollbarWidth != this.state.resourceScrollbarWidth) {
      tmpState = {
        ...tmpState,
        resourceScrollbarWidth,
      };
      needSet = true;
    }
    if (needSet) this.setState(tmpState);
  };

  schedulerHeadRef = element => {
    this.schedulerHead = element;
  };

  onSchedulerHeadMouseOver = () => {
    this.currentArea = 2;
  };

  onSchedulerHeadMouseOut = () => {
    this.currentArea = -1;
  };

  onSchedulerHeadScroll = (proxy, event) => {
    if (
      (this.currentArea === 2 || this.currentArea === -1)
      && this.schedulerContent.scrollLeft != this.schedulerHead.scrollLeft
    ) this.schedulerContent.scrollLeft = this.schedulerHead.scrollLeft;
  };

  schedulerResourceRef = element => {
    this.schedulerResource = element;
  };

  onSchedulerResourceMouseOver = () => {
    this.currentArea = 1;
  };

  onSchedulerResourceMouseOut = () => {
    this.currentArea = -1;
  };

  onSchedulerResourceScroll = (proxy, event) => {
    if (this.schedulerResource) {
      if (
        (this.currentArea === 1 || this.currentArea === -1)
        && this.schedulerContent.scrollTop != this.schedulerResource.scrollTop
      ) this.schedulerContent.scrollTop = this.schedulerResource.scrollTop;
    }
  };

  schedulerContentRef = element => {
    this.schedulerContent = element;
  };

  schedulerContentBgTableRef = element => {
    this.schedulerContentBgTable = element;
  };

  onSchedulerContentMouseOver = () => {
    this.currentArea = 0;
  };

  onSchedulerContentMouseOut = () => {
    this.currentArea = -1;
  };

  onSchedulerContentScroll = (proxy, event) => {
    if (this.schedulerResource) {
      if (this.currentArea === 0 || this.currentArea === -1) {
        if (this.schedulerHead.scrollLeft != this.schedulerContent.scrollLeft) this.schedulerHead.scrollLeft = this.schedulerContent.scrollLeft;
        if (this.schedulerResource.scrollTop != this.schedulerContent.scrollTop) this.schedulerResource.scrollTop = this.schedulerContent.scrollTop;
      }
    }

    const {
      schedulerData,
      onScrollLeft,
      onScrollRight,
      onScrollTop,
      onScrollBottom,
    } = this.props;
    if (this.schedulerContent.scrollLeft !== this.scrollLeft) {
      if (this.schedulerContent.scrollLeft === 0 && onScrollLeft != undefined) {
        onScrollLeft(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth,
        );
      }
      if (
        Math.round(this.schedulerContent.scrollLeft)
        === this.schedulerContent.scrollWidth
        - this.schedulerContent.clientWidth
        && onScrollRight != undefined
      ) {
        onScrollRight(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth,
        );
      }
    } else if (this.schedulerContent.scrollTop !== this.scrollTop) {
      if (this.schedulerContent.scrollTop === 0 && onScrollTop != undefined) {
        onScrollTop(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollHeight
          - this.schedulerContent.clientHeight,
        );
      }
      if (
        Math.round(this.schedulerContent.scrollTop)
        === this.schedulerContent.scrollHeight
        - this.schedulerContent.clientHeight
        && onScrollBottom != undefined
      ) {
        onScrollBottom(
          schedulerData,
          this.schedulerContent,
          this.schedulerContent.scrollHeight
          - this.schedulerContent.clientHeight,
        );
      }
    }
    this.scrollLeft = this.schedulerContent.scrollLeft;
    this.scrollTop = this.schedulerContent.scrollTop;
  };

  onViewChange = e => {
    const { onViewChange, schedulerData } = this.props;
    const viewType = parseInt(e.target.value.charAt(0));
    const showAgenda = e.target.value.charAt(1) === '1';
    const isEventPerspective = e.target.value.charAt(2) === '1';
    onViewChange(schedulerData, {
      viewType,
      showAgenda,
      isEventPerspective,
    });
    this.setState({ ...this.state, spinning: false });
  };

  goNext = () => {
    const { nextClick, schedulerData } = this.props;
    nextClick(schedulerData);
  };

  goBack = () => {
    const { prevClick, schedulerData } = this.props;
    prevClick(schedulerData);
  };

  goToday = () => {
    const { todayClick, schedulerData } = this.props;
    todayClick(schedulerData);
  };

  onSelect = date => {
    const { onSelectDate, schedulerData } = this.props;
    onSelectDate(schedulerData, date);
  };

  confirmEditScheduler = () => {
    const { handleConfirmEditScheduler } = this.props;
    handleConfirmEditScheduler();
  };

  cancelEditScheduler = () => {
    const { handleCancelEditScheduler } = this.props;
    handleCancelEditScheduler();
  };

  confirmDeleteItemsList = () => {
    const { removeItemsList, deleteItems } = this.props;
    removeItemsList(deleteItems);
  };

  cleanDeleteItemsList = () => {
    const { cleanItemsList, deleteItems } = this.props;
    cleanItemsList(deleteItems);
  };
}

export const DATE_FORMATv2 = 'MM/DD/YYYY';
export const DATETIME_FORMATv2 = 'MM/DD/YYYY HH:mm';
export {
  DATE_FORMAT,
  DATETIME_FORMAT,
  Scheduler,
  SchedulerData,
  ViewType,
  CellUnit,
  SummaryPos,
  DnDSource,
  DnDContext,
  AddMorePopover,
  wrapperFun,
};
