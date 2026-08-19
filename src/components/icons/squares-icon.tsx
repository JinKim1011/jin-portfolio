import type { IconComponent } from "@/components/icons/icon";

export const SquaresIcon: IconComponent = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="M17.5 2.5v10h-3.125V5.625H7.5V2.5zM3.125 16.875h10v-10h-10z" />
  </svg>
);
