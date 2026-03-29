/* 
 * DESIGN: Warm Modern Scholar
 * Sticky top nav with ivory background, crimson accent on active links
 * Noto Sans SC font, subtle bottom border
 */
import { useEffect, useState } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "教育背景", href: "#education" },
  { label: "科研经历", href: "#research" },
  { label: "竞赛获奖", href: "#awards" },
  { label: "荣誉奖项", href: "#honors" },
  { label: "联系我", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.slice(1));
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.985_0.008_80/0.96)] backdrop-blur-md shadow-sm border-b border-[oklch(0.88_0.018_75)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2 group"
        >
          <span
            className="text-lg font-bold text-[oklch(0.18_0.02_55)] group-hover:text-[oklch(0.48_0.18_25)] transition-colors"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            杨凌锋
          </span>
          <span className="text-xs text-[oklch(0.52_0.025_60)] font-light tracking-widest hidden sm:block">
            Yang Lingfeng
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <span
            className={`block w-5 h-0.5 bg-[oklch(0.28_0.04_55)] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[oklch(0.28_0.04_55)] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[oklch(0.28_0.04_55)] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.985_0.008_80/0.98)] backdrop-blur-md border-b border-[oklch(0.88_0.018_75)] px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-left nav-link text-base ${activeSection === item.href.slice(1) ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
