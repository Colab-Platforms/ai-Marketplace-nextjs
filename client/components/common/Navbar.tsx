'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#divisions', label: 'Solutions' },
  { href: '/learning', label: 'Learning' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = mounted && !!user;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/');
  };

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className={`flex items-center justify-between gap-4 rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${isScrolled ? 'glass-strong glow-ring' : 'glass'}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-8 group">
                  <Image src="/Avatar_logo_Light.svg" alt="Avatar logo" width={100} height={20} className="object-contain" />
                {/* <span className="text-[12px] mt-4 uppercase tracking-[0.25em] text-muted-foreground">AI · India</span> */}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {l.label}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href={user?.role === 'VENDOR' ? '/dashboard' : '/marketplace'}
                    className="relative overflow-hidden text-sm font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:scale-[1.03] transition-transform"
                  >
                    <span className="relative z-10">Dashboard</span>
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent hover:translate-x-full transition-transform duration-700" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="relative overflow-hidden text-sm font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:scale-[1.03] transition-transform"
                  >
                    <span className="relative z-10">Register</span>
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent hover:translate-x-full transition-transform duration-700" />
                  </Link>
                  <Link
                    href="/contact"
                    className="hidden xl:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-primary/30 text-muted-foreground hover:text-foreground hover:border-primary/60 transition"
                  >
                    Consult Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-80 max-w-full glass-strong z-10000 p-8 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="font-display font-black tracking-widest text-sm text-foreground">AVATAR</span>
          <button onClick={toggleMobileMenu} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={toggleMobileMenu}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="h-px bg-border my-4" />
        <div className="flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href={user?.role === 'VENDOR' ? '/dashboard' : '/marketplace'}
                onClick={toggleMobileMenu}
                className="text-center text-sm font-semibold bg-primary text-primary-foreground rounded-full py-2.5 hover:opacity-90 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { toggleMobileMenu(); handleLogout(); }}
                className="text-center text-sm text-muted-foreground border border-border rounded-full py-2.5 hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={toggleMobileMenu} className="text-center text-sm text-muted-foreground border border-border rounded-full py-2.5 hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/register" onClick={toggleMobileMenu} className="text-center text-sm font-semibold text-primary py-2.5">
                Register →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
