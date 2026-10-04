import { useEffect, useState, useRef } from "react";
import type { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiCode,
  FiTv,
  FiServer,
  FiTrendingUp,
  FiHome as FiFacility,
  FiCheckCircle,
  FiAward,
  FiActivity,
  FiGift,
} from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import logoSmk from "../../../assets/img/logo-smk.png";
import { useAuth } from "../../../context/AuthContext";

interface MenuItem {
  readonly title: string;
  readonly desc: string;
  readonly href: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
}

interface MenuCategory {
  readonly category: string;
  readonly items: readonly MenuItem[];
}

interface NavItem {
  readonly title: string;
  readonly href?: string;
  readonly megaMenu?: readonly MenuCategory[];
}

const navbarData: readonly NavItem[] = [
  {
    title: "BERANDA",
    href: "/",
  },
  {
    title: "PROFIL",
    megaMenu: [
      {
        category: "TENTANG SEKOLAH",
        items: [
          {
            title: "Struktur Organisasi",
            desc: "Bagan dan hirarki tata kelola sekolah",
            href: "/Profile/Organizational",
          },
          {
            title: "Fasilitas & Sarpras",
            desc: "Sarana penunjang kegiatan belajar mengajar",
            href: "/Profile/Facilities",
            icon: FiFacility,
          },
        ],
      },
      {
        category: "MUTU SEKOLAH",
        items: [
          {
            title: "Akreditasi",
            desc: "Status kelayakan & sertifikasi sekolah",
            href: "/Profile/Accreditation",
            icon: FiCheckCircle,
          },
        ],
      },
    ],
  },
  {
    title: "JURUSAN",
    megaMenu: [
      {
        category: "PROGRAM KEAHLIAN",
        items: [
          {
            title: "PPLG",
            desc: "Pengembangan Perangkat Lunak dan Gim",
            href: "/Majors/Pplg",
            icon: FiCode,
          },
          {
            title: "DKV",
            desc: "Desain Komunikasi Visual",
            href: "/Majors/Dkv",
            icon: FiTv,
          },
        ],
      },
      {
        category: "JURUSAN LAINNYA",
        items: [
          {
            title: "TJKT",
            desc: "Teknik Jaringan Komputer dan Telekomunikasi",
            href: "/Majors/Tjkt",
            icon: FiServer,
          },
          {
            title: "BD",
            desc: "Bisnis Digital",
            href: "/Majors/Bd",
            icon: FiTrendingUp,
          },
        ],
      },
    ],
  },
  {
    title: "KESISWAAN",
    megaMenu: [
      {
        category: "KEGIATAN & PRESTASI",
        items: [
          {
            title: "Prestasi Siswa",
            desc: "Pencapaian di bidang akademik & non-akademik",
            href: "/StudentAffairs/Achievements",
            icon: FiAward,
          },
          {
            title: "Ekstrakurikuler",
            desc: "Wadah pengembangan bakat dan minat",
            href: "/StudentAffairs/Extracurriculars",
            icon: FiActivity,
          },
        ],
      },
      {
        category: "BANTUAN",
        items: [
          {
            title: "Beasiswa",
            desc: "Informasi bantuan pendidikan & KJP/PIP",
            href: "/StudentAffairs/Scholarships",
            icon: FiGift,
          },
        ],
      },
    ],
  },
];

export default function NavbarSekolah(): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const { token, user } = useAuth();

  const getDashboardTarget = () => {
    if (!token || !user) return "/login";
    if (user.role === "panitia" || user.role === "admin") return "/panitia/dashboard";
    return "/siswa/dashboard";
  };

  const buttonTarget = getDashboardTarget();
  const isLoggedIn = Boolean(token && user);

  useEffect(() => {
    setActiveIndex(null);
    setIsPinned(false);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setIsPinned(false);
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveIndex(null);
        setIsPinned(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isPinned) {
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setActiveIndex(null);
    }
  };

  const handleMenuClick = (index: number) => {
    if (activeIndex === index && isPinned) {
      setIsPinned(false);
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      setIsPinned(true);
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Navigasi utama"
      className="relative z-50 w-full font-cabinet bg-transparent lg:bg-white text-white lg:text-gray-800 rounded-[50px] lg:rounded-none shadow-none lg:shadow-md"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" aria-label="Beranda" className="flex shrink-0 items-center">
          <img
            src={logoSmk}
            alt="Logo sekolah"
            className="h-11 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navbarData.map((item, index) => {
            const isActive = activeIndex === index;
            const hasChildren = Boolean(item.megaMenu && item.megaMenu.length > 0);

            if (!hasChildren && item.href) {
              return (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    onMouseEnter={() => {
                      if (!isPinned) setActiveIndex(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm font-semibold tracking-wider text-gray-700 transition-colors duration-200 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={item.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => handleMenuClick(index)}
                  className={clsx(
                    "flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wider transition-colors duration-200 rounded-lg",
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                  )}
                >
                  {item.title}
                  <FiChevronDown
                    className={clsx(
                      "text-sm transition-transform duration-300",
                      isActive && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isActive && item.megaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full pt-2 w-[480px] z-50"
                    >
                      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl ring-1 ring-black/5">
                        <div className="grid grid-cols-2 gap-6">
                          {item.megaMenu.map((group) => (
                            <div key={group.category}>
                              <p className="mb-2 px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                {group.category}
                              </p>
                              <ul className="space-y-1">
                                {group.items.map((sub) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <li key={sub.href}>
                                      <Link
                                        to={sub.href}
                                        onClick={() => {
                                          setActiveIndex(null);
                                          setIsPinned(false);
                                        }}
                                        className="group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-200 hover:bg-blue-50"
                                      >
                                        {SubIcon && (
                                          <SubIcon className="mt-0.5 shrink-0 text-base text-blue-600 transition-transform duration-200 group-hover:scale-110" />
                                        )}
                                        <div>
                                          <span className="block text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                                            {sub.title}
                                          </span>
                                          <span className="block text-xs leading-tight text-gray-500">
                                            {sub.desc}
                                          </span>
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to={buttonTarget}
            className="hidden items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 sm:inline-flex hover:bg-blue-700 transition duration-200"
          >
            {isLoggedIn ? (
              "Dashboard"
            ) : (
              <>
                <LuGraduationCap className="text-lg" />
                Daftar SPMB
              </>
            )}
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-xl text-blue-400 lg:hidden"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-slate-950/90 rounded-b-[50px] lg:hidden"
          >
            <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-5 pb-6 pt-3">
              <ul>
                {navbarData.map((item, index) => {
                  const isOpen = mobileExpanded === index;
                  const hasChildren = Boolean(item.megaMenu && item.megaMenu.length > 0);

                  if (!hasChildren && item.href) {
                    return (
                      <li key={item.title}>
                        <Link
                          to={item.href}
                          className="flex w-full items-center py-3.5 text-sm font-bold text-white"
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setMobileExpanded(isOpen ? null : index)}
                        className="flex w-full items-center justify-between py-3.5 text-sm font-bold text-white"
                      >
                        <span>{item.title}</span>
                        <FiChevronDown
                          className={clsx(
                            "text-base transition-transform duration-300 text-blue-400",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && item.megaMenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 pb-4 pl-2">
                              {item.megaMenu.map((group) => (
                                <div key={group.category}>
                                  <p className="mb-2 text-[10px] font-bold tracking-wider text-blue-300/60 uppercase">
                                    {group.category}
                                  </p>
                                  <ul className="space-y-1">
                                    {group.items.map((sub) => {
                                      const SubIcon = sub.icon;
                                      return (
                                        <li key={sub.href}>
                                          <Link
                                            to={sub.href}
                                            className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-gray-200"
                                          >
                                            {SubIcon && (
                                              <SubIcon className="text-base text-blue-400" />
                                            )}
                                            <div>
                                              <span className="block font-medium">
                                                {sub.title}
                                              </span>
                                              <span className="block text-xs text-gray-400">
                                                {sub.desc}
                                              </span>
                                            </div>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <Link
                to={buttonTarget}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30"
              >
                {isLoggedIn ? (
                  "Dashboard"
                ) : (
                  <>
                    <LuGraduationCap className="text-lg" />
                    Daftar SPMB
                  </>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}