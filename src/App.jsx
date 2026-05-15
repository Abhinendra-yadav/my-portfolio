import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Star data remains the same
    const stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.8,
      speed: Math.random() * 0.4 + 0.2 // Slightly adjusted speed for visible downward flow
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = darkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(15, 23, 42, 0.6)";
      
      stars.forEach(s => {
        // MOVEMENT: Adding speed to 'y' makes stars move DOWNWARD
        s.y += s.speed;

        // BOUNDARY CHECK: If star goes below the screen, reset it to the top
        if (s.y > canvas.height) {
          s.y = -5; // Reset just above the top edge
          s.x = Math.random() * canvas.width; // Optional: randomize x for variety
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"} min-h-screen font-sans transition-colors duration-500`}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-20 py-5 backdrop-blur-lg border-b border-white/5 z-50">
        <h1 className="font-black text-2xl tracking-tighter uppercase">ABHINENDRA<span className="text-cyan-500">.</span></h1>
        <div className="hidden md:flex gap-8 text-[15px] font-bold tracking-[0.2em] uppercase opacity-60">
          <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl p-2 hover:scale-110 transition-transform">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </nav>

      {/* 1. HOME SECTION */}
   {/* 1. HOME SECTION */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden"
        onMouseMove={(e) => {
          const card = document.getElementById('profile-card');
          const box = card.getBoundingClientRect();
          const x = e.clientX - box.left - box.width / 2;
          const y = e.clientY - box.top - box.height / 2;
          card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        }}
        onMouseLeave={() => {
          document.getElementById('profile-card').style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }}
      >
        {/* Subtle 3D Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
        
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl w-full mx-auto flex flex-col items-center relative z-10">
          
          {/* ENHANCED 3D PROFILE CARD */}
          <div 
            id="profile-card"
            className="relative mb-14 group transition-transform duration-200 ease-out preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D Glow Layer */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ transform: 'translateZ(-20px)' }}></div>
            
            {/* Main Image Container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-1.5 backdrop-blur-3xl bg-white/[0.03] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center transition-all duration-700">
              <img 
                src="my-photo.png" 
                alt="Abhinendra Yadav" 
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" 
                style={{ transform: 'translateZ(30px)' }}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} 
              />
              <div className="hidden w-full h-full rounded-full bg-slate-900 items-center justify-center font-black text-7xl text-cyan-500 tracking-tighter uppercase">AY</div>
            </div>

            {/* Floating Badge (3D Offset) */}
            <div 
              className="absolute -bottom-2 -right-6 bg-white/10 backdrop-blur-3xl border border-white/20 px-6 py-2.5 rounded-2xl shadow-2xl transition-all duration-500 group-hover:translate-z-50"
              style={{ transform: 'translateZ(50px)' }}
            >
              <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                Ready to Build
              </span>
            </div>
          </div>

          <div className="text-center space-y-8 max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-white/40 font-black text-[10px] tracking-[0.4em] uppercase">Full Stack Developer | AI Enthusiast</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
              <span className="inline-block text-white">HI, I'M</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-400 to-blue-600 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">ABHINENDRA.</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-40 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">Engineering intelligent solutions with a focus on modern web ecosystems and high-performance AI integration.</p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <a href="#projects" className="group relative px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-hidden">
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <a 
                href="Abhinendra_Resume.pdf" 
                download="Abhinendra_Resume.pdf"
                className="px-10 py-5 bg-transparent text-white border border-white/10 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase transition-all hover:bg-white/5 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-20 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 blur-[100px] -z-10"></div>
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3"><div className="h-[2px] w-8 bg-cyan-500"></div><span className="text-cyan-500 font-black text-[10px] tracking-[0.4em] uppercase">The Story</span></div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Vision</span></h2>
            </div>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl opacity-70 leading-relaxed font-medium">I am a B.Tech student and a passionate developer with a strong interest in <span className="text-white">AI and modern web technologies</span>. I enjoy building real-world projects that combine seamless frontend design with intelligent backend logic.</p>
              <div className="relative pt-10"><span className="absolute top-0 left-0 text-8xl font-serif opacity-10 text-cyan-500">“</span><p className="text-lg md:text-xl opacity-50 italic font-semibold pl-8 border-l-2 border-cyan-500/30">My goal is to create impactful applications that solve real-world problems and provide intuitive user experiences through the power of AI.</p></div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="group relative p-10 md:p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] shadow-2xl overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 blur-[60px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <h4 className="text-cyan-400 font-black uppercase text-[10px] tracking-[0.3em] mb-10 italic border-b border-white/5 pb-4">Professional Highlights</h4>
                <div className="space-y-8">
                  {["Architected End-to-End AI Systems for Skill Analysis & Gap Tracking", "Certified Java Full-Stack Virtual Intern (AICTE & EduSkills)", "Specialized in Developing Scalable Web Apps using MERN & FastAPI", "Proficient in Bridging NLP Models with Modern Web Interfaces"].map((point, index) => (
                    <div key={index} className="flex items-start gap-4 group/item transition-all hover:translate-x-2">
                      <div className="mt-1.5"><div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)] group-hover/item:scale-150 transition-all"></div></div>
                      <p className="text-sm md:text-base font-black opacity-40 group-hover/item:opacity-100 group-hover/item:text-white transition-all leading-snug tracking-tight">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute -right-6 -bottom-6 text-9xl font-black opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity">CORE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL STACK */}
      <section id="skills" className="py-32 px-6 md:px-20 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <div className="flex items-center gap-3"><div className="h-[2px] w-8 bg-indigo-500"></div><span className="text-indigo-500 font-black text-[10px] tracking-[0.4em] uppercase">Capabilities</span></div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Stack</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Frontend", icon: "🌐", items: ["HTML5 / CSS3", "JavaScript ES6+", "React.js", "Tailwind CSS", "Bootstrap 5"], color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/10" },
              { title: "Backend", icon: "⚙️", items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "System Design"], color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/10" },
              { title: "Languages", icon: "🚀", items: ["Java (Core)", "Python", "JavaScript", "C++", "SQL"], color: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-500/10" },
              { title: "Infrastructure", icon: "☁️", items: ["Git / GitHub", "AWS Cloud", "MongoDB", "LeetCode (DSA)", "Vercel"], color: "from-purple-500 to-pink-600", shadow: "shadow-purple-500/10" }
            ].map((stack, i) => (
              <div key={i} className={`group relative p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-2 ${stack.shadow}`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 w-20 rounded-b-full bg-gradient-to-r ${stack.color} opacity-50 group-hover:w-1/2 transition-all duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">{stack.icon}</div>
                  <h3 className="text-white font-black text-sm tracking-[0.2em] uppercase mb-8 border-b border-white/5 pb-4">{stack.title}</h3>
                  <ul className="space-y-4">{stack.items.map((item, idx) => (<li key={idx} className="flex items-center gap-3 group/item"><span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${stack.color} group-hover/item:scale-150 transition-all`}></span><span className="text-sm font-bold opacity-40 group-hover:opacity-100 group-hover:text-white transition-all tracking-tight">{item}</span></li>))}</ul>
                </div>
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-white/0 group-hover:border-white/10 transition-all rounded-br-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SELECTED PROJECTS */}
      <section id="projects" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3"><div className="h-[2px] w-8 bg-cyan-500"></div><span className="text-cyan-500 font-black text-[10px] tracking-[0.4em] uppercase">Portfolio</span></div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Works</span></h2>
          </div>
          <p className="text-sm opacity-40 max-w-xs font-medium leading-relaxed italic border-l border-white/10 pl-6">Focused on building intelligent systems that bridge the gap between complex AI and user-centric design.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {[{ id: "01", title: "AI Resume Matcher", tag: "NLP + Machine Learning", desc: "Analyzes resumes using NLP, generates ATS scores, extracts skills and suggests improvements for better candidate matching.", stack: ["React", "Node.js", "Python", "NLP"], color: "cyan", glow: "rgba(6, 182, 212, 0.15)" }, { id: "02", title: "Trade Pulse AI", tag: "FinTech + Data Viz", desc: "High-performance trading dashboard with real-time market data, interactive live charts and ML-based trend analysis.", stack: ["React", "FastAPI", "Tailwind", "ML"], color: "emerald", glow: "rgba(16, 185, 129, 0.15)" }].map((project, i) => (
            <div key={i} className="group relative p-10 md:p-14 bg-[#0a0f1e] border border-white/5 rounded-[4rem] transition-all duration-700 hover:border-white/20 hover:-translate-y-3 overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: project.glow }}></div>
              <div className="absolute top-10 right-14 text-6xl font-black opacity-5 group-hover:opacity-10 transition-opacity italic">{project.id}</div>
              <div className="relative z-10 space-y-8">
                <div className="space-y-4"><span className={`inline-block px-4 py-1.5 rounded-full bg-${project.color}-500/10 border border-${project.color}-500/20 text-${project.color}-400 font-black text-[9px] tracking-[0.2em] uppercase`}>{project.tag}</span><h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">{project.title}</h3></div>
                <p className="opacity-50 text-base md:text-lg leading-relaxed font-medium max-w-md">{project.desc}</p>
                <div className="pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-3 mb-10">{project.stack.map(tag => (<span key={tag} className="px-4 py-2 bg-white/5 rounded-2xl text-[10px] font-bold border border-white/10 uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{tag}</span>))}</div>
                  <a href="#" className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase group/link">View Case Study <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-cyan-500 group-hover/link:text-white transition-all">↗</span></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-10 md:p-16 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-2xl text-center relative z-10 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic leading-none">Let's <span className="text-cyan-500">Connect</span> 🚀</h2>
          <div className="space-y-6 mb-12">
            <a href="mailto:yadavabhinendra815@gmail.com" className="group block text-xl md:text-3xl font-black text-white hover:text-cyan-400 transition-all break-words">yadavabhinendra815@gmail.com<div className="h-0.5 w-0 group-hover:w-1/3 bg-cyan-500 transition-all duration-500 mx-auto mt-2 rounded-full"></div></a>
            <div className="inline-block"><p className="text-xl font-black bg-white/5 px-8 py-3 rounded-xl border border-white/10 text-emerald-400">📱 +91 9696173189</p></div>
          </div>
          <div className="flex justify-center flex-wrap gap-10 md:gap-16 pt-12 border-t border-white/5">
            <a href="https://github.com/Abhinendra-yadav" target="_blank" className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/40 group-hover:bg-white/10 transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8 text-white"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></div>
              <span className="font-black text-[15px] tracking-[0.3em] opacity-40 group-hover:opacity-100 uppercase">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/abhinendra-yadav/" target="_blank" className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#0077B5]/10 border border-[#0077B5]/30 group-hover:bg-[#0077B5] transition-all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8 text-[#0077B5] group-hover:text-white transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></div>
              <span className="font-black text-[15px] tracking-[0.3em] opacity-40 group-hover:opacity-100 uppercase text-[#0077B5]">LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/Abhinendra_yadav/" target="_blank" className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#FFA116]/10 border border-[#FFA116]/30 group-hover:bg-[#FFA116] transition-all"><svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-[#FFA116] group-hover:text-white transition-colors"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.71 9.71a1.375 1.375 0 0 0 0 1.94l6.001 6.001a1.375 1.375 0 0 0 1.94 0l9.71-9.71a1.375 1.375 0 0 0 0-1.94L14.444.414A1.374 1.374 0 0 0 13.483 0zM4.774 10.581L13.483 1.87l5.626 5.626L10.4 16.207l-5.626-5.626zM5.508 14.162a1.375 1.375 0 0 0 0 1.94l3.183 3.183a1.375 1.375 0 0 0 1.94 0l3.183-3.183a1.375 1.375 0 0 0-1.94-1.94l-2.213 2.213-2.213-2.213a1.375 1.375 0 0 0-1.94 0z"/></svg></div>
              <span className="font-black text-[15px] tracking-[0.3em] opacity-40 group-hover:opacity-100 uppercase text-[#FFA116]">LeetCode</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 text-[15px] font-black tracking-[1.0em] uppercase border-t border-white/5">Designed for Excellence &copy; 2026 Abhinendra Yadav</footer>
    </div>
  );
}