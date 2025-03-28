"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import Navbar from "../components/navbar";
import carsData from "../cars.json";
import { MdChevronLeft } from "react-icons/md";

const itemsPerPage = 8;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<{ id: number; name: string; image: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    setItems(carsData);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-screen">
      <Navbar />
      <div className="px-4 py-2 h-fit relative">
        <div className="flex items-center pb-4 cursor-pointer w-fit" onClick={() => window.history.back()
        }>
          <MdChevronLeft />
          <div className="text-xs font-semibold">Kembali</div>
        </div>
        <div className="text-red-500 text-xl my-2">
          <p className="font-medium">Pilih</p>
          <p className="font-bold">Kendaraan Anda!</p>
        </div>
        <div className="grid grid-cols-2 justify-items-center items-center gap-4 text-center">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center cursor-pointer "
              onClick={() => router.push(`/estimation/${item.id}`)}
            >
              <img src={item.image} alt={item.name} className="w-auto h-16 hover:scale-110 transition " />
              <p className="font-bold uppercase text-sm">{item.name}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="fixed bottom-0 right-0 left-0 bg-white flex justify-center p-4">
          <Pagination>
            <PaginationContent>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
