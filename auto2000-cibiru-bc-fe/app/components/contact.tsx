import { MdWhatsapp } from "react-icons/md";

export default function Contact() {
    return (
        <div className="p-2">
            <p className="border-l-4 border-solid border-red-400 p-2 my-2 text-xs font-bold text-red-500">Kontak</p>
            {/* MAP */}
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <div className="rounded-full w-10 h-10 bg-red-500"></div>
                    <div className="">
                        <p className="text-xs font-semibold">Fariz Muhamad Ibnu Hisyam</p>
                        <p className="text-[10px] uppercase font-medium">Teknisi</p>
                    </div>
                </div>
                <div>
                    <div className="rounded-full w-8 h-8 bg-green-500 flex justify-center items-center">
                        <MdWhatsapp className="text-white h-6 w-auto" />
                    </div>
                </div>
            </div>
            <hr className="my-3" />
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <div className="rounded-full w-10 h-10 bg-red-500"></div>
                    <div className="">
                        <p className="text-xs font-semibold">Yung Kai</p>
                        <p className="text-[10px] uppercase font-medium">Teknisi</p>
                    </div>
                </div>
                <div>
                    <div className="rounded-full w-8 h-8 bg-green-500 flex justify-center items-center">
                        <MdWhatsapp className="text-white h-6 w-auto" />
                    </div>
                </div>
            </div>
            <hr className="mt-3" />
        </div>
    )
}