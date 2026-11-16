import { Navigate } from 'react-router-dom'; export default function RequireAdmin({children}){return localStorage.getItem('weprint_admin_token')?children:<Navigate to="/login" replace/>;}
