// src/components/ui/card.tsx

// Default export for Card
const Card = ({ children }: any) => {
    return <div className="card">{children}</div>;
};

// Named export for CardContent
export const CardContent = ({ children }: any) => {
    return <div className="card-content">{children}</div>;
};

// Named export for CardHeader
export const CardHeader = ({ children }: any) => {
    return <div className="card-header">{children}</div>;
};

// Named export for CardTitle
export const CardTitle = ({ children }: any) => {
    return <div className="card-title">{children}</div>;
};

export default Card;  // Default export for Card
