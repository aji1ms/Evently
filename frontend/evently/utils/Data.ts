import { User, LogOut, Ticket, Star } from 'lucide-react';

interface SideMenuItem {
    _id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
}

export const SIDE_MENU_DATA: SideMenuItem[] = [
    {
        _id: "01",
        label: "Account Details",
        icon: User,
        path: "/profile"
    },
    {
        _id: "02",
        label: "Tickets",
        icon: Ticket,
        path: "/tickets"
    },
    {
        _id: "03",
        label: "Rate Us",
        icon: Star,
        path: "/rateus"
    },
    {
        _id: "04",
        label: "Logout",
        icon: LogOut,
        path: "/logout"
    },
];