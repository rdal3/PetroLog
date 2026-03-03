import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';

export function SwipeableCard({ children, className = '', onDelete }) {
    const cardRef = useRef(null);
    const startX = useRef(0);
    const currentX = useRef(0);
    const [offset, setOffset] = useState(0);
    const [swiping, setSwiping] = useState(false);
    const [removing, setRemoving] = useState(false);

    const threshold = 90;

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
        currentX.current = startX.current;
        setSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!swiping) return;
        currentX.current = e.touches[0].clientX;
        const diff = startX.current - currentX.current;
        // Only allow left swipe
        if (diff > 0) {
            setOffset(Math.min(diff, 120));
        } else {
            setOffset(0);
        }
    };

    const handleTouchEnd = () => {
        setSwiping(false);
        if (offset >= threshold && onDelete) {
            setRemoving(true);
            setTimeout(() => onDelete(), 300);
        } else {
            setOffset(0);
        }
    };

    if (removing) {
        return <div className="animate-swipe-out" />;
    }

    return (
        <div className="relative overflow-hidden rounded-3xl">
            {/* Delete background */}
            <div
                className="absolute inset-0 bg-red-500/90 rounded-3xl flex items-center justify-end pr-6 transition-opacity"
                style={{ opacity: offset > 20 ? 1 : 0 }}
            >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <Trash2 size={20} />
                    {offset >= threshold && <span>Soltar para excluir</span>}
                </div>
            </div>

            {/* Card content */}
            <div
                ref={cardRef}
                className={`relative theme-bg-card backdrop-blur-md rounded-3xl p-5 theme-border border shadow-lg transition-transform ${!swiping ? 'duration-300' : 'duration-0'} ${className}`}
                style={{ transform: `translateX(-${offset}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {children}
            </div>
        </div>
    );
}
