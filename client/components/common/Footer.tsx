import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-avatar-deep pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
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
            <h4 className="font-display font-semibold text-sm text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">AI Learning</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">AI Solutions</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Agent Marketplace</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">SaaS Products</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Cloud Workspace</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">AI Research</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-avatar-steel hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Partners</Link></li>
              <li><Link href="#" className="text-sm text-avatar-steel hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:support@avatarindia.com" className="text-sm text-avatar-steel hover:text-white transition-colors flex items-center gap-2">
                  <i className="fas fa-envelope text-xs" />
                  support@avatarindia.com
                </a>
              </li>
              <li>
                <a href="tel:+919136774304" className="text-sm text-avatar-steel hover:text-white transition-colors flex items-center gap-2">
                  <i className="fas fa-phone text-xs" />
                  +91 913 677 4304
                </a>
              </li>
              <li><Link href="/contact" className="text-sm text-avatar-steel hover:text-white transition-colors flex items-center gap-2">
                <i className="fas fa-paper-plane text-xs" />
                Contact Form
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-avatar-steel">© 2025 Avatar AI Ecosystem. All rights reserved.</p>
          <p className="text-xs text-avatar-steel">AI Adoption for Everyone — Confidential</p>
        </div>
      </div>
    </footer>
  );
}
