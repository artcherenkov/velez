interface ILightningIconProps {
  size?: number;
  fill?: string;
}

export function LightningIcon({
  size = 24,
  fill = "#000",
}: ILightningIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      height={size + "px"}
      width={size + "px"}
      fill={fill}
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M10.67,21L10.67,21c-0.35,0-0.62-0.31-0.57-0.66L11,14H7.5c-0.88,0-0.33-0.75-0.31-0.78c1.26-2.23,3.15-5.53,5.65-9.93 c0.1-0.18,0.3-0.29,0.5-0.29h0c0.35,0,0.62,0.31,0.57,0.66L13.01,10h3.51c0.4,0,0.62,0.19,0.4,0.66c-3.29,5.74-5.2,9.09-5.75,10.05 C11.07,20.89,10.88,21,10.67,21z" />
      </g>
    </svg>
  );
}