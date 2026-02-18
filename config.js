// ============================================================
//  MUSIC TRACKS — Use .mp3 files (best browser support)
//  Drop your .mp3 files in a "music/" folder next to the site.
//  Example:
//    { name: "Lofi Study", src: "music/lofi.mp3" },
// ============================================================
const MUSIC_TRACKS = [
    { name: "Lofi Study", src: "musics/lofi.mp3" },
    // { name: "Winter Vibes", src: "music/winter.mp3" },
    // { name: "Fox Theme",    src: "music/fox.mp3"    },
];



//  Each theme needs:
//    id:         unique string key
//    name:       display name shown in dropdown
//    icon:       emoji shown next to name
//    background: filename of the background image/gif
//    overlay:    CSS rgba() for the dark overlay on top of bg
//    accent:     primary accent colour (used on cards, borders, etc.)
//    accent2:    secondary/gradient colour
// ============================================================
const THEMES = [
    {
        id: "fox",
        name: "Fox Theme",
        icon: "🦊",
        background: "background.gif",
        overlay: "rgba(0,0,0,0.72)",
        accent: "#58a6ff",
        accent2: "#a78bfa"
    },
    {
        id: "winter",
        name: "Winter Theme",
        icon: "❄️",
        background: "winter.gif",
        overlay: "rgba(10,30,60,0.70)",
        accent: "#7ee8ff",
        accent2: "#a0c4ff"
    },
    // ── ADD MORE THEMES BELOW ──────────────────────────────────
    // {
    //     id: "sunset",
    //     name: "Sunset Theme",
    //     icon: "🌅",
    //     background: "sunset.gif",
    //     overlay: "rgba(30,0,20,0.70)",
    //     accent: "#ff6b6b",
    //     accent2: "#ffa94d"
    // },
];

// ============================================================
//  SITE DATA
// ============================================================
const DATA = {
    profile: {
        name: "Justanother_game",
        age: 15,
        role: "Game / Backend Developer",
        location: "Oslo, Norway",
        email: "just_anothergame04@gmail.com",
        bio: "Developer focused on Minecraft servers, scripting, automation, and game systems.",
        pfp: "pfp.png",
        discordLink: "https://discord.com/users/justanother_game"
    },

    skills: [
        "Java",
        "Skript",
        "JavaScript",
        "HTML",
        "CSS",
        "Minecraft Server Development",
        "Discord Bots",
        "Automation"
    ],

    projects: [
        {
            title: "Culling",
            description: "Jujutsu Kaisen-based Minecraft server with intense challenges and progression systems.",
            tags: ["Minecraft", "PvP", "Custom Systems"],
            theme: "dark",
            image: "https://cdn.discordapp.com/icons/1291508643329740941/382d5fdd1d7549d1fa73337833a9a667.png?size=4096",
            discord: "https://discord.gg/Tnbhdjs23q"
        },
        {
            title: "Dirtbox",
            description: "Multi-mode Minecraft network with advanced server infrastructure and gameplay systems.",
            tags: ["Network", "Survival", "Custom Systems"],
            theme: "purple",
            image: "https://cdn.discordapp.com/icons/1464667156955402499/315a3a4b3d018fa5457def07cfdbff48.png?size=4096",
            discord: "https://discord.gg/MtCfgK9mHB"
        },
        {
            title: "Gamestop",
            description: "Discord Bot Store with automation, moderation, and smart features for community management.",
            tags: ["Discord", "Automation", "Store"],
            theme: "blue",
            image: "https://cdn.discordapp.com/icons/1469641813425131674/880cab82b517d5676dfbd84c2131eb52.png?size=4096",
            discord: "https://discord.gg/EPTu4uW3z4"
        }
    ],

    scripts: [
        {
            id: "basic",
            title: "Basic",
            priceDisplay: "$5.99",
            description: "Essential skripts for small servers and testing environments.",
            features: [
                "✓ Core utilities",
                "✓ Simple configuration",
                "✓ Lightweight & optimized",
                "✕ No advanced systems"
            ]
        },
        {
            id: "advanced",
            title: "Advanced",
            priceDisplay: "$19.99",
            description: "Powerful systems for growing Minecraft networks.",
            features: [
                "✓ Advanced mechanics",
                "✓ GUI-based systems",
                "✓ Modular & scalable",
                "✓ Priority support"
            ]
        },
        {
            id: "full-gamemode",
            title: "Full Gamemode",
            priceDisplay: "$49.99 – $79.99",
            description: "A complete custom gamemode built from the ground up.",
            features: [
                "✓ Fully custom mechanics",
                "✓ Economy, ranks & progression",
                "✓ Long-term support",
                "✓ Custom balancing"
            ]
        }
    ]
};

