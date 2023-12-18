export const CarIcon = ({
  size = 24,
  fill = "#000",
}: {
  size?: number;
  fill?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V19.5C3 20.33 3.67 21 4.5 21C5.33 21 6 20.33 6 19.5V19H18V19.5C18 20.32 18.67 21 19.5 21C20.32 21 21 20.33 21 19.5V12L18.92 6.01ZM7.5 16C6.67 16 6 15.33 6 14.5C6 13.67 6.67 13 7.5 13C8.33 13 9 13.67 9 14.5C9 15.33 8.33 16 7.5 16ZM16.5 16C15.67 16 15 15.33 15 14.5C15 13.67 15.67 13 16.5 13C17.33 13 18 13.67 18 14.5C18 15.33 17.33 16 16.5 16ZM5.81 10L6.85 7H17.14L18.18 10H5.81Z" />
    </svg>
  );
};