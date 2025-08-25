import { useEffect } from "react";
import { imagesTrail as images } from "../data";

export const useTrail = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    speedIndicatorRef: React.RefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        const container = containerRef.current;
        const speedIndicator = speedIndicatorRef.current;
        if (!container || !speedIndicator) return;

        const isMobile =
            /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
            window.innerWidth <= 768;

        const config = {
            imageCount: 26,
            imageLifespan: 600,
            removalDelay: 12,
            mouseThreshold: isMobile ? 20 : 40,
            scrollThreshold: 50,
            inDuration: 600,
            outDuration: 800,
            inEasing: "cubic-bezier(.07,.5,.5,1)",
            outEasing: "cubic-bezier(.87, 0, .13, 1)",
            touchImageInterval: 40,
            minMovementForImage: isMobile ? 3 : 5,
            baseImageSize: isMobile ? 120 : 180,
            minImageSize: isMobile ? 80 : 100,
            maxImageSize: isMobile ? 100 : 150,
            baseRotation: 30,
            maxRotationFactor: 3,
            speedSmoothingFactor: 0.25,
            showSpeedIndicator: false,
            staggerRange: 50,
            easing: {
                scale: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                reveal: "cubic-bezier(0.87, 0, 0.13, 1)"
            }
        };


        // Variables internes
        const trail: any[] = [];
        let mouseX = 0,
            mouseY = 0,
            lastMouseX = 0,
            lastMouseY = 0,
            prevMouseX = 0,
            prevMouseY = 0;
        let isMoving = false,
            isCursorInContainer = false,
            isTouching = false;
        let lastRemovalTime = 0,
            // lastTouchImageTime = 0,
            // lastScrollTime = 0,
            lastMoveTime = Date.now();
        let isScrolling = false;
            // scrollTicking = false;
        let smoothedSpeed = 0,
            maxSpeed = 0;
        // let currentEffect = "flame";
        let imageIndex = 0;
        // const imagePool: HTMLDivElement[] = [];

        // Helper functions (adaptées du script original)
        const isInContainer = (x: number, y: number) => {
            const rect = container.getBoundingClientRect();
            return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        };

        const hasMovedEnough = () => {
            const dx = mouseX - lastMouseX,
                dy = mouseY - lastMouseY;
            return Math.hypot(dx, dy) > config.mouseThreshold;
        };

        const hasMovedAtAll = () => {
            const dx = mouseX - prevMouseX,
                dy = mouseY - prevMouseY;
            return Math.hypot(dx, dy) > config.minMovementForImage;
        };

        const calculateSpeed = () => {
            const now = Date.now(),
                dt = now - lastMoveTime;
            if (dt <= 0) return 0;
            const dist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
            const raw = dist / dt;
            if (raw > maxSpeed) maxSpeed = raw;
            const norm = Math.min(raw / (maxSpeed || 0.5), 1);
            smoothedSpeed =
                smoothedSpeed * (1 - config.speedSmoothingFactor) +
                norm * config.speedSmoothingFactor;
            lastMoveTime = now;

            if (config.showSpeedIndicator && speedIndicator) {
                speedIndicator.textContent = `Intensity: ${(smoothedSpeed * 100).toFixed(0)}%`;
                speedIndicator.style.opacity = "1";
                clearTimeout((window as any).speedTimeout);
                (window as any).speedTimeout = setTimeout(
                    () => (speedIndicator.style.opacity = "0"),
                    1500
                );
            }
            return smoothedSpeed;
        };

        // const createImageElement = () => {
        //     if (imagePool.length > 0) {
        //         return imagePool.pop()!;
        //     }
        //     const element = document.createElement("div");
        //     element.className = "trail-image";
        //     return element;
        // };

        // const returnToPool = (element: HTMLDivElement) => {
        //     if (element.parentNode) {
        //         element.parentNode.removeChild(element);
        //     }
        //     element.innerHTML = "";
        //     element.style.cssText = "";
        //     element.className = "trail-image";
        //     if (imagePool.length < 20) {
        //         imagePool.push(element);
        //     }
        // };

        const createImage = (speed = 0.5) => {
            const imageSrc = images[imageIndex];
            imageIndex = (imageIndex + 1) % images.length;

            const size =
                config.minImageSize + (config.maxImageSize - config.minImageSize) * speed;

            // Simple flame effect only (tu peux réintégrer tous les PATTERNS ici si tu veux)
            const img = document.createElement("img");
            img.className = "trail-img";
            const rotFactor = 1 + speed * (config.maxRotationFactor - 1);
            const rot = (Math.random() - 0.5) * config.baseRotation * rotFactor;

            img.src = imageSrc;
            img.width = img.height = size;
            const rect = container.getBoundingClientRect();
            const x = mouseX - rect.left,
                y = mouseY - rect.top;
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            img.style.position = "absolute";
            img.style.zIndex = '10';
            img.style.pointerEvents = "none";
            img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0)`;
            img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;
            container.appendChild(img);

            setTimeout(() => {
                img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(1)`;
            }, 10);

            trail.push({
                element: img,
                rotation: rot,
                removeTime: Date.now() + config.imageLifespan
            });
        };

        const createTrailImage = () => {
            if (!isCursorInContainer) return;
            if ((isMoving || isTouching) && hasMovedEnough() && hasMovedAtAll()) {
                lastMouseX = mouseX;
                lastMouseY = mouseY;
                const speed = calculateSpeed();
                createImage(speed);
                prevMouseX = mouseX;
                prevMouseY = mouseY;
            }
        };

        const removeOldImages = () => {
            const now = Date.now();
            if (now - lastRemovalTime < config.removalDelay || !trail.length) return;
            if (now >= trail[0].removeTime) {
                const imgObj = trail.shift()!;
                imgObj.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
                imgObj.element.style.transform = `translate(-50%, -50%) rotate(${imgObj.rotation + 360
                    }deg) scale(0)`;
                setTimeout(() => {
                    imgObj.element.remove();
                }, config.outDuration);

                lastRemovalTime = now;
            }
        };

        // Event listeners 
        const onMouseMove = (e: MouseEvent) => {
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            isCursorInContainer = isInContainer(mouseX, mouseY);
            if (isCursorInContainer && hasMovedAtAll()) {
                isMoving = true;
                clearTimeout((window as any).moveTimeout);
                (window as any).moveTimeout = setTimeout(() => (isMoving = false), 100);
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            isCursorInContainer = true;
            isTouching = true;
            lastMoveTime = Date.now();
        };

        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const dx = Math.abs(touch.clientX - prevMouseX);
            const dy = Math.abs(touch.clientY - prevMouseY);
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            mouseX = touch.clientX;
            mouseY = touch.clientY;
            isCursorInContainer = true;
            if (dy > dx) return;
            createTrailImage();
        };

        const onTouchEnd = () => {
            isTouching = false;
        };

        const onScroll = () => {
            isCursorInContainer = isInContainer(mouseX, mouseY);
            if (isCursorInContainer) {
                isScrolling = true;
                clearTimeout((window as any).scrollTimeout);
                (window as any).scrollTimeout = setTimeout(() => (isScrolling = false), 100);
            }
        };

        // Attach
        document.addEventListener("mousemove", onMouseMove);
        container.addEventListener("touchstart", onTouchStart);
        container.addEventListener("touchmove", onTouchMove);
        container.addEventListener("touchend", onTouchEnd);
        window.addEventListener("scroll", onScroll, { passive: true });

        // Main loop
        let rafId: number;
        const animate = () => {
            if (isMoving || isTouching || isScrolling) createTrailImage();
            removeOldImages();
            rafId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [containerRef, speedIndicatorRef]);
};
