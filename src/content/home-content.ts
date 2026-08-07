/**
 * Homepage content imported verbatim from the approved "ShriNeo Capital
 * Landing" reference (translation object keys: hiwEyebrow, hiwTitle, hiwLead,
 * steps, faqEyebrow, faqTitle, faqCats, faq).
 *
 * Kept outside the flat i18n dictionary because these are ordered lists.
 */

import type { Language } from "@/i18n";

export type HowStep = { title: string; body: string };
export type FaqItem = { q: string; a: string };

type HomeContent = {
  hiwEyebrow: string;
  hiwTitle: string;
  hiwLead: string;
  steps: HowStep[];
  faqEyebrow: string;
  faqTitle: string;
  faqCats: string[];
  faq: FaqItem[][];
};

const en: HomeContent = {
  hiwEyebrow: "How it works",
  hiwTitle: "Four steps, start to finish",
  hiwLead: "No branch visit, and no paperwork you cannot read for yourself",
  steps: [
    {
      title: "Tell us what you need",
      body: "Amount, purpose, and your mobile number. Nothing else to begin.",
    },
    {
      title: "Get matched",
      body: "Neo checks your profile against the lenders on the platform.",
    },
    {
      title: "Review your offer",
      body: "Interest, fees, APR and the full repayment schedule — before you apply.",
    },
    {
      title: "Funds to your account",
      body: "The lender transfers the money directly to your bank account.",
    },
  ],
  faqEyebrow: "Questions",
  faqTitle: "Answers before you apply",
  faqCats: ["For borrowers", "For agents", "General"],
  faq: [
    [
      {
        q: "How does ShriNeo work?",
        a: "You tell us the amount you need and verify your mobile number. Neo matches your profile against the lenders on the platform, and you review each offer with its interest, fees and APR before applying.",
      },
      {
        q: "Does ShriNeo charge me anything?",
        a: "The platform is free for borrowers. ShriNeo is paid by the lender, not by you. Any processing fee shown in an offer is charged by the lender and appears in your Key Fact Statement before you apply.",
      },
      {
        q: "What documents do I need?",
        a: "To begin, Aadhaar, PAN and six months of bank statements. For a business loan, a GST or Udyam number helps. The lender may ask for more depending on the product.",
      },
      {
        q: "I have no CIBIL history. Can I still apply?",
        a: "Yes. A thin or missing bureau file does not end the process. With your consent, the SNV Trust Score reads everyday signals such as bank activity and bill payments so lenders have something to assess.",
      },
      {
        q: "How does the money reach me?",
        a: "The lender transfers the sanctioned amount directly to your bank account. ShriNeo never holds, routes or collects your loan funds at any stage.",
      },
      {
        q: "What is the SNV Trust Score?",
        a: "It is a 0–100 view of financial discipline built from signals you consent to share — UPI and bank activity, utility and mobile bills, business cash flow and past repayments. It is separate from the 300–900 CIBIL scale.",
      },
    ],
    [
      {
        q: "Who can register as an Agent?",
        a: "Anyone already helping people apply for loans offline — a loan broker, a shop owner, or a local advisor. You register on the platform and complete verification before you begin.",
      },
      {
        q: "How do I register?",
        a: "Sign up with your mobile number, submit your identity and address documents, and complete the training module. Once verified, you receive an official ShriNeo Agent ID.",
      },
      {
        q: "How does commission work?",
        a: "Commission is set per product and shown to you before you submit a case. It is paid after the lender disburses the loan, against the payout schedule visible in your account.",
      },
      {
        q: "What can I see about my cases?",
        a: "Every case you submit is tracked from application to disbursal, with the documents pending, the current status and the expected payout in one view.",
      },
      {
        q: "Is there training?",
        a: "Yes. Registration includes a training module covering the products, the documents required and conduct rules. You receive a certificate on completion.",
      },
      {
        q: "What conduct is expected of an Agent?",
        a: "Agents must identify themselves with their ShriNeo ID, never collect cash or fees from a borrower, and never promise an outcome. Breaches can end your registration.",
      },
    ],
    [
      {
        q: "Is ShriNeo an NBFC or a bank?",
        a: "No. ShriNeo Capital is an RBI-aligned Lending Service Provider. Loans are sanctioned and disbursed by the regulated lenders on the platform, who remain your lender of record.",
      },
      {
        q: "How is my data handled?",
        a: "Data is encrypted, read only with your consent, and never sold. You can withdraw consent for the signals used in your SNV Trust Score from your account.",
      },
      {
        q: "What is a Key Fact Statement?",
        a: "It is the summary a lender must give you before you commit — interest rate, fees, APR, tenure and the full repayment schedule, in one place, so nothing is hidden at signing.",
      },
      {
        q: "Which languages does ShriNeo support?",
        a: "The platform is available in English, Hindi and Marathi today, with more Indian languages being added. Neo answers in the language you choose.",
      },
      {
        q: "How do I raise a grievance?",
        a: "Write to our Grievance Redressal Officer using the contact details in the footer. You will receive an acknowledgement with a reference number, and we respond within the timelines set by RBI guidelines.",
      },
      {
        q: "What if my complaint is about a lender or an Agent?",
        a: "Raise it with us the same way. We record the complaint, take it up with the lender or Agent concerned, and keep you updated until it is closed.",
      },
    ],
  ],
};

const hi: HomeContent = {
  hiwEyebrow: "यह कैसे काम करता है",
  hiwTitle: "शुरू से अंत तक, चार कदम",
  hiwLead: "न शाखा के चक्कर, न ऐसे कागज़ जो आप ख़ुद पढ़ न सकें",
  steps: [
    {
      title: "बताइए आपको क्या चाहिए",
      body: "राशि, ज़रूरत और आपका मोबाइल नंबर। शुरू करने के लिए बस इतना।",
    },
    {
      title: "ऑफर से मिलान",
      body: "Neo आपकी प्रोफ़ाइल प्लेटफ़ॉर्म पर मौजूद लेंडर्स से मिलाता है।",
    },
    {
      title: "अपना ऑफर देखें",
      body: "ब्याज, फीस, APR और पूरा भुगतान शेड्यूल — आवेदन से पहले।",
    },
    {
      title: "पैसा आपके खाते में",
      body: "लेंडर राशि सीधे आपके बैंक खाते में भेजता है।",
    },
  ],
  faqEyebrow: "सवाल",
  faqTitle: "आवेदन से पहले, आपके सवालों के जवाब",
  faqCats: ["ग्राहकों के लिए", "एजेंट्स के लिए", "सामान्य"],
  faq: [
    [
      {
        q: "ShriNeo कैसे काम करता है?",
        a: "आप ज़रूरी राशि बताइए और मोबाइल नंबर सत्यापित कीजिए। Neo आपकी प्रोफ़ाइल प्लेटफ़ॉर्म पर मौजूद लेंडर्स से मिलाता है, और आप हर ऑफर की दर, फीस और APR आवेदन से पहले देखते हैं।",
      },
      {
        q: "क्या ShriNeo मुझसे कोई शुल्क लेता है?",
        a: "ग्राहकों के लिए प्लेटफ़ॉर्म नि:शुल्क है। ShriNeo को भुगतान लेंडर करता है, आप नहीं। ऑफर में दिखने वाली प्रोसेसिंग फीस लेंडर की होती है और आवेदन से पहले Key Fact Statement में दिखती है।",
      },
      {
        q: "कौन से दस्तावेज़ चाहिए?",
        a: "शुरू करने के लिए आधार, PAN और छह महीने का बैंक स्टेटमेंट। व्यवसाय लोन में GST या उद्यम नंबर मददगार है। उत्पाद के अनुसार लेंडर और दस्तावेज़ माँग सकता है।",
      },
      {
        q: "मेरा CIBIL इतिहास नहीं है, क्या फिर भी आवेदन कर सकता हूँ?",
        a: "हाँ। ब्यूरो फ़ाइल न होने पर भी प्रक्रिया रुकती नहीं। आपकी सहमति से SNV Trust Score बैंक गतिविधि और बिल भुगतान जैसे रोज़मर्रा के संकेत पढ़ता है, ताकि लेंडर के पास आकलन का आधार हो।",
      },
      {
        q: "पैसा मुझ तक कैसे पहुँचता है?",
        a: "लेंडर स्वीकृत राशि सीधे आपके बैंक खाते में भेजता है। ShriNeo आपके लोन का पैसा किसी भी चरण में अपने पास नहीं रखता।",
      },
      {
        q: "SNV Trust Score क्या है?",
        a: "यह 0–100 का एक दृश्य है, जो आपकी सहमति से साझा किए गए संकेतों — UPI व बैंक गतिविधि, बिल भुगतान, कारोबारी कैश-फ़्लो और पुरानी चुकौती — से बनता है। यह 300–900 वाले CIBIL पैमाने से अलग है।",
      },
    ],
    [
      {
        q: "एजेंट कौन बन सकता है?",
        a: "वे सभी जो पहले से लोगों की ऑफ़लाइन लोन आवेदन में मदद करते हैं — लोन ब्रोकर, दुकान मालिक या स्थानीय सलाहकार। पंजीकरण के बाद सत्यापन पूरा करना होता है।",
      },
      {
        q: "पंजीकरण कैसे करें?",
        a: "मोबाइल नंबर से साइन अप कीजिए, पहचान और पते के दस्तावेज़ जमा कीजिए, और ट्रेनिंग मॉड्यूल पूरा कीजिए। सत्यापन के बाद आपको आधिकारिक ShriNeo एजेंट ID मिलती है।",
      },
      {
        q: "कमीशन कैसे मिलता है?",
        a: "हर उत्पाद के लिए कमीशन तय है और केस भेजने से पहले आपको दिखता है। लेंडर द्वारा राशि वितरित होने के बाद, आपके अकाउंट में दिख रहे भुगतान शेड्यूल के अनुसार भुगतान होता है।",
      },
      {
        q: "अपने केस के बारे में क्या दिखता है?",
        a: "हर केस आवेदन से वितरण तक ट्रैक होता है — बाक़ी दस्तावेज़, मौजूदा स्थिति और अपेक्षित भुगतान, सब एक जगह।",
      },
      {
        q: "क्या ट्रेनिंग मिलती है?",
        a: "हाँ। पंजीकरण में उत्पाद, ज़रूरी दस्तावेज़ और आचरण नियमों की ट्रेनिंग शामिल है। पूरा करने पर प्रमाणपत्र मिलता है।",
      },
      {
        q: "एजेंट से किस आचरण की अपेक्षा है?",
        a: "एजेंट को अपनी ShriNeo ID दिखानी होती है, ग्राहक से नक़द या फीस कभी नहीं लेनी होती, और किसी नतीजे का वादा नहीं करना होता। उल्लंघन पर पंजीकरण समाप्त हो सकता है।",
      },
    ],
    [
      {
        q: "क्या ShriNeo एक NBFC या बैंक है?",
        a: "नहीं। ShriNeo Capital एक RBI-अनुरूप लेंडिंग सर्विस प्रोवाइडर है। लोन प्लेटफ़ॉर्म पर मौजूद नियामित लेंडर स्वीकृत और वितरित करते हैं, और वही आपके लेंडर रहते हैं।",
      },
      {
        q: "मेरे डेटा का क्या होता है?",
        a: "डेटा एन्क्रिप्टेड है, केवल आपकी सहमति से पढ़ा जाता है, और कभी बेचा नहीं जाता। SNV Trust Score में इस्तेमाल संकेतों की सहमति आप अपने अकाउंट से वापस ले सकते हैं।",
      },
      {
        q: "Key Fact Statement क्या है?",
        a: "यह वह सारांश है जो लेंडर को प्रतिबद्धता से पहले देना होता है — ब्याज दर, फीस, APR, अवधि और पूरा भुगतान शेड्यूल, एक ही जगह, ताकि हस्ताक्षर के समय कुछ छिपा न रहे।",
      },
      {
        q: "कौन सी भाषाएँ उपलब्ध हैं?",
        a: "फ़िलहाल अंग्रेज़ी, हिंदी और मराठी उपलब्ध हैं, और भारतीय भाषाएँ जोड़ी जा रही हैं। Neo आपकी चुनी हुई भाषा में जवाब देता है।",
      },
      {
        q: "शिकायत कैसे दर्ज करें?",
        a: "फ़ुटर में दिए संपर्क विवरण से हमारे शिकायत निवारण अधिकारी को लिखिए। आपको संदर्भ संख्या के साथ पावती मिलेगी, और हम RBI दिशानिर्देशों की समय-सीमा में जवाब देते हैं।",
      },
      {
        q: "शिकायत लेंडर या एजेंट के बारे में हो तो?",
        a: "उसे भी इसी तरह दर्ज कीजिए। हम शिकायत रिकॉर्ड करते हैं, संबंधित लेंडर या एजेंट के साथ उठाते हैं, और बंद होने तक आपको अपडेट रखते हैं।",
      },
    ],
  ],
};

const dictionaries: Partial<Record<Language, HomeContent>> = { en, hi };

export function homeContent(language: Language): HomeContent {
  return dictionaries[language] ?? en;
}
