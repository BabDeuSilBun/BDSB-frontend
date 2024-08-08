const HamburgerIcon = ({
  color = 'var(--primary)',
  width = 18,
  height = 18,
  'aria-label': ariaLabel = 'Hamburger Icon',
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
      d="M4 5L20 5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12L20 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 19L20 19"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HamburgerIcon;
