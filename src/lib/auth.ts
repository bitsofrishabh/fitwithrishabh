/**
 * Firebase authentication has been removed from the project.
 * These lightweight helpers allow existing UI (login buttons etc.)
 * to function without hitting any backend.
 */

export async function signIn(email: string, password: string) {
  if (!email || !password) {
    return { data: null, error: new Error('Please provide both email and password.') };
  }
  return { data: { email }, error: null };
}

export async function signUp() {
  return { data: null, error: new Error('Sign up is disabled in the demo build.') };
}

export async function signOut() {
  return { error: null };
}

export function useRequireAuth() {
  // No-op now that authentication is disabled.
}

export function useAuth() {
  return { user: null };
}
