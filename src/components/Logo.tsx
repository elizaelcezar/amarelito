export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Amarelito"
    >
      {/* folhinha */}
      <path
        d="M27 9c4-4 9-5 12-4 1 3 0 8-4 11-3 2-7 2-9 1"
        fill="#2f6b3c"
      />
      {/* corpo amarelo */}
      <circle cx="24" cy="27" r="16" fill="#ffc44d" />
      <circle cx="24" cy="27" r="16" fill="none" stroke="#f5a623" strokeWidth="2" />
      {/* rostinho */}
      <circle cx="18.5" cy="24" r="2.1" fill="#3b2a1e" />
      <circle cx="29.5" cy="24" r="2.1" fill="#3b2a1e" />
      <path
        d="M18 31c1.8 2.6 4 3.9 6 3.9s4.2-1.3 6-3.9"
        fill="none"
        stroke="#3b2a1e"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* brilho */}
      <path
        d="M15 18.5c1.5-2.4 3.6-4 5.6-4.7"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
