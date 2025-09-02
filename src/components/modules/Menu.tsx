import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuItem, Category, DietaryTag } from "../../types";
import { MENU, ALL_CATEGORIES } from "../../data";
import { MenuCard } from "../ui/MenuCard";
import { TAG_LABEL } from "../../types";
import gsap from "gsap";

// --- Main Component
export default function SakuraMenu() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<Category | "Tout">("Tout");
    const [diet, setDiet] = useState<Partial<Record<DietaryTag, boolean>>>({});
    const [sort, setSort] = useState<"alpha" | "price-asc" | "price-desc">("alpha");
    const headerRef = useRef<HTMLElement>(null);
    const tagsRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });

        if (tagsRef.current) {
            gsap.fromTo(
                tagsRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.1,
                }
            );
        }

        if (sectionRef.current) {
            gsap.fromTo(
                sectionRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: 0.6,
                }
            );

        }
    }, [])

    const filtered = useMemo(() => {
        let items = MENU.slice();
        if (category !== "Tout") items = items.filter((i) => i.category === category);
        if (query.trim()) {
            const q = query.toLowerCase();
            items = items.filter(
                (i) =>
                    i.name.toLowerCase().includes(q) ||
                    i.description?.toLowerCase().includes(q) ||
                    i.jp?.toLowerCase().includes(q)
            );
        }
        const activeTags = (Object.keys(diet) as DietaryTag[]).filter((t) => diet[t]);
        if (activeTags.length) items = items.filter((i) => activeTags.every((t) => i.tags?.includes(t)));

        if (sort === "alpha") items.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") items.sort((a, b) => b.price - a.price);

        return items;
    }, [query, category, diet, sort]);

    const grouped = useMemo(() => {
        const map: Record<string, MenuItem[]> = {};
        for (const c of ALL_CATEGORIES) map[c] = [];
        for (const i of filtered) (map[i.category] ||= []).push(i);
        return map;
    }, [filtered]);

    return (
        <div id="smooth-menu" className="mx-auto w-full h-auto bg-black px-4 py-10 lg:py-0 text-neutral-100 overflow-x-hidden font-serif">
            {/* Header */}
            <header ref={headerRef} className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-kaisei ">Menu</h1>
                </div>
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                    <div className="relative w-full lg:w-72">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Rechercher un plat, un ingrédient…"
                            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder:text-neutral-500"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category | "Tout")}
                        className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
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
                        className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
                    >
                        <option value="alpha">A → Z</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                    </select>
                </div>
            </header>

            {/* Dietary filters */}
            <div ref={tagsRef} className="mb-8 flex flex-wrap items-center gap-2">
                {(["vegan", "vegetarian", "vegetarian-option", "gluten-free", "spicy", "grill", "signature", "new"] as DietaryTag[]).map(
                    (t) => (
                        <button
                            key={t}
                            onClick={() => setDiet((d) => ({ ...d, [t]: !d[t] }))}
                            className={
                                "rounded-full border cursor-pointer px-3 py-1 text-sm transition" +
                                (diet[t]
                                    ? "border-[var(--color-main)] bg-[var(--color-main)]/20 text-[var(--color-main)]"
                                    : "border-neutral-700 bg-neutral-900 text-neutral-300")
                            }
                        >
                            {TAG_LABEL[t]}
                        </button>
                    )
                )}
            </div>

            {/* Sections */}
            <div className="space-y-12" ref={sectionRef}>
                {ALL_CATEGORIES.map((c) =>
                    grouped[c]?.length ? (
                        <section key={c} id={c.replace(/\s+/g, "-").toLowerCase()}>
                            <h2 className="mb-4 text-2xl font-bold tracking-tight border-b-2 border-[var(--color-main)] inline-block pb-1 text-neutral-100 w-full">
                                {c}
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                                {grouped[c].map((item) => (
                                    <MenuCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    ) : null
                )}
            </div>

            {/* Footer note */}
            <p className="mt-12 text-xs text-neutral-400 italic">
                Prix TTC en euros. Veuillez informer l’équipe de toute allergie ou intolérance.
            </p>
        </div>
    );
}
