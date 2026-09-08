import { TipIcon } from "./icons";

type CallouyBlockProps = {
  html: string;
};

export default function CalloutBlock({ html }: CallouyBlockProps) {
  return (
    <div className="border-stroke flex flex-col gap-2 border-t-[0.5] border-b-[0.5px] py-8">
      <div className="flex items-center gap-2">
        <TipIcon aria-hidden className="text-content-feedback-warning size-4" />
        <span className="text-caption text-content-feedback-warning">INFO</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
