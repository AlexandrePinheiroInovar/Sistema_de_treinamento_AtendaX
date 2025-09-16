import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Configuração do Firebase - substitua pelos dados do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyAOapGFsNVPA2Cd9R9Glmvs7vDzpkZPpbo",
  authDomain: "sistema-de-treinamento-atendax.firebaseapp.com",
  projectId: "sistema-de-treinamento-atendax",
  storageBucket: "sistema-de-treinamento-atendax.firebasestorage.app",
  messagingSenderId: "771504470193",
  appId: "1:771504470193:web:909ce3945801ff813a0a90",
  measurementId: "G-HMX3Z33980"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Conectar aos emuladores em desenvolvimento (opcional)
if (import.meta.env.DEV && !auth._delegate._config?.emulator) {
  try {
    // Descomente para usar emuladores locais
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.warn('Emuladores já conectados ou não disponíveis');
  }
}

export default app;