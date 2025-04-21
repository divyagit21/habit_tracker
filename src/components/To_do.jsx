import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const To_do = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : {
      '2025-04-19': [
        { name: 'Meditation', completed: true },
        { name: 'Read 10 pages', completed: false },
      ],
      '2025-04-20': [
        { name: 'Journal Writing', completed: true },
      ],
    };
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const formatDateKey = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedDate = formatDateKey(selectedDate);
  const tasksForDate = tasks[formattedDate] || [];

  const handleAdd = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { name: newTask.trim(), completed: false };
    setTasks((prevTasks) => {
      const existingTasks = prevTasks[formattedDate] || [];
      return {
        ...prevTasks,
        [formattedDate]: [...existingTasks, newTaskObj],
      };
    });
    setNewTask('');
  };

  const toggleCompletion = (idx) => {
    setTasks((prevTasks) => {
      const updated = [...(prevTasks[formattedDate] || [])];
      updated[idx] = { ...updated[idx], completed: !updated[idx].completed };
      return { ...prevTasks, [formattedDate]: updated };
    });
  };

  const deleteTask = (idx) => {
    setTasks((prev) => {
      const updated = [...(prev[formattedDate] || [])];
      updated.splice(idx, 1);
      return { ...prev, [formattedDate]: updated };
    });
  };

  const handleEdit = (idx, name) => {
    setEditIndex(idx);
    setEditText(name);
  };

  const handleEditSave = () => {
    setTasks((prev) => {
      const updated = [...(prev[formattedDate] || [])];
      updated[editIndex] = { ...updated[editIndex], name: editText };
      return { ...prev, [formattedDate]: updated };
    });
    setEditIndex(null);
    setEditText('');
  };

  const tileClassName = ({ date }) => {
    const key = formatDateKey(date);
    const dayTasks = tasks[key];
    if (dayTasks && dayTasks.some((task) => task.completed)) return 'streak-day';
    if (dayTasks && dayTasks.length > 0) return 'incomplete-day';
    return null;
  };

  return (
    <>
      <div className="todo-container">
        <div className="calendar-container">
          <div className="calendar-box">
            <h1 className="heading">📅 Daily Tracker</h1>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={tileClassName}
            />
          </div>
          <div className="task-list">
            <div className="subheading">
              Tasks for {formattedDate}
            </div>
            <div style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task..."
                style={{ flex: 1, padding: '0.5rem', borderRadius: '5px',backgroundColor: '#e3a5c7',border:'none' }}
              />
              <AddIcon onClick={handleAdd} style={{ cursor: 'pointer', color: '#694F8E' }} />
            </div>
            <ul className="task-ul">
              {tasksForDate.length > 0 ? (
                tasksForDate.map((task, idx) => (
                  <li key={idx} className={`task-li ${task.completed ? 'completed' : ''}`}>
                    {editIndex === idx ? (
                      <>
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={{ marginRight: '0.5rem', padding: '0.3rem',backgroundColor: '#e3a5c7' }}
                        />
                        <CheckIcon onClick={handleEditSave} style={{ cursor: 'pointer' }} />
                        <CloseIcon onClick={() => setEditIndex(null)} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                      </>
                    ) : (
                      <>
                        <span onClick={() => toggleCompletion(idx)} style={{ cursor: 'pointer', flex: 1 }}>
                          {task.name}
                        </span>

                        <EditIcon onClick={() => handleEdit(idx, task.name)} style={{ marginLeft: '1rem', cursor: 'pointer', color: '#e3a5c7;' }} />
                        <DeleteIcon onClick={() => deleteTask(idx)} style={{ marginLeft: '0.5rem', cursor: 'pointer',  color: '#e3a5c7;' }} />
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li className="task-li">No tasks found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <StyleSheet />
    </>
  );
};

const StyleSheet = () => {
  return (
    <style>
      {`
        .todo-container {
          margin: 0.5rem auto;
          max-width: 1000px;
          width:80%;
          // min-height:100%;
          background-color: var(--color-primary);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .streak-day {
          background-color: rgb(133, 193, 135) !important;
          color: white !important;
          border-radius: 10px;
        }

        .task-li.completed {
          background-color: #c1e1c1;
          text-decoration: line-through;
        }

        .incomplete-day {
          background-color: #FF6B6B !important;
          color: white !important;
          border-radius: 10px;
        }

        .heading {
          text-align: center;
          color: #694F8E;
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          margin-bottom: 1rem;
        }

        .react-calendar__tile {
          background-color: #E3A5C7;
          color: #694F8E;
        }

        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em;
          background-color: #e3a5c7;
          color: #694F8E;
        }

        .react-calendar {
          max-width: 100%;
          background: #e3a5c7;
          border: 1px solid #a0a096;
          font-size: 1rem;
        }

        .calendar-container {
          display: flex;
          gap: 2rem;
          flex-direction: row;
          justify-content: space-between;
        }

        .calendar-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          min-width: 280px;
          max-width: 400px;
          background-color: #B692C2;
          padding: 1rem;
          border-radius: 8px;
        }

        .task-list {
          flex: 2;
          background-color: #B692C2;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .subheading {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #694F8E;
          font-size: clamp(1rem, 2vw, 1.5rem);
          margin-bottom: 1rem;
        }

        .task-ul {
          list-style: none;
          padding: 0;
        }

        .task-li {
          padding: clamp(0.5rem, 0.5vw, 1rem);
          background-color: #e3a5c7;
          // background-color: white;
          margin: 0.5rem 0;
          border-radius: 5px;
          // background-color: #e3a5c7;
          // color: #242424;
          font-size: clamp(0.9rem, 1.8vw, 1.2rem);
        }

        @media (max-width: 768px) {
          .calendar-container {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .calendar-box,
          .task-list {
            width: 100%;
          }

          .calendar-box {
            padding: 0.5rem;
          }

          .task-list {
            padding: 0.75rem;
          }

          .task-li {
            font-size: 1rem;
          }
        }
      `}
    </style>
  );
};

export default To_do;
