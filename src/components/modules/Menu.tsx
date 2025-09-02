import { useMemo, useState } from "react";
import type { MenuItem, Category, DietaryTag } from "../../types";
import { MENU, ALL_CATEGORIES } from "../../data";
import { MenuCard } from "../ui/MenuCard";
import { TAG_LABEL } from "../../types";



// --- Main Component
export default function SakuraMenu() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<Category | "Tout">("Tout");
    const [diet, setDiet] = useState<Partial<Record<DietaryTag, boolean>>>({});
    const [sort, setSort] = useState<"alpha" | "price-asc" | "price-desc">("alpha");

    const filtered = useMemo(() => {
        let items = MENU.slice();
        // Category
        if (category !== "Tout") items = items.filter((i) => i.category === category);
        // Search
        if (query.trim()) {
            const q = query.toLowerCase();
            items = items.filter(
                (i) =>
                    i.name.toLowerCase().includes(q) ||
                    i.description?.toLowerCase().includes(q) ||
                    i.jp?.toLowerCase().includes(q)
            );
        }
        // Dietary
        const activeTags = (Object.keys(diet) as DietaryTag[]).filter((t) => diet[t]);
        if (activeTags.length) items = items.filter((i) => activeTags.every((t) => i.tags?.includes(t)));

        // Sort
        if (sort === "alpha") items.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") items.sort((a, b) => b.price - a.price);

        return items;
    }, [query, category, diet, sort]);

    // Group by category for rendering
    const grouped = useMemo(() => {
        const map: Record<string, MenuItem[]> = {};
        for (const c of ALL_CATEGORIES) map[c] = [];
        for (const i of filtered) (map[i.category] ||= []).push(i);
        return map;
    }, [filtered]);

    return (
        <div id="smooth-content" className="mx-auto max-w-6xl px-4 py-10 text-neutral-100">
            {/* Header */}
            <header className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-kaisei">Menu</h1>
                    <p className="mt-1 text-sm text-neutral-300 font-noto">L’élégance des saveurs japonaises.</p>
                </div>
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                    <div className="relative w-full md:w-72">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Rechercher un plat, un ingrédient…"
                            className="w-full rounded-2xl border border-neutral-700 bg-neutral-900/60 px-4 py-2 outline-none ring-0 placeholder:text-neutral-500"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category | "Tout")}
                        className="rounded-2xl border border-neutral-700 bg-neutral-900/60 px-3 py-2"
                    >
                        <option value="Tout">Toutes les catégories</option>
                        {ALL_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as any)}
                        className="rounded-2xl border border-neutral-700 bg-neutral-900/60 px-3 py-2"
                    >
                        <option value="alpha">A → Z</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                    </select>
                </div>
            </header>

            {/* Dietary filters */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
                {(["vegan", "vegetarian", 'vegetarian-option', "gluten-free", "spicy", 'grill', "signature", "new"] as DietaryTag[]).map(
                    (t) => (
                        <button
                            key={t}
                            onClick={() => setDiet((d) => ({ ...d, [t]: !d[t] }))}
                            className={
                                "rounded-full border px-3 py-1 text-sm transition " +
                                (diet[t]
                                    ? "border-red-400 bg-red-500/10 text-red-300"
                                    : "border-neutral-700 bg-neutral-900/50 text-neutral-300")
                            }
                        >
                            {TAG_LABEL[t]}
                        </button>
                    )
                )}
            </div>

            {/* Sections */}
            <div className="space-y-12">
                {ALL_CATEGORIES.map((c) =>
                    grouped[c]?.length ? (
                        <section key={c} id={c.replace(/\s+/g, "-").toLowerCase()}>
                            <h2 className="mb-4 text-2xl font-semibold tracking-tight">{c}</h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {grouped[c].map((item) => (
                                    <MenuCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    ) : null
                )}
            </div>

            {/* Footer note */}
            <p className="mt-12 text-xs text-neutral-400">
                Prix TTC en euros. Veuillez informer l’équipe de toute allergie ou intolérance.
            </p>
        </div>
    );
}


