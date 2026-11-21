/**
 * META IT SCHOOL — CORE CLIENT SCRIPT
 * Handles course filtering, live vacant seat trackers, interactive checkout,
 * Google sign-in simulation, leaderboard, and 20% student discount calculations.
 */

// ==========================================
// 1. APPLICATION STATE & DATA
// ==========================================

const COURSES_DATA = [
    {
        id: "frontend",
        category: "web",
        title: "Frontend Web Dasturlash",
        badge: "Eng ommabop",
        badgeColor: "indigo",
        duration: "6 oy",
        schedule: "Haftada 3 kun (2 soatdan)",
        price: 1200000,
        discountPrice: 960000,
        icon: "fa-brands fa-react",
        technologies: ["HTML5 / CSS3", "JavaScript ES6+", "React.js", "Next.js 14", "Tailwind CSS", "TypeScript"],
        mentor: "Javohir Qodirov (Ex-EPAM Senior)",
        description: "Zamonaviy veb-saytlar va murakkab SPA dasturlarni noldan professional darajada yaratishni o'rganing."
    },
    {
        id: "backend",
        category: "backend",
        title: "Python & Django Backend",
        badge: "Katta talab",
        badgeColor: "emerald",
        duration: "6 oy",
        schedule: "Haftada 3 kun (2 soatdan)",
        price: 1300000,
        discountPrice: 1040000,
        icon: "fa-brands fa-python",
        technologies: ["Python 3", "Django & DRF", "PostgreSQL", "Docker", "Redis", "REST API & Auth"],
        mentor: "Dilshodbek Karimov (TBC Bank Lead)",
        description: "Katta hajmli ma'lumotlar bazasi, xavfsiz server arxitekturasi va mikroxizmatlarni qurish."
    },
    {
        id: "fullstack",
        category: "web",
        title: "Full-Stack JavaScript (MERN)",
        badge: "Karyera kafolati",
        badgeColor: "purple",
        duration: "8 oy",
        schedule: "Haftada 3 kun + 2 kun amaliyot",
        price: 1500000,
        discountPrice: 1200000,
        icon: "fa-brands fa-node-js",
        technologies: ["Node.js", "Express", "React", "Next.js", "MongoDB", "Prisma", "AWS Deploy"],
        mentor: "Javohir Q. & Azizbek T.",
        description: "Ham Frontend, ham Backend tomonini to'liq egallab, universal mustaqil Fullstack muhandis bo'ling."
    },
    {
        id: "flutter",
        category: "mobile-design",
        title: "Flutter & Dart Mobile Dev",
        badge: "iOS & Android",
        badgeColor: "cyan",
        duration: "5 oy",
        schedule: "Haftada 3 kun (2 soatdan)",
        price: 1350000,
        discountPrice: 1080000,
        icon: "fa-solid fa-mobile-screen",
        technologies: ["Dart", "Flutter SDK", "BLoC State", "Firebase", "App Store & Google Play"],
        mentor: "Malika Rustamova (Senior Mobile Lead)",
        description: "Bitta kod bazasi bilan bir vaqtda iOS va Android tizimlari uchun yuqori unumdor mobil ilovalar yarating."
    },
    {
        id: "uiux",
        category: "mobile-design",
        title: "UI/UX & Product Design",
        badge: "Kreativ",
        badgeColor: "amber",
        duration: "4 oy",
        schedule: "Haftada 3 kun (2 soatdan)",
        price: 1100000,
        discountPrice: 880000,
        icon: "fa-solid fa-pen-nib",
        technologies: ["Figma Advanced", "Design Systems", "User Research", "Wireframing", "Interactive Prototyping"],
        mentor: "Farrux Zokirov (Google Certified Designer)",
        description: "Foydalanuvchilar sevib ishlatadigan chiroyli, qulay va konversiyali interfeyslarni loyihalash."
    },
    {
        id: "cyber",
        category: "backend",
        title: "Kiberxavfsizlik & Ethical Hacking",
        badge: "Strategik kasb",
        badgeColor: "rose",
        duration: "6 oy",
        schedule: "Haftada 3 kun (2 soatdan)",
        price: 1400000,
        discountPrice: 1120000,
        icon: "fa-solid fa-shield-halved",
        technologies: ["Linux Kali", "Network Security", "Web App Pentesting", "Cryptography", "OWASP Top 10"],
        mentor: "Rustam Aliyev (CyberSec Specialist)",
        description: "Tizimlardagi xatoliklarni aniqlash, serverlarni kiberhujumlardan himoyalash va audit o'tkazish."
    }
];

const GROUPS_DATA = [
    {
        code: "#FE-102",
        courseName: "Frontend React & Next.js",
        courseId: "frontend",
        mentor: "Javohir Qodirov",
        timeSlot: "evening",
        days: "Dush - Chor - Juma",
        time: "18:30 — 20:30",
        totalSeats: 14,
        enrolled: 12,
        startDate: "25-Noyabr, 2026",
        status: "almost_full" // 2 seats left
    },
    {
        code: "#FS-301",
        courseName: "Full-Stack JavaScript (Bootcamp)",
        courseId: "fullstack",
        mentor: "Javohir Q. & Azizbek T.",
        timeSlot: "afternoon",
        days: "Sesh - Pay - Shan",
        time: "14:30 — 16:30",
        totalSeats: 14,
        enrolled: 13,
        startDate: "28-Noyabr, 2026",
        status: "critical" // 1 seat left
    },
    {
        code: "#PY-204",
        courseName: "Python Django & PostgreSQL",
        courseId: "backend",
        mentor: "Dilshodbek Karimov",
        timeSlot: "morning",
        days: "Dush - Chor - Juma",
        time: "09:00 — 11:00",
        totalSeats: 14,
        enrolled: 8,
        startDate: "02-Dekabr, 2026",
        status: "open" // 6 seats left
    },
    {
        code: "#FL-105",
        courseName: "Flutter Mobile Dasturlash",
        courseId: "flutter",
        mentor: "Malika Rustamova",
        timeSlot: "evening",
        days: "Sesh - Pay - Shan",
        time: "18:30 — 20:30",
        totalSeats: 14,
        enrolled: 11,
        startDate: "05-Dekabr, 2026",
        status: "filling" // 3 seats left
    },
    {
        code: "#UX-101",
        courseName: "UI/UX & Product Design",
        courseId: "uiux",
        mentor: "Farrux Zokirov",
        timeSlot: "afternoon",
        days: "Dush - Chor - Juma",
        time: "15:00 — 17:00",
        totalSeats: 12,
        enrolled: 7,
        startDate: "08-Dekabr, 2026",
        status: "open" // 5 seats left
    },
    {
        code: "#CS-103",
        courseName: "Kiberxavfsizlik & Ethical Hacking",
        courseId: "cyber",
        mentor: "Rustam Aliyev",
        timeSlot: "evening",
        days: "Dush - Chor - Juma",
        time: "19:00 — 21:00",
        totalSeats: 12,
        enrolled: 10,
        startDate: "10-Dekabr, 2026",
        status: "filling" // 2 seats left
    }
];

const MENTORS_DATA = [
    {
        name: "Javohir Qodirov",
        role: "Senior Full-Stack Lead",
        experience: "7+ yillik tajriba",
        company: "Ex-EPAM & TBC Bank",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        studentsCount: "350+ shogird",
        tags: ["React", "Node.js", "Next.js", "System Design"],
        bio: "Xalqaro autsorsing loyihalarida arxitektor va yetakchi mutaxassis sifatida faoliyat yuritgan."
    },
    {
        name: "Dilshodbek Karimov",
        role: "Lead Python & Cloud Architect",
        experience: "6+ yillik tajriba",
        company: "Super Dispatch & FinTech",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        studentsCount: "280+ shogird",
        tags: ["Python", "Django", "FastAPI", "Kubernetes"],
        bio: "Katta yuklamali (high-load) backend va mikroxizmatlar tuzish bo'yicha mutaxassis."
    },
    {
        name: "Malika Rustamova",
        role: "Senior Mobile Engineer",
        experience: "5+ yillik tajriba",
        company: "Uzum Market & Click",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        studentsCount: "210+ shogird",
        tags: ["Flutter", "Dart", "iOS", "Android", "CI/CD"],
        bio: "O'zbekistondagi eng mashhur fintex va e-commerce ilovalari mualliflaridan biri."
    },
    {
        name: "Farrux Zokirov",
        role: "Head of Product Design",
        experience: "8+ yillik tajriba",
        company: "Google Certified UI/UX",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        studentsCount: "400+ shogird",
        tags: ["Figma", "Design System", "UX Audit", "Usability"],
        bio: "Xalqaro startaplar uchun interfeys tizimlari va dizayn strategiyalarini ishlab chiqqan."
    }
];

const LEADERBOARD_DATA = [
    {
        rank: 1,
        name: "Madina Karimova",
        group: "#FS-301 (Full-Stack)",
        tasks: "24 / 24 (100%)",
        points: 995,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80",
        reward: "Oy Qahramoni (20% Chegirma yutdi!) 🎉",
        badge: "Crown"
    },
    {
        rank: 2,
        name: "Asadbek Nurmatov",
        group: "#FE-102 (Frontend)",
        tasks: "23 / 24 (96%)",
        points: 960,
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=140&q=80",
        reward: "Kumush Nishon 🥈",
        badge: "Silver"
    },
    {
        rank: 3,
        name: "Temur Aliyev",
        group: "#PY-204 (Python)",
        tasks: "22 / 24 (92%)",
        points: 945,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=140&q=80",
        reward: "Bronza Nishon 🥉",
        badge: "Bronze"
    },
    {
        rank: 4,
        name: "Shaxzoda Ikromova",
        group: "#FL-105 (Flutter)",
        tasks: "22 / 24 (92%)",
        points: 920,
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=140&q=80",
        reward: "Top 5 Talaba 🚀",
        badge: "None"
    },
    {
        rank: 5,
        name: "Bobur Mirzayev",
        group: "#UX-101 (Design)",
        tasks: "21 / 24 (88%)",
        points: 890,
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=140&q=80",
        reward: "Top 5 Talaba ⭐",
        badge: "None"
    },
    {
        rank: 6,
        name: "Jasur Saidov",
        group: "#CS-103 (CyberSec)",
        tasks: "20 / 24 (85%)",
        points: 875,
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=140&q=80",
        reward: "Faol O'quvchi",
        badge: "None"
    },
    {
        rank: 7,
        name: "Kamola Umarova",
        group: "#FE-102 (Frontend)",
        tasks: "20 / 24 (85%)",
        points: 860,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=140&q=80",
        reward: "Faol O'quvchi",
        badge: "None"
    },
    {
        rank: 8,
        name: "Shohrux Bekmurodov",
        group: "#FS-301 (Full-Stack)",
        tasks: "19 / 24 (80%)",
        points: 840,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80",
        reward: "Faol O'quvchi",
        badge: "None"
    }
];

// App User session state
let currentUser = null;
let currentAppliedDiscountPercent = 0; // for calculator
let paymentAppliedDiscountPercent = 0; // for payment modal

// ==========================================
// 2. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    checkSavedUserSession();
    renderCourses("all");
    renderGroups();
    renderMentors();
    loadLeaderboard();
    calculatePrice();
    setupHeaderScrollEffect();
});

// Format numbers into Uzbek currency (e.g., 1 200 000)
function formatMoney(amount) {
    return new Intl.NumberFormat('uz-UZ').format(Math.round(amount));
}

// Custom Toast notification helper
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `meta-toast ${type}`;
    
    let icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-xmark";
    if (type === "info") icon = "fa-circle-info";

    toast.innerHTML = `
        <i class="fa-solid ${icon} text-base"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(40px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Celebration Confetti
function triggerConfettiReward() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    showToast("🌟 Madina Karimovani tabriklaymiz! 20% Chegirma vaucheri berildi!", "success");
}

// Header blur on scroll
function setupHeaderScrollEffect() {
    const header = document.getElementById("mainHeader");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("shadow-xl", "bg-[#080c14]/95");
        } else {
            header.classList.remove("shadow-xl", "bg-[#080c14]/95");
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const icon = document.getElementById("mobileMenuIcon");
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        menu.classList.add("hidden");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

// FAQ Accordion
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector(".fa-chevron-down");
    const isHidden = answer.classList.contains("hidden");

    // Close all others first
    document.querySelectorAll(".faq-answer").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".faq-item .fa-chevron-down").forEach(i => i.classList.remove("rotate-180"));

    if (isHidden) {
        answer.classList.remove("hidden");
        icon.classList.add("rotate-180");
    }
}

// ==========================================
// 3. COURSES SECTION RENDERING & FILTERING
// ==========================================

function renderCourses(category = "all") {
    const grid = document.getElementById("coursesGrid");
    if (!grid) return;

    const filtered = category === "all" 
        ? COURSES_DATA 
        : COURSES_DATA.filter(c => c.category === category);

    grid.innerHTML = filtered.map(course => `
        <div class="glass-panel glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group">
            <!-- Glow circle background -->
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition"></div>

            <div>
                <!-- Top Badge & Icon -->
                <div class="flex items-center justify-between mb-5">
                    <div class="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl group-hover:scale-110 transition duration-300">
                        <i class="${course.icon}"></i>
                    </div>
                    <span class="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        ${course.badge}
                    </span>
                </div>

                <h3 class="text-xl font-black text-white group-hover:text-indigo-300 transition mb-2">
                    ${course.title}
                </h3>
                <p class="text-xs text-slate-400 leading-relaxed mb-4">
                    ${course.description}
                </p>

                <!-- Course details meta -->
                <div class="space-y-2 py-3 border-y border-white/5 text-xs text-slate-300">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400"><i class="fa-regular fa-clock mr-1.5 text-indigo-400"></i> Davomiyligi:</span>
                        <span class="font-bold text-white">${course.duration}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-400"><i class="fa-solid fa-chalkboard-user mr-1.5 text-purple-400"></i> Ustoz:</span>
                        <span class="font-semibold text-slate-200 text-[11px]">${course.mentor}</span>
                    </div>
                </div>

                <!-- Technologies tags -->
                <div class="flex flex-wrap gap-1.5 my-4">
                    ${course.technologies.map(tech => `
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>

            <!-- Pricing and Action -->
            <div class="pt-4 border-t border-white/10">
                <div class="flex items-baseline justify-between mb-4">
                    <div>
                        <div class="text-[10px] uppercase text-slate-400 font-semibold">Oylik to'lov</div>
                        <div class="text-xl font-black text-white">${formatMoney(course.price)} <span class="text-xs font-normal text-slate-400">so'm</span></div>
                    </div>
                    <div class="text-right">
                        <div class="text-[10px] uppercase text-emerald-400 font-bold">20% chegirma bilan:</div>
                        <div class="text-sm font-black text-emerald-400 font-mono">${formatMoney(course.discountPrice)} so'm</div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <button onclick="enrollSpecificCourse('${course.title}', ${course.price})" class="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md">
                        <i class="fa-solid fa-user-plus text-[11px]"></i>
                        <span>Yozilish</span>
                    </button>
                    <button onclick="openPaymentForSpecificCourse('${course.title}', ${course.price})" class="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-emerald-500/40 hover:text-emerald-300 font-semibold text-xs transition flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-credit-card text-[11px] text-emerald-400"></i>
                        <span>To'lov qilish</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCourses(category) {
    document.querySelectorAll(".course-filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
    renderCourses(category);
}

// ==========================================
// 4. GROUPS & VACANT SEATS SYSTEM
// ==========================================

function renderGroups() {
    const container = document.getElementById("groupsContainer");
    if (!container) return;

    const searchTerm = (document.getElementById("groupSearchInput")?.value || "").toLowerCase();
    const timeFilter = document.getElementById("groupTimeFilter")?.value || "all";

    const filtered = GROUPS_DATA.filter(group => {
        const matchesSearch = group.code.toLowerCase().includes(searchTerm) || 
                              group.courseName.toLowerCase().includes(searchTerm) ||
                              group.mentor.toLowerCase().includes(searchTerm);
        const matchesTime = timeFilter === "all" || group.timeSlot === timeFilter;
        return matchesSearch && matchesTime;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400">
                <i class="fa-solid fa-circle-exclamation text-3xl mb-2 text-slate-500"></i>
                <p class="text-sm">Mos guruh topilmadi. Qidiruv so'zini o'zgartirib ko'ring.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(group => {
        const vacantSeats = group.totalSeats - group.enrolled;
        const percentageFilled = Math.round((group.enrolled / group.totalSeats) * 100);

        // Determine badge & bar color based on available seats
        let seatBadgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
        let barClass = "seat-bar-success";
        let urgencyText = `${vacantSeats} ta bo'sh joy`;

        if (vacantSeats <= 2) {
            seatBadgeClass = "bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse";
            barClass = "seat-bar-danger";
            urgencyText = `Shoshiling! Faqat ${vacantSeats} ta joy qoldi!`;
        } else if (vacantSeats <= 4) {
            seatBadgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/30";
            barClass = "seat-bar-warning";
            urgencyText = `Atigi ${vacantSeats} ta joy qoldi`;
        }

        return `
            <div class="glass-panel glass-card-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                    <!-- Header: Group Code & Seat Badge -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                ${group.code}
                            </span>
                            <span class="text-xs text-slate-400">${group.startDate}</span>
                        </div>
                        <span class="text-[11px] font-bold px-2.5 py-1 rounded-full border ${seatBadgeClass}">
                            ${urgencyText}
                        </span>
                    </div>

                    <!-- Course Title & Mentor -->
                    <h3 class="text-lg font-black text-white mb-1">${group.courseName}</h3>
                    <p class="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                        <i class="fa-solid fa-chalkboard-user text-purple-400"></i>
                        <span>Ustoz: <b class="text-slate-300">${group.mentor}</b></span>
                    </p>

                    <!-- Days & Hours -->
                    <div class="bg-white/[0.03] rounded-2xl p-3 border border-white/5 space-y-1.5 text-xs text-slate-300 mb-5">
                        <div class="flex justify-between">
                            <span class="text-slate-400"><i class="fa-regular fa-calendar mr-1.5 text-cyan-400"></i> Kunlar:</span>
                            <span class="font-bold text-white">${group.days}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-400"><i class="fa-regular fa-clock mr-1.5 text-cyan-400"></i> Vaqti:</span>
                            <span class="font-bold text-white font-mono">${group.time}</span>
                        </div>
                    </div>

                    <!-- Visual Seat Progress Bar -->
                    <div class="space-y-1.5 mb-5">
                        <div class="flex justify-between text-[11px]">
                            <span class="text-slate-400 font-medium">To'ldirilganlik darajasi:</span>
                            <span class="font-mono font-bold text-white">${group.enrolled} / ${group.totalSeats} o'quvchi (${percentageFilled}%)</span>
                        </div>
                        <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                            <div class="h-full rounded-full transition-all duration-500 ${barClass}" style="width: ${percentageFilled}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Action Button -->
                <div>
                    <button onclick="bookGroupSeat('${group.code}', '${group.courseName}')" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-bookmark text-xs"></i>
                        <span>Ushbu Guruhga Yozilish</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function filterGroups() {
    renderGroups();
}

function bookGroupSeat(groupCode, courseName) {
    // Open payment or auth modal with this preselected
    openPaymentModal(courseName, groupCode);
    showToast(`${groupCode} guruhi tanlandi. Joyingizni tasdiqlang!`, "info");
}

// ==========================================
// 5. STUDENT LEADERBOARD & REYTING
// ==========================================

function loadLeaderboard() {
    renderPodium();
    renderLeaderboardTable();
}

function renderPodium() {
    const podiumEl = document.getElementById("podiumContainer");
    if (!podiumEl) return;

    const top1 = LEADERBOARD_DATA[0];
    const top2 = LEADERBOARD_DATA[1];
    const top3 = LEADERBOARD_DATA[2];

    podiumEl.innerHTML = `
        <!-- 2nd Place (Silver) -->
        <div class="order-2 md:order-1 rounded-3xl bg-[#0e1424] border border-white/10 p-6 text-center space-y-3 relative overflow-hidden">
            <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-slate-400/10 rounded-full blur-xl"></div>
            <div class="relative inline-block">
                <img src="${top2.avatar}" alt="${top2.name}" class="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-slate-300 shadow-md">
                <span class="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center shadow">
                    #2
                </span>
            </div>
            <h4 class="font-bold text-white text-base">${top2.name}</h4>
            <p class="text-xs text-slate-400">${top2.group}</p>
            <div class="text-xl font-black font-mono text-slate-200">${top2.points} XP</div>
            <span class="inline-block text-[11px] px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-300 font-semibold">
                Kumush Nishon 🥈
            </span>
        </div>

        <!-- 1st Place (Gold / 20% Discount Winner) -->
        <div class="order-1 md:order-2 rounded-3xl bg-gradient-to-b from-[#191932] to-[#0e1424] border-2 border-amber-400 p-7 text-center space-y-3 relative shadow-2xl shadow-amber-500/10 scale-105 z-10">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow">
                <i class="fa-solid fa-crown text-[11px]"></i>
                <span>Oy G'olibi (20% Chegirma)</span>
            </div>
            <div class="relative inline-block pt-3">
                <img src="${top1.avatar}" alt="${top1.name}" class="w-20 h-20 rounded-2xl object-cover mx-auto border-4 border-amber-400 shadow-lg">
                <span class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-black text-sm flex items-center justify-center shadow">
                    #1
                </span>
            </div>
            <h4 class="font-black text-white text-lg">${top1.name}</h4>
            <p class="text-xs text-indigo-300 font-medium">${top1.group}</p>
            <div class="text-3xl font-black font-mono text-amber-300">${top1.points} XP</div>
            <div class="p-2.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-xs text-amber-200 font-bold">
                🎉 Keyingi oy uchun 20% Chegirma yutdi!
            </div>
        </div>

        <!-- 3rd Place (Bronze) -->
        <div class="order-3 md:order-3 rounded-3xl bg-[#0e1424] border border-white/10 p-6 text-center space-y-3 relative overflow-hidden">
            <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-600/10 rounded-full blur-xl"></div>
            <div class="relative inline-block">
                <img src="${top3.avatar}" alt="${top3.name}" class="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-amber-600 shadow-md">
                <span class="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow">
                    #3
                </span>
            </div>
            <h4 class="font-bold text-white text-base">${top3.name}</h4>
            <p class="text-xs text-slate-400">${top3.group}</p>
            <div class="text-xl font-black font-mono text-amber-400">${top3.points} XP</div>
            <span class="inline-block text-[11px] px-2.5 py-1 rounded-full bg-amber-700/20 text-amber-300 font-semibold">
                Bronza Nishon 🥉
            </span>
        </div>
    `;
}

function renderLeaderboardTable() {
    const tbody = document.getElementById("leaderboardTableBody");
    if (!tbody) return;

    const searchTerm = (document.getElementById("leaderboardSearch")?.value || "").toLowerCase();

    const filtered = LEADERBOARD_DATA.filter(st => {
        return st.name.toLowerCase().includes(searchTerm) || st.group.toLowerCase().includes(searchTerm);
    });

    tbody.innerHTML = filtered.map(st => {
        let rankBadge = `<span class="font-mono font-bold text-slate-400">#${st.rank}</span>`;
        let rowClass = "hover:bg-white/[0.02] transition";

        if (st.rank === 1) {
            rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-400 text-slate-900 font-black text-xs">🥇 #1</span>`;
            rowClass = "bg-amber-500/5 hover:bg-amber-500/10 border-l-4 border-l-amber-400 transition";
        } else if (st.rank === 2) {
            rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-300 text-slate-900 font-bold text-xs">🥈 #2</span>`;
        } else if (st.rank === 3) {
            rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-700 text-white font-bold text-xs">🥉 #3</span>`;
        }

        let rewardBadge = `<span class="text-xs text-slate-400">${st.reward}</span>`;
        if (st.rank === 1) {
            rewardBadge = `<span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">20% Chegirma G'olibi 🔥</span>`;
        }

        return `
            <tr class="${rowClass}">
                <td class="py-4 px-6">${rankBadge}</td>
                <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                        <img src="${st.avatar}" alt="${st.name}" class="w-9 h-9 rounded-xl object-cover border border-white/10">
                        <div>
                            <div class="font-bold text-white text-xs sm:text-sm">${st.name}</div>
                            <div class="text-[10px] text-slate-400">LMS Id: #META-${1000 + st.rank}</div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6 text-xs text-slate-300">${st.group}</td>
                <td class="py-4 px-6 text-xs font-mono text-slate-300">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-code-commit text-indigo-400"></i>
                        <span>${st.tasks}</span>
                    </div>
                </td>
                <td class="py-4 px-6 text-right font-mono font-black text-amber-400 text-sm">
                    ${st.points} XP
                </td>
                <td class="py-4 px-6 text-center">
                    ${rewardBadge}
                </td>
            </tr>
        `;
    }).join('');
}

function filterLeaderboard() {
    renderLeaderboardTable();
}

// ==========================================
// 6. MENTORS SECTION RENDERING
// ==========================================

function renderMentors() {
    const container = document.getElementById("mentorsContainer");
    if (!container) return;

    container.innerHTML = MENTORS_DATA.map(mentor => `
        <div class="glass-panel glass-card-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
                <div class="relative mb-5">
                    <img src="${mentor.image}" alt="${mentor.name}" class="w-full h-48 object-cover rounded-2xl border border-white/10">
                    <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-emerald-300 font-mono text-[11px] font-bold border border-white/10">
                        ${mentor.experience}
                    </span>
                </div>

                <h3 class="text-lg font-black text-white">${mentor.name}</h3>
                <p class="text-xs font-semibold text-purple-400 mb-1">${mentor.role}</p>
                <p class="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
                    <i class="fa-solid fa-building text-slate-500"></i>
                    <span>${mentor.company}</span>
                </p>

                <p class="text-xs text-slate-400 leading-relaxed mb-4">
                    ${mentor.bio}
                </p>

                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${mentor.tags.map(tag => `
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span><i class="fa-solid fa-user-graduate mr-1 text-indigo-400"></i> ${mentor.studentsCount}</span>
                <span class="text-emerald-400 font-bold"><i class="fa-solid fa-star text-amber-400 mr-1"></i> 5.0 Reyting</span>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 7. PRICING & DISCOUNT CALCULATOR
// ==========================================

function calculatePrice() {
    const coursePrice = parseFloat(document.getElementById("calcCourseSelect")?.value || 1200000);
    const months = parseInt(document.getElementById("calcMonthsSelect")?.value || 1);
    
    // Duration automatic discount: 3 months = 10%, 6 months = 15%
    let durationDiscount = 0;
    if (months === 3) durationDiscount = 0.10;
    if (months === 6) durationDiscount = 0.15;

    let baseTotal = coursePrice * months;
    let totalDiscountPercent = durationDiscount + (currentAppliedDiscountPercent / 100);

    // Max 30% discount combined
    if (totalDiscountPercent > 0.30) totalDiscountPercent = 0.30;

    let finalPrice = baseTotal * (1 - totalDiscountPercent);

    const finalEl = document.getElementById("calcFinalPrice");
    const oldContainer = document.getElementById("calcOldPriceContainer");

    if (finalEl) finalEl.textContent = formatMoney(finalPrice);

    if (totalDiscountPercent > 0 && oldContainer) {
        oldContainer.textContent = `${formatMoney(baseTotal)} so'm`;
        oldContainer.classList.remove("hidden");
    } else if (oldContainer) {
        oldContainer.classList.add("hidden");
    }
}

function applyPromoCode() {
    const input = document.getElementById("calcPromoInput");
    const statusMsg = document.getElementById("promoStatusMessage");
    if (!input || !statusMsg) return;

    const code = input.value.trim().toUpperCase();

    if (code === "META20ACTIVE" || code === "META20") {
        currentAppliedDiscountPercent = 20;
        statusMsg.textContent = "✅ Qoyilmaqom! Oyning eng faol o'quvchisi uchun 20% maxsus chegirma kodi qo'llandi!";
        statusMsg.className = "text-[11px] mt-1.5 text-emerald-400 font-bold block";
        calculatePrice();
        triggerConfettiReward();
    } else if (code === "WELCOME10") {
        currentAppliedDiscountPercent = 10;
        statusMsg.textContent = "✅ Yangi o'quvchi uchun 10% chegirma kodi muvaffaqiyatli qo'llandi!";
        statusMsg.className = "text-[11px] mt-1.5 text-emerald-400 font-bold block";
        calculatePrice();
    } else if (code === "") {
        currentAppliedDiscountPercent = 0;
        statusMsg.textContent = "Iltimos, promo-kodni kiriting.";
        statusMsg.className = "text-[11px] mt-1.5 text-amber-400 font-medium block";
        calculatePrice();
    } else {
        currentAppliedDiscountPercent = 0;
        statusMsg.textContent = "❌ Bunday promo-kod topilmadi yoki muddati tugagan.";
        statusMsg.className = "text-[11px] mt-1.5 text-rose-400 font-medium block";
        calculatePrice();
    }
}

function fillPromoCode(code) {
    const input = document.getElementById("calcPromoInput");
    if (input) {
        input.value = code;
        applyPromoCode();
    }
    const payInput = document.getElementById("payPromoInput");
    if (payInput) {
        payInput.value = code;
    }
    showToast(`Promo-kod nusxalandi: ${code}`, "info");
}

function checkoutCalculatedPrice() {
    const courseSelect = document.getElementById("calcCourseSelect");
    const courseName = courseSelect.options[courseSelect.selectedIndex].text.split("(")[0].trim();
    openPaymentModal(courseName);
    if (currentAppliedDiscountPercent > 0) {
        const payPromo = document.getElementById("payPromoInput");
        if (payPromo) {
            payPromo.value = "META20ACTIVE";
            applyPaymentPromo();
        }
    }
}

// ==========================================
// 8. PAYMENT & CHECKOUT MODAL SYSTEM
// ==========================================

function openPaymentModal(preselectedCourse = null, preselectedGroup = null) {
    const modal = document.getElementById("paymentModal");
    if (!modal) return;

    if (preselectedCourse) {
        const payCourseSelect = document.getElementById("payCourse");
        if (payCourseSelect) {
            for (let option of payCourseSelect.options) {
                if (option.value.toLowerCase().includes(preselectedCourse.toLowerCase()) || 
                    option.text.toLowerCase().includes(preselectedCourse.toLowerCase())) {
                    option.selected = true;
                    break;
                }
            }
        }
    }

    if (preselectedGroup) {
        const payGroupSelect = document.getElementById("payGroup");
        if (payGroupSelect) {
            for (let option of payGroupSelect.options) {
                if (option.value.includes(preselectedGroup)) {
                    option.selected = true;
                    break;
                }
            }
        }
    }

    // Prefill user details if logged in
    if (currentUser) {
        const nameInput = document.getElementById("payStudentName");
        if (nameInput) nameInput.value = currentUser.name;
        const phoneInput = document.getElementById("payPhone");
        if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
    }

    syncPaymentAmount();
    modal.classList.remove("hidden");
}

function closePaymentModal() {
    const modal = document.getElementById("paymentModal");
    if (modal) modal.classList.add("hidden");
}

function startPaymentForPlan(planName, price) {
    openPaymentModal();
    const totalEl = document.getElementById("payTotalAmount");
    if (totalEl) {
        totalEl.textContent = `${formatMoney(price)} so'm`;
        totalEl.dataset.basePrice = price;
    }
    showToast(`${planName} tanlandi!`, "info");
}

function openPaymentForSpecificCourse(courseTitle, price) {
    openPaymentModal(courseTitle);
}

function enrollSpecificCourse(courseTitle, price) {
    openAuthModal('register');
    const courseSelect = document.getElementById("authCourse");
    if (courseSelect) {
        for (let option of courseSelect.options) {
            if (option.value.toLowerCase().includes(courseTitle.toLowerCase()) || 
                option.text.toLowerCase().includes(courseTitle.toLowerCase())) {
                option.selected = true;
                break;
            }
        }
    }
}

function openEnrollModal(type) {
    openAuthModal('register');
}

function syncPaymentAmount() {
    const payCourse = document.getElementById("payCourse");
    if (!payCourse) return;

    const selectedOption = payCourse.options[payCourse.selectedIndex];
    const basePrice = parseFloat(selectedOption.getAttribute("data-price") || 1200000);

    const totalEl = document.getElementById("payTotalAmount");
    if (totalEl) {
        totalEl.dataset.basePrice = basePrice;
        let final = basePrice;
        if (paymentAppliedDiscountPercent > 0) {
            final = basePrice * (1 - paymentAppliedDiscountPercent / 100);
        }
        totalEl.textContent = `${formatMoney(final)} so'm`;
    }
}

function selectPaymentMethod(radio) {
    document.querySelectorAll(".pay-method-card").forEach(c => c.classList.remove("selected", "border-emerald-500"));
    radio.closest(".pay-method-card").classList.add("selected", "border-emerald-500");
}

function applyPaymentPromo() {
    const input = document.getElementById("payPromoInput");
    const alertEl = document.getElementById("payPromoAlert");
    const discountLabel = document.getElementById("payDiscountLabel");
    if (!input || !alertEl) return;

    const code = input.value.trim().toUpperCase();
    if (code === "META20ACTIVE" || code === "META20") {
        paymentAppliedDiscountPercent = 20;
        alertEl.textContent = "✅ 20% Chegirma qo'llandi!";
        alertEl.className = "text-[11px] text-emerald-400 font-bold block";
        if (discountLabel) discountLabel.classList.remove("hidden");
        syncPaymentAmount();
        triggerConfettiReward();
    } else {
        paymentAppliedDiscountPercent = 0;
        alertEl.textContent = "❌ Noto'g'ri promo-kod!";
        alertEl.className = "text-[11px] text-rose-400 font-bold block";
        if (discountLabel) discountLabel.classList.add("hidden");
        syncPaymentAmount();
    }
}

function handlePaymentSubmit(e) {
    e.preventDefault();

    const studentName = document.getElementById("payStudentName")?.value || "Noma'lum O'quvchi";
    const phone = document.getElementById("payPhone")?.value || "";
    const course = document.getElementById("payCourse")?.value || "Frontend";
    const group = document.getElementById("payGroup")?.value || "#FE-102";
    const method = document.querySelector('input[name="payMethod"]:checked')?.value || "Payme";
    const totalText = document.getElementById("payTotalAmount")?.textContent || "1,200,000 so'm";

    // Simulate safe processing
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> To'lov amalga oshirilmoqda...`;

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        closePaymentModal();

        // Populate receipt
        const receiptNo = "#META-" + Math.floor(10000 + Math.random() * 90000);
        document.getElementById("receiptNumber").textContent = receiptNo;
        document.getElementById("receiptStudent").textContent = studentName;
        document.getElementById("receiptCourse").textContent = `${course} (${group})`;
        document.getElementById("receiptMethod").textContent = method;
        document.getElementById("receiptDiscount").textContent = `${paymentAppliedDiscountPercent}%`;
        document.getElementById("receiptAmount").textContent = totalText;

        // Open Receipt Modal
        const receiptModal = document.getElementById("receiptModal");
        if (receiptModal) receiptModal.classList.remove("hidden");

        // Award XP to user if logged in
        if (currentUser) {
            currentUser.points = (currentUser.points || 50) + 100;
            saveUserSession(currentUser);
            renderAuthUser();
            showToast("To'lov uchun sizga +100 XP berildi!", "success");
        }

        triggerConfettiReward();
    }, 1200);
}

function closeReceiptModal() {
    const modal = document.getElementById("receiptModal");
    if (modal) modal.classList.add("hidden");
}

// ==========================================
// 9. GOOGLE ACCOUNT SIGN-IN SIMULATION
// ==========================================

function openGoogleQuickLogin() {
    openGoogleSelectorModal();
}

function openActiveStudentModal() {
    const modal = document.getElementById("activeStudentModal");
    if (modal) modal.classList.remove("hidden");
}

function closeActiveStudentModal() {
    const modal = document.getElementById("activeStudentModal");
    if (modal) modal.classList.add("hidden");
}

function openAuthModal(mode = 'register') {
    const modal = document.getElementById("authModal");
    if (!modal) return;

    const title = document.getElementById("authModalTitle");
    const sub = document.getElementById("authModalSubtitle");

    if (mode === 'login') {
        title.textContent = "META Tizimiga Kirish";
        sub.textContent = "Google akkaunt yoki telefon raqamingiz orqali kiring";
    } else {
        title.textContent = "Kursga Ro'yxatdan O'tish";
        sub.textContent = "Hoziroq ro'yxatdan o'ting va 50 XP bonus oling!";
    }

    modal.classList.remove("hidden");
}

function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.classList.add("hidden");
}

function simulateGoogleSignIn() {
    closeAuthModal();
    openGoogleSelectorModal();
}

function openGoogleSelectorModal() {
    const modal = document.getElementById("googleSelectorModal");
    if (modal) modal.classList.remove("hidden");
}

function closeGoogleSelectorModal() {
    const modal = document.getElementById("googleSelectorModal");
    if (modal) modal.classList.add("hidden");
}

function loginWithGoogleAccount(name, email, avatar) {
    closeGoogleSelectorModal();

    currentUser = {
        name: name,
        email: email,
        avatar: avatar,
        points: 50, // Initial welcome bonus
        role: "Talaba",
        authType: "Google"
    };

    saveUserSession(currentUser);
    renderAuthUser();
    showToast(`Xush kelibsiz, ${name}! Google orqali muvaffaqiyatli kirdingiz (+50 XP)`, "success");
    triggerConfettiReward();
}

function promptCustomGoogleAccount() {
    const name = prompt("Google hisobingizdagi Ism-Familiyangizni kiriting:", "Jasur Rahimov");
    if (!name) return;
    const email = prompt("Google elektron pochtangizni kiriting:", "jasur.coder@gmail.com");
    if (!email) return;

    loginWithGoogleAccount(name, email, "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80");
}

function handleAuthSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("authName")?.value || "Yangi Talaba";
    const phone = document.getElementById("authPhone")?.value || "+998 90 000 00 00";
    const course = document.getElementById("authCourse")?.value || "Frontend";

    currentUser = {
        name: name,
        phone: phone,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@meta-student.uz`,
        course: course,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        points: 50,
        role: "Talaba",
        authType: "Phone"
    };

    saveUserSession(currentUser);
    renderAuthUser();
    closeAuthModal();
    showToast(`Tabriklaymiz, ${name}! Ro'yxatdan o'tdingiz va 50 XP berildi!`, "success");
}

function checkSavedUserSession() {
    try {
        const saved = localStorage.getItem("meta_user_session");
        if (saved) {
            currentUser = JSON.parse(saved);
            renderAuthUser();
        }
    } catch (e) {
        console.error("Session load error:", e);
    }
}

function saveUserSession(user) {
    try {
        localStorage.setItem("meta_user_session", JSON.stringify(user));
    } catch (e) {
        console.error("Session save error:", e);
    }
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem("meta_user_session");
    renderAuthUser();
    showToast("Tizimdan chiqdingiz.", "info");
}

function renderAuthUser() {
    const container = document.getElementById("authContainer");
    if (!container) return;

    if (currentUser) {
        container.innerHTML = `
            <div class="relative group">
                <div class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-indigo-500/30 cursor-pointer">
                    <img src="${currentUser.avatar}" alt="Avatar" class="w-7 h-7 rounded-lg object-cover border border-indigo-400">
                    <div class="hidden sm:block text-left">
                        <div class="text-xs font-bold text-white max-w-[120px] truncate">${currentUser.name}</div>
                        <div class="text-[10px] text-amber-400 font-mono font-bold">${currentUser.points || 50} XP</div>
                    </div>
                    <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                </div>

                <!-- Dropdown menu -->
                <div class="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[#0e1424] border border-white/10 p-2 shadow-2xl hidden group-hover:block z-50">
                    <div class="p-2 border-b border-white/5">
                        <div class="text-xs font-bold text-white">${currentUser.name}</div>
                        <div class="text-[10px] text-slate-400 truncate">${currentUser.email || currentUser.phone}</div>
                        <div class="mt-1 text-[10px] font-mono text-emerald-400">Reyting ball: ${currentUser.points || 50} XP</div>
                    </div>
                    <button onclick="openPaymentModal()" class="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition flex items-center gap-2">
                        <i class="fa-solid fa-credit-card text-emerald-400"></i> Oylik to'lov
                    </button>
                    <button onclick="openActiveStudentModal()" class="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition flex items-center gap-2">
                        <i class="fa-solid fa-gift text-amber-400"></i> 20% Chegirma qoidalari
                    </button>
                    <button onclick="logoutUser()" class="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition flex items-center gap-2 mt-1 border-t border-white/5">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Chiqish
                    </button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button onclick="openAuthModal('login')" class="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:opacity-95 transition transform active:scale-95">
                <i class="fa-solid fa-user-plus text-xs"></i>
                <span>Ro'yxatdan o'tish</span>
            </button>
        `;
    }
}
