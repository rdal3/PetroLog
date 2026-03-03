export function Card({ children, className = '', onClick }) {
    return (
        <div
            onClick={onClick}
            className={`theme-bg-card backdrop-blur-md rounded-3xl p-5 border theme-border shadow-lg ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
