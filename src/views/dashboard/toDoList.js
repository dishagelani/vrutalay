import { useState, useEffect, useContext, useCallback } from 'react';
import Navbar from '../../components/navbar';
import Alert from '../../components/alert';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../context/toDoContext';
import Loader from '../../components/loader';

const ToDoList = () => {
    const navigate = useNavigate();
    const { addTaskToFirestore, getAllTasksFromFirestore, setTaskAsCompleteInFirestore, deleteTaskInFirestore,deleteCompletedTaskInFirestore, error, setError } = useContext(TodoContext);

    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState(null);
    const [completedTaskList, setCompletedTaskList] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        addTaskToFirestore(task)
            .then(() => {
                setRefreshKey(prevKey => prevKey + 1); // Trigger re-fetch
                setTask('');
            })
            .catch(() => setError('Yikes! Something broke. Try again shortly!'));
    }, [task, addTaskToFirestore, setError]);

    const handleEdit = useCallback((id) => {
        setTaskAsCompleteInFirestore(id)
            .then(() => setRefreshKey(prevKey => prevKey + 1)) // Trigger re-fetch
            .catch(() => setError('Yikes! Something broke. Try again shortly!'));
    }, [setTaskAsCompleteInFirestore, setError]);

    const handleDelete = useCallback((id) => {
        deleteTaskInFirestore(id)
            .then(() => setRefreshKey(prevKey => prevKey + 1)) // Trigger re-fetch
            .catch(() => setError('Yikes! Something broke. Try again shortly!'));
    }, [deleteTaskInFirestore, setError]);

    const deleteCompletedTask = useCallback(() => {
        deleteCompletedTaskInFirestore()
            .then(() => setRefreshKey(prevKey => prevKey + 1)) // Trigger re-fetch
            .catch(() => setError('Yikes! Something broke. Try again shortly!'));
    }, [deleteTaskInFirestore, setError]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const documents = await getAllTasksFromFirestore();
                const completedTasks = [];
                const tasks = [];

                documents.docs.forEach(doc => {
                    const taskData = { id: doc.id, ...doc.data() };
                    (taskData.completed ? completedTasks : tasks).push(taskData);
                });

                setCompletedTaskList({length : completedTasks.length, data : completedTasks});
                setTaskList({length : tasks.length, data : tasks});
            } catch (err) {
                setError('Failed to fetch tasks. Please try again!');
            }
        };
        fetchTasks();
    }, [refreshKey]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, setError]);


    return (
        <>
            <Navbar />

            {error && (
                <div className="flex justify-center my-2">
                    <Alert message={error} />
                </div>
            )}
            {taskList && completedTaskList ? <>
                {/* Back button  */}
                <div className="max-w-full font-semibold text-blueGray-700 mt-4 mx-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                {/* List of tasks */}

                {(taskList.length === 0 && completedTaskList.length === 0) && (
                    <div className="relative h-50vh flex items-center justify-center">
                        <div className="text-center">
                            <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold">
                                Zero tasks detected. We must be doing something right!
                            </p>
                            <span>😋</span>
                        </div>
                    </div>
                )}

                <div className='max-h-[calc(100vh-200px)] overflow-auto'>
                    {taskList.length > 0 && (
                        <>
                            <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                                Here’s what we need to complete!
                            </p>
                            <div className="mx-4 shadow-md sm:rounded-lg ">
                                <table className="text-sm text-left border-grey-500">
                                    <tbody>
                                        {taskList.data.map(({ task, id }) => (
                                            <tr key={id} className="even:bg-white odd:bg-gray-50">
                                                <td className="p-2 w-full">{task}</td>
                                                <td className="flex py-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-5 cursor-pointer mx-1"
                                                        onClick={() => handleEdit(id)}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-5 cursor-pointer mx-1"
                                                        onClick={() => handleDelete(id)}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {completedTaskList.length > 0 && (
                        <><div className='m-4 flex justify-between items-center'>

                            <p className="text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                                Tasks we've nailed so far!
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer" onClick={() => deleteCompletedTask()}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </div>
                            <div className="mx-4 shadow-md ">
                                <table className="relative w-full text-sm text-left border-grey-500">
                                    <tbody>
                                        {completedTaskList.data.map(({ task, id }) => (
                                            <tr key={id} className="even:bg-white odd:bg-gray-50">
                                                <td className="p-2 w-full">{task}</td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
                {/* Adding new task  */}
                <div className="fixed bottom-0 right-0 w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between p-4">
                            <input
                                type="text"
                                required
                                placeholder="Let’s include another to-do!"
                                value={task}
                                className="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setTask(e.target.value)}
                            />
                            <div
                                className="text-white cursor-pointer shadow-xl p-3 ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50"
                                onClick={handleSubmit}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div></> : <Loader />}


        </>
    );
};

export default ToDoList;
