import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// =========================================
// SVG POLAR BEAR
// =========================================
const PolarBearSVG = () => (
  <div className="bear-logo">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFFFFF" />
      <circle cx="18" cy="25" r="12" fill="#FFFFFF" />
      <circle cx="82" cy="25" r="12" fill="#FFFFFF" />
      <circle cx="18" cy="25" r="6" fill="#E1F5FE" />
      <circle cx="82" cy="25" r="6" fill="#E1F5FE" />
      <circle cx="35" cy="45" r="5" fill="#0D47A1" />
      <circle cx="65" cy="45" r="5" fill="#0D47A1" />
      <circle cx="25" cy="60" r="8" fill="#FFCDD2" opacity="0.6"/>
      <circle cx="75" cy="60" r="8" fill="#FFCDD2" opacity="0.6"/>
      <ellipse cx="50" cy="65" rx="15" ry="10" fill="#E1F5FE" />
      <circle cx="50" cy="62" r="4" fill="#333" />
      <path d="M46 70 Q50 74 54 70" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

// =========================================
// CONSTANTS
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
  { id: 'novia', label: 'Novia \u2764\ufe0f' }
];

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
    <div className="auth-container slide-up">
      <div style={{textAlign: 'center', marginBottom: 20}}>
        <PolarBearSVG />
        <h1 style={{fontSize: '2rem', color: 'var(--text-main)'}}>Osito Polar</h1>
        <p style={{color: 'var(--text-sec)'}}>Organiza tu vida con estilo \u00e1rtico</p>
      </div>
      
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className={`auth-toggle ${isRegister ? 'register-mode' : ''}`}>
          <div className="auth-toggle-bg"></div>
          <button type="button" onClick={() => setIsRegister(false)} className={!isRegister ? 'active' : ''}>Ingresar</button>
          <button type="button" onClick={() => setIsRegister(true)} className={isRegister ? 'active' : ''}>Crear Cuenta</button>
        </div>

        {isRegister && (
          <div style={{marginBottom: '16px'}}>
            <label style={{display:'block', fontSize:'0.8rem', fontWeight:'700', marginBottom:'6px', color:'var(--text-sec)'}}>Tu Nombre</label>
            <input type="text" className="input-base" placeholder="Ej. Osito Polar" value={name} onChange={e => setName(e.target.value)} required />
          </div>
        )}

        <div style={{marginBottom: '16px'}}>
          <label style={{display:'block', fontSize:'0.8rem', fontWeight:'700', marginBottom:'6px', color:'var(--text-sec)'}}>Correo</label>
          <input type="email" className="input-base" placeholder="correo@ejemplo.com" required />
        </div>

        <div style={{marginBottom: '24px'}}>
          <label style={{display:'block', fontSize:'0.8rem', fontWeight:'700', marginBottom:'6px', color:'var(--text-sec)'}}>Contrase\u00f1a</label>
          <input type="password" className="input-base" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Cargando...' : (isRegister ? 'Registrarse' : 'Entrar')}
        </button>
      </form>
    </div>
  );
};

// =========================================
// ADD TASK MODAL
// =========================================
const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('novia');
  const [priority, setPriority] = useState('med');
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if(!text.trim()) return;
    onAdd({ text, category, priority, date });
    setText(''); setCategory('novia'); setPriority('med'); setDate('');
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <h3 style={{marginBottom:'20px', fontSize:'1.4rem'}}>Nueva Misión</h3>
        
        <textarea 
          className="input-base" 
          rows="3" 
          placeholder="\u00bfQu\u00e9 necesitas hacer hoy, osito?" 
          value={text} onChange={e => setText(e.target.value)}
          style={{marginBottom:'16px'}}
        ></textarea>

        <label style={{fontSize:'0.9rem', fontWeight:'700', color:'var(--text-sec)', display:'block', marginBottom:'8px'}}>Prioridad</label>
        <div className="prio-selector">
          {PRIORITIES.map(p => (
            <div 
              key={p.id} 
              className={`prio-btn ${priority === p.id ? 'selected' : ''}`}
              onClick={() => setPriority(p.id)}
              style={{borderColor: priority === p.id ? p.color : 'transparent'}}
            >
              {p.label}
            </div>
          ))}
        </div>

        <label style={{fontSize:'0.9rem', fontWeight:'700', color:'var(--text-sec)', display:'block', marginBottom:'8px'}}>Categor\u00eda</label>
        <div className="category-grid">
          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
            <div 
              key={c.id}
              className={`cat-option ${category === c.id ? 'selected' : ''}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </div>
          ))}
        </div>

        <label style={{fontSize:'0.9rem', fontWeight:'700', color:'var(--text-sec)', display:'block', marginBottom:'8px'}}>Fecha L\u00edmite</label>
        <input type="date" className="input-base" value={date} onChange={e => setDate(e.target.value)} style={{marginBottom:'24px'}} />

        <button onClick={handleSave} className="btn-primary">Guardar Misión</button>
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

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem('osito_tasks_v2');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem('osito_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  // Logic
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    const pending = total - done;
    const urgent = tasks.filter(t => !t.completed && t.priority === 'high').length;
    return { total, done, pending, urgent };
  }, [tasks]);

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'all' || t.category === filterCat;
    return matchesSearch && matchesCat;
  }).sort((a, b) => {
    // Sort by Priority (High first) then by Completed
    if (a.completed === b.completed) {
      const prioWeight = { high: 3, med: 2, low: 1 };
      return prioWeight[b.priority] - prioWeight[a.priority];
    }
    return a.completed ? 1 : -1;
  });

  const triggerConfetti = () => {
    const colors = ['#29B6F6', '#FF5252', '#FFD54F', '#00C853'];
    for (let i = 0; i < 30; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.style.left = Math.random() * 100 + 'vw';
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 2000);
    }
  };

  const addTask = (taskData) => {
    setTasks([{ id: Date.now(), completed: false, ...taskData }, ...tasks]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id && !t.completed) triggerConfetti();
      return t.id === id ? { ...t, completed: !t.completed } : t;
    }));
  };

  const deleteTask = (id) => {
    if(window.confirm("\u00bfBorrar esta tarea, osito?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className="app-layout fade-in">
      {/* Top Section (Fixed) */}
      <div className="top-bar">
        <div className="header-row">
          <div className="user-greeting">
            <p>Bienvenido de nuevo,</p>
            <h1>{user.name} \ud83d\udc3b\u200d\u2744\ufe0f</h1>
          </div>
          <button className="btn-icon">
            <i className="ph ph-gear"></i>
          </button>
        </div>

        {/* Search */}
        <div className="search-bar">
          <i className="ph ph-magnifying-glass" style={{fontSize: '1.2rem', color: 'var(--text-sec)'}}></i>
          <input 
            type="text" 
            placeholder="Buscar misi\u00f3n..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Stats Scroll */}
        <div className="stats-scroll">
          <div className="stat-card">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-desc">Total Tareas</span>
          </div>
          <div className="stat-card">
            <span className="stat-num" style={{color: 'var(--prio-high)'}}>{stats.urgent}</span>
            <span className="stat-desc">Urgentes</span>
          </div>
          <div className="stat-card">
            <span className="stat-num" style={{color: 'var(--success)'}}>{stats.done}</span>
            <span className="stat-desc">Completadas</span>
          </div>
        </div>

        {/* Categories */}
        <div className="filter-bar">
          {CATEGORIES.map(c => (
            <button 
              key={c.id}
              className={`filter-chip ${filterCat === c.id ? 'active' : ''}`}
              onClick={() => setFilterCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List (Scrollable) */}
      <div className="task-list-container">
        {filteredTasks.length === 0 ? (
          <div style={{textAlign: 'center', marginTop: 60, color: 'var(--text-sec)'}}>
            <i className="ph ph-check-circle" style={{fontSize: '3rem', opacity: 0.5, marginBottom: 10}}></i>
            <p>No hay tareas en esta categor\u00eda.</p>
            <p style={{fontSize: '0.8rem'}}>\u00a1Disfruta tu d\u00eda!</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const prioInfo = PRIORITIES.find(p => p.id === task.priority);
            const catInfo = CATEGORIES.find(c => c.id === task.category);
            
            return (
              <div key={task.id} className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
                <div 
                  className={`checkbox-custom ${task.completed ? 'checked' : ''}`}
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed && <i className="ph ph-check-fat-fill"></i>}
                </div>
                <div style={{flex: 1}}>
                  <h3>{task.text}</h3>
                  <div className="task-meta">
                    <span className="priority-badge" style={{background: prioInfo.color}}>{prioInfo.label}</span>
                    <span>\u2022</span>
                    <span>{catInfo.label}</span>
                    {task.date && <span>\u2022 {task.date}</span>}
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} style={{background:'transparent', color: 'var(--text-sec)', border:'none'}}>
                  <i className="ph ph-trash" style={{fontSize: '1.2rem'}}></i>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* FAB */}
      <button className="fab" onClick={() => setModalOpen(true)}>
        <i className="ph ph-plus"></i>
      </button>

      {/* Modal */}
      <AddTaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={addTask} />
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
