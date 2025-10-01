import { User, LogOut, Ticket, Star, LayoutDashboard, TicketPercent, Bookmark, Bell, ChartNoAxesCombined, CirclePlus, LayoutList } from 'lucide-react';

export interface SideMenuItem {
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

export const SIDE_ADMIN_DATA: SideMenuItem[] = [
    {
        _id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin"
    },
    {
        _id: "02",
        label: "Users",
        icon: User,
        path: "/admin/users"
    },
    {
        _id: "03",
        label: "Category",
        icon: LayoutList,
        path: "/admin/category"
    },
    {
        _id: "04",
        label: "Events",
        icon: TicketPercent,
        path: "/admin/events"
    },
    {
        _id: "05",
        label: "Add Events",
        icon: CirclePlus,
        path: "/admin/addEvents"
    },
    {
        _id: "06",
        label: "Bookings",
        icon: Bookmark,
        path: "/admin/bookings"
    },
    {
        _id: "07",
        label: "Notifications",
        icon: Bell,
        path: "/admin/notifications"
    },
    {
        _id: "08",
        label: "Report",
        icon: ChartNoAxesCombined,
        path: "/admin/reports"
    },
    {
        _id: "09",
        label: "Reviews",
        icon: Star,
        path: "/admin/reviews"
    },
    {
        _id: "10",
        label: "Logout",
        icon: LogOut,
        path: "/logout"
    },
]