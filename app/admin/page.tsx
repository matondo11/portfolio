'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      fetchProjects();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl mb-4">Login Admin</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 rounded"
          />
          <button type="submit" className="w-full bg-blue-600 p-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel Admin</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
      </div>
      
      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="text-xl">{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => setEditingProject(project)} className="bg-yellow-600 px-4 py-2 rounded">Editar</button>
              <button onClick={() => handleDelete(project._id!)} className="bg-red-600 px-4 py-2 rounded">Deletar</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Form para criar/editar projeto - implementar conforme necessário */}
    </div>
  );
}