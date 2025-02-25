// src/components/ui/dropdown-menu.tsx

// Default export for DropdownMenu
const DropdownMenu = ({ children }: any) => {
    return <div className="dropdown-menu">{children}</div>;
};

// Named export for DropdownMenuContent
export const DropdownMenuContent = ({ children }: any) => {
    return <div className="dropdown-menu-content">{children}</div>;
};

// Named export for DropdownMenuItem
export const DropdownMenuItem = ({ children, onClick }: any) => {
    return (
        <div className="dropdown-menu-item" onClick={onClick}>
            {children}
        </div>
    );
};

// Named export for DropdownMenuTrigger
export const DropdownMenuTrigger = ({ children }: any) => {
    return <div className="dropdown-menu-trigger">{children}</div>;
};

export default DropdownMenu;  // Default export for DropdownMenu
