import type { Icon } from "@/components/ui/icon";

export const SquareIcon: Icon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="M3.125 10.625h6.25v6.25h-6.25zm0-1.25h6.25v-6.25h-6.25zm7.5 7.5h6.25v-6.25h-6.25zm0-13.75v6.25h6.25v-6.25z" />
  </svg>
);
