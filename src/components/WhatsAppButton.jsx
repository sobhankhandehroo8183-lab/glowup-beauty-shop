import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '989121234567'; // شماره واتساپ
  const message = 'سلام! از سایت GlowUp محصولات شما رو دیدم. میشه راهنماییم کنید؟';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تماس از طریق واتساپ"
      className="
        fixed bottom-4 left-4 md:left-8 z-40
        w-14 h-14
        bg-gradient-to-br from-green-400 to-green-600
        text-white rounded-full
        shadow-lg shadow-green-500/40
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 hover:shadow-xl
        active:scale-95
        group
      "
    >
      {/* افکت پالس */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>

      <FaWhatsapp className="text-2xl relative z-10" />

      {/* تولتیپ */}
      <span className="
        absolute left-full ml-3
        whitespace-nowrap
        bg-gray-800 text-white text-xs
        px-3 py-1 rounded-lg
        opacity-0 translate-x-2
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all
        hidden md:block
      ">
        پشتیبانی واتساپی
      </span>
    </a>
  );
};

export default WhatsAppButton;
