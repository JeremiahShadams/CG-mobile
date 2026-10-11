import { LAUNCH } from './launchSpec';

export interface SessionStore {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
}

async function defaultStore(): Promise<SessionStore> {
  // Lazy so unit tests (Node) never load the native module.
  const SecureStore = await import('expo-secure-store');
  return {
    getItemAsync: (key) => SecureStore.getItemAsync(key),
    setItemAsync: (key, value) => SecureStore.setItemAsync(key, value),
    deleteItemAsync: (key) => SecureStore.deleteItemAsync(key),
  };
}

export type SessionState = 'valid' | 'expired' | 'guest' | 'none';

export type LaunchDestination =
  | { route: '/(tabs)'; expired: false }
  | { route: '/(auth)'; expired: boolean };

interface StoredSession {
  status: 'valid' | 'expired' | 'guest';
  exp?: number;
}

/**
 * Reads the encrypted auth cache. Network calls are prohibited here (spec §6):
 * only the local cache decides the destination.
 */
export async function getSessionState(store?: SessionStore): Promise<SessionState> {
  const active = store ?? (await defaultStore());
  try {
    const raw = await active.getItemAsync(LAUNCH.sessionKey);
    if (!raw) return 'none';
    const parsed = JSON.parse(raw) as StoredSession;
    if (parsed.status === 'guest') return 'guest';
    if (parsed.status === 'expired') return 'expired';
    if (parsed.status === 'valid') {
      if (typeof parsed.exp === 'number' && parsed.exp <= Date.now()) return 'expired';
      return 'valid';
    }
    return 'none';
  } catch {
    // Fail-open: a corrupt cache must never strand the user on launch.
    return 'none';
  }
}

/** Maps session state to a single destination (spec §4). No login→home flash. */
export function destinationFor(state: SessionState): LaunchDestination {
  switch (state) {
    case 'valid':
    case 'guest':
      return { route: '/(tabs)', expired: false };
    case 'expired':
      return { route: '/(auth)', expired: true };
    case 'none':
      return { route: '/(auth)', expired: false };
  }
}

/** Dev/support helper — not used by the launch flow itself. */
export async function setSessionState(
  value: StoredSession | null,
  store?: SessionStore,
): Promise<void> {
  const active = store ?? (await defaultStore());
  if (value === null) {
    await active.deleteItemAsync(LAUNCH.sessionKey);
  } else {
    await active.setItemAsync(LAUNCH.sessionKey, JSON.stringify(value));
  }
}
