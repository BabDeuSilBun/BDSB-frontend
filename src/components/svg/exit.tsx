const ExitIcon = ({
  color = 'var(--primary)',
  width = 18,
  height = 18,
  'aria-label': ariaLabel = 'Exit Icon',
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
      d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExitIcon;
