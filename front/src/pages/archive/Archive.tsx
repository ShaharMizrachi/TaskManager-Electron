import React, { useEffect, useState } from 'react'
import { Task } from '../../types/globalTypes';
import { useNavigate } from 'react-router-dom';

const Archive = () => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('taskList') || '[]');
        setAllTasks(storedTasks);
    }, []);


    return (
        <div className="taskList">
            <div>
                <button className="navigateButton" onClick={() => navigate('/')}>Home Page</button>
            </div>
            <h2>Archive Task List:</h2>
            <ul>
                {allTasks
                    .filter(task => task.status === 'delete')
                    .map(activeTask => (
                        <li key={activeTask.id} className="taskItem">
                            <span className="taskDescription">Task: {activeTask.task} Status: {activeTask.status}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Archive