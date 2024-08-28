import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authcontext';

export function Sair() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout(); 
                navigate('/'); 
            } catch (error) {
                console.error('Erro ao deslogar:', error);
                
            }
        };

        performLogout();
    }, [logout, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Desconectando...</p>
        </div>
    );
}
