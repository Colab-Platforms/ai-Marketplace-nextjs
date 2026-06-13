import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
                <polygon points="30,4 56,52 4,52" fill="none" stroke="#8A9BB5" strokeWidth="2.5"/>
                <polygon points="30,17 46,52 14,52" fill="#4A6FA5" opacity="0.6"/>
                <polygon points="30,28 40,52 20,52" fill="#8A9BB5" opacity="0.5"/>
              </svg>
              <span className="font-display font-bold text-lg text-white tracking-wide">AVATAR</span>
            </Link>
            <p className="text-sm text-avatar-steel leading-relaxed mb-5">
              The Operating System for the AI Era. Education, solutions, infrastructure — all in one ecosystem.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-avatar-steel hover:text-white hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-sm"></i>
              </Link>
              <Link href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-avatar-steel hover:text-white hover:bg-white/10 transition-colors" aria-label="Twitter">
                <i className="fab fa-x-twitter text-sm"></i>
              </Link>
              <Link href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-avatar-steel hover:text-white hover:bg-white/10 transition-colors" aria-label="YouTube">
                <i className="fab fa-youtube text-sm"></i>
              </Link>
              <Link href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-avatar-steel hover:text-white hover:bg-white/10 transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram text-sm"></i>
              </Link>
            </div>
           </div> 

        {/* Ecosystem */}
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80">Ecosystem</div>
          <ul className="mt-4 space-y-2">
            <li><Link href="/learning" className="text-sm text-muted-foreground hover:text-foreground transition">AI Learning</Link></li>
            <li><Link href="/#divisions" className="text-sm text-muted-foreground hover:text-foreground transition">AI Solutions</Link></li>
            <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition">Agent Marketplace</Link></li>
            <li><Link href="/#divisions" className="text-sm text-muted-foreground hover:text-foreground transition">SaaS Products</Link></li>
            <li><Link href="/#divisions" className="text-sm text-muted-foreground hover:text-foreground transition">Cloud Workspace</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80">Company</div>
          <ul className="mt-4 space-y-2">
            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">About Us</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Careers</Link></li>
            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">Contact</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Partners</Link></li>
            <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition">Login</Link></li>
            <li><Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary/80">Contact</div>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="mailto:support@avatarindia.com" className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-2">
                <i className="fas fa-envelope text-xs" />
                support@avatarindia.com
              </a>
            </li>
            <li>
              <a href="tel:+919136774304" className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-2">
                <i className="fas fa-phone text-xs" />
                +91 913 677 4304
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-2">
                <i className="fas fa-paper-plane text-xs" />
                Contact Form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Avatar AI Ecosystem. All rights reserved.</div>
          <div className="font-mono">AI Adoption for Everyone — Confidential</div>
        </div>
      </div>
    </footer>
  );
}
