import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class TaskItem extends Component {
    constructor(props) {
        super(props);        
    }

    static propTypes = {
        task: PropTypes.object.isRequired,
    }

    render() {
        const { task, isDragging, connectDragSource, connectDragPreview, schedulerData } = this.props;        
        if (task !== undefined) { 
            //let dragContent = task !== undefined && task.name !== undefined && task.name !== null? <li style={{color: 'red', fontWeight: 'bold', fontSize: '20px', listStyle: 'none'}}>{task.name}</li>: this.props.eventItem.title;
            let dragContent = <li style={{ color: 'red', fontWeight: 'bold', fontSize: '20px', listStyle: 'none' }} >{task.name}</li>;
            return (
                isDragging ? "test" : (
                    <div>
                        {
                            connectDragPreview(
                                connectDragSource(dragContent)
                            )
                        }
                    </div>
                )
            )
        }else{
            let dragContent = "-";
            return (
                "-"
            )
        }
    }
}

export default TaskItem