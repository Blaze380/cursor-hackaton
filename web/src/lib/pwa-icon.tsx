type Props = {
  size: number;
};

export function PwaIconMark({ size }: Props) {
  const stroke = Math.round(size * 0.055);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0284c7',
        borderRadius: size * 0.2,
      }}
    >
      <svg
        width={size * 0.65}
        height={size * 0.4}
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 35 Q25 15 45 35 T85 35"
          stroke="white"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M5 48 Q25 28 45 48 T85 48"
          stroke="white"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          opacity={0.85}
        />
        <path
          d="M5 60 Q25 40 45 60 T85 60"
          stroke="white"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          opacity={0.65}
        />
      </svg>
    </div>
  );
}
