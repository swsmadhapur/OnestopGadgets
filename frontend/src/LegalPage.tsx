import React, { useEffect, useState } from 'react';

export type LegalRoute = 'privacy-policy' | 'terms-and-conditions' | 'returns-and-refunds' | 'lucky-dip-rules' | 'affiliate-disclosure';

interface LegalPageProps {
  route: LegalRoute;
  onNavigate: (route: string) => void;
  onBackToHome: () => void;
  onOpenPricing?: () => void;
}

interface Section {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

export default function LegalPage({ route, onNavigate, onBackToHome, onOpenPricing }: LegalPageProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 1. PRIVACY POLICY CONTENT
  const privacySections: Section[] = [
    {
      id: 'privacy-intro',
      number: '01',
      title: 'Introduction & Platform Overview',
      content: (
        <div className="space-y-3">
          <p>
            Welcome to <strong>ONE STOP GADGETS</strong> (&quot;we,&quot; &quot;our,&quot; &quot;us,&quot; or the &quot;Platform&quot;). We operate an online gadget deals aggregation, VIP subscription membership, and promotional giveaway portal designed to simplify tech discovery and provide transparent consumer savings across verified electronic marketplaces.
          </p>
          <p>
            This Privacy Policy sets out how ONE STOP GADGETS collects, processes, stores, and safeguards personal data obtained from users (&quot;you&quot; or &quot;User&quot;) accessing our website, services, VIP passes, and promotional activities. We are committed to processing your information in accordance with applicable Indian laws, including the <em>Information Technology Act, 2000</em>, the <em>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</em>, and the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>.
          </p>
        </div>
      )
    },
    {
      id: 'privacy-collection',
      number: '02',
      title: 'Information We Collect from Users',
      content: (
        <div className="space-y-3">
          <p>We collect personal information directly provided by you during interaction with our platform:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Basic Account & Contact Identifiers:</strong> Full legal name, verified email address, and 10-digit mobile phone number.</li>
            <li><strong>Geographical Data:</strong> City, state, and pincode provided during VIP registration or Lucky Dip entry forms for dispatch verification.</li>
            <li><strong>Account Preferences:</strong> Notification choices (deal alerts, price drops, giveaway draw notices) and authentication credentials.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-vip-purchase',
      number: '03',
      title: 'Information Collected During VIP Subscription Purchases',
      content: (
        <div className="space-y-3">
          <p>
            When purchasing a VIP Pass (Monthly – ₹299, 6-Month – ₹1,199, or Annual – ₹1,799), we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Subscriber profile details (Full Name, Billing Email, Mobile Contact Number).</li>
            <li>Selected subscription pass tier, plan validity dates, and auto-generated membership identifiers (e.g., <code>VIP-XXXXXX</code>).</li>
            <li>System verification metadata including order creation timestamps, transaction reference IDs, and subscription renewal status.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-luckydip',
      number: '04',
      title: 'Lucky Dip Participant Registration & Selected Prize Information',
      content: (
        <div className="space-y-3">
          <p>
            When participating in the ONE STOP GADGETS Lucky Dip draws, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Participant registration details (Name, contact mobile number, email, and city of residence).</li>
            <li>Selected target prize category (e.g., Apple iPhone 16 Pro, PlayStation 5 Slim, Dyson Airwrap, or Gift Vouchers).</li>
            <li>Assigned entry ticket identification numbers (e.g., <code>OSG-TKT-XXXXXX</code>) and associated cryptographic audit seeds.</li>
            <li>Identity and shipping verification proof if your ticket is drawn as an official winner.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-payments',
      number: '05',
      title: 'Payment Transaction Information & Third-Party Processors',
      content: (
        <div className="space-y-3">
          <p>
            <strong>Payment Security Guarantee:</strong> ONE STOP GADGETS does <strong>not</strong> collect, process, or store sensitive financial instruments, including full debit/credit card numbers, CVV/CVC codes, UPI PINs, or net banking passwords on our local servers.
          </p>
          <p>
            All online checkout payments are securely routed through PCI-DSS Level 1 compliant payment gateways (such as Razorpay). We receive and store only transaction confirmation records, consisting of:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Payment Gateway Transaction ID (e.g., <code>pay_rzp_XXXXXX</code>) and Order ID.</li>
            <li>Payment mode (UPI, Netbanking, Credit/Debit Card provider).</li>
            <li>Authorized payment amount, currency (INR), and timestamp of confirmation.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-cookies',
      number: '06',
      title: 'Cookies, Analytics, IP Addresses & Website Usage Data',
      content: (
        <div className="space-y-3">
          <p>
            Our website uses session and functional cookies to ensure smooth site navigation, maintain user authentication status, retain filter preferences (such as price filters and category sorts), and track aggregate traffic analytics.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Technical Identifiers:</strong> Internet Protocol (IP) address, browser type and version, device hardware profile, and operating system.</li>
            <li><strong>Clickstream Data:</strong> Deal link clicks, time spent per page, search queries submitted in the FiboSearch bar, and referring URLs.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-usage',
      number: '07',
      title: 'How Personal Information is Used',
      content: (
        <div className="space-y-3">
          <p>We utilize collected personal information strictly for legitimate commercial and administrative functions:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>To activate and manage your Free or VIP membership tier and verify eligible deal viewing permissions.</li>
            <li>To process membership payments, issue digital receipts, and manage renewal or expiry schedules.</li>
            <li>To administer Lucky Dip draws, verify participant eligibility, assign unique tickets, and contact prize winners.</li>
            <li>To deliver critical operational notifications (e.g., security alerts, payment confirmation, VIP pass expiration warnings).</li>
            <li>To prevent fraud, automated bot scraping, unauthorized account sharing, and duplicate sweepstakes entries.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-sharing',
      number: '08',
      title: 'Disclosure & Information Sharing with Third Parties',
      content: (
        <div className="space-y-3">
          <p>
            ONE STOP GADGETS maintains a strict no-sale policy: <strong>we do not sell, rent, or trade your personal contact details to third-party telemarketers or external advertising networks.</strong>
          </p>
          <p>Information may only be shared under the following limited conditions:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Authorized Payment Partners:</strong> Trusted payment gateways (Razorpay) for the sole purpose of authorizing and verifying subscription payments.</li>
            <li><strong>Prize Fulfillment & Logistics:</strong> Courier and delivery partners (e.g., Blue Dart, Delhivery) strictly for dispatching verified physical prizes to Lucky Dip winners.</li>
            <li><strong>Statutory & Legal Requirements:</strong> When mandated by valid court orders, government authorities, or law enforcement agencies under applicable Indian laws.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-security',
      number: '09',
      title: 'Security Measures & Data Protection',
      content: (
        <div className="space-y-3">
          <p>
            We implement industry-standard technical and operational safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>HTTPS / Transport Layer Security (TLS 1.3) encryption across all public web forms and client-server API communications.</li>
            <li>Secure hashing of authentication credentials and token-based API session management.</li>
            <li>Restricted backend database access limited strictly to authorized administrative personnel on a need-to-know basis.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-retention',
      number: '10',
      title: 'Data Storage & Retention Policies',
      content: (
        <div className="space-y-3">
          <p>
            Your personal information is stored securely on servers compliant with Indian data localization standards. We retain your personal identifiers only as long as necessary to fulfill the purposes for which they were collected:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Active Subscriptions:</strong> Maintained throughout the active tenure of your VIP membership plus applicable statutory tax and accounting retention periods (typically up to 7 years for financial payment logs).</li>
            <li><strong>Lucky Dip Records:</strong> Ticket numbers and draw hashes are archived for audit transparency and dispute resolution for a period of 12 calendar months following each draw.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy-notifications',
      number: '11',
      title: 'Notification Preferences & Communication Consent',
      content: (
        <div className="space-y-3">
          <p>
            By registering on ONE STOP GADGETS or purchasing a VIP Pass, you consent to receive administrative communications related to your account. You may opt out of non-essential promotional deal alerts at any time by updating your account settings or emailing our support desk. Essential transactional notifications (payment invoices, password resets, ticket confirmations) cannot be opted out of while maintaining an active account.
          </p>
        </div>
      )
    },
    {
      id: 'privacy-rights',
      number: '12',
      title: 'User Rights, Data Corrections & Consent Withdrawal',
      content: (
        <div className="space-y-3">
          <p>Under the Digital Personal Data Protection Act, you possess the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Request a summary of personal information held about you by ONE STOP GADGETS.</li>
            <li>Request corrections of inaccurate, incomplete, or outdated personal contact details.</li>
            <li>Request the deletion or erasure of your account and personal identifiers, subject to ongoing legal or regulatory compliance obligations.</li>
            <li>Withdraw previously granted consent for marketing communications.</li>
          </ul>
          <p>To exercise any of these rights, please contact our Data Grievance Officer using the details below.</p>
        </div>
      )
    },
    {
      id: 'privacy-children',
      number: '13',
      title: 'Children’s Privacy & Age Eligibility',
      content: (
        <div className="space-y-3">
          <p>
            ONE STOP GADGETS is intended strictly for individuals aged 18 years or older who are legally capable of entering into binding contracts under the Indian Contract Act, 1872. We do not knowingly collect personal identifiers from minors under 18 years of age. If we discover that personal data of a minor has been collected without parental consent, we will take immediate steps to delete such records from our databases.
          </p>
        </div>
      )
    },
    {
      id: 'privacy-external',
      number: '14',
      title: 'External Merchant Links & Third-Party Privacy Policies',
      content: (
        <div className="space-y-3">
          <p>
            Our website displays curated tech deals that contain hyperlink redirects to independent third-party e-commerce platforms (such as Amazon India, Flipkart, etc.). Once you click on an external deal link and leave ONE STOP GADGETS, your data collection, browsing, and purchase activities are governed entirely by the external merchant&apos;s privacy policy and terms. We encourage you to review their policies prior to completing transactions on third-party domains.
          </p>
        </div>
      )
    },
    {
      id: 'privacy-grievance',
      number: '15',
      title: 'Grievance Officer & Support Contacts',
      content: (
        <div className="space-y-3">
          <p>
            In accordance with the Information Technology Act 2000 and the DPDP Act 2023, the contact details for our appointed Grievance Officer are provided below:
          </p>
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-slate-200 space-y-1 text-slate-800 text-xs">
            <p><strong>Grievance Officer:</strong> Legal & Compliance Desk</p>
            <p><strong>Platform:</strong> ONE STOP GADGETS (India)</p>
            <p><strong>Email:</strong> <a href="mailto:example@gmail.com" className="text-[#245DE8] hover:underline font-bold">example@gmail.com</a></p>
            <p><strong>Helpline:</strong> <a href="tel:+917569950963" className="text-[#245DE8] hover:underline font-bold">+91 7569950963</a> (Mon – Sat, 9:00 AM – 8:00 PM IST)</p>
            <p><strong>Physical Address:</strong> Operations & Support Directorate, India</p>
          </div>
          <p className="text-[11px] text-slate-500">We will acknowledge grievances within 48 hours and work toward resolution within 30 business days.</p>
        </div>
      )
    }
  ];

  // 2. TERMS & CONDITIONS CONTENT
  const termsSections: Section[] = [
    {
      id: 'terms-acceptance',
      number: '01',
      title: 'Acceptance of Terms',
      content: (
        <div className="space-y-3">
          <p>
            By accessing, browsing, registering on, or utilizing the services provided by <strong>ONE STOP GADGETS</strong> (&quot;Website&quot; or &quot;Platform&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (&quot;Terms&quot;), along with our Privacy Policy, Returns & Refunds Policy, and Lucky Dip Draw Rules. If you do not agree to these Terms, you must discontinue using this platform immediately.
          </p>
        </div>
      )
    },
    {
      id: 'terms-platform',
      number: '02',
      title: 'Platform Description & Nature of Services',
      content: (
        <div className="space-y-3">
          <p>
            ONE STOP GADGETS operates as a curated electronic deals discovery platform, premium membership club, and promotional tech giveaway organizer. We aggregate price drops, discount coupons, and promotional offers from verified third-party e-commerce merchants (e.g., Amazon India, Flipkart). We do not directly manufacture, warehouse, inventory, or ship retail gadget products listed in our deals catalog.
          </p>
        </div>
      )
    },
    {
      id: 'terms-free-user',
      number: '03',
      title: 'Free User Membership & Permitted Access',
      content: (
        <div className="space-y-3">
          <p>
            General visitors and registered Free Users are granted non-exclusive, revocable, non-transferable access to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Browse and search general consumer electronics deals priced strictly below ₹50,000 INR.</li>
            <li>Utilize category filters, price sorting, search indexing (FiboSearch), and merchant redirect links.</li>
            <li>View informational sections, brand story, and contact support desks.</li>
          </ul>
          <p className="text-amber-800 font-semibold text-xs">
            Free users are not entitled to view unlocked VIP secret prices for flagship products priced at or above ₹50,000 INR or participate in VIP-only Lucky Dip prize draws.
          </p>
        </div>
      )
    },
    {
      id: 'terms-vip-monthly',
      number: '04',
      title: 'Monthly VIP Pass – ₹299 (30 Days Validity)',
      content: (
        <div className="space-y-3">
          <p>
            The Monthly VIP Pass is available for a one-time subscription fee of <strong>₹299 INR</strong> (inclusive of applicable taxes). Benefits include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Unrestricted access to all curated gadget deals, including flagship deals priced ₹50,000 and above.</li>
            <li>Unblurred VIP pricing, secret merchant coupons, and direct merchant checkout links.</li>
            <li><strong>1 eligible entry ticket</strong> per scheduled weekly Lucky Dip draw during active pass validity.</li>
            <li>Active pass duration of exactly 30 calendar days from the moment of payment confirmation.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'terms-vip-sixmonth',
      number: '05',
      title: '6-Month VIP Pass – ₹1,199 (180 Days Validity)',
      content: (
        <div className="space-y-3">
          <p>
            The 6-Month VIP Pass is priced at <strong>₹1,199 INR</strong> (offering over 33% savings compared to monthly renewals). Benefits include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>All benefits of the Monthly VIP Pass for 180 continuous calendar days.</li>
            <li><strong>2 eligible entry tickets</strong> per weekly Lucky Dip draw, doubling statistical winning chances.</li>
            <li>Priority early access alerts for limited-stock flash deals and festival promotions.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'terms-vip-annual',
      number: '06',
      title: 'Annual VIP Pass – ₹1,799 (365 Days Validity)',
      content: (
        <div className="space-y-3">
          <p>
            The Annual VIP Pass represents our premier membership tier priced at <strong>₹1,799 INR</strong> for 365 calendar days. Benefits include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>All platform benefits unlocked for an entire year.</li>
            <li><strong>3 eligible entry tickets</strong> per weekly Lucky Dip draw across all flagship giveaway rounds.</li>
            <li>VIP Gold Badge status on platform profile and dedicated priority customer assistance.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'terms-threshold',
      number: '07',
      title: 'Products Below ₹50,000 vs VIP Flagship Deals (≥ ₹50,000)',
      content: (
        <div className="space-y-3">
          <p>
            ONE STOP GADGETS maintains a strict threshold rule:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Deals below ₹50,000:</strong> Publicly accessible to Free Users with unblurred selling prices, discount percentages, and active &quot;View Deal&quot; affiliate buttons.</li>
            <li><strong>Deals at or above ₹50,000:</strong> Classified as VIP Exclusive. For Free Users, the selling price is digitally blurred, marked with a <code>🔒 VIP Access (≥ ₹50K)</code> badge, and displays a &quot;🔒 VIP Pass&quot; upgrade button. Active VIP members see all pricing unblurred with direct partner links.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'terms-payment-activation',
      number: '08',
      title: 'Payment Verification & Automatic VIP Activation',
      content: (
        <div className="space-y-3">
          <p>
            VIP Passes are activated automatically upon successful server-side payment verification by our payment gateway partner. You will receive an on-screen confirmation modal with your assigned Membership ID, plan tenure, and expiry date. If payment is debited from your bank account but your VIP pass fails to activate due to network interruption, our automated reconciliation webhook will activate the pass within 2 hours or prompt manual activation via support.
          </p>
        </div>
      )
    },
    {
      id: 'terms-expiry-renewal',
      number: '09',
      title: 'Subscription Validity, Expiry & Renewals',
      content: (
        <div className="space-y-3">
          <p>
            VIP memberships expire automatically at 23:59:59 IST on the final date of their validity period. We do <strong>not</strong> implement deceptive automatic recurring card charges without explicit customer re-authorization. Users may manually renew their subscription pass at any time via the VIP Membership Portal. Upon expiration, your account reverts safely to Free User status without deleting historical profile records.
          </p>
        </div>
      )
    },
    {
      id: 'terms-luckydip-rules',
      number: '10',
      title: 'Lucky Dip Participation & Sweepstakes Terms',
      content: (
        <div className="space-y-3">
          <p>
            Participation in weekly Lucky Dip prize draws is a complimentary promotional benefit extended exclusively to verified active VIP subscribers. Free users cannot submit valid draw entries without an active VIP pass. Each participant may submit up to their plan&apos;s allocated ticket limit (1 for Monthly, 2 for 6-Month, 3 for Annual). Any attempt to submit duplicate or automated bot entries using fraudulent identities will result in immediate disqualification and account termination.
          </p>
        </div>
      )
    },
    {
      id: 'terms-external-purchases',
      number: '11',
      title: 'Affiliate Redirects & External Merchant Responsibilities',
      content: (
        <div className="space-y-3">
          <p>
            When you click &quot;View Deal&quot; on any product card, you are redirected to an external third-party merchant site (such as Amazon.in or Flipkart.com). <strong>ONE STOP GADGETS is not the seller, merchant of record, or delivery agent for physical goods.</strong> All physical product transactions, payments, warranties, replacements, shipping timelines, and customer service inquiries are solely between you and the respective third-party merchant.
          </p>
        </div>
      )
    },
    {
      id: 'terms-disputes-law',
      number: '12',
      title: 'Governing Law, Jurisdiction & Dispute Resolution',
      content: (
        <div className="space-y-3">
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, claim, or controversy arising out of or relating to your use of ONE STOP GADGETS or VIP passes shall be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </div>
      )
    }
  ];

  // 3. RETURNS & REFUNDS CONTENT
  const refundSections: Section[] = [
    {
      id: 'refund-intro',
      number: '01',
      title: 'Introduction & Core Policy Statement',
      content: (
        <div className="space-y-3">
          <p>
            At <strong>ONE STOP GADGETS</strong>, we are dedicated to providing fair, transparent, and customer-friendly service across our digital subscriptions and promotional offerings. This Returns &amp; Refunds Policy sets out the exact circumstances under which subscription payments may be cancelled or refunded, as well as the separate handling of physical gadget purchases made via partner merchant links.
          </p>
        </div>
      )
    },
    {
      id: 'refund-vip-policy',
      number: '02',
      title: 'VIP Subscription Payment Policy & Cancellation',
      content: (
        <div className="space-y-3">
          <p>
            ONE STOP GADGETS offers digital VIP subscription passes (Monthly – ₹299, 6-Month – ₹1,199, Annual – ₹1,799). Because digital membership benefits (unblurred flagship pricing, secret voucher access, and Lucky Dip ticket allocations) are provisioned immediately upon transaction confirmation, subscriptions are generally non-refundable once activated and utilized.
          </p>
          <p>
            However, we recognize genuine technical and consumer situations where refunds are warranted, as outlined below.
          </p>
        </div>
      )
    },
    {
      id: 'refund-eligibility',
      number: '03',
      title: 'Refund Eligibility Criteria for Subscriptions',
      content: (
        <div className="space-y-3">
          <p>A subscriber is eligible to request a subscription refund under any of the following specific conditions:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li><strong>Duplicate or Multiple Deductions:</strong> If your bank account or card was debited more than once for a single VIP pass purchase due to a network glitch or payment gateway error.</li>
            <li><strong>Failed Activation with Debited Funds:</strong> If your payment was successfully deducted but your account was not upgraded to VIP status within 24 hours and our technical team cannot manually activate your pass.</li>
            <li><strong>Unauthorized Transactions:</strong> In verified instances of fraudulent payment card usage reported immediately to our support team and verified by the payment processor.</li>
            <li><strong>Early Cancellation Window (6-Month & Annual Passes):</strong> For 6-Month (₹1,199) and Annual (₹1,799) passes, if you request cancellation within <strong>48 hours</strong> of purchase, provided that no Lucky Dip entry tickets have been submitted and no proprietary merchant discount vouchers have been unlocked.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'refund-procedure',
      number: '04',
      title: 'Refund Request Procedure',
      content: (
        <div className="space-y-3">
          <p>To initiate an eligible refund request, follow these simple steps:</p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700">
            <li>Send an email to <a href="mailto:example@gmail.com" className="text-[#245DE8] font-bold hover:underline">example@gmail.com</a> with the subject line: <code>Refund Request - [Your Registered Mobile Number]</code>.</li>
            <li>Include your full name, registered email address, payment date, plan name, and the official Payment Transaction ID (e.g., <code>pay_rzp_XXXXXX</code>) received from Razorpay.</li>
            <li>Attach a digital copy of the payment receipt or bank deduction statement showing the debit.</li>
            <li>Our billing team will review your application, verify payment ledger status, and respond within 2 business days.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'refund-processing',
      number: '05',
      title: 'Refund Processing & Payment Reversal Timelines',
      content: (
        <div className="space-y-3">
          <p>
            Once an eligible refund is verified and approved by our billing desk:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>The refund instruction will be initiated through our payment gateway (Razorpay) within <strong>3 to 5 business days</strong>.</li>
            <li>Refunds are reversed strictly back to the original source payment method (same UPI handle, bank debit card, or credit card from which the payment originated). We do not issue cash refunds or third-party bank transfers.</li>
            <li>Depending on your issuing bank or card network, the credit will reflect in your account within <strong>5 to 7 banking days</strong> after processing.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'refund-external-merchants',
      number: '06',
      title: 'External Merchant Physical Product Returns & Refunds',
      content: (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <strong>CRITICAL DISTINCTION:</strong> ONE STOP GADGETS does not sell, ship, or process payments for physical electronics deals listed in our catalog.
          </div>
          <p>
            All physical gadgets (smartphones, laptops, headphones, smartwatches, etc.) are bought directly on partner websites such as Amazon India or Flipkart. Consequently:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Any return, replacement, order cancellation, damaged product claim, or refund for physical electronics is governed entirely by the return policy of the merchant where you completed the checkout (e.g., Amazon&apos;s 7-Day Replacement Policy).</li>
            <li>ONE STOP GADGETS customer support cannot track orders, process physical item returns, or issue refunds for items purchased on external e-commerce sites. Please contact the respective merchant&apos;s customer support directly with your merchant order ID.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'refund-luckydip',
      number: '07',
      title: 'Lucky Dip Prizes & Non-Convertibility',
      content: (
        <div className="space-y-3">
          <p>
            Physical or digital prizes awarded in the ONE STOP GADGETS Lucky Dip giveaways are complimentary promotional awards. <strong>Prizes cannot be returned, exchanged, or converted into direct cash equivalents</strong> unless an advertised prize item is permanently unavailable, in which case ONE STOP GADGETS reserves the right to substitute a prize of equal retail value.
          </p>
        </div>
      )
    }
  ];

  // 4. LUCKY DIP RULES CONTENT
  const luckyDipRulesSections: Section[] = [
    {
      id: 'rules-overview',
      number: '01',
      title: 'What ONE STOP GADGETS Lucky Dip Is',
      content: (
        <div className="space-y-3">
          <p>
            The <strong>ONE STOP GADGETS Lucky Dip</strong> is an exclusive weekly promotional sweepstakes organized to reward our active VIP subscribers with flagship technology prizes, including the Apple iPhone 16 Pro Max, Sony PlayStation 5 Slim, Dyson Airwrap stylers, and Amazon Gift Vouchers.
          </p>
          <p className="text-xs bg-blue-50 p-3 rounded-lg border border-blue-200 text-blue-900">
            <strong>Mandatory Legal Statement:</strong> Participation in the Lucky Dip is a complimentary membership benefit. Entry into any draw does not guarantee winning. Skill, prediction, or wagering is not involved; winners are selected strictly through transparent, audited random draw protocols.
          </p>
        </div>
      )
    },
    {
      id: 'rules-eligibility',
      number: '02',
      title: 'Eligibility Requirements & Age Restrictions',
      content: (
        <div className="space-y-3">
          <p>To participate in any scheduled Lucky Dip giveaway round, an entrant must satisfy all of the following:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>Must be a natural person aged <strong>18 years or older</strong> on the date of entry.</li>
            <li>Must be a legal resident of India with a valid delivery address within the territory of India (excluding jurisdictions where promotional sweepstakes are prohibited by state statute, e.g., Tamil Nadu Prize Schemes Prohibition Act).</li>
            <li>Must hold an <strong>Active VIP Pass</strong> (Monthly, 6-Month, or Annual) in good standing at the time of draw execution.</li>
            <li>Employees, directors, immediate family members, and contracted affiliates of ONE STOP GADGETS are strictly barred from participating.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'rules-ticket-allocation',
      number: '03',
      title: 'VIP Pass Ticket Allocations Per Weekly Draw',
      content: (
        <div className="space-y-3">
          <p>Every active subscriber receives entry ticket quotas based strictly on their active VIP tier:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Monthly VIP (₹299)</div>
              <div className="text-2xl font-black text-[#DC1F32] my-1">1 Entry</div>
              <div className="text-[11px] text-slate-600">Per eligible weekly draw</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-300 bg-amber-50/40 text-center shadow-xs">
              <div className="text-xs font-bold text-amber-700 uppercase">6-Month VIP (₹1,199)</div>
              <div className="text-2xl font-black text-amber-600 my-1">2 Entries</div>
              <div className="text-[11px] text-slate-600">Double statistical chance</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-blue-300 bg-blue-50/40 text-center shadow-xs">
              <div className="text-xs font-bold text-[#245DE8] uppercase">Annual VIP (₹1,799)</div>
              <div className="text-2xl font-black text-[#245DE8] my-1">3 Entries</div>
              <div className="text-[11px] text-slate-600">Maximum 3x entry tickets</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rules-entry-process',
      number: '04',
      title: 'Registration Procedure & Entry Verification',
      content: (
        <div className="space-y-3">
          <p>To register an official entry for the active weekly draw:</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
            <li>Navigate to the <strong>🎁 Lucky Dip</strong> tab on the platform.</li>
            <li>Submit your verified Full Legal Name, Email Address, 10-Digit Mobile Number, and City of Residence.</li>
            <li>Upon submission, our system validates active VIP subscription status and generates a cryptographically signed ticket identifier (e.g., <code>OSG-TKT-XXXXXX</code>).</li>
            <li>Duplicate entries exceeding your plan quota will be rejected automatically by our verification engine.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'rules-schedule-draw',
      number: '05',
      title: 'Draw Schedules & Provably Fair Winner Selection',
      content: (
        <div className="space-y-3">
          <p>
            <strong>Draw Timelines:</strong> Lucky Dip rounds are conducted weekly. Entries for each round close every Sunday at 20:00:00 IST. The official draw is executed at 21:00:00 IST.
          </p>
          <p>
            <strong>Transparent Cryptographic Verification:</strong> Winner selection utilizes an open cryptographic protocol combining a published Server Seed (SHA-256 hashed prior to entry round opening), the cumulative Client Seed (ticket array count), and the public Bitcoin block hash at draw closing. This mathematical procedure ensures zero administrative tampering, zero retrospective modification, and provable statistical randomness.
          </p>
        </div>
      )
    },
    {
      id: 'rules-winner-notification',
      number: '06',
      title: 'Winner Announcements & Prize Claim Procedure',
      content: (
        <div className="space-y-3">
          <p>
            Winners are announced publicly on the Lucky Dip &quot;🏆 Real Winners&quot; board within 2 hours of draw completion. The winner will also receive formal notification via email and SMS/telephone call from our verified support desk.
          </p>
          <p>
            <strong>Claim Verification:</strong> Winners must respond within <strong>7 calendar days</strong> of notification with valid Government-issued photo identification (Aadhaar Card, Passport, or PAN Card) matching their registered full name and shipping address. If a winner fails to claim or fails identity verification within 7 days, an alternate winner will be selected via the same cryptographic sequence.
          </p>
        </div>
      )
    },
    {
      id: 'rules-delivery-tax',
      number: '07',
      title: 'Prize Delivery & Statutory Compliance',
      content: (
        <div className="space-y-3">
          <p>
            Verified physical prizes are shipped via insured premium express couriers at zero shipping cost to the winner. In compliance with Section 194B of the Indian Income Tax Act 1961, any applicable Tax Deducted at Source (TDS) on winnings exceeding statutory thresholds must be settled in accordance with government guidelines prior to prize handover.
          </p>
        </div>
      )
    }
  ];

  // 5. AFFILIATE & MERCHANT DISCLOSURE CONTENT
  const affiliateSections: Section[] = [
    {
      id: 'affiliate-intro',
      number: '01',
      title: 'Platform Role & Affiliate Relationship Disclosure',
      content: (
        <div className="space-y-3">
          <p>
            <strong>ONE STOP GADGETS</strong> operates as an independent tech deals aggregator, price comparison directory, and consumer electronics discovery portal. In compliance with the <em>Advertising Standards Council of India (ASCI)</em> guidelines and international disclosure standards, we provide this transparent disclosure regarding our commercial relationships with third-party e-commerce platforms.
          </p>
        </div>
      )
    },
    {
      id: 'affiliate-commissions',
      number: '02',
      title: 'Affiliate Marketing & Commissions Disclosure',
      content: (
        <div className="space-y-3">
          <p>
            Many of the product links displayed on ONE STOP GADGETS are affiliate referral links. When you click on a &quot;View Deal&quot; link and make a purchase on a partner merchant&apos;s website, <strong>we may earn a small referral commission from the merchant at absolutely ZERO extra cost to you.</strong>
          </p>
          <p>
            The price you pay for any gadget on the merchant&apos;s platform remains completely identical whether you navigate via our affiliate link or go directly to the merchant. In many instances, our negotiated coupons and curated deals offer you a lower overall price.
          </p>
        </div>
      )
    },
    {
      id: 'affiliate-amazon',
      number: '03',
      title: 'Amazon Associates Program Disclosure',
      content: (
        <div className="space-y-3">
          <p>
            ONE STOP GADGETS is a participant in the <strong>Amazon Services LLC Associates Program</strong> and the <strong>Amazon India Associates Program</strong>, an affiliate advertising initiative designed to provide a means for websites to earn advertising fees and commissions by advertising and linking to Amazon.in.
          </p>
          <p className="text-xs text-slate-600">
            Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </div>
      )
    },
    {
      id: 'affiliate-flipkart',
      number: '04',
      title: 'Flipkart & Verified Merchant Network Disclosure',
      content: (
        <div className="space-y-3">
          <p>
            We also feature curated promotional offers from the <strong>Flipkart Affiliate Network</strong> and other recognized consumer electronics retail merchants. We do not claim official corporate sponsorship, direct partnership, or endorsement by these entities unless expressly stated on our website.
          </p>
        </div>
      )
    },
    {
      id: 'affiliate-pricing-changes',
      number: '05',
      title: 'Product Pricing & Availability Volatility',
      content: (
        <div className="space-y-3">
          <p>
            Online electronics pricing, lightning deals, and inventory availability change rapidly and unpredictably on external merchant platforms based on merchant algorithms and stock reserves. While our automated feeds strive to display current pricing:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            <li>The final binding price, delivery fee, and warranty coverage are those displayed on the merchant&apos;s checkout page at the exact moment of your purchase.</li>
            <li>ONE STOP GADGETS cannot guarantee that an advertised discount or deal price will remain available once you reach the merchant portal.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'affiliate-editorial',
      number: '06',
      title: 'Independence of Deal Selection',
      content: (
        <div className="space-y-3">
          <p>
            Our deal curation team independently selects products based on genuine discount margins, consumer ratings (minimum 4.0+ stars), product reliability, and market popularity. Merchant commission rates do not dictate our editorial ranking or our decision to highlight a particular gadget.
          </p>
        </div>
      )
    },
    {
      id: 'affiliate-support',
      number: '07',
      title: 'Support & Merchant Responsibilities',
      content: (
        <div className="space-y-3">
          <p>
            Please note that ONE STOP GADGETS does not process billing, fulfill shipments, or provide post-purchase product warranties for physical items purchased through external links. For questions regarding order status, returns, warranty repairs, or merchant payments, please contact the respective retailer directly.
          </p>
          <p>
            For questions about our affiliate disclosure or to report an expired or inaccurate deal listing, please email our support desk at <a href="mailto:example@gmail.com" className="text-[#245DE8] font-bold hover:underline">example@gmail.com</a>.
          </p>
        </div>
      )
    }
  ];

  // Page Configuration Selector
  const getPageConfig = () => {
    switch (route) {
      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          subtitle: 'Digital Personal Data Protection Act (DPDP 2023) Compliant Policy',
          lastUpdated: 'November 24, 2026',
          sections: privacySections
        };
      case 'terms-and-conditions':
        return {
          title: 'Terms & Conditions',
          subtitle: 'Platform Usage Agreement, Free User Rights, and VIP Membership Terms',
          lastUpdated: 'November 24, 2026',
          sections: termsSections
        };
      case 'returns-and-refunds':
        return {
          title: 'Returns & Refunds Policy',
          subtitle: 'VIP Subscription Cancellation, Failed Payment Reversals & Merchant Return Disclaimers',
          lastUpdated: 'November 24, 2026',
          sections: refundSections
        };
      case 'lucky-dip-rules':
        return {
          title: 'Provably Fair Draw Rules',
          subtitle: 'Official Sweepstakes Eligibility, Ticket Allocations & Cryptographic Audit Verification',
          lastUpdated: 'November 24, 2026',
          sections: luckyDipRulesSections
        };
      case 'affiliate-disclosure':
        return {
          title: 'Affiliate & Merchant Disclosure',
          subtitle: 'ASCI Compliant Referral Relationship, Commission Transparency & Pricing Notice',
          lastUpdated: 'November 24, 2026',
          sections: affiliateSections
        };
    }
  };

  const page = getPageConfig();

  const allLegalPages: Array<{ id: LegalRoute; label: string }> = [
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-and-conditions', label: 'Terms & Conditions' },
    { id: 'returns-and-refunds', label: 'Returns & Refunds' },
    { id: 'lucky-dip-rules', label: 'Provably Fair Draw Rules' },
    { id: 'affiliate-disclosure', label: 'Affiliate Disclosure' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#091B3D] antialiased">
      {/* Top Banner / Header Breadcrumb */}
      <div className="bg-[#0D182E] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#245DE8]/30">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 flex-wrap">
            <button onClick={onBackToHome} className="hover:text-white transition flex items-center gap-1">
              <span>🏠</span> <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#DC1F32] font-bold">Important Legal Documents</span>
            <span>/</span>
            <span className="text-white font-extrabold">{page.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {page.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {page.subtitle}
              </p>
            </div>
            <div className="shrink-0 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-amber-300 self-start md:self-auto">
              🗓️ Last Updated: {page.lastUpdated}
            </div>
          </div>

          {/* Quick Tabs to other 4 legal pages */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-4 no-scrollbar border-t border-white/10 text-xs">
            {allLegalPages.map(p => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold transition-all ${
                  p.id === route
                    ? 'bg-[#DC1F32] text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Table of Contents */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <div className="text-[11px] font-extrabold text-[#DC1F32] uppercase tracking-wider">Document Navigation</div>
              <h3 className="text-base font-extrabold text-[#0D182E] mt-0.5">Table of Contents</h3>
            </div>

            <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
              {page.sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-start gap-2 ${
                    activeSectionId === s.id
                      ? 'bg-[#245DE8]/10 text-[#245DE8] font-bold border-l-4 border-[#245DE8]'
                      : 'text-slate-600 hover:bg-[#FAF7F2] hover:text-[#0D182E]'
                  }`}
                >
                  <span className="text-[#DC1F32] font-mono text-[10px] mt-0.5">{s.number}</span>
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </nav>

            {/* Quick Action in Sidebar */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={onBackToHome}
                className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-slate-200 text-[#0D182E] text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>←</span> <span>Back to Home</span>
              </button>
              {onOpenPricing && (
                <button
                  onClick={onOpenPricing}
                  className="w-full py-2.5 rounded-xl bg-[#DC1F32] hover:bg-[#b81827] text-white text-xs font-black transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>👑 Explore VIP Passes</span>
                </button>
              )}
            </div>
          </aside>

          {/* Right Main Body: Detailed Legal Clauses */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Introductory Notice Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-[#245DE8] uppercase tracking-wider">
                <span>🛡️</span> <span>Official Legal Document</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                This document constitutes a binding agreement and legal disclosure for all participants and visitors of <strong>ONE STOP GADGETS</strong>. Please review all numbered clauses below carefully.
              </p>
            </div>

            {/* Render Each Clause Card */}
            {page.sections.map(s => (
              <section
                key={s.id}
                id={s.id}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-3 transition hover:border-[#245DE8]/40"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#DC1F32]/10 text-[#DC1F32] font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {s.number}
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-[#0D182E] tracking-tight">
                    {s.title}
                  </h2>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {s.content}
                </div>
              </section>
            ))}

            {/* Bottom Contact & Verification Footer */}
            <div className="bg-[#0D182E] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg border border-[#245DE8]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <span>⚖️</span> <span>Legal Advisory Notice</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Questions or Official Enquiries?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If you require clarification on our terms, subscription refund rights, Lucky Dip draw audits, or privacy practices, reach our authorized compliance officers directly:
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <a href="mailto:example@gmail.com" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-white transition flex items-center gap-2">
                  <span>✉️</span> <span>example@gmail.com</span>
                </a>
                <a href="tel:+917569950963" className="px-4 py-2 rounded-xl bg-[#245DE8] hover:bg-[#1b4cc4] font-bold text-white transition flex items-center gap-2">
                  <span>📞</span> <span>+91 7569950963</span>
                </a>
                <button onClick={onBackToHome} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-white transition">
                  Back to Deals Home →
                </button>
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
