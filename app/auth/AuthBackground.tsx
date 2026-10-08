'use client';
import MicroSlats from "@/components/MicroSlats";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AuthBackground(){
    const { resolvedTheme } = useTheme();
    const [render, setRender] = useState(false);
    useEffect(()=>{
        setRender(true);
    }, [])
    return render && <div className="w-screen h-screen absolute">
        <MicroSlats
            color={resolvedTheme == "light" ? "#f5f5f5" : "#0a0a0a"}
            glintColor={resolvedTheme == "light" ? "#a3a3a3" : "#404040"}
            backgroundColor={resolvedTheme == "light" ? "#ffffff" : "#000000"}
            slatWidth={10}
            slatHeight={25}
            gap={3}
            roundness={0.75}
            speed={0.6}
            scale={1.5}
            direction={250}
            chop={0.55}
            stretch={0}
            glint={0.7}
            contrast={1.25}
            perspective={0.55}
            fog={0.55}
            interactive
            cursorStrength={1}
            cursorSize={40}
            swirl={0}
            trail={1.4}
            lean={0}
            intro={false}
            introDuration={1.5}
            paused={false}
        />
    </div>
}