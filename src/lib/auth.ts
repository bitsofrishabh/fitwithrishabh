import { auth } from './firebase';
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: userCredential.user, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { data: userCredential.user, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error };
  }
}

export function useRequireAuth(redirectTo = '/login') {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate(redirectTo);
      }
    });

    return () => unsubscribe();
  }, [navigate, redirectTo]);
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user };
}