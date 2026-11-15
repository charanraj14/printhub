import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);
export function AuthProvider({ children }) { const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('printhub_user')); } catch { return null; } }); const login = data => { localStorage.setItem('printhub_token', data.token); localStorage.setItem('printhub_user', JSON.stringify(data.user)); setUser(data.user); }; const logout = () => { localStorage.removeItem('printhub_token'); localStorage.removeItem('printhub_user'); setUser(null); }; return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>; }
export const useAuth = () => useContext(AuthContext);
