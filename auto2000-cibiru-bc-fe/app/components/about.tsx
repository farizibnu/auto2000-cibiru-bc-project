import Link from "next/link";

export default function About() {
    return (
        <div className="my-6">
            <div className="flex w-full h-24 my-4">
                <div className="w-1/3">
                    <img className="object-cover h-full rounded-br-3xl " src="../images/about.jpeg" alt="" />
                </div>
                <div className="w-2/3 text-center items-center justify-center flex flex-col gap-2 p-2">
                    <p className="uppercase font-semibold text-xs">Kunjungi <span className="text-red-500">Sekarang</span></p>
                    <p className="text-[6px]">Kunjungi lokasi <span className="font-semibold">Auto2000 Bodi & Cat</span> terdekat untuk informasi lebih lanjut.</p>
                    <Link href={"https://auto2000.co.id/"} className="px-2 py-1 bg-red-500 rounded-sm text-white font-medium text-[9px] w-fit">Website Resmi Auto2000</Link>
                </div>
            </div>
            <div className="p-2 flex flex-col gap-4">
                <div className="flex justify-between">
                    <img className="w-12" src="/logo/auto2000-logo.png" alt="about-auto2000" />
                    <div className="flex gap-2 text-[7px]">
                        <p>Promo</p>
                        <p>Booking</p>
                        <p>Estimasi Harga</p>
                        <p>B&P Salon</p>
                    </div>
                </div>
                <hr className="border-black" />
                <div className="flex justify-between font-semibold text-gray-400">
                    <div></div>
                    <div>
                        <p className="text-[7px]">&copy; 2025 Auto2000 Bodi & Cat - Cibiru</p>
                    </div>
                </div>
            </div>
        </div>
    )
}