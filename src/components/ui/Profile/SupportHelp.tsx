import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSmk from "../assets/img/logo-smk.png";

export default function SupportHelp() {
  const navigate = useNavigate();

  const troubleOptions = [
    {
      title: "Lupa Password Akun?",
      desc: "Kirimkan kode OTP ke email terdaftar untuk membuat password baru.",
      actionText: "Reset Password Baru",
      action: () => navigate("/forgot-password"),
    },
    {
      title: "Email / Username Tidak Ditemukan?",
      desc: "Pastikan tidak ada salah ketik atau periksa kembali email verifikasi awal.",
      actionText: "Ke Halaman Login",
      action: () => navigate("/login"),
    },
    {
      title: "Belum Menerima Kode OTP?",
      desc: "Periksa folder Spam/Junk pada email Anda atau minta kirim ulang OTP.",
      actionText: "Verifikasi OTP",
      action: () => navigate("/otp"),
    },
    {
      title: "Hubungi Panitia SPMB via WhatsApp",
      desc: "Kendala teknis mendesak? Hubungi tim admin SPMB SMK TI Bali Global Badung.",
      actionText: "Chat Admin WhatsApp",
      action: () => window.open("https://wa.me/628123456789", "_blank"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[500px] mb-3">
        <Link
          to="/login"
          className="text-gray-700 hover:text-black text-xs flex items-center gap-2 hover:underline cursor-pointer"
        >
          &larr; Kembali ke Login
        </Link>
      </div>

      <div className="bg-white rounded-[30px] shadow-xl w-full max-w-[500px] p-8 flex flex-col items-center">
        <img
          src={LogoSmk}
          alt="Logo SMK TI"
          className="h-14 w-auto object-contain mb-3"
        />

        <h1 className="text-xl font-bold text-[#204382] text-center mb-1">
          Pusat Bantuan & Kendala Akun
        </h1>
        <p className="text-xs text-gray-500 text-center mb-6">
          Pilih jenis masalah yang Anda alami di bawah ini untuk solusi cepat
        </p>

        <div className="w-full space-y-3">
          {troubleOptions.map((opt, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 rounded-xl hover:border-[#204382] transition flex flex-col gap-2 bg-gray-50/50"
            >
              <h3 className="text-sm font-semibold text-gray-800">
                {opt.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {opt.desc}
              </p>
              <button
                type="button"
                onClick={opt.action}
                className="self-start text-xs text-[#204382] font-bold hover:underline mt-1"
              >
                {opt.actionText} &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}