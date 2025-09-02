import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

type Props = {
    items?: (string | React.ReactNode)[];
    itemWidth?: number;
    gap?: number;
    height?: number;
};

export default function DraggableCarousel({
    items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`),
    itemWidth = 280,
    gap = 16,
    height = 220,
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cleanupRef = useRef<() => void | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const boxes = gsap.utils.toArray<HTMLElement>(".loop-item");
        if (!boxes.length) return;

        function horizontalLoop(items: HTMLElement[], config: any = {}) {
            let tl: gsap.core.Timeline | null = null;
            items = gsap.utils.toArray(items) as HTMLElement[];
            config = config || {};

            let onChange = config.onChange,
                // lastIndex = 0,
                length = items.length,
                startX = items[0].offsetLeft,
                times: number[] = [],
                widths: number[] = [],
                spaceBefore: number[] = [],
                xPercents: number[] = [],
                curIndex = 0,
                indexIsDirty = false,
                center = config.center,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1),
                timeOffset = 0,
                containerNode = (center === true ? items[0].parentNode : gsap.utils.toArray(center)[0]) || items[0].parentNode,
                totalWidth: number,
                getTotalWidth = () =>
                    items[length - 1].offsetLeft + (xPercents[length - 1] / 100) * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * (Number(gsap.getProperty(items[length - 1], "scaleX")) || 1) + (parseFloat(config.paddingRight) || 0),
                populateWidths = () => {
                    let b1 = (containerNode as Element).getBoundingClientRect(), b2: DOMRect | null = null;
                    items.forEach((el, i) => {
                        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string) || el.offsetWidth;
                        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i] * 100 + (gsap.getProperty(el, "xPercent") as number) || 0);
                        b2 = el.getBoundingClientRect();
                        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                        b1 = b2;
                    });
                    gsap.set(items, { xPercent: (i: number) => xPercents[i] });
                    totalWidth = getTotalWidth();
                },
                timeWrap: any,
                populateOffsets = () => {
                    timeOffset = center ? (tl!.duration() * ((containerNode as Element).clientWidth / 2) / totalWidth) : 0;
                    center && times.forEach((_, i) => {
                        // console.log(t)
                        times[i] = timeWrap(tl!.labels["label" + i] + tl!.duration() * widths[i] / 2 / totalWidth - timeOffset);
                    });
                },
                getClosest = (values: number[], value: number, wrap: number) => {
                    let i = values.length,
                        closest = 1e10,
                        index = 0, d;
                    while (i--) {
                        d = Math.abs(values[i] - value);
                        if (d > wrap / 2) {
                            d = wrap - d;
                        }
                        if (d < closest) {
                            closest = d;
                            index = i;
                        }
                    }
                    return index;
                },
                populateTimeline = () => {
                    let i, item, curX, distanceToStart, distanceToLoop;
                    tl!.clear();
                    for (i = 0; i < length; i++) {
                        item = items[i];
                        curX = (xPercents[i] / 100) * widths[i];
                        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
                        distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
                        tl!.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                            .add("label" + i, distanceToStart / pixelsPerSecond);
                        times[i] = distanceToStart / pixelsPerSecond;
                    }
                    timeWrap = gsap.utils.wrap(0, tl!.duration());
                },
                refresh = (deep?: boolean) => {
                    let progress = tl!.progress();
                    tl!.progress(0, true);
                    populateWidths();
                    deep && populateTimeline();
                    populateOffsets();
                    deep && tl!.draggable && tl!.paused() ? tl!.time(times[curIndex], true) : tl!.progress(progress, true);
                },
                onResize = () => refresh(true),
                proxy: any;

            gsap.set(items, { x: 0 });
            tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => { if (tl) tl.totalTime((tl as any).rawTime() + (tl as any).duration() * 100); } });

            populateWidths();
            populateTimeline();
            populateOffsets();

            window.addEventListener("resize", onResize);

            function toIndex(index: number, vars?: any) {
                vars = vars || {};
                if (Math.abs(index - curIndex) > length / 2) index += index > curIndex ? -length : length;
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if ((time > (tl as any).time()) !== (index > curIndex) && index !== curIndex) {
                    time += (tl as any).duration() * (index > curIndex ? 1 : -1);
                }
                if (time < 0 || time > (tl as any).duration()) {
                    vars.modifiers = { time: timeWrap };
                }
                curIndex = newIndex;
                vars.overwrite = true;
                gsap.killTweensOf(proxy);
                return vars.duration === 0 ? tl!.time(timeWrap(time)) : tl!.tweenTo(time, vars);
            }

            (tl as any).toIndex = (index: number, vars?: any) => toIndex(index, vars);
            (tl as any).closestIndex = (setCurrent?: boolean) => {
                let index = getClosest(times, (tl as any).time(), (tl as any).duration());
                if (setCurrent) {
                    curIndex = index;
                    indexIsDirty = false;
                }
                return index;
            };
            (tl as any).current = () => indexIsDirty ? (tl as any).closestIndex(true) : curIndex;
            (tl as any).next = (vars?: any) => toIndex((tl as any).current() + 1, vars);
            (tl as any).previous = (vars?: any) => toIndex((tl as any).current() - 1, vars);
            (tl as any).times = times;

            (tl as any).progress(1, true).progress(0, true);

            if (config.reversed) {
                (tl as any).vars.onReverseComplete();
                (tl as any).reverse();
            }

            if (config.draggable && typeof (Draggable) === "function") {
                proxy = document.createElement("div");
                let wrap = gsap.utils.wrap(0, 1),
                    ratio: number,
                    startProgress: number,
                    draggable: any,
                    lastSnap: number,
                    initChangeX: number,
                    wasPlaying: boolean,
                    align = () => (tl as any).progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
                    syncIndex = () => (tl as any).closestIndex(true);

                if (typeof (InertiaPlugin) === "undefined") console.warn("InertiaPlugin requis pour le scroll momentum et le snap. https://greensock.com/club");

                draggable = Draggable.create(proxy, {
                    trigger: (items[0].parentNode as Element),
                    type: "x",
                    onPressInit() {
                        let x = this.x;
                        gsap.killTweensOf(tl);
                        wasPlaying = !(tl as any).paused();
                        (tl as any).pause();
                        startProgress = (tl as any).progress();
                        refresh();
                        ratio = 1 / totalWidth;
                        initChangeX = (startProgress / -ratio) - x;
                        gsap.set(proxy, { x: startProgress / -ratio });
                    },
                    onDrag: align,
                    onThrowUpdate: align,
                    overshootTolerance: 0,
                    inertia: true,
                    snap(value: number) {
                        if (Math.abs(startProgress / -ratio - this.x) < 10) {
                            return lastSnap + initChangeX;
                        }
                        let time = -(value * ratio) * (tl as any).duration(),
                            wrappedTime = timeWrap(time),
                            snapTime = times[getClosest(times, wrappedTime, (tl as any).duration())],
                            dif = snapTime - wrappedTime;
                        if (Math.abs(dif) > (tl as any).duration() / 2) dif += dif < 0 ? (tl as any).duration() : - (tl as any).duration();
                        lastSnap = (time + dif) / (tl as any).duration() / -ratio;
                        return lastSnap;
                    },
                    onRelease() {
                        syncIndex();
                        draggable.isThrowing && (indexIsDirty = true);
                    },
                    onThrowComplete: () => {
                        syncIndex();
                        wasPlaying && (tl as any).play();
                    }
                })[0];
                (tl as any).draggable = draggable;
            }

            (tl as any).closestIndex(true);
            // lastIndex = curIndex;
            onChange && onChange(items[curIndex], curIndex);

            return tl as any;
        }

        // initialisation du loop 
        const timeline = horizontalLoop(boxes, {
            paused: true, draggable: true, center: true, onChange: (el: any) => {
                // console.log(idx)
                boxes.forEach(b => b.classList.remove("active"));
                el && el.classList.add("active");
            }
        });

        // expose quelques méthodes utiles sur le container pour debug/usage externe si besoin
        (container as any)._loop = timeline;

        cleanupRef.current = () => {
            try {
                (timeline as any).draggable && (timeline as any).draggable.kill();
            } catch (e) { }
        };

        return () => {
            cleanupRef.current && cleanupRef.current();
            try { timeline && timeline.kill && timeline.kill(); } catch (e) { }
        };
    }, [items]);

    return (
        <div style={{ width: "100%", overflow: "hidden", position: "relative", height }}>
            <div ref={containerRef} style={{ display: "flex", height: "100%", alignItems: "center" }}>
                {items.map((it, i) => (
                    <div
                        key={i}
                        className="loop-item rounded"
                        style={{
                            flex: `0 0 ${itemWidth}px`,
                            marginRight: gap,
                            height: height - 20,
                            // background: "#9d7cce",
                            // borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            userSelect: "none",
                        }}
                    >
                        {it}
                    </div>
                ))}
            </div>
        </div>
    );
}
