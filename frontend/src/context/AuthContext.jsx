import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);
export function AuthProvider({ children }) { const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('wePrint_user')); } catch { return null; } }); const login = data => { localStorage.setItem('wePrint_token', data.token); localStorage.setItem('wePrint_user', JSON.stringify(data.user)); setUser(data.user); }; const logout = () => { localStorage.removeItem('wePrint_token'); localStorage.removeItem('wePrint_user'); setUser(null); }; return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>; }
export const useAuth = () => useContext(AuthContext);
