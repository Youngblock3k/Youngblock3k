document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    //  MUSIC PLAYER
    // ============================================================
    const musicContainer   = document.querySelector(".music-container");
    const musicToggleBtn   = document.getElementById("musicToggleBtn");
    const musicDropdown    = document.getElementById("musicDropdown");
    const musicPlay        = document.getElementById("musicPlay");
    const musicPrev        = document.getElementById("musicPrev");
    const musicNext        = document.getElementById("musicNext");
    const musicVolume      = document.getElementById("musicVolume");
    const musicTrackName   = document.getElementById("musicTrackName");
    const musicTrackStatus = document.getElementById("musicTrackStatus");
    const musicPlaylist    = document.getElementById("musicPlaylist");
    const musicDisc        = document.querySelector(".music-disc");

    let audio      = new Audio();
    let tracks     = [...(typeof MUSIC_TRACKS !== "undefined" ? MUSIC_TRACKS : [])];
    let currentIdx = 0;
    let isPlaying  = false;

    musicToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = musicDropdown.classList.toggle("open");
        musicContainer.classList.toggle("open", isOpen);
        if (isOpen) {
            themeDropdown.classList.remove("open");
            themeContainer.classList.remove("open");
        }
    });

    function renderPlaylist() {
        if (tracks.length === 0) {
            musicPlaylist.innerHTML = `<div class="music-empty">No tracks — add .mp3 files to config.js</div>`;
            return;
        }
        musicPlaylist.innerHTML = tracks.map((t, i) => `
            <div class="playlist-item ${i === currentIdx ? 'playing' : ''}" data-idx="${i}">
                <span class="playlist-num">${i === currentIdx && isPlaying ? '♪' : i + 1}</span>
                <span>${t.name}</span>
            </div>`).join('');

        musicPlaylist.querySelectorAll(".playlist-item").forEach(item => {
            item.addEventListener("click", () => {
                currentIdx = parseInt(item.dataset.idx);
                loadTrack(currentIdx, true);
            });
        });
    }

    function loadTrack(idx, autoplay = false) {
        if (!tracks.length) return;
        const t = tracks[idx];
        audio.src = t.src;
        audio.volume = musicVolume.value / 100;
        musicTrackName.textContent = t.name;
        if (autoplay) {
            audio.play().catch(() => {});
            isPlaying = true;
        }
        updatePlayBtn();
        renderPlaylist();
    }

    function updatePlayBtn() {
        musicPlay.innerHTML = isPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
        musicTrackStatus.textContent = isPlaying ? "▶ Now Playing" : "⏸ Paused";
        if (musicDisc) musicDisc.classList.toggle("spinning", isPlaying);
    }

    musicPlay.addEventListener("click", () => {
        if (!tracks.length) return;
        if (!audio.src) loadTrack(currentIdx);
        if (isPlaying) { audio.pause(); isPlaying = false; }
        else           { audio.play().catch(() => {}); isPlaying = true; }
        updatePlayBtn();
    });

    musicPrev.addEventListener("click", () => {
        if (!tracks.length) return;
        currentIdx = (currentIdx - 1 + tracks.length) % tracks.length;
        loadTrack(currentIdx, isPlaying);
    });

    musicNext.addEventListener("click", () => {
        if (!tracks.length) return;
        currentIdx = (currentIdx + 1) % tracks.length;
        loadTrack(currentIdx, isPlaying);
    });

    audio.addEventListener("ended", () => {
        currentIdx = (currentIdx + 1) % tracks.length;
        loadTrack(currentIdx, true);
    });

    musicVolume.addEventListener("input", () => { audio.volume = musicVolume.value / 100; });

    renderPlaylist();
    if (tracks.length) loadTrack(0);


    // ============================================================
    //  THEME SYSTEM
    // ============================================================
    const themeContainer = document.querySelector(".theme-switcher-container");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeDropdown  = document.getElementById("themeDropdown");
    const themeLabelEl   = document.getElementById("themeLabel");

    THEMES.forEach(theme => {
        const item = document.createElement("button");
        item.className = "theme-option";
        item.setAttribute("data-theme-id", theme.id);
        item.innerHTML = `<span class="theme-icon">${theme.icon}</span> ${theme.name}`;
        item.addEventListener("click", (e) => { e.stopPropagation(); applyTheme(theme.id); });
        themeDropdown.appendChild(item);
    });

    themeToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = themeDropdown.classList.toggle("open");
        themeContainer.classList.toggle("open", isOpen);
        if (isOpen) {
            musicDropdown.classList.remove("open");
            musicContainer.classList.remove("open");
        }
    });

    function applyTheme(themeId) {
        const theme = THEMES.find(t => t.id === themeId);
        if (!theme) return;
        document.body.style.backgroundImage = `url('${theme.background}')`;
        document.querySelector(".overlay").style.background = theme.overlay;
        document.documentElement.style.setProperty("--accent",  theme.accent);
        document.documentElement.style.setProperty("--accent2", theme.accent2);
        themeLabelEl.textContent = theme.name;
        document.querySelectorAll(".theme-option").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-theme-id") === themeId);
        });
        themeDropdown.classList.remove("open");
        themeContainer.classList.remove("open");
        localStorage.setItem("selectedTheme", themeId);
    }

    const saved = localStorage.getItem("selectedTheme");
    applyTheme(saved && THEMES.find(t => t.id === saved) ? saved : THEMES[0].id);


    // ============================================================
    //  CLOSE DROPDOWNS ON OUTSIDE CLICK
    // ============================================================
    document.addEventListener("click", (e) => {
        if (!musicDropdown.contains(e.target) && !musicToggleBtn.contains(e.target)) {
            musicDropdown.classList.remove("open");
            musicContainer.classList.remove("open");
        }
        if (!themeDropdown.contains(e.target) && !themeToggleBtn.contains(e.target)) {
            themeDropdown.classList.remove("open");
            themeContainer.classList.remove("open");
        }
    });


    // ============================================================
    //  PROFILE
    // ============================================================
    if (document.getElementById("name"))     document.getElementById("name").textContent     = DATA.profile.name;
    if (document.getElementById("role"))     document.getElementById("role").textContent     = DATA.profile.role;
    if (document.getElementById("bio"))      document.getElementById("bio").textContent      = DATA.profile.bio;
    if (document.getElementById("location")) document.getElementById("location").textContent = DATA.profile.location;


    // ============================================================
    //  PROJECTS
    // ============================================================
    const projectsContainer = document.getElementById("projectsContainer");
    if (projectsContainer && DATA.projects) {
        projectsContainer.innerHTML = DATA.projects.map(project => `
            <div class="project-card ${project.theme}-theme">
                <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'">
                <div class="project-content">
                    <div class="project-icon">
                        <i class="fas fa-${project.theme === 'dark' ? 'gamepad' : project.theme === 'purple' ? 'network-wired' : 'discord'}"></i>
                    </div>
                    <h3>${project.title}</h3>
                    <p class="project-subtitle">${project.description.split(' ')[0]} Project</p>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.discord}" target="_blank" class="project-discord-btn">
                        <i class="fab fa-discord"></i> Join Discord
                    </a>
                </div>
            </div>
        `).join('');
    }


    // ============================================================
    //  WORK TABS
    // ============================================================
    const workTabButtons = document.querySelectorAll('.work-tab-btn');
    const workPanels     = document.querySelectorAll('.work-panel');

    workTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            workTabButtons.forEach(btn => btn.classList.remove('active'));
            workPanels.forEach(panel => panel.classList.remove('active'));
            button.classList.add('active');
            const activePanel = document.getElementById(`${tabName}-panel`);
            if (activePanel) activePanel.classList.add('active');
        });
    });


    // ============================================================
    //  STORE
    // ============================================================
    const storePackages = document.getElementById("storePackages");
    if (storePackages && DATA.scripts) {
        storePackages.innerHTML = DATA.scripts.map((s, i) => {
            const isFeatured = i === 1;
            return `
            <div class="pkg-card ${isFeatured ? 'pkg-featured' : ''}">
                ${isFeatured ? '<div class="pkg-badge">Most Popular</div>' : ''}
                <h3 class="pkg-title">${s.title}</h3>
                <p class="pkg-desc">${s.description}</p>
                <ul class="pkg-features">
                    ${s.features.map(f => `<li class="${f.startsWith('✕') ? 'pkg-no' : 'pkg-yes'}">${f}</li>`).join('')}
                </ul>
                <div class="pkg-price">${s.priceDisplay}</div>
                <a href="${DATA.profile.discordLink || '#contact'}" target="_blank" class="btn btn-pkg">
                    <i class="fab fa-discord"></i> Order via Discord
                </a>
            </div>`;
        }).join('');
    }


    // ============================================================
    //  SCROLL ANIMATIONS
    // ============================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .skill-item, .project-card, .pkg-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });


    // ============================================================
    //  SCROLL-SPY
    // ============================================================
    const SECTION_COLORS = {
        home:     { color: "#58a6ff" },
        about:    { color: "#a78bfa" },
        skills:   { color: "#7ee8ff" },
        projects: { color: "#f472b6" },
        work:     { color: "#34d399" },
        store:    { color: "#fbbf24" },
        contact:  { color: "#60a5fa" },
    };

    const navLinks = document.querySelectorAll(".navbar a[href^='#']");

    function setActiveNav(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove("nav-active");
            link.style.color = "";
            link.style.borderColor = "";
            link.style.background = "";
        });
        const active = document.querySelector(`.navbar a[href="#${sectionId}"]`);
        if (!active) return;
        const c = (SECTION_COLORS[sectionId] || { color: "#58a6ff" }).color;
        active.classList.add("nav-active");
        active.style.color       = c;
        active.style.borderColor = c;
        active.style.background  = c + "22";
    }

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveNav(entry.target.id); });
    }, { threshold: 0.3 });

    document.querySelectorAll("section[id]").forEach(sec => spyObserver.observe(sec));


    // ============================================================
    //  SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
