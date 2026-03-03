export const BikeGraphics = {
    scooter: (
        <svg viewBox="0 0 120 80" className="w-full h-32 md:h-40 drop-shadow-2xl">
            <circle cx="25" cy="55" r="12" fill="#27272a" stroke="#52525b" strokeWidth="3" />
            <circle cx="95" cy="55" r="12" fill="#27272a" stroke="#52525b" strokeWidth="3" />
            <circle cx="25" cy="55" r="5" fill="#a1a1aa" />
            <circle cx="95" cy="55" r="5" fill="#a1a1aa" />
            <path d="M 15 50 Q 25 35 35 50" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <line x1="95" y1="55" x2="85" y2="30" stroke="#a1a1aa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 85 30 L 75 15 Q 70 10 65 15 L 55 45 L 40 45 Q 35 35 25 35 L 15 35 Q 10 40 10 45 Q 15 55 25 55 L 35 55 Q 40 55 45 45 Z" fill="#f97316" />
            <path d="M 12 35 L 30 35 Q 35 30 35 25 L 15 25 Q 10 25 12 35 Z" fill="#18181b" />
            <circle cx="78" cy="18" r="4" fill="#fef08a" />
            <path d="M 75 15 L 65 5 L 60 8" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <line x1="65" y1="5" x2="60" y2="2" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="45" x2="52" y2="45" stroke="#3f3f46" strokeWidth="3" />
        </svg>
    ),
    cub: (
        <svg viewBox="0 0 120 80" className="w-full h-32 md:h-40 drop-shadow-2xl">
            <circle cx="20" cy="55" r="15" fill="#27272a" stroke="#52525b" strokeWidth="2" />
            <circle cx="100" cy="55" r="15" fill="#27272a" stroke="#52525b" strokeWidth="2" />
            <circle cx="20" cy="55" r="7" fill="none" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="100" cy="55" r="7" fill="none" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="20" y1="55" x2="30" y2="30" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            <rect x="45" y="45" width="20" height="10" rx="3" fill="#52525b" />
            <circle cx="50" cy="50" r="3" fill="#71717a" />
            <path d="M 90 25 L 80 45 L 65 50 L 55 45 L 45 25 Q 60 35 75 30 Z" fill="#f97316" />
            <path d="M 45 25 L 30 25 Q 20 25 15 35 L 35 35 Z" fill="#f97316" />
            <path d="M 12 30 L 48 30 Q 50 25 45 20 L 15 20 Q 10 20 12 30 Z" fill="#18181b" />
            <line x1="100" y1="55" x2="85" y2="20" stroke="#a1a1aa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 85 20 L 75 10 L 70 12" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
            <circle cx="82" cy="15" r="3" fill="#fef08a" />
            <line x1="20" y1="55" x2="45" y2="50" stroke="#3f3f46" strokeWidth="4" strokeLinecap="round" />
        </svg>
    ),
    sport: (
        <svg viewBox="0 0 120 80" className="w-full h-32 md:h-40 drop-shadow-2xl">
            <circle cx="22" cy="55" r="14" fill="#18181b" stroke="#3f3f46" strokeWidth="4" />
            <circle cx="98" cy="55" r="14" fill="#18181b" stroke="#3f3f46" strokeWidth="4" />
            <circle cx="98" cy="55" r="8" fill="none" stroke="#d4d4d8" strokeWidth="1.5" />
            <line x1="22" y1="55" x2="45" y2="50" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
            <path d="M 45 55 L 65 50 L 75 45" fill="none" stroke="#3f3f46" strokeWidth="5" strokeLinecap="round" />
            <path d="M 98 45 L 90 25 L 75 15 L 55 25 L 45 45 L 65 55 L 85 55 Z" fill="#f97316" />
            <path d="M 55 25 L 35 25 L 15 15 L 25 35 L 45 35 Z" fill="#f97316" />
            <path d="M 75 15 L 85 10 L 92 20 Z" fill="#71717a" fillOpacity="0.4" />
            <path d="M 35 25 L 50 25 L 45 20 L 30 20 Z" fill="#18181b" />
            <line x1="98" y1="55" x2="82" y2="20" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
            <polygon points="90,25 95,28 92,32" fill="#fef08a" />
        </svg>
    ),
    naked: (
        <svg viewBox="0 0 120 80" className="w-full h-32 md:h-40 drop-shadow-2xl">
            <circle cx="20" cy="55" r="14" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
            <circle cx="95" cy="55" r="14" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
            <circle cx="95" cy="55" r="7" fill="none" stroke="#d4d4d8" strokeWidth="1.5" />
            <rect x="45" y="35" width="20" height="20" rx="2" fill="#52525b" />
            <line x1="45" y1="40" x2="65" y2="40" stroke="#3f3f46" strokeWidth="2" />
            <line x1="45" y1="45" x2="65" y2="45" stroke="#3f3f46" strokeWidth="2" />
            <line x1="45" y1="50" x2="65" y2="50" stroke="#3f3f46" strokeWidth="2" />
            <path d="M 55 55 Q 60 65 80 50" fill="none" stroke="#a1a1aa" strokeWidth="4" strokeLinecap="round" />
            <path d="M 40 25 L 50 40 L 65 30 Z" fill="none" stroke="#f97316" strokeWidth="3" strokeLinejoin="round" />
            <line x1="40" y1="25" x2="65" y2="30" stroke="#f97316" strokeWidth="3" />
            <path d="M 75 25 Q 65 15 50 20 L 40 25 Q 50 35 65 30 Z" fill="#f97316" />
            <path d="M 40 25 L 20 15 L 25 30 L 35 35 Z" fill="#f97316" />
            <path d="M 45 22 L 25 18 L 22 23 L 40 26 Z" fill="#18181b" />
            <line x1="95" y1="55" x2="80" y2="20" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="82" cy="20" r="5" fill="#fef08a" stroke="#18181b" strokeWidth="2" />
            <line x1="80" y1="20" x2="70" y2="15" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    chopper: (
        <svg viewBox="0 0 120 80" className="w-full h-32 md:h-40 drop-shadow-2xl">
            <circle cx="20" cy="55" r="16" fill="#18181b" stroke="#3f3f46" strokeWidth="5" />
            <circle cx="105" cy="55" r="14" fill="#18181b" stroke="#52525b" strokeWidth="2" />
            <line x1="105" y1="41" x2="105" y2="69" stroke="#a1a1aa" strokeWidth="1" />
            <line x1="91" y1="55" x2="119" y2="55" stroke="#a1a1aa" strokeWidth="1" />
            <path d="M 50 50 L 45 35 L 55 35 Z" fill="#71717a" />
            <path d="M 55 50 L 60 35 L 70 35 Z" fill="#71717a" />
            <circle cx="52" cy="52" r="6" fill="#52525b" />
            <path d="M 50 52 Q 30 55 5 50" fill="none" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 55 55 Q 35 60 5 55" fill="none" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
            <line x1="105" y1="55" x2="75" y2="15" stroke="#a1a1aa" strokeWidth="3" strokeLinecap="round" />
            <path d="M 75 15 L 70 5 L 60 10" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 75 25 Q 60 15 45 30 L 70 30 Z" fill="#f97316" />
            <path d="M 45 30 L 30 40 L 15 40 Q 10 40 5 45" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <path d="M 45 28 L 30 38 L 25 38 Q 30 30 40 28 Z" fill="#18181b" />
            <line x1="15" y1="40" x2="10" y2="25" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="82" cy="22" r="3" fill="#fef08a" />
        </svg>
    ),
};
