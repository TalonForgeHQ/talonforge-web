// Monochrome inline SVG crypto icons — no external dep, scale-to-any-size,
// white/current-color fill so Tailwind text color drives them.

export function BtcIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="BTC">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm3.9 10.25c-.23 1.06-.85 1.57-1.9 1.75 1.44.3 2.17 1.06 2.02 2.47-.2 1.76-1.55 2.48-3.6 2.6v1.7h-1.22v-1.67h-.98v1.67H9v-1.67H6.5v-1.3h.78c.35 0 .43-.27.43-.5V9.88c0-.32-.1-.5-.44-.5H6.5V8.1h2.5V6.45h1.22V8.1h.98V6.45H12.43V8.1c1.8.04 3.18.58 3.47 2.15zm-4.13.66h-1.52v2.15h1.52c1.02 0 1.68-.2 1.68-1.08 0-.84-.66-1.07-1.68-1.07zm.3 3.4H10.25v2.32h1.82c1.07 0 1.92-.17 1.92-1.17 0-1-.85-1.15-1.92-1.15z"/>
    </svg>
  );
}

export function EthIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="ETH">
      <path d="M12 0L5.5 12 12 16l6.5-4L12 0zm0 17.3l-6.5-4L12 24l6.5-10.7L12 17.3z"/>
    </svg>
  );
}

export function UsdtIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="USDT">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1.3 13.06v2.45h-2.5V13.06c-2.6-.12-4.55-.6-4.55-1.18s1.94-1.06 4.55-1.18V9.5H6.3V7h11.4v2.5h-4.4v1.2c2.6.12 4.55.6 4.55 1.18s-1.94 1.06-4.55 1.18zm0-.65c2.37-.1 4.1-.5 4.1-.98 0-.47-1.73-.87-4.1-.97v1.95zm-2.5-1.95c-2.37.1-4.1.5-4.1.97 0 .48 1.73.88 4.1.98v-1.95z"/>
    </svg>
  );
}

export function SolIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="SOL">
      <path d="M4 7l3-3h13l-3 3H4zm0 7l3-3h13l-3 3H4zm0 7l3-3h13l-3 3H4z"/>
    </svg>
  );
}
