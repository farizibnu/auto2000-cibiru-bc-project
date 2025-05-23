"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import carsData from "../../cars.json";
import Navbar from "@/app/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdChevronLeft, MdWhatsapp } from "react-icons/md";

export default function CarDetail() {
  const { id } = useParams();
  const car = carsData.find((c) => c.id.toString() === id);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const servicesBodi = car?.services_bodi
    ? Object.entries(car.services_bodi).map(([name, price]) => ({ name, price }))
    : [];

  const servicesSalon = car?.services_salon
    ? Object.entries(car.services_salon).map(([name, price]) => ({ name, price }))
    : [];

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((service) => service !== serviceName)
        : [...prev, serviceName]
    );
  };

  const selectedBodi = servicesBodi.filter((s) => selectedServices.includes(s.name));
  const selectedSalon = servicesSalon.filter((s) => selectedServices.includes(s.name));

  const totalPrice = selectedBodi.reduce((total, s) => total + s.price, 0) +
    selectedSalon.reduce((total, s) => total + s.price, 0);

  if (!car) {
    return <p className="text-center text-red-500">Mobil tidak ditemukan!</p>;
  }

  const handleSendWhatsApp = async () => {
    if (selectedServices.length === 0) {
      setErrorMessage("Harap pilih minimal satu layanan sebelum melakukan pemesanan.");
      setErrorOpen(true);
      return;
    }

    const message = `*PESANAN SERVIS*\n` +
      `==============================\n` +
      `*Kendaraan*: ${car?.name}\n` +
      `*Detail Layanan:*\n` +
      selectedBodi.map(s => `- ${s.name}: Rp${s.price.toLocaleString()}`).join("\n") + "\n" +
      selectedSalon.map(s => `- ${s.name}: Rp${s.price.toLocaleString()}`).join("\n") + "\n" +
      `*Total Harga: Rp${totalPrice.toLocaleString()}*\n` +
      `==============================\n` +
      `Mohon konfirmasinya, Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "628982522000";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden">
      <Navbar />
      <div className="px-4 py-2 h-screen w-screen">
        <div className="flex items-center pb-4 cursor-pointer w-fit" onClick={() => window.history.back()}>
          <MdChevronLeft />
          <div className="text-xs font-semibold">Kembali</div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold uppercase">{car.name}</h1>
          <img src={car.image} alt={car.name} className="w-full my-4" />
        </div>
        <div className="flex flex-col items-center">
          <Tabs defaultValue="bodi" className="w-[250px] flex flex-col items-center">
            <TabsList>
              <TabsTrigger value="bodi">Bodi</TabsTrigger>
              <TabsTrigger value="salon">Salon</TabsTrigger>
            </TabsList>
            <TabsContent value="bodi">
              <div className="text-red-500 text-md my-2 text-center">
                <p className="font-medium">Apa yang</p>
                <p className="font-bold">Anda butuhkan?</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {servicesBodi.length > 0 ? (
                  servicesBodi.map((service, index) => (
                    <div key={service.name} className="w-full">
                      <label className="flex items-center space-x-2 py-1 text-xs">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-red-500"
                          checked={selectedServices.includes(service.name)}
                          onChange={() => toggleService(service.name)}
                        />
                        <span>{service.name} - Rp{service.price.toLocaleString()}</span>
                      </label>
                      {index < servicesBodi.length - 1 && <hr className="border-gray-300" />}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Tidak ada layanan tersedia.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="salon">
              <div className="text-red-500 text-md my-2 text-center">
                <p className="font-medium">Percantik</p>
                <p className="font-bold">Kendaraan Anda</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {servicesSalon.length > 0 ? (
                  servicesSalon.map((service, index) => (
                    <div key={service.name} className="w-full">
                      <label className="flex items-center space-x-2 py-1 text-xs">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-red-500"
                          checked={selectedServices.includes(service.name)}
                          onChange={() => toggleService(service.name)}
                        />
                        <span>{service.name} - Rp{service.price.toLocaleString()}</span>
                      </label>
                      {index < servicesSalon.length - 1 && <hr className="border-gray-300" />}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Tidak ada layanan tersedia.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="my-4 bg-blue-800 text-white" onClick={() => setOpen(true)}>Cek Harga</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-xl p-4 w-11/12">
              <AlertDialogHeader>
                <AlertDialogTitle></AlertDialogTitle>
              </AlertDialogHeader>
              <div className="overflow-y-scroll max-h-96 no-scrollbar">
                <div className="flex flex-col items-center">
                  <img src={car.image} alt={car.name} className="w-1/2 mb-2" />
                  <p className="font-bold text-lg uppercase">{car.name}</p>
                  <p className="font-bold mt-4 text-xs">Rp. <span className="text-2xl text-red-500">{totalPrice.toLocaleString()}</span></p>
                  <p className="text-[9px] text-gray-400 font-medium">* Harga sudah termasuk pajak</p>
                </div>
                <div className="flex flex-col gap-2 text-xs mt-4">
                  {selectedBodi.length > 0 && (
                    <div>
                      <p className="font-semibold uppercase text-blue-800 my-2">Bodi</p>
                      {selectedBodi.map((s, index) => (
                        <p key={index} className="text-gray-700 font-semibold">{s.name}: <span className="font-normal">Rp.{s.price.toLocaleString()}</span></p>
                      ))}
                    </div>
                  )}
                  {selectedSalon.length > 0 && (
                    <div>
                      <p className="font-semibold uppercase text-blue-800 my-2">Salon</p>
                      {selectedSalon.map((s, index) => (
                        <p key={index} className="text-gray-700 font-semibold">{s.name}: <span className="font-normal">Rp.{s.price.toLocaleString()}</span></p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <AlertDialogFooter>
                <div className="flex gap-2 justify-between items-center">
                  <Button className="font-semibold" size={"sm"} variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                  <Button className="bg-green-500 font-semibold hover:bg-green-500" size={"sm"} onClick={handleSendWhatsApp}>Pesan Sekarang<MdWhatsapp className="-mx-1" /></Button>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Dialog untuk error */}
          <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
            <AlertDialogContent className="rounded-xl w-10/12 p-6">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500 font-bold">Peringatan</AlertDialogTitle>
              </AlertDialogHeader>
              <p className="text-sm">{errorMessage}</p>
              <AlertDialogFooter>
                <Button className="bg-red-500 hover:bg-red-700 active:bg-red-700" onClick={() => setErrorOpen(false)}>Tutup</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </div>
  );
}