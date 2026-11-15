import { Navigate } from 'react-router-dom'; export default function RequireAdmin({children}){return localStorage.getItem('printhub_admin_token')?children:<Navigate to="/login" replace/>;}
