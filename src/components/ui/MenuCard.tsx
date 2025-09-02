import type { MenuItem } from "../../types";
import { TAG_LABEL } from "../../types";

// --- Helpers
const formatPrice = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function TagPill({ label }: { label: string }) {
    return (
        <span className="italic text-[var(--color-main)] text-xs tracking-wide">
            {label}
        </span>
    );
}

function SpiceDots({ level = 0 }: { level?: 0 | 1 | 2 | 3 }) {
    if (!level) return null;
    return (
        <span className="ml-1 inline-flex items-center gap-0.5" aria-label={`Épicé ${level}/3`}>
            {Array.from({ length: level }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--color-main)]" />
            ))}
        </span>
    );
}

export function MenuCard({ item }: { item: MenuItem }) {
    return (
        <article className="border-b border-neutral-700 pb-4 mb-4 p-5 transition">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="text-lg font-serif tracking-tight text-neutral-100">
                        {item.name}
                        {item.spicyLevel ? <SpiceDots level={item.spicyLevel} /> : null}
                    </h3>
                    {item.jp ? <p className="text-sm text-neutral-400 font-light">{item.jp}</p> : null}
                    {item.description ? (
                        <p className="mt-1 text-sm text-neutral-300 font-light italic">{item.description}</p>
                    ) : null}

                    {/* Tags */}
                    {!!item.tags?.length && (
                        <div className="mt-1 flex flex-wrap gap-2">
                            {item.tags!.map((t) => (
                                <TagPill key={t} label={TAG_LABEL[t]} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="shrink-0 text-right">
                    <div className="text-base font-bold text-[var(--color-main)] font-serif">
                        {formatPrice(item.price)}
                    </div>
                </div>
            </div>
        </article>
    );
}