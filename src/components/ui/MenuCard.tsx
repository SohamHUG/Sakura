import type { MenuItem } from "../../types";
import { TAG_LABEL } from "../../types";

// --- Helpers
const formatPrice = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function TagPill({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs tracking-wide shadow-sm font-kaisei">
            {label}
        </span>
    );
}

function SpiceDots({ level = 0 }: { level?: 0 | 1 | 2 | 3 }) {
    if (!level) return null;
    return (
        <span className="ml-1 inline-flex items-center gap-0.5" aria-label={`Épice ${level}/3`}>
            {Array.from({ length: level }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-red-500" />
            ))}
        </span>
    );
}

export function MenuCard({ item }: { item: MenuItem }) {
    return (
        <article className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 shadow-sm transition hover:shadow-xl">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold tracking-tight font-kaisei">
                        {item.name}
                        {item.spicyLevel ? <SpiceDots level={item.spicyLevel} /> : null}
                    </h3>
                    {item.jp ? <p className="text-xs text-neutral-400">{item.jp}</p> : null}
                    {item.description ? (
                        <p className="mt-1 line-clamp-3 text-sm text-neutral-300 font-noto">{item.description}</p>
                    ) : null}

                    {/* Tags */}
                    {!!item.tags?.length && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.tags!.map((t) => (
                                <TagPill key={t} label={TAG_LABEL[t]} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="shrink-0 text-right">
                    <div className="rounded-xl bg-neutral-900/80 px-3 py-1 text-base font-semibold">
                        {formatPrice(item.price)}
                    </div>
                </div>
            </div>
        </article>
    );
}