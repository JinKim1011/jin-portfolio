import { TipIcon } from "./icons";

type CalloutBlockProps = {
  html: string;
};

export default function CalloutBlock({ html }: CalloutBlockProps) {
  return (
    <div className="border-stroke flex flex-col gap-3 border-t-[0.5px] border-b-[0.5px] py-8">
      <div className="text-content-feedback-warning flex items-center gap-1.5">
        <TipIcon aria-hidden className="size-4" />
        <span className="text-caption">NOTE</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
