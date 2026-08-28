const keyboardGuideWrapper =
  "absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-3 whitespace-nowrap text-label-small text-content-default bg-surface/50 p-2 backdrop-blur-[1px]";

const keyboardStyle =
  "text-caption bg-surface-muted border-stroke h-fit rounded border-[0.5px] px-1 text-[0.9em]";

const keyboardSeparator = "text-label-small text-content-muted/50";

export default function ImageOverlayGuide() {
  return (
    <div className={keyboardGuideWrapper} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center">
        <span className="mr-2">FIT TO SCREEN</span>
        <span className={keyboardStyle}>0</span>
      </div>
      <span className={keyboardSeparator}>|</span>
      <div className="flex items-center">
        <span className="mr-2">ZOOM IN·OUT</span>
        <span className={keyboardStyle}>+</span>
        {","}
        <span className={keyboardStyle}>-</span>
      </div>
      <span className={keyboardSeparator}>|</span>
      <div className="flex items-center">
        <span className="mr-2">CLOSE</span>
        <span className={keyboardStyle}>ESC</span>
      </div>
    </div>
  );
}
