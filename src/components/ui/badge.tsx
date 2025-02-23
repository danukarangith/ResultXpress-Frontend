// src/components/ui/badge.tsx
const Badge = ({ children, variant, className }: any) => {
    return <span className={`badge ${variant} ${className}`}>{children}</span>;
};

export default Badge;  // Default export
