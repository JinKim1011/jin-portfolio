import type { Icon } from "@/components/ui/icon";

export const CheckIcon: Icon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="m17.5 5.7-9.375 9.375L2.5 9.45l1.325-1.325 4.3 4.3 8.05-8.05z"></path>
  </svg>
);
