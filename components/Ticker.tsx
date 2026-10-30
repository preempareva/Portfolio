export default function Ticker({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="ticker-row" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className={i % 3 === 1 ? "is-hot" : undefined}>
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ticker" role="region" aria-label="Tools and domains I work with">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
