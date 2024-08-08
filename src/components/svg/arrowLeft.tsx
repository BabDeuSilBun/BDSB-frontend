const ArrowLeftIcon = ({
  color = 'var(--primary)',
  width = 18,
  height = 18,
  'aria-label': ariaLabel = 'Arrow Left Icon',
  ...props
}: React.SVGProps<SVGSVGElement> & {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="none"
    aria-label={ariaLabel}
    role="img"
    {...props}
  >
    <path
      d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowLeftIcon;
