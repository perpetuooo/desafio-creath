import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authcontext';

export function Sair() {
        const { logout, isLoggedIn } = useAuth();
        const navigate = useNavigate();
        
        useEffect(() => {
            if (!isLoggedIn) {
                navigate('/');
                return; 
            }
            const performLogout = async () => {
                try {
                    await logout(); 
                    navigate('/'); 
                } catch (error) {
                    console.error('Erro ao deslogar:', error);
                }
            };
    
            performLogout();
        }, [isLoggedIn, logout, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Desconectando...</p>
        </div>
    );
}
