import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
            Your Privacy Matters
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
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Entity</p>
                <p className="text-sm font-semibold text-slate-800">Avatar Industries Limited</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Effective Date</p>
                <p className="text-sm font-semibold text-slate-800">June 12, 2026</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Version</p>
                <p className="text-sm font-semibold text-slate-800">1.0</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-slate-800">June 12, 2026</p>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
            
            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                1. Introduction
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  This Privacy Policy explains how Avatar Industries Limited, operating the website <strong>www.avatarindia.com</strong> and related applications, collects, uses, stores, shares, and protects personal data of visitors, registered users, buyers, sellers, instructors, partners, freelancers, and other users of the Avatar platform.
                </p>
                <p>
                  Avatar operates an India-first AI marketplace ecosystem covering AI tools, courses, webinars, communities, and AI-related services.
                </p>
                <p>
                  Avatar acts as a digital platform that enables transactions and interactions between users, including third-party sellers, educators, and service providers, while also providing certain first-party offerings such as Avatar-hosted webinars and platform services.
                </p>
                <p>
                  This Privacy Policy is intended to align with the <strong>Digital Personal Data Protection Act, 2023</strong>, which requires notice-based and consent-based processing of digital personal data, reasonable security safeguards, and grievance redressal rights for data principals.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                2. Who We Are
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  For the purposes of this Privacy Policy, <strong>&quot;Avatar,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot;</strong> and <strong>&quot;our&quot;</strong> mean Avatar Industries Limited and its affiliates, successors, and permitted assigns. <strong>&quot;You&quot;</strong> and <strong>&quot;your&quot;</strong> mean any user who accesses or uses the platform.
                </p>
                <p>
                  Avatar is the data fiduciary for personal data processed through the platform in relation to user accounts, platform administration, transactions, security, analytics, customer support, dispute handling, and compliance records, as contemplated in the business overview.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                3. Scope
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">This Privacy Policy applies to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Visitors browsing the website.</li>
                  <li>Users creating an account on the platform.</li>
                  <li>Buyers purchasing or subscribing to AI tools, courses, webinars, or services.</li>
                  <li>Individual and business sellers listing tools or digital offerings.</li>
                  <li>Instructors, partner companies, and webinar participants.</li>
                  <li>Applicants, leads, and persons who contact Avatar through forms, email, chat, or support channels.</li>
                </ul>
                <p>
                  This Privacy Policy applies to personal data processed digitally through the website, mobile applications, dashboards, communication tools, payment flows, onboarding forms, and related systems.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                4. Categories of Personal Data Collected
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">Avatar may collect the following categories of personal data, depending on how the platform is used:</p>
                <div className="space-y-3">
                  <p><strong>Identity data:</strong> name, date of birth, photograph, profile details, company name, director or authorized signatory details, and government-issued identity information required for verification.</p>
                  <p><strong>Contact data:</strong> email address, mobile number, billing address, registered office address, and correspondence details.</p>
                  <p><strong>KYC and compliance data:</strong> Aadhaar details, PAN, GSTIN, bank details, tax identifiers, business registration details, and supporting documents submitted during seller, instructor, partner, or payout onboarding.</p>
                  <p><strong>Transaction data:</strong> order history, invoices, subscriptions, payment status, refunds, disputes, payouts, tax deductions, and related commerce records.</p>
                  <p><strong>Usage data:</strong> login data, IP address, browser type, device details, operating system, app identifiers, referral URLs, session timestamps, clicks, feature usage, and platform activity logs.</p>
                  <p><strong>Content data:</strong> course submissions, reviews, ratings, support messages, forum posts, webinar participation details, uploaded listing materials, screenshots, videos, and communications made through the platform.</p>
                  <p><strong>Support and grievance data:</strong> complaint records, refund requests, takedown notices, dispute submissions, legal correspondence, and grievance redressal records.</p>
                  <p><strong>Marketing and preference data:</strong> newsletter preferences, campaign interactions, survey responses, waitlist forms, and cookie preferences.</p>
                </div>
                <p className="mt-4">
                  Avatar does not intentionally seek unnecessary personal data and expects users to provide only data reasonably required for platform access, lawful onboarding, payment settlement, support, or compliance.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                5. How Personal Data Is Collected
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">Avatar may collect personal data through the following methods:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Directly from users during registration, KYC onboarding, checkout, course enrollment, webinar sign-up, support requests, reviews, listing submissions, and account updates.</li>
                  <li>Automatically through platform usage, cookies, device logs, analytics tools, security systems, and server records.</li>
                  <li>From payment gateways, KYC vendors, fraud prevention providers, communication providers, or business partners engaged in platform operations.</li>
                  <li>From third parties where legally permitted, such as sellers, instructors, employers, educational institutions, affiliate partners, or law enforcement agencies.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                6. Purposes of Processing
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                <p className="mb-3">Avatar may process personal data for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating and managing user accounts.</li>
                  <li>Verifying identity, eligibility, seller/instructor status, and business credentials.</li>
                  <li>Enabling listings, purchases, subscriptions, webinars, courses, certifications, and service requests.</li>
                  <li>Processing payments, invoices, GST records, TDS deductions, payouts, refunds, and reconciliations.</li>
                  <li>Facilitating dispute handling, moderation, user support, review systems, and grievance redressal.</li>
                  <li>Maintaining platform security, fraud prevention, abuse detection, backup, incident response, and legal compliance.</li>
                  <li>Personalizing search results, recommendations, communications, and user experience.</li>
                  <li>Conducting analytics, quality control, internal reporting, and product improvement.</li>
                  <li>Sending service communications, transactional updates, policy notices, marketing messages, and promotional content, subject to applicable consent preferences.</li>
                  <li>Enforcing contractual rights, protecting legal interests, and responding to lawful requests from regulators, courts, or governmental authorities.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                7. Legal Basis and Consent
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>Avatar processes personal data on one or more of the following bases, as applicable under law:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Your consent.</li>
                  <li>Performance of a contract or taking steps at your request before entering into a contract.</li>
                  <li>Compliance with legal obligations, including taxation, invoicing, fraud checks, legal notices, and record-keeping.</li>
                  <li>Legitimate and lawful operational purposes to the extent permitted by applicable law.</li>
                </ul>
                <p>
                  Where consent is relied upon, Avatar will seek clear affirmative action through account flows, forms, checkboxes, cookie banners, or similar consent mechanisms. Under the Digital Personal Data Protection Act, 2023, consent should be free, specific, informed, unconditional, and unambiguous, and users should be able to withdraw consent.
                </p>
                <p>
                  Withdrawal of consent will not affect processing already undertaken on a valid legal basis before such withdrawal. However, certain services may become unavailable if essential processing permissions are withdrawn.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                8. Disclosure of Personal Data
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>Avatar may share personal data with the following categories of recipients on a need-to-know basis:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Payment processors, banks, billing providers, and settlement partners for transaction execution and reconciliation.</li>
                  <li>KYC verification providers, fraud detection vendors, cybersecurity service providers, cloud hosting vendors, analytics providers, CRM providers, and communication service providers.</li>
                  <li>Sellers, instructors, service providers, and partner entities where sharing is required to perform the relevant transaction, enrollment, booking, certification, support, or dispute process.</li>
                  <li>Professional advisers, auditors, insurers, legal counsel, and compliance consultants.</li>
                  <li>Government authorities, regulators, law enforcement agencies, courts, and tribunals when required by law, order, or legal process.</li>
                  <li>Acquirers, investors, restructuring participants, or successors in connection with a merger, acquisition, financing, or business transfer, subject to lawful safeguards.</li>
                </ul>
                <p>Avatar does not sell personal data in the ordinary course of business.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                9. Data Retention
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar retains personal data only for as long as reasonably necessary for the purposes stated in this Privacy Policy, including for account maintenance, contract performance, audits, tax compliance, dispute handling, fraud prevention, and legal record retention.
                </p>
                <p>
                  Certain onboarding, KYC, tax, invoice, and transaction records may be retained longer where required under law or where necessary to defend legal claims, investigate fraud, or maintain marketplace integrity.
                </p>
                <p>
                  When data is no longer required, Avatar may delete, anonymize, aggregate, or securely archive it in accordance with applicable law and internal retention schedules.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                10. User Rights
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>Subject to applicable law, you may have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Request access to personal data processed by Avatar.</li>
                  <li>Request correction, completion, or updating of inaccurate or incomplete data.</li>
                  <li>Request erasure of personal data that is no longer necessary or where consent has been withdrawn, subject to legal exceptions.</li>
                  <li>Withdraw consent for processing where consent is the basis.</li>
                  <li>Manage communication preferences and certain cookie settings.</li>
                  <li>Seek grievance redressal in relation to privacy concerns.</li>
                </ul>
                <p>
                  The Digital Personal Data Protection Act, 2023 recognizes rights of access to information about personal data, correction and erasure, grievance redressal, and nomination rights for data principals.
                </p>
                <p>
                  Avatar may verify identity before acting on a request and may decline or limit a request where legally permissible.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                11. Cookies and Tracking Technologies
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar may use cookies, SDKs, pixels, local storage, and similar technologies for authentication, security, analytics, personalization, session continuity, performance monitoring, and marketing.
                </p>
                <p>
                  Because cookies may involve collection or use of personal data, notice and consent-based practices are prudent in the evolving Indian privacy landscape, particularly for non-essential cookies.
                </p>
                <p>
                  Users may manage cookie preferences through browser settings or any cookie consent tools made available on the platform. Blocking certain cookies may affect the functionality of login, checkout, dashboards, course tracking, or personalized recommendations.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                12. Data Security
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar uses reasonable technical, organizational, and contractual safeguards to protect personal data against unauthorized access, disclosure, alteration, loss, misuse, and destruction. These safeguards may include encryption, access controls, audit logs, secure hosting environments, employee confidentiality measures, vendor assessments, and incident response procedures.
                </p>
                <p>
                  The Digital Personal Data Protection Act, 2023 requires implementation of reasonable security safeguards to prevent personal data breaches.
                </p>
                <p>
                  However, no method of storage or transmission is completely secure, and Avatar cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                13. Children&apos;s Data
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  The platform is not intended for children where use would be prohibited under applicable law or where valid contractual consent cannot be lawfully obtained. Users must meet the eligibility standards set out in the platform terms.
                </p>
                <p>
                  Where processing of children&apos;s personal data is triggered, Avatar reserves the right to impose additional age-gating, consent, or verification controls to comply with applicable law.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                14. Cross-Border Processing
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar may use service providers or infrastructure located outside India for hosting, communications, analytics, support, storage, or other operational needs, subject to lawful safeguards, contractual protections, and any restrictions imposed by applicable law.
                </p>
                <p>
                  Users acknowledge that platform access may involve transfer, storage, or processing of data across jurisdictions.
                </p>
              </div>
            </section>

            {/* Section 15 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                15. Grievance Officer and Contact
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  In accordance with applicable e-commerce and data governance expectations, Avatar has designated a grievance officer. The officer&apos;s contact details are published below.
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
                <p className="mt-4">
                  For privacy-related requests or complaints, users may write to the above contact details with sufficient particulars to identify the account or transaction in question.
                </p>
              </div>
            </section>

            {/* Section 16 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-200">
                16. Changes to This Privacy Policy
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
                <p>
                  Avatar may update this Privacy Policy from time to time to reflect changes in law, platform features, business operations, vendor arrangements, or risk controls. Updated versions will be posted on the website with a revised effective date.
                </p>
                <p>
                  Continued use of the platform after an update may constitute acceptance to the extent permitted by law.
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a2535] flex items-center justify-center shrink-0 mt-1">
                    <i className="fas fa-info-circle text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Questions or Concerns?</h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-3">
                      If you have any questions about this Privacy Policy or how we handle your personal data, please don&apos;t hesitate to reach out to our Grievance Officer using the contact information provided above.
                    </p>
                    <p className="text-xs text-slate-500">
                      This policy is designed to comply with the Digital Personal Data Protection Act, 2023 and other applicable Indian laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Links Section */}
          {/* <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/terms-conditions" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1a2535] hover:bg-slate-50 transition-all group">
                <i className="fas fa-file-contract text-[#1a2535] text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Terms & Conditions</p>
                  <p className="text-xs text-slate-500">View our terms</p>
                </div>
              </Link>
              <Link href="/refund-policy" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1a2535] hover:bg-slate-50 transition-all group">
                <i className="fas fa-undo text-[#1a2535] text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Refund Policy</p>
                  <p className="text-xs text-slate-500">Refund guidelines</p>
                </div>
              </Link>
              <Link href="/contact" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1a2535] hover:bg-slate-50 transition-all group">
                <i className="fas fa-envelope text-[#1a2535] text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Contact Us</p>
                  <p className="text-xs text-slate-500">Get in touch</p>
                </div>
              </Link>
            </div>
          </div> */}

        </div>
      </div>

    </div>
  );
}
