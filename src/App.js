import React, { useState, useEffect } from 'react';
import './App.css';

// =========================================
// CONSTANTS & MESSAGES
// =========================================
const MOTIVATIONAL_MSGS = [
    "¡Eres increíble, osito! 🐻‍❄️",
    "¡Un paso más a la meta! ❤️",
    "¡Vamos con todo, mi amor!",
    "¡Orgullosa de ti!",
    "¡Tú puedes, confío en ti!",
    "¡Lo estás haciendo genial! ✨"
];

const PRIORITIES = [
    { id: 'high', label: 'Urgente', color: 'var(--prio-high)' },
    { id: 'med', label: 'Media', color: 'var(--prio-med)' },
    { id: 'low', label: 'Baja', color: 'var(--prio-low)' }
];

const CATEGORIES = [
    { id: 'all', label: 'Todas' },
    { id: 'salud', label: 'Salud' },
    { id: 'trabajo', label: 'Trabajo' },
    { id: 'familia', label: 'Familia' },
    { id: 'universidad', label: 'Universidad' },
    { id: 'novia', label: 'Novia ❤️' }
];

// =========================================
// SVG POLAR BEAR
// =========================================
const PolarBearSVG = () => (
    <div className="bear-container bear-float">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#FFFFFF" />
            <circle cx="18" cy="25" r="12" fill="#FFFFFF" />
            <circle cx="82" cy="25" r="12" fill="#FFFFFF" />
            <circle cx="18" cy="25" r="6" fill="#E1F5FE" />
            <circle cx="82" cy="25" r="6" fill="#E1F5FE" />
            <circle cx="35" cy="45" r="5" fill="#2C3E50" />
            <circle cx="65" cy="45" r="5" fill="#2C3E50" />
            <circle cx="37" cy="43" r="2" fill="white" />
            <circle cx="67" cy="43" r="2" fill="white" />
            <circle cx="25" cy="60" r="8" fill="#FFCDD2" opacity="0.5"/>
            <circle cx="75" cy="60" r="8" fill="#FFCDD2" opacity="0.5"/>
            <ellipse cx="50" cy="65" rx="15" ry="10" fill="#E1F5FE" />
            <circle cx="50" cy="62" r="4" fill="#2C3E50" />
            <path d="M46 70 Q50 74 54 70" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
    </div>
);

// =========================================
// AUTH SCREEN
// =========================================
const AuthScreen = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin({ name: isRegister ? name : 'Osito Polar' });
        }, 1200);
    };

    return (
        <div className="auth-container pop-in">
            <div style={{textAlign: 'center', marginBottom: 30}}>
                <PolarBearSVG />
                <h1 style={{fontSize: '2.2rem', color: 'var(--text-main)'}}>Osito Polar</h1>
                <p style={{color: 'var(--text-sec)', fontWeight: 600}}>Organiza tu vida con estilo</p>
            </div>
            
            <form className="auth-card" onSubmit={handleSubmit}>
                <div className={`auth-toggle ${isRegister ? 'register-mode' : ''}`}>
                    <div className="auth-toggle-bg"></div>
                    <button type="button" onClick={() => setIsRegister(false)} className={!isRegister ? 'active' : ''}>Ingresar</button>
                    <button type="button" onClick={() => setIsRegister(true)} className={isRegister ? 'active' : ''}>Crear Cuenta</button>
                </div>

                {isRegister && (
                    <div style={{marginBottom: '16px'}}>
                        <input type="text" className="input-base" placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                )}
                <div style={{marginBottom: '16px'}}>
                    <input type="email" className="input-base" placeholder="Correo" required />
                </div>
                <div style={{marginBottom: '24px'}}>
                    <input type="password" className="input-base" placeholder="Contraseña" required />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Cargando...' : (isRegister ? 'Registrarse' : 'Entrar')}
                </button>
            </form>
        </div>
    );
};

// =========================================
// ADD/EDIT MODAL
// =========================================
const TaskModal = ({ isOpen, onClose, onSave, editingTask }) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('novia');
    const [priority, setPriority] = useState('med');
    const [date, setDate] = useState('');

    // Reset form or load data when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            if (editingTask) {
                setText(editingTask.text);
                setCategory(editingTask.category);
                setPriority(editingTask.priority);
                setDate(editingTask.date || '');
            } else {
                setText('');
                setCategory('novia');
                setPriority('med');
                setDate('');
            }
        }
    }, [isOpen, editingTask]);

    if (!isOpen) return null;

    const handleSave = () => {
        if(!text.trim()) return;
        onSave({ text, category, priority, date }, editingTask ? editingTask.id : null);
        onClose();
    };

    return (
        <div className="modal-overlay open" onClick={onClose}>
            <div className="modal-sheet slide-up" onClick={e => e.stopPropagation()}>
                <h3 style={{marginBottom:'20px', fontSize:'1.5rem'}}>{editingTask ? 'Editar Misión' : 'Nueva Misión'}</h3>
                
                <textarea 
                    className="input-base" 
                    rows="3" 
                    placeholder="¿Qué necesitas hacer?" 
                    value={text} onChange={e => setText(e.target.value)}
                    style={{marginBottom:'20px'}}
                ></textarea>

                <label style={{fontSize:'0.9rem', fontWeight:'700', color:'var(--text-sec)', display:'block', marginBottom:'8px'}}>Prioridad</label>
                <div className="prio-selector">
                    {PRIORITIES.map(p => (
                        <div 
                            key={p.id} 
                            className={`prio-btn ${priority === p.id ? 'selected' : ''}`}
                            onClick={() => setPriority(p.id)}
                        >
                            {p.label}
                        </div>
                    ))}
                </div>

                <label style={{fontSize:'0.9rem', fontWeight:'700', color:'var(--text-sec)', display:'block', marginBottom:'8px'}}>Categoría</label>
                <div className="grid-options">
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                        <div 
                            key={c.id}
                            className={`option-pill ${category === c.id ? 'selected' : ''}`}
                            onClick={() => setCategory(c.id)}
                        >
                            {c.label}
                        </div>
                    ))}
                </div>

                <label style={{fontSize:'0.9rem', fontWeight:'700', color:'var(--text-sec)', display:'block', marginBottom:'8px'}}>Fecha</label>
                <input type="date" className="input-base" value={date} onChange={e => setDate(e.target.value)} style={{marginBottom:'24px'}} />

                <button onClick={handleSave} className="btn-primary">
                    {editingTask ? 'Guardar Cambios' : 'Crear Misión'}
                </button>
            </div>
        </div>
    );
};

// =========================================
// MAIN DASHBOARD
// =========================================
const Dashboard = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [motivationalMsg, setMotivationalMsg] = useState("¡Vamos con todo!");

    // Load Data
    useEffect(() => {
        const saved = localStorage.getItem('osito_tasks_v3');
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // Save Data
    useEffect(() => {
        localStorage.setItem('osito_tasks_v3', JSON.stringify(tasks));
    }, [tasks]);

    // Confetti Logic
    const triggerConfetti = (msg) => {
        const colors = ['#66A6FF', '#FF9A9E', '#FDCB6E', '#55EFC4', '#A29BFE'];
        for (let i = 0; i < 40; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.animationDuration = (Math.random() * 1 + 0.8) + 's';
            document.body.appendChild(conf);
            setTimeout(() => conf.remove(), 2500);
        }
        setMotivationalMsg(msg);
    };

    // Task Handlers
    const addOrEditTask = (taskData, id) => {
        if (id) {
            // Edit
            setTasks(tasks.map(t => t.id === id ? { ...t, ...taskData } : t));
        } else {
            // Add
            setTasks([{ id: Date.now(), completed: false, ...taskData }, ...tasks]);
        }
        setEditingTask(null);
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id && !t.completed) {
                const randomMsg = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
                triggerConfetti(randomMsg);
            }
            return t.id === id ? { ...t, completed: !t.completed } : t;
        }));
    };

    const deleteTask = (id) => {
        // Visual feedback first
        const el = document.getElementById(`task-${id}`);
        if(el) el.classList.add('fade-out');
        
        // Logic after animation
        setTimeout(() => {
            setTasks(tasks.filter(t => t.id !== id));
        }, 400);
    };

    const openEdit = (task) => {
        setEditingTask(task);
        setModalOpen(true);
    };

    // Filter & Sort
    const filteredTasks = tasks.filter(t => {
        const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
        const matchesCat = filterCat === 'all' || t.category === filterCat;
        return matchesSearch && matchesCat;
    }).sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const prioWeight = { high: 3, med: 2, low: 1 };
        return prioWeight[b.priority] - prioWeight[a.priority];
    });

    return (
        <div className="app-layout pop-in">
            {/* Top Section */}
            <div className="top-bar">
                <div className="header-row">
                    <div className="user-greeting">
                        <p>Hola, {user.name} 👋</p>
                        <h1>¡Hoy es gran día!</h1>
                    </div>
                    <button className="btn-icon"><i className="ph ph-gear"></i></button>
                </div>

                {/* Mensaje Motivacional */}
                <div className="motivational-bubble">
                    <i className="ph ph-heart-fill"></i>
                    <span>{motivationalMsg}</span>
                </div>

                <div className="search-bar">
                    <i className="ph ph-magnifying-glass" style={{fontSize: '1.2rem', color: 'var(--text-sec)'}}></i>
                    <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <div className="filter-bar">
                    {CATEGORIES.map(c => (
                        <button key={c.id} className={`filter-chip ${filterCat === c.id ? 'active' : ''}`} onClick={() => setFilterCat(c.id)}>
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task List */}
            <div className="task-list-container">
                {filteredTasks.length === 0 ? (
                    <div style={{textAlign: 'center', marginTop: 80, color: 'var(--text-sec)'}}>
                        <div style={{fontSize: '4rem', marginBottom: 20, opacity: 0.3}}>🐻‍❄️</div>
                        <p>No hay tareas aquí.</p>
                    </div>
                ) : (
                    filteredTasks.map(task => {
                        const prioInfo = PRIORITIES.find(p => p.id === task.priority);
                        const catInfo = CATEGORIES.find(c => c.id === task.category);
                        return (
                            <div key={task.id} id={`task-${task.id}`} className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
                                <div 
                                    className={`checkbox-custom ${task.completed ? 'checked' : ''}`}
                                    onClick={() => toggleComplete(task.id)}
                                >
                                    {task.completed && <i className="ph ph-check-fat-fill"></i>}
                                </div>
                                <div className="task-content">
                                    <h3>{task.text}</h3>
                                    <div className="task-meta">
                                        <span style={{color: prioInfo.color, fontWeight: 800}}>{prioInfo.label}</span>
                                        <span>•</span>
                                        <span>{catInfo.label}</span>
                                    </div>
                                </div>
                                <div className="action-btns">
                                    <button className="mini-btn edit" onClick={() => openEdit(task)}><i className="ph ph-pencil-simple"></i></button>
                                    <button className="mini-btn del" onClick={() => deleteTask(task.id)}><i className="ph ph-trash"></i></button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* FAB */}
            <button className="fab" onClick={() => { setEditingTask(null); setModalOpen(true); }}>
                <i className="ph ph-plus"></i>
            </button>

            {/* Modal */}
            <TaskModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSave={addOrEditTask}
                editingTask={editingTask}
            />
        </div>
    );
};

// =========================================
// APP ROOT
// =========================================
const App = () => {
    const [user, setUser] = useState(null);
    return user ? <Dashboard user={user} /> : <AuthScreen onLogin={setUser} />;
};

export default App;
