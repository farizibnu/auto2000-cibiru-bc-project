import { MdWhatsapp } from "react-icons/md";
import contactsData from "../contacts.json";

export default function Contact() {
    return (
        <div className="p-2">
            <p className="border-l-4 border-solid border-red-400 p-2 my-2 text-xs font-bold text-red-500">Kontak</p>
            
            {contactsData.map((contact, index) => (
                <div key={index}>
                    <div className="flex gap-2 justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <img 
                                src={contact.photo} 
                                alt={contact.name} 
                                className="rounded-full w-10 h-10 object-cover border-gray-300 border-2 bg-gray-200" 
                            />
                            <div>
                                <p className="text-xs font-semibold">{contact.name}</p>
                                <p className="text-[10px] uppercase font-medium">{contact.role}</p>
                            </div>
                        </div>
                        <a href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer">
                            <div className="rounded-full w-8 h-8 bg-green-500 flex justify-center items-center">
                                <MdWhatsapp className="text-white h-6 w-auto" />
                            </div>
                        </a>
                    </div>
                    {index < contactsData.length - 1 && <hr className="my-3" />} 
                </div>
            ))}
        </div>
    );
}
