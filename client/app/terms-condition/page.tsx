import Link from 'next/link';

export default function TermsConditionPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f0f2f5]">
      
      {/* ─── Hero Banner ─── */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a111c] via-[#0f1d30] to-[#080f1a]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-[26rem] h-[26rem] rounded-full bg-slate-400/10 blur-[140px]" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-slate-500/10 blur-[110px]" />

        <div className="relative z-10 text-center px-4">
          <p className="text-slate-400 text-[11px] font-semibold tracking-[0.35em] uppercase mb-3">
            Legal Framework
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Terms & <span className="text-slate-300">Conditions</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="py-16 bg-[#f0f2f5]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          {/* Policy Meta Info */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Website</p>
                <Link href="https://www.avatarindia.com" className="text-sm font-semibold text-[#1a2535] hover:text-slate-600 transition-colors">
                  www.avatarindia.com
                </Link>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Platform</p>
                <p className="text-sm font-semibold text-slate-800">Avatar AI Marketplace</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Entity</p>
                <p className="text-sm font-semibold text-slate-800">Avatar Industries Limited</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Version</p>
                <p className="text-sm font-semibold text-slate-800">1.0</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Effective Date</p>
                <p className="text-sm font-semibold text-slate-800">June 12, 2026</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-slate-800">----</p>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
            
            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                1. Introduction and Acceptance
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  These Terms & Conditions (&quot;Terms&quot;) constitute a legally binding agreement between Avatar Industries Limited, together with its affiliates, successors, and permitted assigns (&quot;Avatar,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), and any person or entity accessing or using the Avatar AI Marketplace through www.avatarindia.com, any subdomain, mobile site, mobile application, dashboard, API, communication channel, or related digital interface (collectively, the &quot;Platform&quot;).
                </p>
                <p>
                  The Platform is designed as India&apos;s AI marketplace ecosystem combining an AI tools marketplace, AI education offerings, AI services, community features, and related digital products and services.
                </p>
                <p>
                  By accessing, browsing, registering on, listing on, purchasing from, enrolling through, subscribing to, or otherwise using the Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms, the separate Privacy Policy, and all supplemental rules, guidelines, schedules, notices, and operational policies published by Avatar from time to time.
                </p>
                <p>
                  If you do not agree to these Terms, you must not access or use the Platform.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                2. Definitions
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3">
                <p>For the purposes of these Terms:</p>
                <p><strong>&quot;Buyer&quot;</strong> means a user who purchases, licenses, subscribes to, enrolls in, books, or otherwise acquires access to any tool, course, webinar, service, template, dataset, API, automation, or other offering made available through the Platform.</p>
                <p><strong>&quot;Seller&quot;</strong> means an individual or business user who lists or offers AI tools, automations, templates, agents, APIs, scripts, datasets, mini-SaaS products, or other digital offerings through the Platform.</p>
                <p><strong>&quot;Instructor&quot;</strong> means an individual educator or trainer who offers courses, bootcamps, live classes, workshops, educational materials, or related content through the Platform.</p>
                <p><strong>&quot;Partner&quot;</strong> means any company, institution, organization, or other entity collaborating with Avatar in relation to licensed content, co-branded courses, affiliate listings, enterprise offerings, events, or other marketplace arrangements.</p>
                <p><strong>&quot;Service Provider&quot;</strong> or <strong>&quot;Freelancer&quot;</strong> means a user offering consulting, implementation, automation, AI agent building, or other services through the Platform&apos;s services layer.</p>
                <p><strong>&quot;Content&quot;</strong> means text, graphics, logos, code, datasets, prompts, videos, documents, listings, descriptions, screenshots, audio, images, reviews, ratings, comments, messages, and all other materials made available on or through the Platform.</p>
                <p><strong>&quot;User&quot;</strong> means any visitor, registered member, Buyer, Seller, Instructor, Partner, Service Provider, attendee, or other person accessing or using the Platform.</p>
                <p><strong>&quot;Transaction&quot;</strong> means any purchase, sale, enrollment, booking, subscription, payment, refund, payout, or related commercial event conducted or initiated through the Platform.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                3. Nature of the Platform and Avatar&apos;s Role
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar operates the Platform as a technology-enabled intermediary marketplace and ecosystem that facilitates discovery, listing, onboarding, payments, subscriptions, access management, educational participation, community engagement, and related interactions among users.
                </p>
                <p>
                  Avatar&apos;s business overview expressly states that the Platform acts as an intermediary connecting sellers and buyers and is not the creator of third-party tools or courses listed by vendors and education partners.
                </p>
                <p>
                  Accordingly, unless expressly identified otherwise, Avatar does not manufacture, create, own, control, test, certify, guarantee, or endorse third-party offerings listed or provided by Sellers, Instructors, Partners, or Service Providers.
                </p>
                <p>
                  Avatar may, however, independently create, host, own, license, market, and deliver certain first-party offerings, including Avatar-hosted webinars, proprietary content, certificates, and future Avatar-branded SaaS or bundled services, in which case Avatar acts as the direct provider.
                </p>
                <p>
                  Avatar may rely on statutory intermediary protections where applicable, including the principle that an intermediary is not liable for third-party information hosted by it subject to legal conditions and due diligence.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                4. Eligibility and Capacity
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  You may use the Platform only if you are legally competent to enter into a binding contract under applicable law. If you use the Platform on behalf of a company, LLP, partnership, sole proprietorship, educational institution, trust, or other legal entity, you represent and warrant that you are duly authorized to bind such entity to these Terms.
                </p>
                <p>
                  The business overview provides that individual sellers must be at least 18 years old and complete applicable verification requirements before listings go live.
                </p>
                <p>
                  Avatar may refuse access, registration, onboarding, or continued use to any person or entity that fails to meet legal, policy, verification, compliance, risk, or quality requirements.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                5. User Accounts and Verification
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Certain features of the Platform require account creation, login credentials, OTP verification, profile completion, or role-specific onboarding. Avatar may require email verification, mobile verification, KYC, tax details, banking information, business registration information, and supporting documentation depending on the nature of the account.
                </p>
                <p>
                  The user acting in their personal capacity as individual seller, service provider or instructor are required to submit the documents that establish both their identity and business activity, documents such as Udyam Registration Certificate, Shop and Establishment License, professional certificates demonstrating expertise and any other statutory documents or records required by Avatar.
                </p>
                <p>
                  While the user registering as Business Entities, in form of a company, partnership or other business form, must provide documents applicable to their specific legal form such as Certificate of Incorporation, Partnership Deed, Entity PAN, GST registration certificates, and any other statutory or tax-related records required by Avatar.
                </p>
                <p>
                  You agree to provide accurate, complete, and updated information and to maintain the confidentiality of login credentials. You are responsible for all acts and omissions occurring through your account, whether or not authorized by you, unless caused solely by Avatar&apos;s proven failure to maintain reasonable platform security.
                </p>
                <p>
                  Avatar may suspend, restrict, or terminate any account found to contain false information, unauthorized use, deceptive identity claims, or incomplete compliance documents.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                6. User Categories and Role-Specific Obligations
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  The Platform may support different categories of users, including visitors, Buyers, Sellers, Instructors, Partners, Service Providers, enterprise clients, webinar attendees, and community participants.
                </p>
                <p>
                  Avatar may impose different contractual, commercial, onboarding, tax, content, quality, technical, moderation, payout, reporting, and support obligations depending on the user&apos;s role, risk profile, or transaction type.
                </p>
                <p>
                  Any additional role-specific policy, commercial schedule, order form, statement of work, onboarding document, or platform notice shall be read together with these Terms. In case of conflict, the more specific signed or role-specific document shall prevail to the extent of the inconsistency.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                7. Platform Services and Permitted Use
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">The Platform may include one or more of the following services and features:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Listing and sale of AI tools, automations, prompt packs, agents, APIs, scripts, mini-SaaS tools, templates, and datasets.</li>
                  <li>Listing and delivery of self-paced courses, live online classes, mini-courses, bootcamps, and partner company educational programs.</li>
                  <li>Avatar-hosted live webinars, workshops, sessions, events, certificates, and recordings.</li>
                  <li>Freelancer or service-based engagement opportunities involving AI consulting, automation, and related project work.</li>
                  <li>Community participation, messaging, reviews, ratings, discussion forums, dashboards, analytics, and recommendation features.</li>
                </ul>
                <p>
                  Users may use the Platform solely for lawful business, learning, professional, and consumer purposes contemplated by the Platform architecture. Any use outside such scope, including illegal exploitation, data theft, impersonation, malware propagation, deceptive resale, or regulatory evasion, is prohibited.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                8. Prohibited Conduct
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">You shall not, directly or indirectly:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Violate any applicable law, regulation, order, or third-party right.</li>
                  <li>List, upload, publish, transmit, sell, promote, or distribute infringing, illegal, deceptive, unsafe, harmful, defamatory, fraudulent, obscene, or unauthorized content.</li>
                  <li>Upload or distribute malware, spyware, ransomware, botnets, backdoors, unauthorized scrapers, destructive code, hidden payloads, or tools designed primarily for unlawful surveillance, credential theft, or cyber abuse.</li>
                  <li>Misrepresent the ownership, source, features, pricing, quality, compliance status, certification, endorsements, or capabilities of any offering.</li>
                  <li>Circumvent Platform fees, commissions, payment rails, subscription controls, access restrictions, verification systems, dispute systems, or moderation tools.</li>
                  <li>Reverse engineer, scrape, reproduce, mirror, frame, or systematically extract Platform data except as permitted by law or written consent.</li>
                  <li>Interfere with Platform performance, security, uptime, availability, or infrastructure.</li>
                  <li>Use the Platform to harass, threaten, extort, spam, phish, or impersonate any person.</li>
                  <li>Submit false disputes, abusive takedown notices, fake reviews, fabricated evidence, or fraudulent refund claims.</li>
                </ul>
                <p>
                  The business overview expressly prohibits sellers from listing tools that violate copyright, contain malware, or produce illegal outputs.
                </p>
                <p>
                  Indian e-commerce rules also expect marketplace entities to avoid unfair trade practices and maintain transparent dealings with consumers.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                9. Listing Standards and Approval Rights
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  All marketplace listings are subject to Avatar&apos;s onboarding, review, compliance, editorial, legal, technical, and quality checks. Avatar may require mandatory listing fields such as title, detailed description, category, tags, screenshots, demo video, usage guide, pricing model, and ownership declaration before a listing is published.
                </p>
                <p>
                  The business overview contemplates a standardized listing and approval process in which seller onboarding and listing approvals are reviewed by Avatar administrators before going live.
                </p>
                <p>
                  Avatar reserves the absolute right to approve, reject, edit formatting, request changes, delay publication, delist, disable, downgrade visibility, remove, or archive any listing, course, service profile, webinar page, or user-generated material for reasons including legality, policy breach, poor quality, consumer complaints, security risk, misleading claims, copyright concerns, malware concerns, outdated content, reputational risk, or regulatory exposure.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                10. Seller Warranties and Responsibilities
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">Each Seller represents, warrants, and undertakes that:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>it owns or controls all rights necessary to list, license, sell, and distribute the relevant tool or digital product;</li>
                  <li>the listing is accurate, complete, and not misleading;</li>
                  <li>the offered tool is lawful, operational as described, and does not intentionally contain malware, hidden code, or unlawful functionality;</li>
                  <li>it will maintain and support the offering in accordance with applicable listing commitments;</li>
                  <li>it will respond to Buyer queries and disputes within the timelines prescribed by Avatar;</li>
                  <li>it will maintain all applicable tax registrations, statutory records, and business compliance relevant to its activities; and</li>
                  <li>it will indemnify Avatar against claims arising from its offering, conduct, content, IP breach, misleading representation, tax non-compliance, or legal violation.</li>
                </ul>
                <p>
                  The business overview makes Sellers fully responsible for the accuracy, functionality, legality, and IP ownership of listed tools, and specifically notes that Avatar is not liable for tool performance issues.
                </p>
                <p>
                  The business overview also states that sellers must respond to buyer queries within 3 business days and must update or delist broken tools within 14 days of being flagged.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                11. Instructor, Partner, and Service Provider Responsibilities
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">Each Instructor, Partner, or Service Provider represents, warrants, and undertakes that:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>all educational or service content provided through the Platform is accurate, original or duly licensed, and legally compliant;</li>
                  <li>all promised sessions, deliverables, course materials, support commitments, and representations are fulfilled as described;</li>
                  <li>all content will be updated where necessary to address material changes in underlying tools, APIs, or technologies;</li>
                  <li>all required rights, permissions, teaching credentials, licenses, and approvals are validly held by the relevant provider; and</li>
                  <li>Avatar may rely on the provider&apos;s representations in publishing and delivering the offering.</li>
                </ul>
                <p>
                  The business overview states that instructors and partner companies are responsible for the accuracy, quality, originality, and legal ownership of their course materials, and that Avatar is not responsible for educational outcomes of third-party content.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                12. Purchases, Access, and License Scope
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  A Buyer purchasing or enrolling in any offering through the Platform receives only the rights expressly granted in the applicable listing, order flow, or product page. Unless otherwise expressly stated in writing, every purchase is a limited, non-exclusive, non-transferable, non-sublicensable license or access right for the Buyer&apos;s own lawful internal use.
                </p>
                <p>
                  The business overview provides that learners receive a personal, non-transferable right-to-use license for enrolled courses and may not redistribute, resell, sublicense, or re-upload course materials, while certificates are issued to the verified enrolled learner and are non-transferable.
                </p>
                <p>
                  Buyers shall not copy, resell, white-label, sublicense, share credentials for, publicly redistribute, reverse engineer, or commercially exploit purchased offerings beyond the authorized scope.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                13. Pricing, Payments, Taxes, and Billing
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar may facilitate Transactions using payment partners and payment methods supported on the Platform from time to time. The business overview lists UPI, cards, net banking, and digital wallets in Phase 1, with other mechanisms such as international cards and EMI in later phases.
                </p>
                <p>
                  All displayed prices, fees, taxes, commissions, credits, discounts, subscription charges, and billing conditions may be determined by Avatar, the relevant provider, or a combination of both, subject to disclosure at checkout or onboarding.
                </p>
                <p>
                  The business overview states that every transaction is intended to generate a GST-compliant invoice, that GST treatment may vary based on location, and that TDS may be deducted from seller or instructor payouts under Indian law.
                </p>
                <p>
                  You authorize Avatar and its payment partners to charge all applicable amounts and to process credits, reversals, settlements, payout deductions, taxes, or refund adjustments as permitted by these Terms and applicable law.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                14. Payouts, Holds, Set-Off, and Deductions
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Sellers, Instructors, Partners, and Service Providers receiving funds through the Platform acknowledge that Avatar may apply a payout workflow, holding period, dispute reserve, commission deduction, tax deduction, fee deduction, chargeback adjustment, and fraud review procedure before release of funds.
                </p>
                <p>
                  The business overview contemplates a 7-day dispute holding period before payout approval, followed by deduction of commission and TDS and transfer of the net amount to the relevant provider.
                </p>
                <p>
                  Avatar may withhold, defer, reverse, claw back, or set off payouts where necessary to address refunds, consumer complaints, fraud, technical failures, duplicate settlements, tax issues, sanctions screening, legal orders, or suspected violation of these Terms.
                </p>
              </div>
            </section>

            {/* Section 15 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                15. Subscriptions and Auto-Renewal
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Certain offerings may be sold on a recurring subscription basis, including monthly, annual, metered, bundled, professional, enterprise, or team plans. The business overview identifies recurring tool subscriptions, annual plans, bundled plans, pay-per-use access, and team or enterprise plans as part of the Platform&apos;s commercial model.
                </p>
                <p>
                  By purchasing a subscription, you authorize recurring charges at the frequency disclosed during checkout or contracting until valid cancellation or termination takes effect. Avatar may modify pricing, features, usage caps, billing cycles, bundling logic, access rules, and renewal terms upon notice as required by applicable law.
                </p>
                <p>
                  Unless otherwise stated, cancellation stops future billing cycles and does not retroactively reverse charges for the current paid period, except where refund rights expressly apply or mandatory law requires otherwise.
                </p>
              </div>
            </section>

            {/* Section 16 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                16. Refunds, Cancellations, and Disputes
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  All sales and access rights are subject to the refund, cancellation, and dispute rules communicated on the Platform and incorporated into these Terms.
                </p>
                <p>
                  The business overview provides a structured digital refund model under which tools that do not work as described and are reported within 48 hours may be eligible for refund, duplicate purchases raised within 48 hours may be auto-approved, digital products accessed and functioning as described are generally non-refundable, and certain disputes may be resolved on a case-by-case basis.
                </p>
                <p>
                  The business overview further provides that course access failures reported within 48 hours may be eligible for refund, courses accessed less than 20 percent within 7 days may be refundable, courses accessed beyond that threshold may become non-refundable, Avatar-cancelled webinars may be refunded or credited, and missed paid webinars may be serviced through recording access instead of refund.
                </p>
                <p>
                  Avatar may investigate any refund or chargeback request, seek responses from affected counterparties, require supporting evidence, issue a full refund, partial refund, wallet credit, replacement access, rescheduled access, or rejection, and designate the final Platform resolution in accordance with its internal dispute process.
                </p>
                <p>
                  The business overview also contemplates a structured dispute workflow under which a complaint is logged, reviewed by Avatar, responded to by the relevant seller or provider, and resolved within defined service levels, with repeat offenders subject to account review.
                </p>
                <p>
                  Marketplace entities in India are also expected to publish return, refund, exchange, warranty, guarantee, delivery, payment, and grievance information clearly and prominently.
                </p>
              </div>
            </section>

            {/* Section 17 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                17. Intellectual Property Framework
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar retains all rights, title, and interest in and to the Platform itself, including website design, software, code, workflows, databases, data models, user interface, recommendation systems, branding, trademarks, logos, trade dress, certifications, and proprietary first-party content, except for third-party materials lawfully provided by users.
                </p>
                <p>
                  The business overview states that Sellers retain ownership of their tools, automation scripts, prompts, APIs, agents, and related product IP, while Avatar receives a non-exclusive, royalty-free license to display, promote, and distribute such tools on the Platform and related marketing channels.
                </p>
                <p>
                  The business overview also states that third-party educator course IP remains with the instructor, partner course IP remains with the partner, Avatar-owned webinars and certificates belong to Avatar, and co-branded courses are governed by the applicable co-development arrangement.
                </p>
                <p>
                  No transfer of ownership occurs merely because content is listed, purchased, viewed, or delivered through the Platform unless a separate written assignment expressly states otherwise.
                </p>
              </div>
            </section>

            {/* Section 18 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                18. User Content License
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  To the extent you upload, submit, publish, transmit, post, or otherwise make available any listing content, screenshots, demo assets, descriptions, reviews, ratings, profile materials, course materials, discussion posts, or other materials on or through the Platform, you grant Avatar a worldwide, non-exclusive, royalty-free, sublicensable, transferable, revocable only upon lawful delisting, and technically necessary license to host, copy, store, format, reproduce, display, adapt for interface purposes, market, distribute, moderate, analyze, and use such materials for Platform operations, promotion, compliance, recommendation, fraud prevention, archival, dispute resolution, and service improvement.
                </p>
                <p>
                  The business overview similarly contemplates that user community posts remain user-owned while Avatar receives a display license, and that marketplace content is licensed to Avatar for display and distribution purposes rather than transferred in ownership.
                </p>
              </div>
            </section>

            {/* Section 19 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                19. Reviews, Ratings, and Community Features
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  The Platform may allow reviews, ratings, comments, Q&A, forums, event participation, and other interactive features. Such features exist to support transparency, community engagement, and consumer decision-making.
                </p>
                <p>
                  Users must ensure that all review and community contributions are honest, experience-based, lawful, and non-abusive. Avatar may remove, suppress, refuse, investigate, or preserve any such content where necessary for quality control, legal compliance, fraud detection, evidence preservation, or protection of users and the Platform.
                </p>
              </div>
            </section>

            {/* Section 20 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                20. Takedown, IP Complaints, and Notice Mechanism
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Any person claiming that content on the Platform infringes copyright, trademark, proprietary rights, privacy rights, or other legal rights may submit a written notice to Avatar containing sufficient particulars of the complainant, the alleged rights, the disputed material, the relevant URL or listing, supporting evidence, and a declaration of good faith.
                </p>
                <p>
                  Avatar may remove, disable, geo-block, flag, de-index, or temporarily suspend access to disputed material; seek a response or counter-notice from the affected user; preserve records; and take further action against repeat infringers or malicious actors.
                </p>
                <p>
                  The business overview contemplates a takedown-style process for IP complaints relating to marketplace listings.
                </p>
                <p>
                  Avatar&apos;s response mechanism is also relevant to maintenance of intermediary due diligence, as Indian law recognizes safe harbour for intermediaries subject to statutory conditions and due diligence obligations.
                </p>
              </div>
            </section>

            {/* Section 21 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                21. Privacy, Data Security, and Compliance Cooperation
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Processing of personal data through the Platform is governed by the separate Privacy Policy. Users agree that Avatar may collect, store, process, use, disclose, and retain personal data in accordance with that policy and applicable law.
                </p>
                <p>
                  The business overview treats Avatar as data fiduciary for platform-level user and analytics data and links such data governance to the Digital Personal Data Protection Act, 2023.
                </p>
                <p>
                  The Digital Personal Data Protection Act, 2023 provides for consent-based and lawful processing, rights relating to access, correction, erasure, grievance redressal, and duties on data fiduciaries to implement reasonable security safeguards.
                </p>
                <p>
                  Users shall cooperate with reasonable compliance requests relating to identity verification, security reviews, fraud investigations, legal notices, tax matters, sanctions screening, regulatory inquiries, and data subject rights administration.
                </p>
              </div>
            </section>

            {/* Section 22 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                22. Intermediary Status and Allocation of Liability
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar&apos;s role is limited to the extent described in these Terms and the Platform architecture. As reflected in the business overview, Avatar&apos;s core responsibilities include operating the Platform, managing onboarding and listing review, processing or facilitating payments, operating dispute and refund systems, protecting platform-level user data, and ensuring the quality of Avatar&apos;s own first-party offerings.
                </p>
                <p>
                  The business overview separately allocates primary liability for third-party tool performance, legality, and IP ownership to Sellers; primary liability for third-party course quality and educational content to Instructors or Partners; responsibility for platform-level data breach to Avatar; and responsibility for technical or access issues in Avatar-hosted webinars or post-payment platform access failures to Avatar.
                </p>
                <p>
                  Section 79 of the Information Technology Act recognizes that an intermediary is not liable for third-party information, data, or communication links made available or hosted by it, subject to statutory conditions.
                </p>
                <p>
                  Nothing in these Terms shall be interpreted as Avatar assuming legal responsibility for third-party content merely by hosting, reviewing, ranking, processing payment for, or facilitating access to such content, except to the extent liability cannot be excluded by law or arises from Avatar&apos;s own independent act, omission, first-party representation, or statutory obligation.
                </p>
              </div>
            </section>

            {/* Section 23 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                23. Disclaimer of Warranties
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  The Platform and all offerings, whether first-party or third-party, are provided on an &quot;as is,&quot; &quot;as available,&quot; and &quot;with all faults&quot; basis to the fullest extent permitted by law.
                </p>
                <p>
                  Avatar does not warrant uninterrupted availability, merchantability, fitness for a particular purpose, non-infringement, compatibility, profitability, educational outcomes, commercial success, legal sufficiency for a user&apos;s specific business purpose, error-free operation, or freedom from all harmful components, especially in relation to third-party offerings.
                </p>
                <p>
                  The business overview specifically distinguishes Avatar&apos;s intermediary role from the responsibility of third-party sellers and instructors for their own offerings.
                </p>
              </div>
            </section>

            {/* Section 24 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                24. Limitation of Liability
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  To the maximum extent permitted by law, Avatar, its affiliates, officers, directors, employees, shareholders, consultants, contractors, licensors, and service providers shall not be liable for any indirect, incidental, consequential, special, exemplary, punitive, or speculative damages, including loss of profits, revenue, goodwill, anticipated savings, business opportunity, data, reputation, or business interruption, arising out of or in connection with the Platform or any Transaction.
                </p>
                <p>
                  Without prejudice to any non-excludable statutory rights, Avatar&apos;s aggregate liability arising from any claim or series of related claims shall not exceed the lower of: (a) the amount actually received by Avatar from the claimant in the 3 months preceding the event giving rise to the claim, or (b) INR 10,000, unless a different cap is mandatory under applicable law or separately agreed in writing.
                </p>
                <p>
                  Nothing in these Terms excludes liability that cannot lawfully be excluded or limited.
                </p>
              </div>
            </section>

            {/* Section 25 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                25. Indemnity
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">You agree to defend, indemnify, and hold harmless Avatar and its affiliates, officers, directors, employees, contractors, agents, and service providers from and against any claims, proceedings, losses, liabilities, damages, penalties, taxes, interest, costs, and expenses, including legal fees, arising out of or relating to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>your breach of these Terms;</li>
                  <li>your content, listing, service, course, tool, dataset, or other offering;</li>
                  <li>your violation of law or third-party rights;</li>
                  <li>your infringement of intellectual property, privacy, consumer, tax, or regulatory rights;</li>
                  <li>your fraud, negligence, wilful misconduct, or deceptive trade practice; or</li>
                  <li>your failure to obtain required permissions, licenses, or consents.</li>
                </ul>
                <p>
                  The business overview expressly contemplates vendor indemnity against IP claims and seller responsibility for unlawful or infringing listings.
                </p>
              </div>
            </section>

            {/* Section 26 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                26. Suspension, Restriction, Delisting, and Termination
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar may, with or without prior notice, suspend, restrict, disable, delist, demonetize, geo-block, de-rank, hold payouts, terminate access, cancel orders, or shut down accounts where Avatar reasonably believes there is fraud, security risk, legal exposure, policy breach, rights infringement, abuse of refunds, harmful content, sanctions concern, non-payment, repeated complaints, or other material risk to users or the Platform.
                </p>
                <p>
                  Users may stop using the Platform at any time, subject to survival of payment obligations, dispute obligations, licensing rights required for prior transactions, retained records, indemnities, and other clauses intended to survive termination.
                </p>
              </div>
            </section>

            {/* Section 27 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                27. Communications and Electronic Records
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  You consent to receive communications from Avatar electronically, including by email, SMS, in-app notification, dashboard notice, or Platform posting. Such communications may include OTPs, invoices, dispute notices, policy updates, service messages, legal notices, reminders, and commercial communications subject to your preferences and applicable law.
                </p>
                <p>
                  Electronic records, support tickets, logs, audit trails, invoices, chat records, verification records, and screenshots maintained by Avatar may be relied upon for operational, evidentiary, and dispute purposes, subject to applicable law.
                </p>
              </div>
            </section>

            {/* Section 28 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                28. Grievance Redressal and Consumer Interface
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar shall maintain a grievance redressal channel for complaints relating to transactions, listings, refunds, access issues, user conduct, privacy concerns, IP notices, and other Platform matters.
                </p>
                <p>
                  Indian e-commerce rules require marketplace entities to appoint a grievance officer, acknowledge complaints within 48 hours, and redress complaints within one month.
                </p>
                <p>
                  Users should submit complaints through the designated Platform mechanism with sufficient transaction details, account information, and evidence to enable resolution.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Grievance Officer</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> Richa Rathod</p>
                    <p><strong>Email:</strong> <a href="mailto:cs@aslindustries.in" className="text-[#1a2535] hover:underline">cs@aslindustries.in</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+918097207334" className="text-[#1a2535] hover:underline">+91 8097207334</a></p>
                    <p><strong>Address:</strong> NESCO IT Park, 10th Floor Building 4, Goregaon East, Mumbai-400063, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 29 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                29. Mandatory Regulatory Disclosures
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  To support Indian e-commerce compliance, Avatar should prominently display on the website its legal name, principal geographic address of headquarters and branches, website details, customer care contact details, grievance officer details, and key policy disclosures relating to returns, refunds, exchange, warranty, guarantee, delivery, payment methods, and dispute resolution.
                </p>
                <p>
                  If any listed offering falls within a regulated sector, including financial, health, education, legal, or other restricted domains, the relevant provider remains responsible for obtaining and maintaining all required permissions, disclosures, disclaimers, and approvals. The business overview notes that SEBI-related considerations may arise if financial or investment AI tools are listed.
                </p>
              </div>
            </section>

            {/* Section 30 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                30. Changes to Terms and Platform
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar may modify the Platform, discontinue features, add restrictions, revise pricing, change technical specifications, alter policies, and amend these Terms from time to time. Updated versions shall be posted on the Platform with the revised date.
                </p>
                <p>
                  Continued use of the Platform after such update shall constitute acceptance of the revised Terms to the extent permitted by law. Where required, Avatar may seek express acceptance for material changes.
                </p>
              </div>
            </section>

            {/* Section 31 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                31. Force Majeure
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar shall not be liable for delay or failure in performance caused by events beyond its reasonable control, including natural disasters, cyber incidents, infrastructure outage, internet failure, governmental restrictions, pandemic events, labor unrest, payment network failure, cloud service disruption, or acts of God.
                </p>
                <p>
                  This clause does not excuse obligations that cannot lawfully be excluded, including statutory consumer obligations where applicable.
                </p>
              </div>
            </section>

            {/* Section 32 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                32. Governing Law and Jurisdiction
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India.
                </p>
                <p>
                  Subject to any non-waivable statutory rights or consumer forum rights, the courts at Mumbai, Maharashtra shall have exclusive jurisdiction over disputes arising out of or relating to these Terms or the Platform.
                </p>
              </div>
            </section>

            {/* Section 33 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                33. Miscellaneous
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions shall continue in full force to the extent permitted by law.
                </p>
                <p>
                  Avatar&apos;s failure to enforce any provision shall not constitute a waiver. No waiver shall be effective unless made in writing by Avatar.
                </p>
                <p>
                  You may not assign or transfer your rights or obligations under these Terms without Avatar&apos;s prior written consent. Avatar may assign these Terms or any rights and obligations under them to an affiliate, successor, acquirer, or financing party.
                </p>
                <p>
                  These Terms, together with the Privacy Policy and any applicable supplemental terms, constitute the entire agreement between the parties in relation to the Platform and supersede prior online understandings relating to the same subject matter.
                </p>
              </div>
            </section>

            {/* Section 34 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                34. Contact Details
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Avatar Industries Limited</h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Website:</strong>{' '}
                      <Link href="https://www.avatarindia.com" className="text-[#1a2535] hover:underline">
                        www.avatarindia.com
                      </Link>
                    </p>
                    <p>
                      <strong>Support Email:</strong>{' '}
                      <a href="mailto:cs@aslindustries.in" className="text-[#1a2535] hover:underline">
                        cs@aslindustries.in
                      </a>
                    </p>
                    <p>
                      <strong>Customer Care Number:</strong>{' '}
                      <a href="tel:+918097207334" className="text-[#1a2535] hover:underline">
                        +91 8097207334
                      </a>
                    </p>
                    <p>
                      <strong>Registered Office:</strong> NESCO IT Park, 10th Floor Building 4, Goregaon East, Mumbai-400063, Maharashtra, India
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-300">
                    <h4 className="text-base font-bold text-slate-900 mb-3">Grievance Officer</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> Richa Rathod</p>
                      <p>
                        <strong>Email ID:</strong>{' '}
                        <a href="mailto:cs@aslindustries.in" className="text-[#1a2535] hover:underline">
                          cs@aslindustries.in
                        </a>
                      </p>
                      <p>
                        <strong>Phone Number:</strong>{' '}
                        <a href="tel:+918097207334" className="text-[#1a2535] hover:underline">
                          +91 8097207334
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a2535] flex items-center justify-center shrink-0 mt-1">
                    <i className="fas fa-file-contract text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Agreement Notice</h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-3">
                      By using the Avatar AI Marketplace Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you have any questions or concerns, please contact our Grievance Officer using the details provided above.
                    </p>
                    <p className="text-xs text-slate-500">
                      These terms are designed to comply with the Information Technology Act, 2000, Digital Personal Data Protection Act, 2023, Consumer Protection (E-Commerce) Rules, 2020, and other applicable Indian laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
