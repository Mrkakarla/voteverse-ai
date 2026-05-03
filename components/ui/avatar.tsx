import Image from "next/image";

export function Avatar({ src, alt }: { src?: string | null; alt: string }) {
  if (src) {
    return <Image src={src} alt={alt} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />;
  }
  return <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">{alt[0] || "U"}</div>;
}
