'use client';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar py-2.5 px-4 text-center relative bg-avatar-navy">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
        <p className="text-sm text-avatar-silver font-body">
          <span className="font-semibold text-white">New:</span> AI Agent Marketplace is now live — deploy AI agents in minutes.
          <a href="#marketplace" className="underline text-white hover:text-avatar-light ml-1 transition-colors">Explore now →</a>
        </p>
      </div>
    </div>
  );
}
