import { LucideIcon } from 'lucide-react'; 

interface NavbarItemProps {
    icon: LucideIcon; 
    text: string;
}

export function NavbarItem({ icon: Icon, text }: NavbarItemProps) {
    return (
        <button className="flex flex-col items-center md:hover:translate-y-[-4px] md:hover:font-bold">
            <Icon className="mb-1 size-6" /> 
            <span className="text-sm">{text}</span> 
            
        </button>
    );
}
