interface ILightningIconProps {
  size?: number;
  fill?: string;
}

export function RubleIcon({ size = 24, fill = "#000" }: ILightningIconProps) {
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
        <path d="M8,21c0.55,0,1-0.45,1-1v-2h3c0.55,0,1-0.45,1-1s-0.45-1-1-1H9v-2h4.5c3.22,0,5.79-2.76,5.47-6.04 C18.7,5.1,16.14,3,13.26,3l-0.96,0H8C7.45,3,7,3.45,7,4v8H6c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h1v2H6c-0.55,0-1,0.45-1,1 s0.45,1,1,1h1v2C7,20.55,7.45,21,8,21z M13.5,12H9V5h4.5C15.43,5,17,6.57,17,8.5S15.43,12,13.5,12z" />
      </g>
    </svg>
  );
}
