import React, { useState, useEffect } from 'react';
import './App.css';

// =========================================
// CONSTANTS & DATA
// =========================================
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
    { id: 'novia', label: 'Novia \u2764\ufe0f' }
];

// =========================================
// SVG COMPONENTS
// =========================================

// =========================================
// COMPONENTE SVG: CORAZÓN AZUL LATIDO (Versión Escalable)
// =========================================
const AnimatedBlueHeart = ({ sizeMultiplier = 1 }) => (
    <svg 
        className="ph heart-beat-anim" 
        viewBox="0 0 256 256" 
        style={{
            color: '#29B6F6',
            width: `${1.8 * sizeMultiplier}rem`, 
            height: `${1.8 * sizeMultiplier}rem`,
            filter: `drop-shadow(0 10px ${20 * sizeMultiplier}px rgba(41, 182, 246, 0.4))` 
        }}
    >
        <path fill="currentColor" d="M128 216.8c-6.4-4.8-12.8-10-19.2-15.2-32-25.6-64-49.6-76.8-62.4-14.4-14.4-22.4-33.6-22.4-54.4 0-36 27.2-64 64-64 16 0 32 6.4 44.8 17.6 11.2-11.2 27.2-17.6 44.8-17.6 36 0 64 28 64 64 0 20.8-8 40-22.4 54.4-12.8 12.8-44.8 36.8-76.8 62.4-6.4 5.6-12.8 10.4-19.2 15.2z" />
    </svg>
);

const PolarBearSVG = () => (
    <div className="bear-float">
        <svg className="bear-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#FFFFFF" />
            <circle cx="18" cy="25" r="12" fill="#FFFFFF" />
            <circle cx="82" cy="25" r="12" fill="#FFFFFF" />
            <circle cx="18" cy="25" r="6" fill="#E1F5FE" />
            <circle cx="82" cy="25" r="6" fill="#E1F5FE" />
            <circle cx="35" cy="45" r="5" fill="#1565C0" />
            <circle cx="65" cy="45" r="5" fill="#1565C0" />
            <circle cx="37" cy="43" r="2" fill="white" />
            <circle cx="67" cy="43" r="2" fill="white" />
            <circle cx="25" cy="60" r="8" fill="#FFCDD2" opacity="0.5"/>
            <circle cx="75" cy="60" r="8" fill="#FFCDD2" opacity="0.5"/>
            <ellipse cx="50" cy="65" rx="15" ry="10" fill="#E1F5FE" />
            <circle cx="50" cy="62" r="4" fill="#1565C0" />
            <path d="M46 70 Q50 74 54 70" stroke="#1565C0" strokeWidth="2" fill="none" strokeLinecap="round" />
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
            onLogin({ name: isRegister ? name : 'Osito Polar', theme: 'light' });
        }, 1200);
    };

    return (
        <div className="auth-container elastic-in">
            <div style={{textAlign: 'center', marginBottom: 30}}>
                <PolarBearSVG />
                <h1 style={{fontSize: '2.4rem', color: 'var(--text-main)'}}>Osito Polar</h1>
                <p style={{color: 'var(--text-sec)', fontWeight: 700}}>Organiza tu vida con estilo</p>
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
// SETTINGS PANEL
// =========================================
const SettingsPanel = ({ isOpen, onClose, user, onUpdateUser, onLogout, theme, toggleTheme }) => {
    const [tempName, setTempName] = useState(user?.name || '');

    const handleSaveName = () => {
        if(user) onUpdateUser({ ...user, name: tempName });
        onClose();
    };

    return (
        <div className={`settings-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="settings-panel slide-up" onClick={e => e.stopPropagation()}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30}}>
                    <h2 style={{fontSize: '1.5rem'}}>Perfil</h2>
                    <button onClick={onClose} className="mini-btn"><i className="ph ph-x"></i></button>
                </div>

                <div style={{textAlign: 'center', marginBottom: 30}}>
                    <div style={{width: 80, height: 80, background: '#E3F2FD', borderRadius: '50%', margin: '0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem'}}>\ud83e\uddfd</div>
                    <input 
                        type="text" 
                        value={tempName} 
                        onChange={e => setTempName(e.target.value)} 
                        style={{border:'none', background:'transparent', textAlign:'center', fontSize:'1.2rem', fontWeight:'800', color:'var(--text-main)', outline:'none', borderBottom: '2px dashed var(--text-sec)', width:'100%'}}
                    />
                </div>

                <div style={{marginBottom: 20}}>
                    <button className="btn-secondary" style={{width:'100%', marginBottom: 10}} onClick={handleSaveName}>
                        Guardar Nombre
                    </button>
                    <button className="btn-secondary" style={{width:'100%', display:'flex', justifyContent:'space-between'}} onClick={toggleTheme}>
                        <span>Modo {theme === 'light' ? 'Oscuro' : 'Claro'}</span>
                        <i className={`ph ${theme === 'light' ? 'ph-moon' : 'ph-sun'}`}></i>
                    </button>
                </div>

                <div style={{marginTop: 'auto'}}>
                    <button onClick={onLogout} style={{width:'100%', background: '#FFEBEE', color: '#C62828', padding: 16, borderRadius: 20, fontWeight: 800, border:'none', cursor:'pointer'}}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

// =========================================
// TASK MODAL
// =========================================
const TaskModal = ({ isOpen, onClose, onSave, editingTask }) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('novia');
    const [priority, setPriority] = useState('med');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (editingTask) {
                setText(editingTask.text || '');
                setCategory(editingTask.category || 'novia');
                setPriority(editingTask.priority || 'med');
                setDate(editingTask.date || '');
            } else {
                setText(''); setCategory('novia'); setPriority('med'); setDate('');
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
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content elastic-in" onClick={e => e.stopPropagation()}>
                <h3 style={{marginBottom:'20px', fontSize:'1.4rem'}}>{editingTask ? 'Editar Misión' : 'Nueva Misión'}</h3>
                
                <textarea 
                    className="input-base" 
                    rows="3" 
                    placeholder="¿Qué necesitas hacer?" 
                    value={text} onChange={e => setText(e.target.value)}
                    style={{marginBottom:'20px'}}
                ></textarea>

                <label style={{fontSize:'0.8rem', fontWeight:'800', color:'var(--text-sec)', display:'block', marginBottom:'8px', textAlign:'left'}}>Prioridad</label>
                <div className="prio-selector">
                    {PRIORITIES.map(p => (
                        <div key={p.id} className={`prio-btn ${priority === p.id ? 'selected' : ''}`} onClick={() => setPriority(p.id)}>{p.label}</div>
                    ))}
                </div>

                <label style={{fontSize:'0.8rem', fontWeight:'800', color:'var(--text-sec)', display:'block', marginBottom:'8px', textAlign:'left'}}>Categoría</label>
                <div className="grid-options">
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                        <div key={c.id} className={`option-pill ${category === c.id ? 'selected' : ''}`} onClick={() => setCategory(c.id)}>{c.label}</div>
                    ))}
                </div>

                <button onClick={handleSave} className="btn-primary" style={{marginTop: 10}}>
                    {editingTask ? 'Guardar Cambios' : 'Crear Misión'}
                </button>
            </div>
        </div>
    );
};

// =========================================
// DELETE CONFIRMATION MODAL
// =========================================
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content elastic-in" onClick={e => e.stopPropagation()}>
                <h2 style={{fontSize: '2.5rem', marginBottom: 10, color: 'var(--icon-color)'}}>Tesoro</h2>
                <h3 style={{marginBottom: 10}}>¿Seguro de borrar?</h3>
                <p style={{color: 'var(--text-sec)', marginBottom: 20}}>¿Quieres eliminar esta tarea?</p>
                <div style={{display:'flex', gap: 10}}>
                    <button onClick={onClose} className="btn-secondary" style={{flex: 1}}>No, dejémosla</button>
                    <button onClick={onConfirm} className="btn-primary" style={{background: '#FF9AA2', flex: 1, border: 'none'}}>Sí, borrar</button>
                </div>
            </div>
        </div>
    );
};

// =========================================
// MAIN DASHBOARD
// =========================================
const Dashboard = ({ user, onLogout, onUpdateUser }) => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [theme, setTheme] = useState(user?.theme || 'light');
    const [toast, setToast] = useState(null);
    
    // Nuevos Estados para funcionalidades tiernas
    const [hugs, setHugs] = useState(0);
    const [note, setNote] = useState('');

    // Theme Effect
    useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);

    // Load Data
    useEffect(() => {
        try {
            const savedTasks = localStorage.getItem('osito_tasks_v5');
            if (savedTasks) setTasks(JSON.parse(savedTasks));
            
            const savedHugs = localStorage.getItem('osito_hugs');
            if (savedHugs) setHugs(parseInt(savedHugs));

            const savedNote = localStorage.getItem('osito_note');
            if (savedNote) setNote(savedNote);
        } catch (e) { console.error(e); }
    }, []);

    // Save Data
    useEffect(() => { 
        try { localStorage.setItem('osito_tasks_v5', JSON.stringify(tasks)); } catch(e){}
    }, [tasks]);
    
    useEffect(() => { 
        try { localStorage.setItem('osito_hugs', hugs); } catch(e){}
    }, [hugs]);

    const handleNoteChange = (e) => {
        setNote(e.target.value);
        try { localStorage.setItem('osito_note', e.target.value); } catch(e){}
    };

    // Toast Helper
    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    // Particle Creator (Confetti/Hearts)
    const createParticle = (type) => {
        const p = document.createElement('div');
        p.className = `particle ${type}`;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.bottom = '-50px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1500);
    };

    // Confetti Logic
    const triggerConfetti = () => {
        for (let i = 0; i < 30; i++) createParticle('confetti');
    };

    // Actions
    const addOrEditTask = (taskData, id) => {
        if (id) {
            setTasks(tasks.map(t => t.id === id ? { ...t, ...taskData } : t));
            showToast("¡Tarea editada! \u270f\ufe0f");
        } else {
            setTasks([{ id: Date.now(), completed: false, ...taskData }, ...tasks]);
            showToast("¡Nueva misión creada! \u2b50");
        }
        setEditingTask(null);
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id && !t.completed) {
                triggerConfetti();
                showToast("¡Bien hecho! \ud83c\udf89");
            }
            return t.id === id ? { ...t, completed: !t.completed } : t;
        }));
    };

    const confirmDelete = () => {
        setTasks(tasks.filter(t => t.id !== deleteId));
        setDeleteId(null);
        showToast("Tarea eliminada \ud83d\uddd1\ufe0f");
    };

    const giveHug = () => {
        setHugs(hugs + 1);
        showToast(`¡Abrazo #${hugs + 1}! \u2764\ufe0f`);
        for(let i=0; i<5; i++) createParticle('heart');
    };

    // Helper para obtener color de categoría
    const getCategoryColor = (catId) => {
        const map = {
            'salud': 'var(--cat-salud)',
            'trabajo': 'var(--cat-trabajo)',
            'familia': 'var(--cat-familia)',
            'universidad': 'var(--cat-uni)',
            'novia': 'var(--cat-novia)',
            'all': 'var(--icon-color)'
        };
        return map[catId] || 'var(--text-sec)';
    };

    // Filter & Sort
    const filteredTasks = tasks.filter(t => {
        if (!t) return false;
        const matchesSearch = (t.text || '').toLowerCase().includes(search.toLowerCase());
        const matchesCat = filterCat === 'all' || t.category === filterCat;
        return matchesSearch && matchesCat;
    }).sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const prioWeight = { high: 3, med: 2, low: 1 };
        return prioWeight[b.priority] - prioWeight[a.priority];
    });

    return (
        <div className="app-layout elastic-in">
            {/* Toast Notification */}
            <div className={`toast ${toast ? 'show' : ''}`}>
                <i className="ph ph-info"></i> {toast}
            </div>

            {/* Top Bar */}
            <div className="top-bar">
                <div className="header-row">
                    <div className="user-greeting">
                        <p>Hola, {user?.name || 'Osito'} Muñeco</p>
                        <h1>¡Hoy es gran día!</h1>
                    </div>
                    <button className="btn-icon" onClick={() => setSettingsOpen(true)}>
                        <i className="ph ph-gear"></i>
                    </button>
                </div>

                {/* Elementos Funcionales Tiernos */}
                <div className="functional-grid">
                    <div className="func-card" onClick={giveHug}>
                        <i className="ph ph-heart func-icon"></i>
                        <div className="func-val">{hugs}</div>
                        <div className="func-label">Abrazos Hoy</div>
                    </div>
                    <div className="func-card">
                        <AnimatedBlueHeart />
                        <div className="func-val">{tasks.filter(t => t.completed).length}</div>
                        <div className="func-label">Hechas</div>
                    </div>
                </div>

                {/* Notita de Amor Estética "Premium" */}
                <div className="sticky-note-container">
                    <div className="note-pin"></div>
                    <div className="sticky-note">
                        <textarea 
                            rows="2" 
                            placeholder="Escribe una nota para tu osito..." 
                            value={note}
                            onChange={handleNoteChange}
                        ></textarea>
                    </div>
                </div>

                <div className="search-bar">
                    <i className="ph ph-magnifying-glass" style={{fontSize: '1.2rem', color: 'var(--text-sec)'}}></i>
                    <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <div className="filter-bar">
                    {CATEGORIES.map(c => (
                        <button 
                            key={c.id} 
                            className={`filter-chip ${filterCat === c.id ? 'active' : ''}`} 
                            onClick={() => setFilterCat(c.id)}
                            style={{
                                // Si está activo, usa el color de la categoría, si es 'all' usa el principal
                                backgroundColor: filterCat === c.id ? (c.id === 'all' ? 'var(--icon-color)' : getCategoryColor(c.id)) : 'var(--bg-card)',
                                color: filterCat === c.id ? 'white' : 'var(--text-sec)',
                                borderColor: filterCat === c.id ? (c.id === 'all' ? 'var(--icon-color)' : getCategoryColor(c.id)) : 'transparent'
                            }}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

                {/* Task List */}
                <div className="task-list-container">
                    {filteredTasks.length === 0 ? (
                        <div style={{textAlign: 'center', marginTop: 100, color: 'var(--text-sec)'}}>
                            {/* CAMBIO: OSO POLAR DEL DASHBOARD POR CORAZÓN AZUL LATIENDO */}
                            <div style={{marginBottom: 20}}>
                                <AnimatedBlueHeart sizeMultiplier={4} />
                            </div>
                            <p style={{fontWeight: 700, fontSize: '1.1rem'}}>No hay tareas aquí.</p>
                            <p style={{fontSize: '0.9rem', marginBottom: 20}}>¡Todo en orden!</p>
                            <button className="btn-secondary" onClick={() => { setEditingTask(null); setModalOpen(true); }}>Añadir tarea</button>
                        </div>
                    ) : (
                        filteredTasks.map(task => {
                            const prioInfo = PRIORITIES.find(p => p.id === task.priority) || PRIORITIES[1];
                            const catInfo = CATEGORIES.find(c => c.id === task.category) || { label: 'General', id: 'all' };
                            const catColor = getCategoryColor(task.category);

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
                                            <span style={{fontWeight: 800, background: catColor, color: 'white', padding: '2px 6px', borderRadius: 4, opacity: 0.9}}>{prioInfo.label}</span>
                                            <span>·</span>
                                            <span style={{color: catColor, fontWeight: 800}}>{catInfo.label}</span>
                                        </div>
                                    </div>
                                    <div className="action-btns">
                                        <button className="mini-btn edit" onClick={() => { setEditingTask(task); setModalOpen(true); }}><i className="ph ph-pencil-simple"></i></button>
                                        <button className="mini-btn del" onClick={() => setDeleteId(task.id)}><i className="ph ph-trash"></i></button>
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

                {/* Modals & Panels */}
                <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={addOrEditTask} editingTask={editingTask} />
                <DeleteConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} />
                
                <SettingsPanel 
                    isOpen={settingsOpen} 
                    onClose={() => setSettingsOpen(false)} 
                    user={user} 
                    onUpdateUser={onUpdateUser} 
                    onLogout={onLogout} 
                    theme={theme} 
                    toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
                />
            </div>
        );
    };

// =========================================
// APP ROOT
// =========================================
const App = () => {
    const [user, setUser] = useState(null);

    return user 
        ? <Dashboard user={user} onLogout={() => setUser(null)} onUpdateUser={setUser} /> 
        : <AuthScreen onLogin={setUser} />;
};

export default App;
