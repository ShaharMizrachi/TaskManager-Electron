import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import TaskList from '../taskList/TaskList';
import { Task } from '../../types/globalTypes';
import { ResponseTask } from '../../types/globalTypes';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'


const HomePage = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [taskHolder, setTaskHolder] = useState<Task>({
        task: "",
        status: "empty",
        id: ""
    });


    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('taskList') || '[]');
        setAllTasks(storedTasks);
    }, []);


    const generateUniqueId = () => {
        return `${Date.now()}${Math.floor(Math.random() * 1000000)}`;
    };

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTaskHolder(prev => ({ ...prev, task: newValue }));
    };

    const SendTask = () => {
        console.log('Task to be created:', taskHolder);
        // Send the taskHolder to the Electron main process
        const id = generateUniqueId();
        setTaskHolder(prev => ({ ...prev, id: id }));
        const newTask = { ...taskHolder, id: id };
        (window as any).electron.sendRequest('create-task', newTask);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        const handleResponse = (response: ResponseTask) => {

            console.log(`Response received: ${response.name} - ${response.result} - ${response.resultStatus}-${response.status}-${response.id}`);
            if (response.resultStatus && response.status !== "empty") {
                const storedTasks = localStorage.getItem("taskList");
                let tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];


                const newTask: Task = {
                    id: response.id,
                    task: response.task,
                    status: response.status,
                };
                tasks = [...tasks, newTask];
                setAllTasks(tasks);
                localStorage.setItem("taskList", JSON.stringify(tasks));

            }
            setTaskHolder({ task: "", status: "empty", id: "" });
        };
        (window as any).electron.onResponse(handleResponse);

        return () => {
            (window as any).electron.onResponse(() => { });
        };
    }, []);

    const deleteTask = (taskIdToDelete: string) => {
        const updatedTasks = allTasks.map(task =>
            task.id === taskIdToDelete ? { ...task, status: 'delete' } : task
        );
        console.log(updatedTasks);
        updatedTaskList(updatedTasks)
    }

    const completeTask = (taskIdMarked: string) => {
        const updatedTask = allTasks.map(task =>
            task.id === taskIdMarked ? { ...task, status: task.status === 'active' ? 'complete' : 'active' } : task);
        console.log(updatedTask);
        updatedTaskList(updatedTask)
    }


    const updatedTaskList = (updatedTask: any) => {
        setAllTasks(updatedTask);
        localStorage.setItem('taskList', JSON.stringify(updatedTask));
    }



    return (
        <div className='homepageContainer'>

            <div className='titleHomePage'>
                <h2>Task Manager</h2>
            </div>
            <div className='taskCreation'>
                <input ref={inputRef} type="text" value={taskHolder.task} onChange={handleTaskChange} placeholder="Enter task" />
                <button onClick={SendTask}>Create</button>
                <button onClick={() => navigate('/archive')}>Archive</button>
            </div>
            <div>
                <TaskList allTasks={allTasks} deleteTask={deleteTask} completeTask={completeTask} />
            </div>
        </div>
    )
}

export default HomePage;
