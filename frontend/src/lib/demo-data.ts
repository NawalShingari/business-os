export type Client = {
  id: string;
  name: string;
  initials: string;
  tag: string;
  since: string;
  visits: number;
  lifetime: number;
  balance: number;
  lastVisit: string;
  nextVisit: string | null;
  phone: string;
  email: string;
  summary: string;
  memory: string[];
  timeline: { date: string; type: string; title: string; detail: string }[];
  notes: { date: string; body: string }[];
  documents: { name: string; size: string; date: string }[];
};

export const clients: Client[] = [
  {
    id: "rahul-mehta",
    name: "Rahul Mehta",
    initials: "RM",
    tag: "Cardiology",
    since: "Mar 2023",
    visits: 11,
    lifetime: 48200,
    balance: 2400,
    lastVisit: "12 Oct 2026",
    nextVisit: "Today, 10:00",
    phone: "+91 98200 41192",
    email: "rahul.mehta@gmail.com",
    summary:
      "Long-term hypertension patient, highly consistent attendance. Prefers late-evening slots but has accepted three morning appointments this quarter. One invoice is 6 days overdue — historically pays within 48h of a reminder.",
    memory: [
      "Books evening slots in 9 of 11 visits.",
      "Never cancels; reschedules ~2 days ahead when he does.",
      "Responds to WhatsApp reminders within an hour.",
    ],
    timeline: [
      { date: "Today", type: "Appointment", title: "Follow-up consultation", detail: "10:00 · 30 min · Dr. Aris" },
      { date: "18 Oct", type: "Payment", title: "Invoice #9283-A issued", detail: "₹2,400 · overdue by 6 days" },
      { date: "12 Oct", type: "Appointment", title: "Routine review", detail: "BP stable at 128/82" },
      { date: "12 Oct", type: "Note", title: "Medication adjusted", detail: "Amlodipine 5mg → 2.5mg" },
      { date: "24 Aug", type: "Appointment", title: "Annual check-up", detail: "ECG normal" },
    ],
    notes: [
      { date: "12 Oct 2026", body: "Reports fewer headaches after dosage change. Continue monitoring monthly." },
      { date: "24 Aug 2026", body: "Discussed diet plan; referred to nutrition partner." },
    ],
    documents: [
      { name: "ECG-Oct-2026.pdf", size: "1.2 MB", date: "12 Oct 2026" },
      { name: "Lipid-panel.pdf", size: "480 KB", date: "24 Aug 2026" },
    ],
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    initials: "SJ",
    tag: "General",
    since: "Jan 2022",
    visits: 8,
    lifetime: 31600,
    balance: 0,
    lastVisit: "02 Oct 2026",
    nextVisit: "Today, 09:30",
    phone: "+91 99870 23331",
    email: "s.jenkins@outlook.com",
    summary:
      "Eight visits over four years, all morning appointments. Follow-up for thyroid panel is pending since 02 Oct — the only outstanding item on her record.",
    memory: [
      "Exclusively morning appointments (avg 09:20).",
      "Has visited 8 times — top 10% retention.",
      "Overdue follow-up: thyroid panel review.",
    ],
    timeline: [
      { date: "Today", type: "Appointment", title: "Check-up", detail: "09:30 · 30 min" },
      { date: "02 Oct", type: "Lab", title: "Thyroid panel ordered", detail: "Review still pending" },
      { date: "02 Oct", type: "Payment", title: "₹3,200 settled", detail: "UPI · instant" },
      { date: "14 May", type: "Appointment", title: "General consultation", detail: "Seasonal allergy" },
    ],
    notes: [{ date: "02 Oct 2026", body: "Fatigue reported. Thyroid panel ordered; review at next visit." }],
    documents: [{ name: "Thyroid-panel.pdf", size: "310 KB", date: "05 Oct 2026" }],
  },
  {
    id: "james-wu",
    name: "James Wu",
    initials: "JW",
    tag: "Orthopedic",
    since: "Jul 2025",
    visits: 4,
    lifetime: 18900,
    balance: 1200,
    lastVisit: "28 Sep 2026",
    nextVisit: "Today, 10:45",
    phone: "+91 90040 88123",
    email: "james.wu@work.co",
    summary:
      "Post-operative knee rehabilitation, month four of six. Attendance is reliable but he tends to shift appointments later in the day when booked before 10:00.",
    memory: ["Reschedules 40% of pre-10:00 bookings.", "Rehab plan ends Dec 2026.", "₹1,200 pending on last session."],
    timeline: [
      { date: "Today", type: "Appointment", title: "Rehab follow-up", detail: "10:45 · 45 min" },
      { date: "28 Sep", type: "Appointment", title: "Physio review", detail: "Range of motion +12°" },
      { date: "12 Sep", type: "Payment", title: "₹4,800 settled", detail: "Card" },
    ],
    notes: [{ date: "28 Sep 2026", body: "Strength improving. Add resistance band routine." }],
    documents: [{ name: "MRI-knee.pdf", size: "6.4 MB", date: "11 Jul 2025" }],
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    initials: "ER",
    tag: "Consult",
    since: "Feb 2026",
    visits: 2,
    lifetime: 6400,
    balance: 0,
    lastVisit: "15 Aug 2026",
    nextVisit: "Today, 13:00",
    phone: "+91 98111 77220",
    email: "elena.r@studio.design",
    summary:
      "New patient acquired through referral. Two visits so far with a 100% on-time record. High likelihood of converting to an annual care plan based on similar profiles.",
    memory: ["Referred by Priya Das.", "Both visits booked within 24h of contact.", "No payment history issues."],
    timeline: [
      { date: "Today", type: "Appointment", title: "Consultation", detail: "13:00 · 30 min" },
      { date: "15 Aug", type: "Appointment", title: "First visit", detail: "Intake completed" },
    ],
    notes: [{ date: "15 Aug 2026", body: "Intake complete. No chronic conditions reported." }],
    documents: [],
  },
  {
    id: "priya-das",
    name: "Priya Das",
    initials: "PD",
    tag: "Dermatology",
    since: "Nov 2021",
    visits: 16,
    lifetime: 72400,
    balance: 0,
    lastVisit: "20 Oct 2026",
    nextVisit: null,
    phone: "+91 97400 12308",
    email: "priya.das@mail.com",
    summary:
      "Highest lifetime value in the practice and your strongest referral source — three patients this year came from her. Sensitive to local anesthetic; flagged on every chart.",
    memory: [
      "High sensitivity to local anesthetic.",
      "Referred 3 patients in 2026.",
      "Visits cluster around Wednesdays.",
    ],
    timeline: [
      { date: "20 Oct", type: "Appointment", title: "Third follow-up", detail: "Healing on track" },
      { date: "20 Oct", type: "Payment", title: "₹5,600 settled", detail: "UPI" },
      { date: "06 Oct", type: "Note", title: "Anesthetic flag added", detail: "Use topical alternative" },
    ],
    notes: [{ date: "06 Oct 2026", body: "Reaction to lidocaine. Switch to topical alternative going forward." }],
    documents: [{ name: "Consent-form.pdf", size: "210 KB", date: "06 Oct 2026" }],
  },
  {
    id: "aarav-sharma",
    name: "Aarav Sharma",
    initials: "AS",
    tag: "General",
    since: "Jun 2024",
    visits: 6,
    lifetime: 21300,
    balance: 3800,
    lastVisit: "30 Sep 2026",
    nextVisit: "Tomorrow, 16:30",
    phone: "+91 96500 44412",
    email: "aarav.sharma@gmail.com",
    summary:
      "Payment behaviour has drifted: the last two invoices took over three weeks. A reminder sent on the day of service historically halves that delay.",
    memory: ["Average payment delay: 23 days.", "Prefers Saturday appointments.", "₹3,800 outstanding."],
    timeline: [
      { date: "Tomorrow", type: "Appointment", title: "Consultation", detail: "16:30 · 30 min" },
      { date: "30 Sep", type: "Payment", title: "Invoice #9111-C", detail: "₹3,800 · 24 days overdue" },
    ],
    notes: [],
    documents: [],
  },
];

export const appointments = [
  { time: "09:00", client: "Liam Henderson", type: "New patient intake", duration: "30m", status: "Completed" },
  { time: "09:30", client: "Sarah Jenkins", type: "Check-up", duration: "30m", status: "Checked in" },
  { time: "10:00", client: "Rahul Mehta", type: "Follow-up consultation", duration: "30m", status: "Next up" },
  { time: "10:45", client: "James Wu", type: "Rehab follow-up", duration: "45m", status: "Confirmed" },
  { time: "11:30", client: "Neha Gupta", type: "Orthodontic review", duration: "30m", status: "Confirmed" },
  { time: "13:00", client: "Elena Rodriguez", type: "Consultation", duration: "30m", status: "Confirmed" },
  { time: "14:00", client: "Siddharth Malhotra", type: "Minor procedure", duration: "60m", status: "Confirmed" },
  { time: "16:00", client: "Ananya Singh", type: "Post-op review", duration: "30m", status: "Unconfirmed" },
];

export const payments = [
  { id: "9283-A", client: "Rahul Mehta", amount: 2400, date: "18 Oct 2026", method: "Invoice", status: "Overdue" },
  { id: "9111-C", client: "Aarav Sharma", amount: 3800, date: "30 Sep 2026", method: "Invoice", status: "Overdue" },
  { id: "9302-B", client: "James Wu", amount: 1200, date: "22 Oct 2026", method: "Invoice", status: "Pending" },
  { id: "9298-K", client: "Priya Das", amount: 5600, date: "20 Oct 2026", method: "UPI", status: "Paid" },
  { id: "9291-M", client: "Sarah Jenkins", amount: 3200, date: "02 Oct 2026", method: "UPI", status: "Paid" },
  { id: "9284-R", client: "Elena Rodriguez", amount: 3200, date: "15 Aug 2026", method: "Card", status: "Paid" },
  { id: "9277-T", client: "Neha Gupta", amount: 4500, date: "11 Aug 2026", method: "Cash", status: "Paid" },
];

export const revenueByMonth = [
  { month: "May", revenue: 86000, clients: 41 },
  { month: "Jun", revenue: 92400, clients: 46 },
  { month: "Jul", revenue: 88700, clients: 44 },
  { month: "Aug", revenue: 104200, clients: 52 },
  { month: "Sep", revenue: 111500, clients: 55 },
  { month: "Oct", revenue: 121300, clients: 61 },
];

export const weekdayLoad = [
  { day: "Mon", appts: 7 },
  { day: "Tue", appts: 9 },
  { day: "Wed", appts: 12 },
  { day: "Thu", appts: 8 },
  { day: "Fri", appts: 10 },
  { day: "Sat", appts: 5 },
];

export const memoryFeed = [
  {
    kind: "Pattern",
    text: "Rahul usually books evening appointments — today he is at 10:00. Confirm before 09:00.",
    when: "Learned across 11 visits",
  },
  {
    kind: "Relationship",
    text: "Sarah has visited 8 times since 2022. Her thyroid follow-up is 22 days overdue.",
    when: "Updated 2 days ago",
  },
  {
    kind: "Safety",
    text: "Priya Das reacts to lidocaine. Topical alternative flagged on her chart.",
    when: "Recorded 06 Oct",
  },
  {
    kind: "Business",
    text: "Wednesdays run 40% denser than other days. One extra 15-minute acute slot would absorb the overflow.",
    when: "Observed over 6 weeks",
  },
];

export const recommendations = [
  { title: "Send 2 payment reminders", detail: "₹6,200 across Rahul and Aarav. Drafts are ready.", impact: "₹6,200" },
  { title: "Confirm Rahul's morning slot", detail: "Against his usual pattern — a quick message avoids a no-show.", impact: "30 min" },
  { title: "Open a Wednesday acute slot", detail: "Demand consistently exceeds capacity mid-week.", impact: "+₹9,400/mo" },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
