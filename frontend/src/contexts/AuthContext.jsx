import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados do usuário no Firestore
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error('Dados do usuário não encontrados');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(userCredential.user.uid);
      setUserData(userData);
      return userCredential.user;
    } catch (error) {
      console.error('Erro no login:', error);
      let errorMessage = 'Erro ao fazer login';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erro de conexão. Verifique sua internet';
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  // Função para resetar senha
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
      throw error;
    }
  };

  // Função para obter token do usuário atual
  const getCurrentUserToken = async () => {
    if (user) {
      try {
        return await user.getIdToken();
      } catch (error) {
        console.error('Erro ao obter token:', error);
        throw error;
      }
    }
    return null;
  };

  // Verificar se é admin
  const isAdmin = () => {
    return userData?.role === 'admin';
  };

  // Verificar se é supervisor ou admin (pode gerenciar usuários)
  const canManageUsers = () => {
    return userData?.role === 'admin' || userData?.role === 'supervisor';
  };

  // Verificar se tem determinado cargo ou superior
  const hasRole = (requiredRole) => {
    if (!userData?.role) return false;

    const roleHierarchy = {
      'admin': 3,
      'supervisor': 2,
      'user': 1
    };

    const userLevel = roleHierarchy[userData.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    return userLevel >= requiredLevel;
  };

  // Monitor de estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          const userData = await fetchUserData(user.uid);
          setUserData(userData);
        } else {
          setUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setError('Erro ao carregar dados do usuário');
        setUser(null);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userData,
    loading,
    error,
    login,
    logout,
    resetPassword,
    getCurrentUserToken,
    isAdmin,
    canManageUsers,
    hasRole,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};