import MicroSlats from "@/components/MicroSlats";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthBackground from "./AuthBackground";

export const instant = false;
export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        return <>
            <AuthBackground/>
            {children}
        </>
    } else {
        redirect("/dashboard", "replace");
    }
}