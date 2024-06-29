import React, { useEffect, useState } from 'react';
import { Task } from '../../types/globalTypes';
import './TaskList.css'

const TaskList = ({ allTasks, deleteTask, completeTask }:
    {
        allTasks: Task[],
        deleteTask: (TaskId: string) => void,
        completeTask: (TaskId: string) => void
    }) => {


    return (
        <div className="taskList">
            <h2>Task List in process:</h2>
            <ul>
                {allTasks
                    .filter(task => task.status === 'active' || task.status === 'complete')
                    .map(activeTask => (
                        <li key={activeTask.id} className="taskItem">
                            <label className='checkboxContiner'>
                                <input type="checkbox" checked={activeTask.status === 'complete'} onChange={() => completeTask(activeTask.id)} />
                                <span className="checkmark"></span>
                            </label>
                            <span className="taskDescription">{activeTask.task}</span>
                            <button className="deleteButton" onClick={() => deleteTask(activeTask.id)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TaskList;
