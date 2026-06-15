import Link from 'next/link';

const sections = [
  { id: 'introduction', title: '1. Introduction and Acceptance' },
  { id: 'definitions', title: '2. Definitions' },
  { id: 'nature', title: '3. Nature of the Platform and Avatar\'s Role' },
  { id: 'eligibility', title: '4. Eligibility and Capacity' },
  { id: 'accounts', title: '5. User Accounts and Verification' },
  { id: 'categories', title: '6. User Categories and Role-Specific Obligations' },
  { id: 'services', title: '7. Platform Services and Permitted Use' },
  { id: 'prohibited', title: '8. Prohibited Conduct' },
  { id: 'listing', title: '9. Listing Standards and Approval Rights' },
  { id: 'seller', title: '10. Seller Warranties and Responsibilities' },
  { id: 'instructor', title: '11. Instructor, Partner, and Service Provider Responsibilities' },
  { id: 'purchases', title: '12. Purchases, Access, and License Scope' },
  { id: 'pricing', title: '13. Pricing, Payments, Taxes, and Billing' },
  { id: 'payouts', title: '14. Payouts, Holds, Set-Off, and Deductions' },
  { id: 'subscriptions', title: '15. Subscriptions and Auto-Renewal' },
  { id: 'refunds', title: '16. Refunds, Cancellations, and Disputes' },
  { id: 'ip', title: '17. Intellectual Property Framework' },
  { id: 'user-content', title: '18. User Content License' },
  { id: 'reviews', title: '19. Reviews, Ratings, and Community Features' },
  { id: 'takedown', title: '20. Takedown, IP Complaints, and Notice Mechanism' },
  { id: 'privacy', title: '21. Privacy, Data Security, and Compliance Cooperation' },
  { id: 'intermediary', title: '22. Intermediary Status and Allocation of Liability' },
  { id: 'disclaimer', title: '23. Disclaimer of Warranties' },
  { id: 'liability', title: '24. Limitation of Liability' },
  { id: 'indemnity', title: '25. Indemnity' },
  { id: 'suspension', title: '26. Suspension, Restriction, Delisting, and Termination' },
  { id: 'communications', title: '27. Communications and Electronic Records' },
  { id: 'grievance', title: '28. Grievance Redressal and Consumer Interface' },
  { id: 'regulatory', title: '29. Mandatory Regulatory Disclosures' },
  { id: 'changes', title: '30. Changes to Terms and Platform' },
  { id: 'force-majeure', title: '31. Force Majeure' },
  { id: 'governing-law', title: '32. Governing Law and Jurisdiction' },
  { id: 'miscellaneous', title: '33. Miscellaneous' },
  { id: 'contact', title: '34. Contact Details' },
];

export default function TermsAndConditionsPage() {
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
            Avatar Industries Limited · Version 1.0
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Terms &amp; <span className="text-slate-300">Conditions</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Terms &amp; Conditions</span>
          </div>
        </div>
      </div>

      {/* ─── Meta Bar ─── */}
      <div className="bg-[#1a2535] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <span><span className="text-slate-300 font-semibold">Platform:</span> Avatar AI Marketplace</span>
          <span className="hidden sm:block text-slate-600">|</span>
          <span><span className="text-slate-300 font-semibold">Website:</span> www.avatarindia.com</span>
          <span className="hidden sm:block text-slate-600">|</span>
          <span><span className="text-slate-300 font-semibold">Effective Date:</span> June 12, 2026</span>
          <span className="hidden sm:block text-slate-600">|</span>
          <span><span className="text-slate-300 font-semibold">Entity:</span> Avatar Industries Limited</span>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="py-12 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex gap-10 items-start">

          {/* ── Sticky TOC Sidebar ── */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1a2535] px-5 py-4">
                <p className="text-white font-bold text-sm">Table of Contents</p>
                <p className="text-slate-400 text-xs mt-0.5">34 sections</p>
              </div>
              <nav className="px-3 py-3 max-h-[80vh] overflow-y-auto">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Article Body ── */}
          <article className="flex-1 min-w-0 space-y-6">

            {/* Introduction */}
            <Section id="introduction" title="1. Introduction and Acceptance">
              <p>
                These Terms &amp; Conditions (&quot;Terms&quot;) constitute a legally binding agreement between
                <strong> Avatar Industries Limited</strong>, together with its affiliates, successors, and permitted
                assigns (&quot;Avatar,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), and any person or entity accessing or
                using the Avatar AI Marketplace through www.avatarindia.com, any subdomain, mobile site, mobile
                application, dashboard, API, communication channel, or related digital interface (collectively, the
                &quot;Platform&quot;).
              </p>
              <p>
                The Platform is designed as India&apos;s AI marketplace ecosystem combining an AI tools marketplace, AI
                education offerings, AI services, community features, and related digital products and services.
              </p>
              <p>
                By accessing, browsing, registering on, listing on, purchasing from, enrolling through, subscribing to,
                or otherwise using the Platform, you acknowledge that you have read, understood, and agreed to be bound
                by these Terms, the separate Privacy Policy, and all supplemental rules, guidelines, schedules, notices,
                and operational policies published by Avatar from time to time.
              </p>
              <Callout type="warning">If you do not agree to these Terms, you must not access or use the Platform.</Callout>
            </Section>

            {/* Definitions */}
            <Section id="definitions" title="2. Definitions">
              <p>For the purposes of these Terms:</p>
              <DefinitionList items={[
                { term: 'Buyer', def: 'A user who purchases, licenses, subscribes to, enrolls in, books, or otherwise acquires access to any tool, course, webinar, service, template, dataset, API, automation, or other offering made available through the Platform.' },
                { term: 'Seller', def: 'An individual or business user who lists or offers AI tools, automations, templates, agents, APIs, scripts, datasets, mini-SaaS products, or other digital offerings through the Platform.' },
                { term: 'Instructor', def: 'An individual educator or trainer who offers courses, bootcamps, live classes, workshops, educational materials, or related content through the Platform.' },
                { term: 'Partner', def: 'Any company, institution, organization, or other entity collaborating with Avatar in relation to licensed content, co-branded courses, affiliate listings, enterprise offerings, events, or other marketplace arrangements.' },
                { term: 'Service Provider / Freelancer', def: 'A user offering consulting, implementation, automation, AI agent building, or other services through the Platform\'s services layer.' },
                { term: 'Content', def: 'Text, graphics, logos, code, datasets, prompts, videos, documents, listings, descriptions, screenshots, audio, images, reviews, ratings, comments, messages, and all other materials made available on or through the Platform.' },
                { term: 'User', def: 'Any visitor, registered member, Buyer, Seller, Instructor, Partner, Service Provider, attendee, or other person accessing or using the Platform.' },
                { term: 'Transaction', def: 'Any purchase, sale, enrollment, booking, subscription, payment, refund, payout, or related commercial event conducted or initiated through the Platform.' },
              ]} />
            </Section>

            {/* Nature */}
            <Section id="nature" title="3. Nature of the Platform and Avatar's Role">
              <p>
                Avatar operates the Platform as a technology-enabled intermediary marketplace and ecosystem that
                facilitates discovery, listing, onboarding, payments, subscriptions, access management, educational
                participation, community engagement, and related interactions among users.
              </p>
              <p>
                Avatar&apos;s business overview expressly states that the Platform acts as an intermediary connecting
                sellers and buyers and is <strong>not</strong> the creator of third-party tools or courses listed by
                vendors and education partners.
              </p>
              <p>
                Accordingly, unless expressly identified otherwise, Avatar does not manufacture, create, own, control,
                test, certify, guarantee, or endorse third-party offerings listed or provided by Sellers, Instructors,
                Partners, or Service Providers.
              </p>
              <p>
                Avatar may, however, independently create, host, own, license, market, and deliver certain first-party
                offerings, including Avatar-hosted webinars, proprietary content, certificates, and future
                Avatar-branded SaaS or bundled services, in which case Avatar acts as the direct provider.
              </p>
              <p>
                Avatar may rely on statutory intermediary protections where applicable, including the principle that an
                intermediary is not liable for third-party information hosted by it subject to legal conditions and due
                diligence.
              </p>
            </Section>

            {/* Eligibility */}
            <Section id="eligibility" title="4. Eligibility and Capacity">
              <p>
                You may use the Platform only if you are legally competent to enter into a binding contract under
                applicable law. If you use the Platform on behalf of a company, LLP, partnership, sole proprietorship,
                educational institution, trust, or other legal entity, you represent and warrant that you are duly
                authorized to bind such entity to these Terms.
              </p>
              <p>
                Individual sellers must be at least <strong>18 years old</strong> and complete applicable verification
                requirements before listings go live.
              </p>
              <p>
                Avatar may refuse access, registration, onboarding, or continued use to any person or entity that fails
                to meet legal, policy, verification, compliance, risk, or quality requirements.
              </p>
            </Section>

            {/* Accounts */}
            <Section id="accounts" title="5. User Accounts and Verification">
              <p>
                Certain features of the Platform require account creation, login credentials, OTP verification, profile
                completion, or role-specific onboarding. Avatar may require email verification, mobile verification,
                KYC, tax details, banking information, business registration information, and supporting documentation
                depending on the nature of the account.
              </p>
              <p>
                Users acting in their personal capacity as an individual seller, service provider, or instructor are
                required to submit documents establishing both identity and business activity, such as Udyam
                Registration Certificate, Shop and Establishment License, professional certificates demonstrating
                expertise, and any other statutory documents required by Avatar.
              </p>
              <p>
                Business entities — companies, partnerships, or other business forms — must provide documents applicable
                to their specific legal form such as Certificate of Incorporation, Partnership Deed, Entity PAN, GST
                registration certificates, and any other statutory or tax-related records required by Avatar.
              </p>
              <p>
                You agree to provide accurate, complete, and updated information and to maintain the confidentiality of
                login credentials. You are responsible for all acts and omissions occurring through your account.
              </p>
              <Callout type="info">
                Avatar may suspend, restrict, or terminate any account found to contain false information, unauthorized
                use, deceptive identity claims, or incomplete compliance documents.
              </Callout>
            </Section>

            {/* Categories */}
            <Section id="categories" title="6. User Categories and Role-Specific Obligations">
              <p>
                The Platform may support different categories of users, including visitors, Buyers, Sellers,
                Instructors, Partners, Service Providers, enterprise clients, webinar attendees, and community
                participants.
              </p>
              <p>
                Avatar may impose different contractual, commercial, onboarding, tax, content, quality, technical,
                moderation, payout, reporting, and support obligations depending on the user&apos;s role, risk profile, or
                transaction type.
              </p>
              <p>
                Any additional role-specific policy, commercial schedule, order form, statement of work, onboarding
                document, or platform notice shall be read together with these Terms. In case of conflict, the more
                specific signed or role-specific document shall prevail to the extent of the inconsistency.
              </p>
            </Section>

            {/* Services */}
            <Section id="services" title="7. Platform Services and Permitted Use">
              <p>The Platform may include one or more of the following services and features:</p>
              <BulletList items={[
                'Listing and sale of AI tools, automations, prompt packs, agents, APIs, scripts, mini-SaaS tools, templates, and datasets.',
                'Listing and delivery of self-paced courses, live online classes, mini-courses, bootcamps, and partner company educational programs.',
                'Avatar-hosted live webinars, workshops, sessions, events, certificates, and recordings.',
                'Freelancer or service-based engagement opportunities involving AI consulting, automation, and related project work.',
                'Community participation, messaging, reviews, ratings, discussion forums, dashboards, analytics, and recommendation features.',
              ]} />
              <p className="mt-4">
                Users may use the Platform solely for lawful business, learning, professional, and consumer purposes
                contemplated by the Platform architecture. Any use outside such scope, including illegal exploitation,
                data theft, impersonation, malware propagation, deceptive resale, or regulatory evasion, is prohibited.
              </p>
            </Section>

            {/* Prohibited */}
            <Section id="prohibited" title="8. Prohibited Conduct">
              <p>You shall not, directly or indirectly:</p>
              <BulletList items={[
                'Violate any applicable law, regulation, order, or third-party right.',
                'List, upload, publish, transmit, sell, promote, or distribute infringing, illegal, deceptive, unsafe, harmful, defamatory, fraudulent, obscene, or unauthorized content.',
                'Upload or distribute malware, spyware, ransomware, botnets, backdoors, unauthorized scrapers, destructive code, hidden payloads, or tools designed primarily for unlawful surveillance, credential theft, or cyber abuse.',
                'Misrepresent the ownership, source, features, pricing, quality, compliance status, certification, endorsements, or capabilities of any offering.',
                'Circumvent Platform fees, commissions, payment rails, subscription controls, access restrictions, verification systems, dispute systems, or moderation tools.',
                'Reverse engineer, scrape, reproduce, mirror, frame, or systematically extract Platform data except as permitted by law or written consent.',
                'Interfere with Platform performance, security, uptime, availability, or infrastructure.',
                'Use the Platform to harass, threaten, extort, spam, phish, or impersonate any person.',
                'Submit false disputes, abusive takedown notices, fake reviews, fabricated evidence, or fraudulent refund claims.',
              ]} />
              <p className="mt-4">
                Sellers are expressly prohibited from listing tools that violate copyright, contain malware, or produce
                illegal outputs. Indian e-commerce rules also expect marketplace entities to avoid unfair trade
                practices and maintain transparent dealings with consumers.
              </p>
            </Section>

            {/* Listing */}
            <Section id="listing" title="9. Listing Standards and Approval Rights">
              <p>
                All marketplace listings are subject to Avatar&apos;s onboarding, review, compliance, editorial, legal,
                technical, and quality checks. Avatar may require mandatory listing fields such as title, detailed
                description, category, tags, screenshots, demo video, usage guide, pricing model, and ownership
                declaration before a listing is published.
              </p>
              <p>
                Seller onboarding and listing approvals are reviewed by Avatar administrators before going live.
              </p>
              <p>
                Avatar reserves the absolute right to approve, reject, edit formatting, request changes, delay
                publication, delist, disable, downgrade visibility, remove, or archive any listing, course, service
                profile, webinar page, or user-generated material for reasons including legality, policy breach, poor
                quality, consumer complaints, security risk, misleading claims, copyright concerns, malware concerns,
                outdated content, reputational risk, or regulatory exposure.
              </p>
            </Section>

            {/* Seller */}
            <Section id="seller" title="10. Seller Warranties and Responsibilities">
              <p>Each Seller represents, warrants, and undertakes that:</p>
              <BulletList items={[
                'It owns or controls all rights necessary to list, license, sell, and distribute the relevant tool or digital product.',
                'The listing is accurate, complete, and not misleading.',
                'The offered tool is lawful, operational as described, and does not intentionally contain malware, hidden code, or unlawful functionality.',
                'It will maintain and support the offering in accordance with applicable listing commitments.',
                'It will respond to Buyer queries and disputes within the timelines prescribed by Avatar.',
                'It will maintain all applicable tax registrations, statutory records, and business compliance relevant to its activities.',
                'It will indemnify Avatar against claims arising from its offering, conduct, content, IP breach, misleading representation, tax non-compliance, or legal violation.',
              ]} />
              <Callout type="info">
                Sellers must respond to buyer queries within <strong>3 business days</strong> and must update or delist
                broken tools within <strong>14 days</strong> of being flagged. Avatar is not liable for tool
                performance issues.
              </Callout>
            </Section>

            {/* Instructor */}
            <Section id="instructor" title="11. Instructor, Partner, and Service Provider Responsibilities">
              <p>Each Instructor, Partner, or Service Provider represents, warrants, and undertakes that:</p>
              <BulletList items={[
                'All educational or service content provided through the Platform is accurate, original or duly licensed, and legally compliant.',
                'All promised sessions, deliverables, course materials, support commitments, and representations are fulfilled as described.',
                'All content will be updated where necessary to address material changes in underlying tools, APIs, or technologies.',
                'All required rights, permissions, teaching credentials, licenses, and approvals are validly held by the relevant provider.',
                'Avatar may rely on the provider\'s representations in publishing and delivering the offering.',
              ]} />
              <p className="mt-4">
                Instructors and partner companies are responsible for the accuracy, quality, originality, and legal
                ownership of their course materials. Avatar is not responsible for educational outcomes of third-party
                content.
              </p>
            </Section>

            {/* Purchases */}
            <Section id="purchases" title="12. Purchases, Access, and License Scope">
              <p>
                A Buyer purchasing or enrolling in any offering through the Platform receives only the rights expressly
                granted in the applicable listing, order flow, or product page. Unless otherwise expressly stated in
                writing, every purchase is a limited, non-exclusive, non-transferable, non-sublicensable license or
                access right for the Buyer&apos;s own lawful internal use.
              </p>
              <p>
                Learners receive a personal, non-transferable right-to-use license for enrolled courses and may not
                redistribute, resell, sublicense, or re-upload course materials. Certificates are issued to the
                verified enrolled learner and are non-transferable.
              </p>
              <p>
                Buyers shall not copy, resell, white-label, sublicense, share credentials for, publicly redistribute,
                reverse engineer, or commercially exploit purchased offerings beyond the authorized scope.
              </p>
            </Section>

            {/* Pricing */}
            <Section id="pricing" title="13. Pricing, Payments, Taxes, and Billing">
              <p>
                Avatar may facilitate Transactions using payment partners and payment methods supported on the Platform
                from time to time, including UPI, cards, net banking, and digital wallets, with international cards and
                EMI in later phases.
              </p>
              <p>
                All displayed prices, fees, taxes, commissions, credits, discounts, subscription charges, and billing
                conditions may be determined by Avatar, the relevant provider, or a combination of both, subject to
                disclosure at checkout or onboarding.
              </p>
              <p>
                Every transaction is intended to generate a <strong>GST-compliant invoice</strong>. GST treatment may
                vary based on location, and <strong>TDS</strong> may be deducted from seller or instructor payouts
                under Indian law.
              </p>
              <p>
                You authorize Avatar and its payment partners to charge all applicable amounts and to process credits,
                reversals, settlements, payout deductions, taxes, or refund adjustments as permitted by these Terms and
                applicable law.
              </p>
            </Section>

            {/* Payouts */}
            <Section id="payouts" title="14. Payouts, Holds, Set-Off, and Deductions">
              <p>
                Sellers, Instructors, Partners, and Service Providers receiving funds through the Platform acknowledge
                that Avatar may apply a payout workflow, holding period, dispute reserve, commission deduction, tax
                deduction, fee deduction, chargeback adjustment, and fraud review procedure before release of funds.
              </p>
              <Callout type="info">
                A <strong>7-day dispute holding period</strong> applies before payout approval, followed by deduction
                of commission and TDS before transfer of the net amount to the relevant provider.
              </Callout>
              <p>
                Avatar may withhold, defer, reverse, claw back, or set off payouts where necessary to address refunds,
                consumer complaints, fraud, technical failures, duplicate settlements, tax issues, sanctions screening,
                legal orders, or suspected violation of these Terms.
              </p>
            </Section>

            {/* Subscriptions */}
            <Section id="subscriptions" title="15. Subscriptions and Auto-Renewal">
              <p>
                Certain offerings may be sold on a recurring subscription basis, including monthly, annual, metered,
                bundled, professional, enterprise, or team plans. Subscription models include recurring tool
                subscriptions, annual plans, bundled plans, pay-per-use access, and team or enterprise plans.
              </p>
              <p>
                By purchasing a subscription, you authorize recurring charges at the frequency disclosed during
                checkout or contracting until valid cancellation or termination takes effect. Avatar may modify
                pricing, features, usage caps, billing cycles, bundling logic, access rules, and renewal terms upon
                notice as required by applicable law.
              </p>
              <p>
                Unless otherwise stated, cancellation stops future billing cycles and does not retroactively reverse
                charges for the current paid period, except where refund rights expressly apply or mandatory law
                requires otherwise.
              </p>
            </Section>

            {/* Refunds */}
            <Section id="refunds" title="16. Refunds, Cancellations, and Disputes">
              <p>All sales and access rights are subject to the refund, cancellation, and dispute rules communicated on the Platform.</p>

              <SubHeading>Tools &amp; Digital Products</SubHeading>
              <BulletList items={[
                'Tools that do not work as described and are reported within 48 hours may be eligible for refund.',
                'Duplicate purchases raised within 48 hours may be auto-approved.',
                'Digital products accessed and functioning as described are generally non-refundable.',
                'Certain disputes may be resolved on a case-by-case basis.',
              ]} />

              <SubHeading>Courses &amp; Webinars</SubHeading>
              <BulletList items={[
                'Course access failures reported within 48 hours may be eligible for refund.',
                'Courses accessed less than 20% within 7 days may be refundable.',
                'Courses accessed beyond that threshold may become non-refundable.',
                'Avatar-cancelled webinars may be refunded or credited.',
                'Missed paid webinars may be serviced through recording access instead of refund.',
              ]} />

              <p className="mt-4">
                Avatar may investigate any refund or chargeback request, seek responses from affected counterparties,
                require supporting evidence, and issue a full refund, partial refund, wallet credit, replacement
                access, rescheduled access, or rejection, designating the final Platform resolution in accordance with
                its internal dispute process.
              </p>
              <p>
                Marketplace entities in India are also expected to publish return, refund, exchange, warranty,
                guarantee, delivery, payment, and grievance information clearly and prominently.
              </p>
            </Section>

            {/* IP */}
            <Section id="ip" title="17. Intellectual Property Framework">
              <p>
                Avatar retains all rights, title, and interest in and to the Platform itself, including website design,
                software, code, workflows, databases, data models, user interface, recommendation systems, branding,
                trademarks, logos, trade dress, certifications, and proprietary first-party content, except for
                third-party materials lawfully provided by users.
              </p>
              <BulletList items={[
                'Sellers retain ownership of their tools, automation scripts, prompts, APIs, agents, and related product IP. Avatar receives a non-exclusive, royalty-free license to display, promote, and distribute such tools on the Platform and related marketing channels.',
                'Third-party educator course IP remains with the instructor; partner course IP remains with the partner.',
                'Avatar-owned webinars and certificates belong to Avatar.',
                'Co-branded courses are governed by the applicable co-development arrangement.',
              ]} />
              <p className="mt-4">
                No transfer of ownership occurs merely because content is listed, purchased, viewed, or delivered
                through the Platform unless a separate written assignment expressly states otherwise.
              </p>
            </Section>

            {/* User Content */}
            <Section id="user-content" title="18. User Content License">
              <p>
                To the extent you upload, submit, publish, transmit, post, or otherwise make available any listing
                content, screenshots, demo assets, descriptions, reviews, ratings, profile materials, course materials,
                discussion posts, or other materials on or through the Platform, you grant Avatar a worldwide,
                non-exclusive, royalty-free, sublicensable, transferable, revocable only upon lawful delisting, and
                technically necessary license to host, copy, store, format, reproduce, display, adapt for interface
                purposes, market, distribute, moderate, analyze, and use such materials for Platform operations,
                promotion, compliance, recommendation, fraud prevention, archival, dispute resolution, and service
                improvement.
              </p>
              <p>
                User community posts remain user-owned while Avatar receives a display license. Marketplace content is
                licensed to Avatar for display and distribution purposes rather than transferred in ownership.
              </p>
            </Section>

            {/* Reviews */}
            <Section id="reviews" title="19. Reviews, Ratings, and Community Features">
              <p>
                The Platform may allow reviews, ratings, comments, Q&amp;A, forums, event participation, and other
                interactive features. Such features exist to support transparency, community engagement, and consumer
                decision-making.
              </p>
              <p>
                Users must ensure that all review and community contributions are honest, experience-based, lawful, and
                non-abusive. Avatar may remove, suppress, refuse, investigate, or preserve any such content where
                necessary for quality control, legal compliance, fraud detection, evidence preservation, or protection
                of users and the Platform.
              </p>
            </Section>

            {/* Takedown */}
            <Section id="takedown" title="20. Takedown, IP Complaints, and Notice Mechanism">
              <p>
                Any person claiming that content on the Platform infringes copyright, trademark, proprietary rights,
                privacy rights, or other legal rights may submit a written notice to Avatar containing sufficient
                particulars of the complainant, the alleged rights, the disputed material, the relevant URL or listing,
                supporting evidence, and a declaration of good faith.
              </p>
              <p>
                Avatar may remove, disable, geo-block, flag, de-index, or temporarily suspend access to disputed
                material; seek a response or counter-notice from the affected user; preserve records; and take further
                action against repeat infringers or malicious actors.
              </p>
              <p>
                Avatar&apos;s response mechanism is relevant to maintenance of intermediary due diligence, as Indian law
                recognizes safe harbour for intermediaries subject to statutory conditions and due diligence
                obligations.
              </p>
            </Section>

            {/* Privacy */}
            <Section id="privacy" title="21. Privacy, Data Security, and Compliance Cooperation">
              <p>
                Processing of personal data through the Platform is governed by the separate Privacy Policy. Users
                agree that Avatar may collect, store, process, use, disclose, and retain personal data in accordance
                with that policy and applicable law.
              </p>
              <p>
                Avatar acts as data fiduciary for platform-level user and analytics data, linked to the Digital
                Personal Data Protection Act, 2023 (&quot;DPDPA&quot;). The DPDPA provides for consent-based and lawful
                processing, rights relating to access, correction, erasure, grievance redressal, and duties on data
                fiduciaries to implement reasonable security safeguards.
              </p>
              <p>
                Users shall cooperate with reasonable compliance requests relating to identity verification, security
                reviews, fraud investigations, legal notices, tax matters, sanctions screening, regulatory inquiries,
                and data subject rights administration.
              </p>
            </Section>

            {/* Intermediary */}
            <Section id="intermediary" title="22. Intermediary Status and Allocation of Liability">
              <p>Avatar&apos;s core responsibilities include:</p>
              <BulletList items={[
                'Operating the Platform and managing onboarding and listing review.',
                'Processing or facilitating payments and operating dispute and refund systems.',
                'Protecting platform-level user data.',
                'Ensuring the quality of Avatar\'s own first-party offerings.',
              ]} />
              <p className="mt-4">Allocation of liability:</p>
              <BulletList items={[
                'Primary liability for third-party tool performance, legality, and IP ownership → Sellers.',
                'Primary liability for third-party course quality and educational content → Instructors or Partners.',
                'Responsibility for platform-level data breach → Avatar.',
                'Responsibility for technical or access issues in Avatar-hosted webinars or post-payment platform access failures → Avatar.',
              ]} />
              <p className="mt-4">
                Section 79 of the Information Technology Act recognizes that an intermediary is not liable for
                third-party information, data, or communication links made available or hosted by it, subject to
                statutory conditions.
              </p>
            </Section>

            {/* Disclaimer */}
            <Section id="disclaimer" title="23. Disclaimer of Warranties">
              <Callout type="warning">
                The Platform and all offerings, whether first-party or third-party, are provided on an &quot;as is,&quot; &quot;as
                available,&quot; and &quot;with all faults&quot; basis to the fullest extent permitted by law.
              </Callout>
              <p>
                Avatar does not warrant uninterrupted availability, merchantability, fitness for a particular purpose,
                non-infringement, compatibility, profitability, educational outcomes, commercial success, legal
                sufficiency for a user&apos;s specific business purpose, error-free operation, or freedom from all harmful
                components, especially in relation to third-party offerings.
              </p>
            </Section>

            {/* Liability */}
            <Section id="liability" title="24. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Avatar, its affiliates, officers, directors, employees,
                shareholders, consultants, contractors, licensors, and service providers shall not be liable for any
                indirect, incidental, consequential, special, exemplary, punitive, or speculative damages, including
                loss of profits, revenue, goodwill, anticipated savings, business opportunity, data, reputation, or
                business interruption.
              </p>
              <Callout type="warning">
                Without prejudice to any non-excludable statutory rights, Avatar&apos;s aggregate liability arising from any
                claim or series of related claims shall not exceed the lower of: (a) the amount actually received by
                Avatar from the claimant in the <strong>3 months</strong> preceding the event giving rise to the
                claim, or (b) <strong>INR 10,000</strong>, unless a different cap is mandatory under applicable law or
                separately agreed in writing.
              </Callout>
              <p>Nothing in these Terms excludes liability that cannot lawfully be excluded or limited.</p>
            </Section>

            {/* Indemnity */}
            <Section id="indemnity" title="25. Indemnity">
              <p>
                You agree to defend, indemnify, and hold harmless Avatar and its affiliates, officers, directors,
                employees, contractors, agents, and service providers from and against any claims, proceedings, losses,
                liabilities, damages, penalties, taxes, interest, costs, and expenses, including legal fees, arising
                out of or relating to:
              </p>
              <BulletList items={[
                'Your breach of these Terms.',
                'Your content, listing, service, course, tool, dataset, or other offering.',
                'Your violation of law or third-party rights.',
                'Your infringement of intellectual property, privacy, consumer, tax, or regulatory rights.',
                'Your fraud, negligence, wilful misconduct, or deceptive trade practice.',
                'Your failure to obtain required permissions, licenses, or consents.',
              ]} />
            </Section>

            {/* Suspension */}
            <Section id="suspension" title="26. Suspension, Restriction, Delisting, and Termination">
              <p>
                Avatar may, with or without prior notice, suspend, restrict, disable, delist, demonetize, geo-block,
                de-rank, hold payouts, terminate access, cancel orders, or shut down accounts where Avatar reasonably
                believes there is fraud, security risk, legal exposure, policy breach, rights infringement, abuse of
                refunds, harmful content, sanctions concern, non-payment, repeated complaints, or other material risk
                to users or the Platform.
              </p>
              <p>
                Users may stop using the Platform at any time, subject to survival of payment obligations, dispute
                obligations, licensing rights required for prior transactions, retained records, indemnities, and other
                clauses intended to survive termination.
              </p>
            </Section>

            {/* Communications */}
            <Section id="communications" title="27. Communications and Electronic Records">
              <p>
                You consent to receive communications from Avatar electronically, including by email, SMS, in-app
                notification, dashboard notice, or Platform posting. Such communications may include OTPs, invoices,
                dispute notices, policy updates, service messages, legal notices, reminders, and commercial
                communications subject to your preferences and applicable law.
              </p>
              <p>
                Electronic records, support tickets, logs, audit trails, invoices, chat records, verification records,
                and screenshots maintained by Avatar may be relied upon for operational, evidentiary, and dispute
                purposes, subject to applicable law.
              </p>
            </Section>

            {/* Grievance */}
            <Section id="grievance" title="28. Grievance Redressal and Consumer Interface">
              <p>
                Avatar shall maintain a grievance redressal channel for complaints relating to transactions, listings,
                refunds, access issues, user conduct, privacy concerns, IP notices, and other Platform matters.
              </p>
              <p>
                Indian e-commerce rules require marketplace entities to appoint a grievance officer, acknowledge
                complaints within <strong>48 hours</strong>, and redress complaints within <strong>one month</strong>.
              </p>
              <p>Users should submit complaints through the designated Platform mechanism with sufficient transaction details, account information, and evidence to enable resolution.</p>

              <div className="mt-4 rounded-xl bg-[#1a2535] px-6 py-5 text-sm">
                <p className="text-slate-300 font-bold text-xs uppercase tracking-widest mb-3">Grievance Officer</p>
                <div className="space-y-1.5 text-slate-300">
                  <p><span className="text-slate-500 w-20 inline-block">Name</span>Richa Rathod</p>
                  <p><span className="text-slate-500 w-20 inline-block">Email</span>
                    <a href="mailto:cs@aslindustries.in" className="text-blue-400 hover:text-blue-300">cs@aslindustries.in</a>
                  </p>
                  <p><span className="text-slate-500 w-20 inline-block">Phone</span>
                    <a href="tel:+918097207334" className="text-blue-400 hover:text-blue-300">+91 8097207334</a>
                  </p>
                  <p><span className="text-slate-500 w-20 inline-block">Address</span>NESCO IT Park, 10th Floor Building 4, Goregaon East, Mumbai-400063, Maharashtra, India</p>
                </div>
              </div>
            </Section>

            {/* Regulatory */}
            <Section id="regulatory" title="29. Mandatory Regulatory Disclosures">
              <p>
                To support Indian e-commerce compliance, Avatar prominently displays its legal name, principal
                geographic address, website details, customer care contact details, grievance officer details, and key
                policy disclosures relating to returns, refunds, exchange, warranty, guarantee, delivery, payment
                methods, and dispute resolution.
              </p>
              <p>
                If any listed offering falls within a regulated sector — including financial, health, education, legal,
                or other restricted domains — the relevant provider remains responsible for obtaining and maintaining
                all required permissions, disclosures, disclaimers, and approvals. SEBI-related considerations may
                arise if financial or investment AI tools are listed.
              </p>
            </Section>

            {/* Changes */}
            <Section id="changes" title="30. Changes to Terms and Platform">
              <p>
                Avatar may modify the Platform, discontinue features, add restrictions, revise pricing, change
                technical specifications, alter policies, and amend these Terms from time to time. Updated versions
                shall be posted on the Platform with the revised date.
              </p>
              <p>
                Continued use of the Platform after such update shall constitute acceptance of the revised Terms to the
                extent permitted by law. Where required, Avatar may seek express acceptance for material changes.
              </p>
            </Section>

            {/* Force Majeure */}
            <Section id="force-majeure" title="31. Force Majeure">
              <p>
                Avatar shall not be liable for delay or failure in performance caused by events beyond its reasonable
                control, including natural disasters, cyber incidents, infrastructure outage, internet failure,
                governmental restrictions, pandemic events, labor unrest, payment network failure, cloud service
                disruption, or acts of God.
              </p>
              <p>
                This clause does not excuse obligations that cannot lawfully be excluded, including statutory consumer
                obligations where applicable.
              </p>
            </Section>

            {/* Governing Law */}
            <Section id="governing-law" title="32. Governing Law and Jurisdiction">
              <p>
                These Terms shall be governed by and construed in accordance with the <strong>laws of India</strong>.
              </p>
              <p>
                Subject to any non-waivable statutory rights or consumer forum rights, the courts at{' '}
                <strong>Mumbai, Maharashtra</strong> shall have exclusive jurisdiction over disputes arising out of or
                relating to these Terms or the Platform.
              </p>
            </Section>

            {/* Miscellaneous */}
            <Section id="miscellaneous" title="33. Miscellaneous">
              <BulletList items={[
                'If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions shall continue in full force to the extent permitted by law.',
                'Avatar\'s failure to enforce any provision shall not constitute a waiver. No waiver shall be effective unless made in writing by Avatar.',
                'You may not assign or transfer your rights or obligations under these Terms without Avatar\'s prior written consent. Avatar may assign these Terms to an affiliate, successor, acquirer, or financing party.',
                'These Terms, together with the Privacy Policy and any applicable supplemental terms, constitute the entire agreement between the parties in relation to the Platform and supersede prior online understandings relating to the same subject matter.',
              ]} />
            </Section>

            {/* Contact */}
            <Section id="contact" title="34. Contact Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactCard
                  icon="fa-building"
                  label="Registered Entity"
                  lines={['Avatar Industries Limited', 'NESCO IT Park, 10th Floor Building 4,', 'Goregaon East, Mumbai-400063,', 'Maharashtra, India']}
                />
                <ContactCard
                  icon="fa-globe"
                  label="Website"
                  lines={['www.avatarindia.com']}
                  link={{ href: 'https://www.avatarindia.com', text: 'www.avatarindia.com' }}
                />
                <ContactCard
                  icon="fa-envelope"
                  label="Support Email"
                  lines={[]}
                  link={{ href: 'mailto:cs@aslindustries.in', text: 'cs@aslindustries.in' }}
                />
                <ContactCard
                  icon="fa-phone"
                  label="Customer Care"
                  lines={[]}
                  link={{ href: 'tel:+918097207334', text: '+91 8097207334' }}
                />
              </div>
              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Grievance Officer</p>
                <p className="text-sm text-slate-700"><span className="font-semibold">Name:</span> Richa Rathod</p>
                <p className="text-sm text-slate-700 mt-1">
                  <span className="font-semibold">Email:</span>{' '}
                  <a href="mailto:cs@aslindustries.in" className="text-blue-600 hover:underline">cs@aslindustries.in</a>
                </p>
                <p className="text-sm text-slate-700 mt-1">
                  <span className="font-semibold">Phone:</span>{' '}
                  <a href="tel:+918097207334" className="text-blue-600 hover:underline">+91 8097207334</a>
                </p>
              </div>
            </Section>

            {/* Footer note */}
            <div className="rounded-2xl bg-[#1a2535] px-8 py-6 text-center">
              <p className="text-slate-400 text-sm">
                By continuing to use the Avatar AI Marketplace, you agree to these Terms &amp; Conditions.
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Effective Date: June 12, 2026 · Version 1.0 · Avatar Industries Limited
              </p>
            </div>

          </article>
        </div>
      </div>
    </div>
  );
}

/* ─── Helper Components ─── */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden scroll-mt-6">
      <div className="bg-[#1a2535] px-7 py-5">
        <h2 className="text-white font-bold text-base leading-snug">{title}</h2>
      </div>
      <div className="px-7 py-6 space-y-4 text-sm text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-slate-800 mt-4 mb-1">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DefinitionList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <div className="space-y-3 mt-2">
      {items.map(({ term, def }) => (
        <div key={term} className="flex gap-3">
          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
          <p><span className="font-semibold text-slate-800">&ldquo;{term}&rdquo;</span> {def}</p>
        </div>
      ))}
    </div>
  );
}

function Callout({ type, children }: { type: 'info' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };
  const icons = { info: 'fa-info-circle text-blue-500', warning: 'fa-exclamation-triangle text-amber-500' };
  return (
    <div className={`flex gap-3 rounded-xl border px-5 py-4 text-sm ${styles[type]}`}>
      <i className={`fas ${icons[type]} mt-0.5 shrink-0`} />
      <div>{children}</div>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  lines,
  link,
}: {
  icon: string;
  label: string;
  lines: string[];
  link?: { href: string; text: string };
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-[#1a2535] flex items-center justify-center shrink-0">
        <i className={`fas ${icon} text-white text-sm`} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        {lines.map((l, i) => <p key={i} className="text-sm text-slate-700 leading-snug">{l}</p>)}
        {link && (
          <a href={link.href} className="text-sm text-blue-600 hover:underline">
            {link.text}
          </a>
        )}
      </div>
    </div>
  );
}
