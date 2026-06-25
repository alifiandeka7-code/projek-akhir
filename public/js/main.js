// Mouse tracking for animated background
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Convert to percentage
    const xPercent = (mouseX / window.innerWidth) * 100;
    const yPercent = (mouseY / window.innerHeight) * 100;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
    document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
});

// Generate Stars
function generateStars() {
    const starsContainer = document.getElementById('stars-container');
    const numStars = 250; // More stars for a denser effect
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize properties
        const size = Math.random() * 2 + 1; // 1-3px (as requested)
        const x = Math.random() * 100; // 0-100%
        const y = Math.random() * 100; // 0-100%
        const duration = Math.random() * 4 + 1; // 1-5s
        const delay = Math.random() * 5; // 0-5s
        const opacity = Math.random() * 0.6 + 0.4; // 0.4-1
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        star.style.opacity = opacity;
        
        starsContainer.appendChild(star);
    }
}

// Generate Clouds
function generateClouds() {
    const cloudsContainer = document.getElementById('clouds-container');
    const numClouds = 8;
    
    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        
        // Randomize properties
        const scale = Math.random() * 0.6 + 0.4; // 0.4-1x
        const top = Math.random() * 70; // 0-70%
        const duration = Math.random() * 80 + 80; // 80-160s
        const opacity = Math.random() * 0.2 + 0.05; // 0.05-0.25
        
        cloud.style.transform = `scale(${scale})`;
        cloud.style.top = `${top}%`;
        cloud.style.animationDuration = `${duration}s`;
        cloud.style.animationDelay = `-${Math.random() * duration}s`; // Stagger starts
        cloud.style.opacity = opacity;
        
        cloudsContainer.appendChild(cloud);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    generateStars();
    generateClouds();
    checkAuth();
    initAuthForms();
    initNavigation();
    initTwoWayCommunication();
    initAIAssistant();
    initLessons();
    initQuiz();
    initHistory();
    initGestureRecognition();
    initDonation();
    initQuickPhrases();
});

let currentUser = null;
let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];
let recognition = null;
let isListening = false;
let selectedLanguage = 'id-ID';
let mediaPipeCamera = null;
let hands = null;

// Shuffle array function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Quick Phrases Data
const quickPhrases = {
    salam: [
        "Halo",
        "Selamat pagi",
        "Selamat siang",
        "Terima kasih",
        "Sampai jumpa"
    ],
    komunikasi: [
        "Mohon berbicara lebih pelan.",
        "Mohon menghadap saya saat berbicara.",
        "Bisakah Anda mengulangi lagi?",
        "Tolong ketik pesan Anda di sini.",
        "Bisakah Anda menjelaskan lebih detail?"
    ],
    bantuan: [
        "Maaf, saya tunarungu.",
        "Saya membutuhkan bantuan.",
        "Mohon tunggu sebentar.",
        "Saya tidak mengerti.",
        "Tolong bantu saya."
    ],
    penting: [
        "Saya ingin ke rumah sakit.",
        "Saya sedang dalam keadaan darurat.",
        "Tolong hubungi keluarga saya.",
        "Saya membutuhkan penerjemah bahasa isyarat.",
        "Di mana lokasi pelayanan terdekat?"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initAuthForms();
    initNavigation();
    initTwoWayCommunication();
    initAIAssistant();
    initLessons();
    initQuiz();
    initHistory();
    initGestureRecognition();
    initDonation();
    initQuickPhrases();
});

async function checkAuth() {
    try {
        const response = await fetch('/api/user');
        if (response.ok) {
            currentUser = await response.json();
            showMainApp();
        } else {
            showAuthPage();
        }
    } catch {
        showAuthPage();
    }
}

function showAuthPage() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('login-page').classList.add('active');
    document.querySelector('.sidebar').style.display = 'none';
}

function showMainApp() {
    document.querySelector('.sidebar').style.display = 'flex';
    document.getElementById('user-info').innerHTML = `<i class="fas fa-user"></i> ${currentUser.username}`;
    initSidebarNav();
    navigateTo('two-way');
}

function initSidebarNav() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const navItems = [
        { id: 'two-way', icon: 'fas fa-comments', label: 'Komunikasi' },
        { id: 'quick-phrases', icon: 'fas fa-microphone-alt', label: 'Kalimat Cepat' },
        { id: 'ai-assistant', icon: 'fas fa-robot', label: 'AI Assistant' },
        { id: 'lessons', icon: 'fas fa-book', label: 'Modul Belajar' },
        { id: 'quiz', icon: 'fas fa-question-circle', label: 'Quiz' },
        { id: 'history', icon: 'fas fa-history', label: 'Riwayat' },
        { id: 'gesture', icon: 'fas fa-hand-paper', label: 'Pengenal Gestur' },
        { id: 'donation', icon: 'fas fa-heart', label: 'Donasi' },
        { id: 'profile', icon: 'fas fa-user-circle', label: 'Profil' }
    ];

    sidebarNav.innerHTML = navItems.map(item => `
        <button class="nav-item" data-page="${item.id}">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
        </button>
    `).join('');
}

function navigateTo(pageId) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

    const navItem = document.querySelector(`[data-page="${pageId}"]`);
    if (navItem) navItem.classList.add('active');

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    if (pageId === 'quiz') resetQuiz();
    if (pageId === 'profile') loadProfile();
}

function initNavigation() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-item')) {
            const pageId = e.target.closest('.nav-item').dataset.page;
            navigateTo(pageId);
        }
    });
}

function initAuthForms() {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const fullName = document.getElementById('register-fullname').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, fullName, password })
            });

            const data = await response.json();
            if (response.ok) {
                currentUser = { id: data.userId, username: username };
                showMainApp();
            } else {
                alert('Registrasi gagal: ' + (data.error || 'Username atau email sudah terdaftar'));
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan, coba lagi nanti');
        }
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                currentUser = { id: data.userId, username: data.username };
                showMainApp();
            } else {
                alert('Login gagal: ' + (data.error || 'Username atau password salah'));
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan, coba lagi nanti');
        }
    });

    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('register-page').classList.add('active');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('login-page').classList.add('active');
    });

    document.getElementById('logout-btn').addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST' });
        currentUser = null;;
        showAuthPage();
    });
}

function initTwoWayCommunication() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage;

        recognition.onstart = () => {
            isListening = true;
            document.getElementById('hearing-listen-btn').innerHTML = '<i class="fas fa-stop"></i> Berhenti Mendengarkan';
        };

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            document.getElementById('hearing-output').textContent = transcript;
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopListening();
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.lang = selectedLanguage;
                recognition.start();
            }
        };
    }

    document.getElementById('hearing-listen-btn').addEventListener('click', () => {
        if (!recognition) {
            alert('Browser Anda tidak mendukung Speech Recognition. Gunakan Chrome/Edge.');
            return;
        }

        if (isListening) {
            stopListening();
        } else {
            recognition.lang = selectedLanguage;
            recognition.start();
        }
    });

    document.getElementById('deaf-speak-btn').addEventListener('click', () => {
        const text = document.getElementById('deaf-input').value.trim();
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;
        speechSynthesis.speak(utterance);
    });

    document.getElementById('language-select').addEventListener('change', (e) => {
        selectedLanguage = e.target.value;
        if (recognition) recognition.lang = selectedLanguage;
    });

    document.getElementById('save-history-btn').addEventListener('click', async () => {
        const deafText = document.getElementById('deaf-input').value.trim();
        const hearingSpeech = document.getElementById('hearing-output').textContent.trim();

        if (!deafText && !hearingSpeech) {
            alert('Tidak ada data untuk disimpan');
            return;
        }

        try {
            const response = await fetch('/api/two-way-history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deaf_text: deafText, hearing_speech: hearingSpeech, language: selectedLanguage })
            });

            if (response.ok) {
                alert('Data berhasil disimpan ke riwayat');
            }
        } catch {
            alert('Gagal menyimpan riwayat');
        }
    });

    function stopListening() {
        isListening = false;
        if (recognition) recognition.stop();
        document.getElementById('hearing-listen-btn').innerHTML = '<i class="fas fa-microphone"></i> Mulai Mendengarkan';
    }
}

function initAIAssistant() {
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input');

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_message: text })
            });

            const data = await response.json();
            if (data.ai_response) {
                addMessage(data.ai_response, 'ai');
            }
        } catch {
            addMessage('Maaf, terjadi kesalahan. Coba lagi nanti.', 'ai');
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function initLessons() {
    const lessonsGrid = document.getElementById('lessons-grid');
    const tabs = document.querySelectorAll('.category-tab');

    // Fallback data for all categories
    const fallbackHurufLessons = [];
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        fallbackHurufLessons.push({
            category: 'huruf',
            title: letter,
            image: `/assets/bahasa-isyarat-huruf/${letter}.png`,
            description: `Bahasa isyarat huruf ${letter}`
        });
    }

    const fallbackAngkaLessons = [
        { number: 1, title: '1', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 1.png', description: 'Bahasa isyarat angka 1' },
        { number: 2, title: '2', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 2.png', description: 'Bahasa isyarat angka 2' },
        { number: 3, title: '3', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 3.png', description: 'Bahasa isyarat angka 3' },
        { number: 4, title: '4', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 4.png', description: 'Bahasa isyarat angka 4' },
        { number: 5, title: '5', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 5.png', description: 'Bahasa isyarat angka 5' },
        { number: 6, title: '6', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 6.png', description: 'Bahasa isyarat angka 6' },
        { number: 7, title: '7', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 7.png', description: 'Bahasa isyarat angka 7' },
        { number: 8, title: '8', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 8.png', description: 'Bahasa isyarat angka 8' },
        { number: 9, title: '9', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 9.jpeg', description: 'Bahasa isyarat angka 9' },
        { number: 10, title: '10', image: '/assets/bahasa-isyarat-angka/Angka Isyarat 10.jpeg', description: 'Bahasa isyarat angka 10' }
    ];

    const fallbackPembelajaranLessons = [
        { category: 'pembelajaran', title: 'Level 1: Salam & Sapaan', description: 'Pelajari bahasa isyarat untuk salam dan sapaan dasar', pdf_url: '/assets/pembelajaran/Level_1_Salam_dan_Sapaan.pdf', level: 'Level 1' },
        { category: 'pembelajaran', title: 'Level 2: Perkenalan Diri', description: 'Pelajari bahasa isyarat untuk memperkenalkan diri kepada orang lain', pdf_url: '/assets/pembelajaran/Level_2_Perkenalan_Diri.pdf', level: 'Level 2' },
        { category: 'pembelajaran', title: 'Level 3: Tanya Jawab Dasar', description: 'Pelajari bahasa isyarat untuk tanya jawab dalam komunikasi sehari-hari', pdf_url: '/assets/pembelajaran/Level_3_Tanya_Jawab_Dasar.pdf', level: 'Level 3' },
        { category: 'pembelajaran', title: 'Level 4: Keluarga & Hubungan', description: 'Pelajari bahasa isyarat untuk berbicara tentang keluarga dan hubungan', pdf_url: '/assets/pembelajaran/Level_4_Keluarga_dan_Hubungan.pdf', level: 'Level 4' },
        { category: 'pembelajaran', title: 'Level 5: Waktu & Aktivitas Harian', description: 'Pelajari bahasa isyarat untuk berbicara tentang waktu dan kegiatan sehari-hari', pdf_url: '/assets/pembelajaran/Level_5_Waktu_dan_Aktivitas_Harian.pdf', level: 'Level 5' },
        { category: 'pembelajaran', title: 'Level 6: Tempat & Arah', description: 'Pelajari bahasa isyarat untuk berbicara tentang tempat dan arah', pdf_url: '/assets/pembelajaran/Level_6_Tempat_dan_Arah.pdf', level: 'Level 6' },
        { category: 'pembelajaran', title: 'Level 7: Perasaan & Emosi', description: 'Pelajari bahasa isyarat untuk mengekspresikan perasaan dan emosi', pdf_url: '/assets/pembelajaran/Level_7_Perasaan_dan_Emosi.pdf', level: 'Level 7' },
        { category: 'pembelajaran', title: 'Level 8: Belanja & Transaksi', description: 'Pelajari bahasa isyarat untuk belanja dan transaksi keuangan', pdf_url: '/assets/pembelajaran/Level_8_Belanja_dan_Transaksi.pdf', level: 'Level 8' },
        { category: 'pembelajaran', title: 'Level 9: Pekerjaan & Sekolah', description: 'Pelajari bahasa isyarat untuk berbicara tentang pekerjaan dan sekolah', pdf_url: '/assets/pembelajaran/Level_9_Pekerjaan_dan_Sekolah.pdf', level: 'Level 9' },
        { category: 'pembelajaran', title: 'Level 10: Darurat & Kesehatan', description: 'Pelajari bahasa isyarat untuk situasi darurat dan kesehatan', pdf_url: '/assets/pembelajaran/Level_10_Darurat_dan_Kesehatan.pdf', level: 'Level 10' }
    ];

    async function renderLessons(category) {
        lessonsGrid.innerHTML = 'Memuat...';
        
        let lessons = [];
        try {
            // Use fallback data directly for reliability
            if (category === 'huruf') {
                lessons = fallbackHurufLessons;
            } else if (category === 'angka') {
                lessons = fallbackAngkaLessons;
            } else {
                // For pembelajaran, check API first, else fallback
                const response = await fetch(`/api/lessons?category=${category}`);
                const apiLessons = await response.json();
                lessons = apiLessons.length > 0 ? apiLessons : fallbackPembelajaranLessons;
            }
        } catch {
            // Fallback on error
            if (category === 'huruf') lessons = fallbackHurufLessons;
            else if (category === 'angka') lessons = fallbackAngkaLessons;
            else lessons = fallbackPembelajaranLessons;
        }

        if (category === 'angka') {
            // Render number cards with images
            lessonsGrid.innerHTML = lessons.map(lesson => `
                <div class="lesson-card">
                    <h3 style="font-size: 48px; color: var(--accent-emerald); margin-bottom: 10px;">${lesson.title}</h3>
                    <img 
                        src="${lesson.image}" 
                        alt="${lesson.description}" 
                        style="width: 100%; height: auto; border-radius: 10px; object-fit: contain; margin-bottom: 10px; background: rgba(16, 185, 129, 0.05); padding: 10px;"
                        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect fill=%22%23063527%22 width=%22200%22 height=%22200%22/><text x=%22100%22 y=%22120%22 font-family=%22Arial%22 font-size=%2280%22 fill=%22%2334d399%22 text-anchor=%22middle%22>${lesson.title}</text></svg>'; this.onerror=null;"
                    >
                    <p>${lesson.description}</p>
                </div>
            `).join('');
        } else if (category === 'pembelajaran') {
            // Render pembelajaran cards
            lessonsGrid.innerHTML = lessons.map(lesson => {
                let cardHTML = `
                    <div class="lesson-card">
                        <div class="placeholder">${getLessonIcon(lesson.category, lesson.title)}</div>
                        <h4>${lesson.title}</h4>
                        <p>${lesson.description || ''}</p>
                `;

                if (lesson.pdf_url) {
                    cardHTML += `<button class="pdf-btn" onclick="window.open('${lesson.pdf_url}', '_blank')">
                        <i class="fas fa-file-pdf"></i> Buka PDF
                    </button>`;
                }

                cardHTML += '</div>';
                return cardHTML;
            }).join('');
        } else {
            // Render huruf cards with images
            lessonsGrid.innerHTML = lessons.map(lesson => `
                <div class="lesson-card">
                    <h3 style="font-size: 48px; color: var(--accent-emerald); margin-bottom: 10px;">${lesson.title}</h3>
                    <img 
                        src="${lesson.image}" 
                        alt="${lesson.description}" 
                        style="width: 100%; height: auto; border-radius: 10px; object-fit: contain; margin-bottom: 10px; background: rgba(16, 185, 129, 0.05); padding: 10px;"
                        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect fill=%22%23063527%22 width=%22200%22 height=%22200%22/><text x=%22100%22 y=%22120%22 font-family=%22Arial%22 font-size=%2280%22 fill=%22%2334d399%22 text-anchor=%22middle%22>${lesson.title}</text></svg>'; this.onerror=null;"
                    >
                    <p>${lesson.description}</p>
                </div>
            `).join('');
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderLessons(tab.dataset.category);
        });
    });

    renderLessons('huruf');
}

function getLessonIcon(category, title) {
    if (category === 'huruf') return '✋';
    if (category === 'angka') return '☝️';
    if (category === 'pembelajaran') {
        // Extract level number from title
        const levelMatch = title.match(/Level (\d+)/);
        if (levelMatch) {
            const levelNum = parseInt(levelMatch[1]);
            // Different icons for different levels
            const icons = ['👋', '🤝', '❓', '👨‍👩‍👧‍👦', '📅', '🧭', '😊', '🛒', '🏫', '🏥'];
            return icons[levelNum - 1] || '📚';
        }
        return '�';
    }
    return '📖';
}

async function loadQuizQuestions() {
    try {
        const response = await fetch('/api/quiz-questions');
        quizQuestions = await response.json();
        
        // Shuffle options for each question
        quizQuestions = quizQuestions.map(question => {
            const options = [
                { text: question.option_a, isCorrect: question.correct_option.toLowerCase() === 'a' },
                { text: question.option_b, isCorrect: question.correct_option.toLowerCase() === 'b' },
                { text: question.option_c, isCorrect: question.correct_option.toLowerCase() === 'c' }
            ];
            
            const shuffledOptions = shuffleArray(options);
            
            return {
                ...question,
                shuffledOptions: shuffledOptions,
                correctIndex: shuffledOptions.findIndex(opt => opt.isCorrect)
            };
        });
        
        if (quizQuestions.length > 0) {
            currentQuestionIndex = 0;
            quizScore = 0;
            quizAnswers = [];
            renderQuestion();
        }
    } catch {
        console.error('Failed to load quiz questions');
    }
}

function initQuiz() {
    loadQuizQuestions();
}

function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('quiz-question').style.display = 'block';
    document.getElementById('quiz-options').style.display = 'grid';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('prev-question').style.display = 'none';
    document.getElementById('finish-quiz').style.display = 'none';
    document.getElementById('quiz-question').textContent = question.question;

    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';

    const options = question.shuffledOptions;
    const correctIndex = question.correctIndex;
    const hasAnswered = quizAnswers[currentQuestionIndex] !== undefined;

    options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option.text;
        optionDiv.dataset.index = index;

        if (hasAnswered) {
            if (index === correctIndex) optionDiv.classList.add('correct');
            if (quizAnswers[currentQuestionIndex].userAnswer === index && quizAnswers[currentQuestionIndex].userAnswer !== correctIndex) {
                optionDiv.classList.add('wrong');
            }
            optionDiv.style.pointerEvents = 'none';
        }

        optionDiv.addEventListener('click', () => {
            if (quizAnswers[currentQuestionIndex] !== undefined) return;

            document.querySelectorAll('.quiz-option').forEach(el => el.style.pointerEvents = 'none');

            const isCorrect = (index === correctIndex);
            quizAnswers[currentQuestionIndex] = {
                isCorrect: isCorrect,
                userAnswer: index,
                correctAnswer: correctIndex
            };

            if (isCorrect) quizScore++;
            const pointsPerQuestion = 100 / quizQuestions.length;
            const currentScore = Math.round(quizScore * pointsPerQuestion);
            document.getElementById('score').textContent = currentScore;

            document.querySelectorAll('.quiz-option').forEach((el, i) => {
                if (i === correctIndex) el.classList.add('correct');
                else if (el === optionDiv && i !== correctIndex) el.classList.add('wrong');
            });

            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    currentQuestionIndex++;
                    renderQuestion();
                } else {
                    showQuizResult();
                }
            }, 1500);
        });

        optionsDiv.appendChild(optionDiv);
    });

    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

async function showQuizResult() {
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-options').style.display = 'none';

    const finalScore = Math.round((quizScore / quizQuestions.length) * 100);
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
            <h2 style="color: var(--accent-emerald); margin-bottom: 20px;">Quiz Selesai!</h2>
            <p style="font-size: 32px; margin-bottom: 20px;">Skor Anda: ${finalScore} / 100</p>
            <p style="margin-bottom: 20px; color: var(--text-muted);">${finalScore >= 70 ? 'Luar biasa! 🎉' : 'Bagus! Terus belajar! 💪'}</p>
            <button class="action-btn primary" onclick="resetQuiz()">Coba Lagi</button>
        `;

    try {
        await fetch('/api/quiz-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: finalScore, total_questions: quizQuestions.length })
        });
    } catch {
        console.error('Failed to save quiz score');
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];

    document.getElementById('score').textContent = '0';
    document.getElementById('progress-fill').style.width = '0%';
    loadQuizQuestions();
}

function initHistory() {
    const tabs = document.querySelectorAll('.history-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadHistory(tab.dataset.history);
        });
    });

    loadHistory('two-way');
}

async function loadHistory(type) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = 'Memuat...';

    let endpoint = '';
    if (type === 'two-way') endpoint = '/api/two-way-history';
    else if (type === 'chat') endpoint = '/api/chat-history';
    else if (type === 'quiz') endpoint = '/api/quiz-scores';

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Belum ada riwayat</p>';
            return;
        }

        historyList.innerHTML = data.map(item => {
            let content = '';
            if (type === 'two-way') {
                content = `
                    ${item.deaf_text ? `<div><strong>Teman Tuli:</strong> ${item.deaf_text}</div>` : ''}
                    ${item.hearing_speech ? `<div><strong>Orang Dengar:</strong> ${item.hearing_speech}</div>` : ''}
                `;
            } else if (type === 'chat') {
                content = `
                    <div><strong>Anda:</strong> ${item.user_message}</div>
                    <div><strong>AI:</strong> ${item.ai_response}</div>
                `;
            } else if (type === 'quiz') {
                content = `
                    <div><strong>Skor:</strong> ${item.score} / 100</div>
                `;
            }

            return `
                <div class="history-item">
                    <div class="timestamp">${new Date(item.created_at).toLocaleString('id-ID')}</div>
                    ${content}
                    <button class="delete-btn" onclick="deleteHistoryItem('${type}', ${item.id})">Hapus</button>
                </div>
            `;
        }).join('');
    } catch {
        historyList.innerHTML = '<p style="text-align: center; color: #ff6b6b;">Gagal memuat riwayat</p>';
    }
}

async function deleteHistoryItem(type, id) {
    if (!confirm('Yakin ingin menghapus?')) return;

    let endpoint = '';
    if (type === 'two-way') endpoint = `/api/two-way-history/${id}`;
    else if (type === 'chat') endpoint = `/api/chat-history/${id}`;
    else if (type === 'quiz') endpoint = `/api/quiz-scores/${id}`;

    try {
        await fetch(endpoint, { method: 'DELETE' });
        loadHistory(type);
    } catch {
        alert('Gagal menghapus item');
    }
}

// Smoothing variables for gesture recognition
let smoothedLandmarks = null;
let lastDetectedGesture = '';
let gestureStabilityCounter = 0;
const STABILITY_THRESHOLD = 8; // Number of consecutive frames to confirm gesture
const SMOOTHING_ALPHA = 0.7; // Exponential smoothing factor

async function initGestureRecognition() {
    const startBtn = document.getElementById('start-camera-btn');
    let isCameraActive = false;

    startBtn.addEventListener('click', async () => {
        if (isCameraActive) {
            stopCamera();
            return;
        } else {
            await startCamera();
        }
    });

    async function startCamera() {
        try {
            const video = document.getElementById('camera-feed');
            const canvas = document.getElementById('gesture-canvas');
            const placeholder = document.getElementById('camera-placeholder');

            placeholder.style.display = 'none';
            video.style.display = 'block';
            canvas.style.display = 'block';

            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            video.srcObject = stream;

            video.play();

            hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
            hands.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.65,
                minTrackingConfidence: 0.6
            });
            hands.onResults(onGestureResults);

            mediaPipeCamera = new Camera(video, {
                onFrame: async () => await hands.send({ image: video }),
                width: 640,
                height: 480
            });
            mediaPipeCamera.start();

            // Reset smoothing variables
            smoothedLandmarks = null;
            lastDetectedGesture = '';
            gestureStabilityCounter = 0;

            isCameraActive = true;
            startBtn.innerHTML = '<i class="fas fa-stop"></i> Nonaktifkan Kamera';
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
        }
    }

    function stopCamera() {
        if (mediaPipeCamera) {
            mediaPipeCamera.stop();
            mediaPipeCamera = null;
        }
        if (hands) {
            hands.close();
            hands = null;
        }
        const video = document.getElementById('camera-feed');
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
        const canvas = document.getElementById('gesture-canvas');
        const placeholder = document.getElementById('camera-placeholder');
        placeholder.style.display = 'flex';
        video.style.display = 'none';
        canvas.style.display = 'none';
        document.getElementById('gesture-text').textContent = 'Menunggu gestur...';
        isCameraActive = false;
        startBtn.innerHTML = '<i class="fas fa-camera"></i> Aktifkan Kamera';
        
        // Reset variables
        smoothedLandmarks = null;
        lastDetectedGesture = '';
        gestureStabilityCounter = 0;
    }
}

function onGestureResults(results) {
    const canvas = document.getElementById('gesture-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
            const landmarks = results.multiHandLandmarks[i];
            
            // Apply exponential smoothing to landmarks
            if (!smoothedLandmarks) {
                smoothedLandmarks = landmarks.map(lm => ({ ...lm }));
            } else {
                for (let j = 0; j < landmarks.length; j++) {
                    smoothedLandmarks[j].x = SMOOTHING_ALPHA * landmarks[j].x + (1 - SMOOTHING_ALPHA) * smoothedLandmarks[j].x;
                    smoothedLandmarks[j].y = SMOOTHING_ALPHA * landmarks[j].y + (1 - SMOOTHING_ALPHA) * smoothedLandmarks[j].y;
                    smoothedLandmarks[j].z = SMOOTHING_ALPHA * landmarks[j].z + (1 - SMOOTHING_ALPHA) * smoothedLandmarks[j].z;
                }
            }

            // Draw connectors and landmarks with theme colors
            drawConnectors(ctx, smoothedLandmarks, HAND_CONNECTIONS, { color: '#10b981', lineWidth: 3 });
            drawLandmarks(ctx, smoothedLandmarks, { color: '#34d399', lineWidth: 2, radius: 5 });

            // Detect gesture
            const gesture = detectGesture(smoothedLandmarks);
            
            // Stabilize gesture output
            if (gesture === lastDetectedGesture) {
                gestureStabilityCounter++;
            } else {
                gestureStabilityCounter = 1;
                lastDetectedGesture = gesture;
            }

            if (gestureStabilityCounter >= STABILITY_THRESHOLD) {
                document.getElementById('gesture-text').textContent = gesture;
            }
        }
    } else {
        // Reset when no hands are detected
        gestureStabilityCounter = 0;
        smoothedLandmarks = null;
        if (document.getElementById('gesture-text').textContent !== 'Menunggu gestur...') {
            document.getElementById('gesture-text').textContent = 'Menunggu gestur...';
        }
    }
    ctx.restore();
}

function detectGesture(landmarks) {
    // Landmarks 0 (wrist), 4 (thumb tip), 8 (index tip), 12 (middle tip), etc.
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const middleMCP = landmarks[9];
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];
    const ringMCP = landmarks[13];
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];
    const pinkyMCP = landmarks[17];

    // Helper function to check if finger is extended
    const isFingerUp = (tip, pip, mcp) => {
        // For thumb, use x-axis (for right hand)
        if (tip === thumbTip) {
            return thumbTip.x < thumbIP.x;
        }
        return tip.y < pip.y;
    };

    const isThumbUp = isFingerUp(thumbTip, thumbIP, thumbMCP);
    const isIndexUp = isFingerUp(indexTip, indexPIP, indexMCP);
    const isMiddleUp = isFingerUp(middleTip, middlePIP, middleMCP);
    const isRingUp = isFingerUp(ringTip, ringPIP, ringMCP);
    const isPinkyUp = isFingerUp(pinkyTip, pinkyPIP, pinkyMCP);

    // Check thumb position relative to other fingers
    const thumbTouchingIndex = Math.abs(thumbTip.x - indexTip.x) < 0.05 && Math.abs(thumbTip.y - indexTip.y) < 0.05;
    const thumbAcrossPalm = thumbTip.x > indexMCP.x;

    // NUMBER GESTURES (0-10)
    if (!isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp && isThumbUp) return "Angka 1";
    if (isIndexUp && isMiddleUp && !isRingUp && !isPinkyUp && !isThumbUp) return "Angka 2";
    if (isIndexUp && isMiddleUp && isRingUp && !isPinkyUp && !isThumbUp) return "Angka 3";
    if (isIndexUp && isMiddleUp && isRingUp && isPinkyUp && !isThumbUp) return "Angka 4";
    if (isThumbUp && isIndexUp && isMiddleUp && isRingUp && isPinkyUp) return "Angka 5";
    if (!isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp && !isThumbUp) return "Angka 0";

    // ALPHABET GESTURES (A-Z basic)
    if (!isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp && thumbTouchingIndex) return "Huruf A";
    if (isIndexUp && isMiddleUp && isRingUp && isPinkyUp && thumbAcrossPalm) return "Huruf B";
    if (isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp && thumbAcrossPalm) return "Huruf D";
    if (isIndexUp && isMiddleUp && !isRingUp && !isPinkyUp && thumbAcrossPalm) return "Huruf V";
    if (isIndexUp && isMiddleUp && isRingUp && isPinkyUp && !isThumbUp) return "Huruf B";
    if (isThumbUp && !isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp) return "Huruf A";

    return "Gestur terdeteksi";
}

function initDonation() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.text;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Tersalin';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

function initQuickPhrases() {
    const phraseTabs = document.querySelectorAll('.phrase-category-tab');
    const phrasesGrid = document.getElementById('phrases-grid');

    function renderPhrases(category) {
        const phrases = quickPhrases[category] || [];
        const icons = {
            salam: ['👋', '🌅', '☀️', '🙏', '👋'],
            komunikasi: ['🔊', '👁️', '🔄', '⌨️', '❓'],
            bantuan: ['🔇', '🆘', '⏳', '❌', '🤝'],
            penting: ['🏥', '⚠️', '📞', '🤲', '📍']
        };

        phrasesGrid.innerHTML = phrases.map((phrase, index) => `
            <div class="phrase-card" onclick="speakPhrase('${phrase}')">
                <div class="phrase-icon">${icons[category][index]}</div>
                <div class="phrase-text">${phrase}</div>
            </div>
        `).join('');
    }

    phraseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            phraseTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderPhrases(tab.dataset.category);
        });
    });

    renderPhrases('salam');
}

function speakPhrase(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    } else {
        alert('Browser Anda tidak mendukung Text-to-Speech.');
    }
}

async function loadProfile() {
    const profileInfo = document.getElementById('profile-info');
    const profileStats = document.getElementById('profile-stats');

    try {
        const userResponse = await fetch('/api/user');
        const userData = await userResponse.json();

        profileInfo.innerHTML = `
            <p><strong>Username:</strong> ${userData.username}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Nama Lengkap:</strong> ${userData.full_name || '-'}</p>
            <p><strong>Bergabung:</strong> ${new Date(userData.created_at).toLocaleDateString('id-ID')}</p>
        `;

        const scoresResponse = await fetch('/api/quiz-scores');
        const scores = await scoresResponse.json();

        let highScore = 0;
        let totalAttempts = scores.length;
        scores.forEach(score => {
            if (score.score > highScore) highScore = score.score;
        });

        profileStats.innerHTML = `
            <p><strong>Skor Tertinggi:</strong> ${highScore} / 100</p>
            <p><strong>Total Percobaan:</strong> ${totalAttempts}</p>
            <p><strong>Status:</strong> ${totalAttempts > 0 ? 'Aktif belajar' : 'Belum pernah mengikuti quiz'}</p>
        `;
    } catch {
        profileInfo.innerHTML = '<p style="color: #ff6b6b;">Gagal memuat profil</p>';
        profileStats.innerHTML = '';
    }
}
