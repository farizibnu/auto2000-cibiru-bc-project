"use client";

import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { MdWhatsapp } from "react-icons/md";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { format } from "date-fns";
import carsData from "../cars.json";

export default function Features() {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedCar, setSelectedCar] = useState("");
    const [noPolisi, setNoPolisi] = useState("");
    const [keluhan, setKeluhan] = useState("");
    const carOptions = carsData.map(car => car.name);

    const NGROK_URL = "https://f5a5-114-10-149-112.ngrok-free.app";

    const handleSendWhatsApp = async () => {
        if (!noPolisi || !selectedCar || !selectedDate || !keluhan) {
            alert("Harap lengkapi semua data sebelum mengirim pesan WhatsApp.");
            return;
        }

        const formattedDate = format(selectedDate, "PPP");
        const message =
            `*🔧 JADWAL SERVIS KENDARAAN*\n` +
            `==============================\n` +
            `🚗 *Nomor Polisi:* ${noPolisi}\n` +
            `🚘 *Tipe Kendaraan:* ${selectedCar}\n` +
            `📅 *Tanggal Servis:* ${formattedDate}\n` +
            `🛠 *Keluhan:* _${keluhan}_\n` +
            `==============================\n` +
            `Mohon konfirmasinya, terima kasih! 🙏`;
        try {
            const response = await fetch(`${NGROK_URL}/send-message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: "6289656404198", message })
            });
            const result = await response.json();
            if (result.success) {
                alert("Pesan berhasil dikirim melalui WhatsApp!");
                console.log(result.message);
            } else {
                alert("Gagal mengirim pesan: " + result.error);
                console.error(result.error);
            }
            setOpen(false);
        } catch (error) {
            alert("Terjadi kesalahan saat menghubungi server.");
            console.error(error);
        }
    };

    return (
        <div className="">
            <div className="text-red-500 text-xl p-4">
                <p className="font-semibold">Ayo pilih yang</p>
                <p className="font-bold">Anda Butuhkan!</p>
            </div>
            <div className="flex gap-2 px-2">
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <div className="from-orange-300 to-orange-500 bg-gradient-to-b w-full h-24 rounded-lg relative cursor-pointer" onClick={() => setOpen(true)}>
                            <img className="w-auto h-12 absolute right-0 top-0" src="../images/menu-calendar.png" alt="" />
                            <p className="text-white text-[8px] p-2 absolute bottom-0">Jadwalkan Servis</p>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-xl w-11/12 p-4">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-sm font-bold">Formulir Penjadwalan Servis</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label className="font-bold text-xs">Nomor Polisi<span className="text-red-500"> *</span></Label>
                                <Input value={noPolisi} onChange={(e) => setNoPolisi(e.target.value)} placeholder="Masukkan Nomor Polisi" className="text-xs" />
                            </div>
                            <div>
                                <Label className="font-bold text-xs">Tipe Kendaraan<span className="text-red-500"> *</span></Label>
                                <Select onValueChange={setSelectedCar}>
                                    <SelectTrigger className="w-full text-xs">
                                        <SelectValue placeholder="Pilih Tipe Kendaraan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {carOptions.map((car, index) => (
                                            <SelectItem key={index} value={car}>{car}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="font-bold text-xs">Pilih Tanggal Servis<span className="text-red-500"> *</span></Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full pl-3 text-left font-normal text-xs text-zinc-500"
                                        >
                                            {selectedDate ? format(selectedDate, "PPP") : "Pilih Tanggal Servis"}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            disabled={(date) => date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Label htmlFor="desc" className="font-bold text-xs">Deskripsi Keluhan<span className="text-red-500"> *</span></Label>
                                <Textarea value={keluhan} onChange={(e) => setKeluhan(e.target.value)} placeholder="Isi Keluhan dari Kendaraan Anda" className="text-xs" />
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <div className="flex justify-between gap-2">
                                <Button className="font-semibold bg-red-50 text-rose-700 hover:bg-rose-500 hover:text-white" size={"sm"} variant="ghost" onClick={() => { setSelectedDate(undefined); setNoPolisi(""); setKeluhan(""); }}>Reset</Button>
                                <div className="flex gap-2">
                                    <Button className="font-semibold" size={"sm"} variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                                    <Button className="bg-green-500 font-semibold hover:bg-green-500" size={"sm"} onClick={handleSendWhatsApp}>Teruskan<MdWhatsapp className="-mx-1" /></Button>
                                </div>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <a className="from-blue-600 to-blue-900 bg-gradient-to-b w-full h-24 rounded-lg relative" href="/estimation">
                    <img className="w-auto h-12 absolute right-0 top-0" src="../images/menu-money.png" alt="" />
                    <p className="text-white text-[8px] p-2 absolute bottom-0">Estimasi Harga</p>
                </a>
                <a className="from-red-500 to-red-800 bg-gradient-to-b w-full h-24 rounded-lg relative" href="/estimation">
                    <img className="w-auto h-10 absolute right-0 top-2" src="../images/menu-car.png" alt="" />
                    <p className="text-white text-[8px] p-2 absolute bottom-0">B&P Salon</p>
                </a>
            </div>
            <div className="w-full my-4 bg-red-500 bg-[url(/images/features.jpeg)] bg-blend-soft-light bg-local bg-cover bg-bottom">
                <div className="flex items-center justify-center p-2">
                    <p className="text-xs font-medium text-white">Kenapa Auto2000 Bodi dan Cat Cibiru?</p>
                </div>
                <div className="grid grid-cols-4 gap-1 text-white justify-items-center text-center">
                    <div className="">
                        <p className="text-sm font-medium">4.9/5</p>
                        <p className="text-[8px] py-2">Kepuasan Pelanggan</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-medium">96%</p>
                        <p className="text-[8px] py-2">Material Daur Ulang</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-medium">8 Jam</p>
                        <p className="text-[8px] py-2">Maksimal Pengerjaan</p>
                    </div>
                    <div className="">
                        <p className="text-sm font-medium">15.782</p>
                        <p className="text-[8px] py-2">Kustomer Telah Percaya</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="p-2">
                    <p className="border-l-4 border-solid border-red-400 p-2 my-2 text-xs font-bold text-red-500">
                        Promo dan Penawaran Lainnya
                    </p>
                    <Carousel opts={{
                        align: "start",
                    }} className="w-full overflow-x-hidden">
                        <CarouselContent className="-ml-1">
                            {[
                                { title: "Promo", subtitle: "Pembersihan Jamur Bodi", price: 55000 },
                                { title: "Bundling", subtitle: "Servis Berkala", price: 80000 },
                                { title: "Promo", subtitle: "Cat All Body", price: 110000 },
                                { title: "Promo", subtitle: "Cat All Body", price: 150000 },
                            ].map((item, index) => (
                                <CarouselItem key={index} className="pl-1 basis-2/3">
                                    <div className="h-36 rounded-lg border-2 flex flex-col justify-center items-center text-center">
                                        <div className="flex justify-around w-full -mx-2 py-2 items-center">
                                            <img className="w-auto h-3" src="../logo/auto2000-logo.png" alt="" />
                                            <div className="text-[8px] text-white font-semibold bg-green-600 rounded-2xl py-1 px-2">Rp. {item.price}</div>
                                        </div>
                                        <p className="text-xs font-semibold">{item.title}</p>
                                        <p className="text-sm font-bold">{item.subtitle}</p>
                                        <div className="flex justify-around w-full -mx-4 py-2 items-center">
                                            <div className="flex flex-col items-center text-[8px]">
                                                <p>Cabang</p>
                                                <p>Bandung</p>
                                            </div>
                                            <div className="flex flex-col items-center text-[8px]">
                                                <p>Periode</p>
                                                <p>Januari</p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}