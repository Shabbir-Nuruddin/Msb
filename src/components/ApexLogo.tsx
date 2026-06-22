interface Props {
  size?: number;
  showWord?: boolean;
  showTagline?: boolean;
  className?: string;
}

/**
 * MSB Smart Revision logo — the official MSB crest plus the wordmark.
 * Uses the real photo logo at public/msb-logo.png if present; otherwise falls
 * back to the vector crest at public/msb-logo.svg. Component name kept as
 * `ApexLogo` so existing imports across the app don't need to change.
 */
export const ApexLogo = ({
  size = 32,
  showWord = true,
  showTagline = false,
  className = "",
}: Props) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/msb-logo.png"
        alt="MSB Private School logo"
        width={size}
        height={size}
        className="shrink-0 rounded-full object-contain"
        style={{ width: size, height: size }}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          // Prefer the real PNG; if it's missing, fall back to the vector crest.
          if (!img.dataset.fallback) {
            img.dataset.fallback = "1";
            img.src = "/msb-logo.svg";
          } else {
            img.style.display = "none";
          }
        }}
      />

      {showWord && (
        <div className="flex flex-col leading-none">
          <span className="font-extrabold tracking-tight text-base" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: "hsl(var(--primary))" }}>
            MSB Smart Revision
          </span>
          {showTagline && (
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mt-1">
              MSB Private School · Dubai
            </span>
          )}
        </div>
      )}
    </div>
  );
};
