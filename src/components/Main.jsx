import React, { useContext, useState } from 'react';
import { Trash2, Edit2, Check, MoreHorizontal, UserPlus } from 'react-feather';
import CardAdd from './CardAdd';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddList from './AddList';
import Utils from '../utils/Utils';
import backgroundImage from '../assets/bg.jpg';
import '../style/main.css';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];
    const [editMode, setEditMode] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [checkedTasks, setCheckedTasks] = useState({});
    const [visibleOptions, setVisibleOptions] = useState(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleShareSubmit = () => {
        console.log('Shared with:', { email, message });
        setIsShareModalOpen(false);
        setEmail('');
        setMessage('');
    };

    const handleCheckboxChange = (listIndex, itemIndex) => {
        const taskId = `${listIndex}-${itemIndex}`;
        setCheckedTasks(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };

    const toggleOptions = (listIndex, itemIndex) => {
        if (visibleOptions && visibleOptions.listIndex === listIndex && visibleOptions.itemIndex === itemIndex) {
            setVisibleOptions(null);
        } else {
            setVisibleOptions({ listIndex, itemIndex });
        }
    };

    function onDragEnd(res) {
        if (!res.destination) {
            console.log("No Destination");
            return;
        }
        const newList = [...bdata.list];
        const s_id = parseInt(res.source.droppableId);
        const d_id = parseInt(res.destination.droppableId);
        const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
        newList[d_id - 1].items.splice(res.destination.index, 0, removed);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const cardData = (card, ind) => {
        let newList = [...bdata.list];
        newList[ind].items.push({ 
            id: Utils.makeid(5), 
            title: card.title, 
            description: card.description,
            dueDate: card.dueDate,
            checklist: card.checklist
        });
    
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };
    

    const listData = (e) => {
        let newList = [...bdata.list];
        newList.push(
            { id: newList.length + 1 + '', title: e, items: [] }
        );

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const handleEditClick = (listIndex, itemIndex) => {
        setEditMode({ listIndex, itemIndex });
        setEditTitle(bdata.list[listIndex].items[itemIndex].title);
    };

    const handleEditSave = () => {
        let newList = [...bdata.list];
        newList[editMode.listIndex].items[editMode.itemIndex].title = editTitle;

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setEditMode(null);
        setVisibleOptions(null);
    };

    const handleCardDelete = (listIndex, itemIndex) => {
        let newList = [...bdata.list];
        newList[listIndex].items.splice(itemIndex, 1);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setVisibleOptions(null);
    };

    const handleListDelete = (listIndex) => {
        let newList = [...bdata.list];
        newList.splice(listIndex, 1);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    return (
        <div className='flex flex-col w-full' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className='p-3 flex justify-between w-full share-section'>
                <h2 className='text-lg'>{bdata.name}</h2>
                <div className='flex items-center justify-center'>
                    <button 
                        className='bg-white h-8 text-black px-2 py-1 mr-2 rounded flex justify-center items-center'
                        onClick={() => setIsShareModalOpen(true)}>
                        <UserPlus size={16} className='mr-2'></UserPlus>
                        Share
                    </button>
                </div>
            </div>
            
            {isShareModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-bold mb-4 text-black">Share Board</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black">Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-black"  // Added text-black
                                placeholder="Enter email address"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black">Message (Optional)</label>
                            <textarea 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)} 
                                className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-black"  // Added text-black
                                placeholder="Enter a message"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                onClick={() => setIsShareModalOpen(false)} 
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleShareSubmit} 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            )}          
            
            <div className='flex flex-col w-full flex-grow relative'>
                <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll scrollbar-transparent overflow-y-hidden'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {bdata.list && bdata.list.map((x, ind) => {
                            return (
                                <div key={ind} className='mr-3 w-60 h-fit rounded-md p-2' style={{ backgroundColor: '#7a8180' }}>
                                    <div className="list-body">
                                        <div className='flex justify-between p-1'>
                                            <span>{x.title}</span>
                                            <button onClick={() => handleListDelete(ind)} className='hover:bg-red-600 p-1 rounded-sm'><Trash2 size={16}></Trash2></button>
                                        </div>
                                        <Droppable droppableId={x.id}>
                                            {(provided, snapshot) => (
                                                <div className='py-1'
                                                    ref={provided.innerRef}
                                                    style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                                    {...provided.droppableProps}
                                                >
                                                    {x.items && x.items.map((item, index) => {
                                                        const taskId = `${ind}-${index}`;
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={editMode && editMode.listIndex === ind && editMode.itemIndex === index ? 'edit-mode' : ''}
                                                                    >
                                                                        {editMode && editMode.listIndex === ind && editMode.itemIndex === index ? (
                                                                            <div className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
                                                                                <input 
                                                                                    value={editTitle} 
                                                                                    onChange={(e) => setEditTitle(e.target.value)} 
                                                                                    className='bg-transparent outline-none text-white'
                                                                                />
                                                                                <button onClick={handleEditSave} className='hover:bg-gray-600 p-1 rounded-sm'><Check size={16}></Check></button>
                                                                            </div>
                                                                        ) : (
                                                                            <div className={`item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500 ${checkedTasks[taskId] ? 'line-through' : ''}`}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={checkedTasks[taskId]} 
                                                                                    onChange={() => handleCheckboxChange(ind, index)} 
                                                                                    className='mr-2'
                                                                                />
                                                                                <span>{item.title}</span>
                                                                                <div className='relative'>
                                                                                    <button onClick={() => toggleOptions(ind, index)} className='hover:bg-gray-600 p-1 rounded-sm'><MoreHorizontal size={16}></MoreHorizontal></button>
                                                                                    {visibleOptions && visibleOptions.listIndex === ind && visibleOptions.itemIndex === index && (
                                                                                        <div className='absolute right-0 bg-gray-700 p-1 rounded-sm shadow-lg flex flex-col items-start'>
                                                                                            <button onClick={() => handleEditClick(ind, index)} className='hover:bg-gray-600 p-1 rounded-sm w-full flex items-center'><Edit2 size={16} className='mr-1'></Edit2>Edit</button>
                                                                                            <button onClick={() => handleCardDelete(ind, index)} className='hover:bg-red-600 p-1 rounded-sm w-full flex items-center'><Trash2 size={16} className='mr-1'></Trash2>Delete</button>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}

                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>

                                        <CardAdd getcard={(e) => cardData(e, ind)}></CardAdd>
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>

                    <AddList getlist={(e) => listData(e)}></AddList>

                </div>
            </div>
        </div>
    );
}

export default Main;
