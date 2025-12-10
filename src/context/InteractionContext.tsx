"use client";

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface InteractionState {
    cursorPosition: { x: number; y: number };
    isHovering: boolean;
    lastInteractionTime: number; // For triggering effects
    clickPosition: { x: number; y: number } | null;
}

interface InteractionContextType extends InteractionState {
    setHovering: (hover: boolean) => void;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function InteractionProvider({ children }: { children: ReactNode }) {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
    const [lastInteractionTime, setLastInteractionTime] = useState(0);

    // Track global mouse/touch movement
    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            let clientX, clientY;

            if ('touches' in e) {
                // Touch event
                if (e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    return;
                }
            } else {
                // Mouse event
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }

            // Normalize to -1 to 1 range (center is 0,0)
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;

            setCursorPosition({ x, y });
        };

        const handleClick = (e: MouseEvent | TouchEvent) => {
            let clientX, clientY;
            if ('touches' in e) {
                if (e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else { return; }
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }

            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;

            setClickPosition({ x, y });
            setLastInteractionTime(Date.now());
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove);
        window.addEventListener("click", handleClick);
        window.addEventListener("touchstart", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("touchstart", handleClick);
        };
    }, []);

    return (
        <InteractionContext.Provider value={{
            cursorPosition,
            isHovering,
            setHovering: setIsHovering,
            lastInteractionTime,
            clickPosition
        }}>
            {children}
        </InteractionContext.Provider>
    );
}

export function useInteraction() {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error("useInteraction must be used within an InteractionProvider");
    }
    return context;
}
