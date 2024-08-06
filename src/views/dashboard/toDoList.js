import { useState, useEffect, useContext, useCallback } from 'react';
import Navbar from '../../components/navbar';
import Alert from '../../components/alert';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../context/toDoContext';
import Loader from '../../components/loader';

const ToDoList = () => {
    const navigate = useNavigate();
    const { addTaskToFirestore, getAllTasksFromFirestore, setTaskAsCompleteInFirestore, deleteTaskInFirestore, error, setError } = useContext(TodoContext);

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

                setCompletedTaskList(completedTasks);
                setTaskList(tasks);
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
            {taskList && completedTaskList ? <>    <div className="max-w-full font-semibold text-blueGray-700 my-4 mx-2">
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

                {taskList.length > 0 && (
                    <>
                        <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                            Here’s what we need to complete!
                        </p>
                        <div className="mx-4 overflow-y-scroll shadow-md sm:rounded-lg max-h-25vh">
                            <table className="text-sm text-left border-grey-500">
                                <tbody>
                                    {taskList.map(({ task, id }) => (
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
                    <>
                        <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                            Tasks we've nailed so far!
                        </p>
                        <div className="mx-4 overflow-y-scroll shadow-md sm:rounded-lg max-h-25vh">
                            <table className="text-sm text-left border-grey-500">
                                <tbody>
                                    {completedTaskList.map(({ task, id }) => (
                                        <tr key={id} className="even:bg-white odd:bg-gray-50">
                                            <td className="p-2 w-full">{task}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

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
