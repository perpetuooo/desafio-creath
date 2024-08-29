import { LucideIcon } from 'lucide-react'; 

interface NavbarItemProps {
    icon: LucideIcon; 
    text: string;
    onClick: () => void
}

export function NavbarItem({ icon: Icon, text, onClick: onClick }: NavbarItemProps) {
    return (
        <button onClick={onClick} className="flex flex-col items-center md:hover:translate-y-[-4px] md:hover:font-bold focus:outline-none" title="Ir para a Página Inicial">
            <Icon className="mb-1 size-6" /> 
            <span className="text-sm">{text}</span> 
            
        </button>
    );
}
