import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulação de usuários do sistema
  const mockUsers = [
    {
      id: '1',
      email: 'admin@atendax.com',
      password: 'admin123',
      name: 'Administrador AtendaX',
      role: 'admin'
    },
    {
      id: '2',
      email: 'supervisor@atendax.com',
      password: 'super123',
      name: 'Supervisor AtendaX',
      role: 'supervisor'
    },
    {
      id: '3',
      email: 'usuario@atendax.com',
      password: 'user123',
      name: 'Usuário Comum',
      role: 'user'
    }
  ];

  const login = async (email, password) => {
    setLoading(true);

    try {
      // Simulação de delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Buscar usuário nos dados mockados
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Credenciais inválidas');
      }

      // Remover senha do objeto do usuário
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);

      // Salvar no localStorage (simular sessão)
      localStorage.setItem('atendax_user', JSON.stringify(userWithoutPassword));

      return userWithoutPassword;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('atendax_user');
  };

  const getCurrentUser = () => {
    if (user) return user;

    // Tentar recuperar do localStorage
    const savedUser = localStorage.getItem('atendax_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      return parsedUser;
    }

    return null;
  };

  const hasRole = (requiredRole) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;

    const roleHierarchy = {
      'admin': 3,
      'supervisor': 2,
      'user': 1
    };

    const userLevel = roleHierarchy[currentUser.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    return userLevel >= requiredLevel;
  };

  const canManageUsers = () => {
    return hasRole('supervisor'); // Supervisores e Admins podem gerenciar usuários
  };

  const isAdmin = () => {
    return hasRole('admin');
  };

  const userData = getCurrentUser();

  const value = {
    user: getCurrentUser(),
    userData,
    login,
    logout,
    loading,
    hasRole,
    canManageUsers,
    isAdmin,
    getCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;