import type { IconComponent } from "@/components/icons/icon";

export const MailIcon: IconComponent = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className={className}
    fill="currentColor"
    {...props}
  >
    <path d="M17.5 3.75v3.125l-7.5 3.75-7.5-3.75V3.75zm-15 4.522v7.978h15V8.272l-7.5 3.75z"></path>
  </svg>
);
