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
        href: "https://developers.cloudflare.com/r2/get-started/s3/"
    },
    {
        name: "Hack Club CDN",
        id: "hackclub-cdn",
        icon: SiHackclub,
        hex: SiHackclubHex,
        href: "https://cdn.hackclub.com/"
    },
]