export default function Location() {
    return (
        <div className="p-2">
            <p className="border-l-4 border-solid border-red-400 p-2 my-2 text-xs font-bold text-red-500">Lokasi</p>
            <div className="border-2 border-solid border-red-500 rounded-lg">
                <iframe className="w-full rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6167551768403!2d107.70353167454117!3d-6.936324067897955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c2daebb1d149%3A0xc379c5459d09f591!2sToyota%20Auto2000%20Body%20Paint%20Cibiru!5e0!3m2!1sid!2sid!4v1739079086763!5m2!1sid!2sid" style={{ border: 0 }} loading="lazy"></iframe>
                <div className="bg-black opacity-70 py-2 text-center rounded-b-md">
                    <p className="text-white font-medium text-[6px]">Jl. Soekarno Hatta No. 759, Kec. Panyileukan, Kota Bandung, Jawa Barat 40614</p>
                </div>
            </div>
        </div>
    )
}