'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';


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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header className="sticky top-5 z-50">
        <div
          id="nav-wrapper"
          className={`mx-auto px-4 sm:px-6 py-3 flex items-center justify-between bg-white transition-all duration-300 ${
            isScrolled
              ? 'top-[14px] max-w-[1100px] bg-white/92 backdrop-blur-[14px] rounded-full shadow-[0_10px_30px_-10px_rgba(15,31,52,0.15)] px-[22px] md:pr-2'
              : 'max-w-full '
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 no-select">
            <Image src="/Aavtat logo.svg" alt="Avatar logo" width={120} height={34} className="logo-mark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-avatar-slate">
            <Link href="/" className="hover:text-avatar-dark transition">Home</Link>
            <Link href="/#divisions" className="hover:text-avatar-dark transition">Solutions</Link>
            <Link href="/learning" className="hover:text-avatar-dark transition">Learning</Link>
            <Link href="/marketplace" className="hover:text-avatar-dark transition">Marketplace</Link>
            <Link href="/about" className="hover:text-avatar-dark transition">About</Link>
            <Link href="/contact" className="hover:text-avatar-dark transition">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href={user?.role === 'VENDOR' ? '/dashboard' : '/marketplace'}
                  className="inline-flex items-center gap-2 bg-avatar-accent hover:bg-avatar-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                >
                  <i className="fas fa-th-large text-xs" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-avatar-slate hover:text-avatar-dark transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-avatar-slate hover:text-avatar-dark transition">Login</Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-avatar-navy hover:bg-avatar-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              href="/contact"
              className="hidden xl:inline-flex items-center gap-2 bg-avatar-navy hover:bg-avatar-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
            >
              Consult Now
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] z-[60]"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-[2px] bg-avatar-dark rounded-full"></span>
            <span className="block w-6 h-[2px] bg-avatar-dark rounded-full"></span>
            <span className="block w-6 h-[2px] bg-avatar-dark rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-2xl z-[10000] p-8 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="font-display font-bold text-lg text-avatar-dark">AVATAR</span>
          <button onClick={toggleMobileMenu} className="p-2 text-avatar-slate hover:text-avatar-dark" aria-label="Close menu">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <Link href="/" onClick={toggleMobileMenu} className="text-base font-medium text-avatar-slate hover:text-avatar-dark transition-colors py-2 border-b border-avatar-ice">Home</Link>
          <Link href="/#divisions" onClick={toggleMobileMenu} className="text-base font-medium text-avatar-slate hover:text-avatar-dark transition-colors py-2 border-b border-avatar-ice">Solutions</Link>
          <Link href="/learning" onClick={toggleMobileMenu} className="text-base font-medium text-avatar-slate hover:text-avatar-dark transition-colors py-2 border-b border-avatar-ice">Learning</Link>
          <Link href="/marketplace" onClick={toggleMobileMenu} className="text-base font-medium text-avatar-slate hover:text-avatar-dark transition-colors py-2 border-b border-avatar-ice">Marketplace</Link>
          <Link href="/about" onClick={toggleMobileMenu} className="text-base font-medium text-avatar-slate hover:text-avatar-dark transition-colors py-2 border-b border-avatar-ice">About</Link>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href={user?.role === 'VENDOR' ? '/dashboard' : '/marketplace'}
                onClick={toggleMobileMenu}
                className="flex items-center justify-center gap-2 text-sm font-semibold bg-avatar-accent text-white rounded-full py-2.5 hover:bg-avatar-navy transition-colors"
              >
                <i className="fas fa-th-large text-xs" />
                Dashboard
              </Link>
              <button
                onClick={() => { toggleMobileMenu(); handleLogout(); }}
                className="text-center text-sm font-medium text-avatar-slate border border-avatar-silver rounded-full py-2.5 hover:bg-avatar-ice transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={toggleMobileMenu} className="text-center text-sm font-medium text-avatar-slate border border-avatar-silver rounded-full py-2.5 hover:bg-avatar-ice transition-colors">Login</Link>
              <Link href="/register" onClick={toggleMobileMenu} className="text-center text-sm font-semibold bg-avatar-dark text-white rounded-full py-2.5 hover:bg-avatar-navy transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[9999]"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
}
