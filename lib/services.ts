import { IconType, SiCloudflare, SiCloudflareHex, SiHackclub, SiHackclubHex } from "@icons-pack/react-simple-icons";

export type Service = {
    name: string;
    id: string;
    icon: IconType;
    hex: string;
    href: string;
}

export const availableServices: Service[] = [
    {
        name: "Cloudflare R2",
        id: "cloudflare-r2",
        icon: SiCloudflare,
        hex: SiCloudflareHex,
        href: "https://www.cloudflare.com/products/r2/"
    },
    {
        name: "Hackclub CDN",
        id: "hackclub-cdn",
        icon: SiHackclub,
        hex: SiHackclubHex,
        href: "https://cdn.hackclub.com/"
    },
]