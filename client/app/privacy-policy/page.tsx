import Link from 'next/link';

const sections = [
  {
    number: '1',
    title: 'Introduction',
    content: `This Privacy Policy explains how Avatar Industries Limited, operating the website www.avatarindia.com and related applications, collects, uses, stores, shares, and protects personal data of visitors, registered users, buyers, sellers, instructors, partners, freelancers, and other users of the Avatar platform. Avatar operates an India-first AI marketplace ecosystem covering AI tools, courses, webinars, communities, and AI-related services.

Avatar acts as a digital platform that enables transactions and interactions between users, including third-party sellers, educators, and service providers, while also providing certain first-party offerings such as Avatar-hosted webinars and platform services.

This Privacy Policy is intended to align with the Digital Personal Data Protection Act, 2023, which requires notice-based and consent-based processing of digital personal data, reasonable security safeguards, and grievance redressal rights for data principals.`,
  },
  {
    number: '2',
    title: 'Who We Are',
    content: `For the purposes of this Privacy Policy, "Avatar," "Company," "we," "us," and "our" mean Avatar Industries Limited and its affiliates, successors, and permitted assigns. "You" and "your" mean any user who accesses or uses the platform.

Avatar is the data fiduciary for personal data processed through the platform in relation to user accounts, platform administration, transactions, security, analytics, customer support, dispute handling, and compliance records, as contemplated in the business overview.`,
  },
  {
    number: '3',
    title: 'Scope',
    bullets: [
      'Visitors browsing the website.',
      'Users creating an account on the platform.',
      'Buyers purchasing or subscribing to AI tools, courses, webinars, or services.',
      'Individual and business sellers listing tools or digital offerings.',
      'Instructors, partner companies, and webinar participants.',
      'Applicants, leads, and persons who contact Avatar through forms, email, chat, or support channels.',
    ],
    content: 'This Privacy Policy applies to personal data processed digitally through the website, mobile applications, dashboards, communication tools, payment flows, onboarding forms, and related systems.',
  },
  {
    number: '4',
    title: 'Categories of Personal Data Collected',
    intro: 'Avatar may collect the following categories of personal data, depending on how the platform is used:',
    bullets: [
      'Identity data: name, date of birth, photograph, profile details, company name, director or authorized signatory details, and government-issued identity information required for verification.',
      'Contact data: email address, mobile number, billing address, registered office address, and correspondence details.',
      'KYC and compliance data: Aadhaar details, PAN, GSTIN, bank details, tax identifiers, business registration details, and supporting documents submitted during seller, instructor, partner, or payout onboarding.',
      'Transaction data: order history, invoices, subscriptions, payment status, refunds, disputes, payouts, tax deductions, and related commerce records.',
      'Usage data: login data, IP address, browser type, device details, operating system, app identifiers, referral URLs, session timestamps, clicks, feature usage, and platform activity logs.',
      'Content data: course submissions, reviews, ratings, support messages, forum posts, webinar participation details, uploaded listing materials, screenshots, videos, and communications made through the platform.',
      'Support and grievance data: complaint records, refund requests, takedown notices, dispute submissions, legal correspondence, and grievance redressal records.',
      'Marketing and preference data: newsletter preferences, campaign interactions, survey responses, waitlist forms, and cookie preferences.',
    ],
    content: 'Avatar does not intentionally seek unnecessary personal data and expects users to provide only data reasonably required for platform access, lawful onboarding, payment settlement, support, or compliance.',
  },
  {
    number: '5',
    title: 'How Personal Data Is Collected',
    intro: 'Avatar may collect personal data through the following methods:',
    bullets: [
      'Directly from users during registration, KYC onboarding, checkout, course enrollment, webinar sign-up, support requests, reviews, listing submissions, and account updates.',
      'Automatically through platform usage, cookies, device logs, analytics tools, security systems, and server records.',
      'From payment gateways, KYC vendors, fraud prevention providers, communication providers, or business partners engaged in platform operations.',
      'From third parties where legally permitted, such as sellers, instructors, employers, educational institutions, affiliate partners, or law enforcement agencies.',
    ],
  },
  {
    number: '6',
    title: 'Purposes of Processing',
    intro: 'Avatar may process personal data for the following purposes:',
    bullets: [
      'Creating and managing user accounts.',
      'Verifying identity, eligibility, seller/instructor status, and business credentials.',
      'Enabling listings, purchases, subscriptions, webinars, courses, certifications, and service requests.',
      'Processing payments, invoices, GST records, TDS deductions, payouts, refunds, and reconciliations.',
      'Facilitating dispute handling, moderation, user support, review systems, and grievance redressal.',
      'Maintaining platform security, fraud prevention, abuse detection, backup, incident response, and legal compliance.',
      'Personalizing search results, recommendations, communications, and user experience.',
      'Conducting analytics, quality control, internal reporting, and product improvement.',
      'Sending service communications, transactional updates, policy notices, marketing messages, and promotional content, subject to applicable consent preferences.',
      'Enforcing contractual rights, protecting legal interests, and responding to lawful requests from regulators, courts, or governmental authorities.',
    ],
  },
  {
    number: '7',
    title: 'Legal Basis and Consent',
    intro: 'Avatar processes personal data on one or more of the following bases, as applicable under law:',
    bullets: [
      'Your consent.',
      'Performance of a contract or taking steps at your request before entering into a contract.',
      'Compliance with legal obligations, including taxation, invoicing, fraud checks, legal notices, and record-keeping.',
      'Legitimate and lawful operational purposes to the extent permitted by applicable law.',
    ],
    content: `Where consent is relied upon, Avatar will seek clear affirmative action through account flows, forms, checkboxes, cookie banners, or similar consent mechanisms. Under the Digital Personal Data Protection Act, 2023, consent should be free, specific, informed, unconditional, and unambiguous, and users should be able to withdraw consent.

Withdrawal of consent will not affect processing already undertaken on a valid legal basis before such withdrawal. However, certain services may become unavailable if essential processing permissions are withdrawn.`,
  },
  {
    number: '8',
    title: 'Disclosure of Personal Data',
    intro: 'Avatar may share personal data with the following categories of recipients on a need-to-know basis:',
    bullets: [
      'Payment processors, banks, billing providers, and settlement partners for transaction execution and reconciliation.',
      'KYC verification providers, fraud detection vendors, cybersecurity service providers, cloud hosting vendors, analytics providers, CRM providers, and communication service providers.',
      'Sellers, instructors, service providers, and partner entities where sharing is required to perform the relevant transaction, enrollment, booking, certification, support, or dispute process.',
      'Professional advisers, auditors, insurers, legal counsel, and compliance consultants.',
      'Government authorities, regulators, law enforcement agencies, courts, and tribunals when required by law, order, or legal process.',
      'Acquirers, investors, restructuring participants, or successors in connection with a merger, acquisition, financing, or business transfer, subject to lawful safeguards.',
    ],
    content: 'Avatar does not sell personal data in the ordinary course of business.',
  },
  {
    number: '9',
    title: 'Data Retention',
    content: `Avatar retains personal data only for as long as reasonably necessary for the purposes stated in this Privacy Policy, including for account maintenance, contract performance, audits, tax compliance, dispute handling, fraud prevention, and legal record retention.

Certain onboarding, KYC, tax, invoice, and transaction records may be retained longer where required under law or where necessary to defend legal claims, investigate fraud, or maintain marketplace integrity.

When data is no longer required, Avatar may delete, anonymize, aggregate, or securely archive it in accordance with applicable law and internal retention schedules.`,
  },
  {
    number: '10',
    title: 'User Rights',
    intro: 'Subject to applicable law, you may have the right to:',
    bullets: [
      'Request access to personal data processed by Avatar.',
      'Request correction, completion, or updating of inaccurate or incomplete data.',
      'Request erasure of personal data that is no longer necessary or where consent has been withdrawn, subject to legal exceptions.',
      'Withdraw consent for processing where consent is the basis.',
      'Manage communication preferences and certain cookie settings.',
      'Seek grievance redressal in relation to privacy concerns.',
    ],
    content: `The Digital Personal Data Protection Act, 2023 recognizes rights of access to information about personal data, correction and erasure, grievance redressal, and nomination rights for data principals.

Avatar may verify identity before acting on a request and may decline or limit a request where legally permissible.`,
  },
  {
    number: '11',
    title: 'Cookies and Tracking Technologies',
    content: `Avatar may use cookies, SDKs, pixels, local storage, and similar technologies for authentication, security, analytics, personalization, session continuity, performance monitoring, and marketing.

Because cookies may involve collection or use of personal data, notice and consent-based practices are prudent in the evolving Indian privacy landscape, particularly for non-essential cookies.

Users may manage cookie preferences through browser settings or any cookie consent tools made available on the platform. Blocking certain cookies may affect the functionality of login, checkout, dashboards, course tracking, or personalized recommendations.`,
  },
  {
    number: '12',
    title: 'Data Security',
    content: `Avatar uses reasonable technical, organizational, and contractual safeguards to protect personal data against unauthorized access, disclosure, alteration, loss, misuse, and destruction. These safeguards may include encryption, access controls, audit logs, secure hosting environments, employee confidentiality measures, vendor assessments, and incident response procedures.

The Digital Personal Data Protection Act, 2023 requires implementation of reasonable security safeguards to prevent personal data breaches.

However, no method of storage or transmission is completely secure, and Avatar cannot guarantee absolute security.`,
  },
  {
    number: '13',
    title: "Children's Data",
    content: `The platform is not intended for children where use would be prohibited under applicable law or where valid contractual consent cannot be lawfully obtained. Users must meet the eligibility standards set out in the platform terms.

Where processing of children's personal data is triggered, Avatar reserves the right to impose additional age-gating, consent, or verification controls to comply with applicable law.`,
  },
  {
    number: '14',
    title: 'Cross-Border Processing',
    content: `Avatar may use service providers or infrastructure located outside India for hosting, communications, analytics, support, storage, or other operational needs, subject to lawful safeguards, contractual protections, and any restrictions imposed by applicable law.

Users acknowledge that platform access may involve transfer, storage, or processing of data across jurisdictions.`,
  },
  {
    number: '16',
    title: 'Changes to This Privacy Policy',
    content: `Avatar may update this Privacy Policy from time to time to reflect changes in law, platform features, business operations, vendor arrangements, or risk controls. Updated versions will be posted on the website with a revised effective date.

Continued use of the platform after an update may constitute acceptance to the extent permitted by law.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f0f2f5]">

      {/* Hero Banner */}
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
            Avatar Industries Limited
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Privacy <span className="text-slate-300">Policy</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-[#f0f2f5]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Meta info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8 flex flex-wrap gap-6">
            {[
              { label: 'Website', value: 'www.avatarindia.com' },
              { label: 'Entity', value: 'Avatar Industries Limited' },
              { label: 'Version', value: '1.0' },
              { label: 'Effective Date', value: 'June 12, 2026' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.number} className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-7">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2535] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{section.number}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 pt-1.5">{section.title}</h2>
                </div>

                <div className="pl-13 space-y-4" style={{ paddingLeft: '3.25rem' }}>
                  {section.intro && (
                    <p className="text-slate-600 text-sm leading-relaxed">{section.intro}</p>
                  )}

                  {section.bullets && (
                    <ul className="space-y-2">
                      {section.bullets.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.content && section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Grievance Officer — special card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-7">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#1a2535] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">15</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 pt-1.5">Grievance Officer and Contact</h2>
              </div>

              <div style={{ paddingLeft: '3.25rem' }} className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  In accordance with applicable e-commerce and data governance expectations, Avatar should designate a grievance officer and publish the officer&apos;s contact details on the platform.
                </p>

                <div className="rounded-xl border border-gray-200 bg-[#f8f9fb] px-6 py-5 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Grievance Officer</p>
                  {[
                    { icon: 'fa-user', label: 'Name', value: 'Richa Rathod', href: undefined },
                    { icon: 'fa-envelope', label: 'Email', value: 'cs@aslindustries.in', href: 'mailto:cs@aslindustries.in' },
                    { icon: 'fa-phone', label: 'Phone', value: '+91 8097207334', href: 'tel:+918097207334' },
                    { icon: 'fa-map-marker-alt', label: 'Address', value: 'NESCO IT Park, 10th Floor Building 4, Goregaon East, Mumbai-400063, Maharashtra, India.', href: undefined },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1a2535] flex items-center justify-center shrink-0 mt-0.5">
                        <i className={`fas ${icon} text-white text-xs`} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                        {href ? (
                          <Link href={href} className="text-sm font-semibold text-slate-800 hover:text-slate-600 transition-colors">
                            {value}
                          </Link>
                        ) : (
                          <p className="text-sm font-semibold text-slate-800">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  For privacy-related requests or complaints, users may write to the above contact details with sufficient particulars to identify the account or transaction in question.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
