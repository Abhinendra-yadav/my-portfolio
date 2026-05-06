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

    const stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.8,
      speed: Math.random() * 0.4 + 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = darkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(15, 23, 42, 0.6)";
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;
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

      {/* HOME SECTION */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-10 overflow-hidden relative">
        <div className="max-w-[95vw] md:max-w-7xl flex flex-col items-center w-full relative z-10">
          <div className="relative mb-10 md:mb-14 group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-1000"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2.5 backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:border-cyan-500/50">
              <img src="my-photo.png" alt="Abhinendra Yadav" className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div className="hidden w-full h-full rounded-full bg-slate-800 items-center justify-center font-black text-7xl text-cyan-500 tracking-tighter uppercase">AY</div>
            </div>
          </div>
          <p className="text-cyan-400 font-black tracking-[0.4em] text-[11px] md:text-[14px] uppercase mb-6 block drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
            Full Stack Developer | AI Enthusiast
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-10 max-w-[95vw]">
            HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-400 to-blue-600 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] uppercase">ABHINENDRA YADAV.👋</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-4">
            <a href="#projects" className="px-10 py-4 bg-cyan-500 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]">View Projects</a>
            <a href="#" className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase transition-all hover:scale-105 border border-white/10 shadow-[0_0_20px_rgba(79,70,229,0.3)]">Download Resume</a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-9 md:px-30 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
             <div className="h-[3px] w-12 bg-cyan-500"></div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-xl opacity-80 leading-relaxed font-medium">I am a B.Tech student and a passionate developer with a strong interest in AI and modern web technologies. I enjoy building real-world projects that combine frontend design, backend logic, and intelligent systems.</p>
              <p className="text-lg opacity-60 italic border-l-4 border-cyan-500 pl-6">"My goal is to create impactful applications that solve real problems and provide great user experiences."</p>
            </div>
            <div className="p-10 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative overflow-hidden">
               <h4 className="text-cyan-400 font-bold uppercase text-[18px] tracking-widest mb-8">Personal Highlights</h4>
               <div className="space-y-4 text-sm font-bold opacity-80">
                  <p>✓ Top 150 Rank in iOS Bootcamp</p>
                  <p>✓ Active Competitive Programmer</p>
                  
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-32 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-5xl font-black mb-20 tracking-tighter uppercase">Technical Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {title: "Frontend", items: ["HTML/CSS/JS", "React.js", "Tailwind CSS", "Bootstrap"], color: "from-cyan-400 to-blue-500"},
              {title: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs"], color: "from-emerald-400 to-teal-500"},
              {title: "Languages", items: ["Java (Core)", "Python", "JavaScript", "C++"], color: "from-blue-500 to-indigo-600"},
              {title: "Cloud & Competitive", items: ["Git/GitHub", "LeetCode/GFG", "AWS Basics", "MongoDB"], color: "from-purple-500 to-pink-500"}
            ].map((skill, i) => (
              <div key={i} className="group p-8 border border-white/5 bg-[#020617]/90 rounded-[2.5rem] hover:border-white/20 transition-all">
                <div className={`h-1.5 w-16 bg-gradient-to-r ${skill.color} mb-8 rounded-full`}></div>
                <h3 className="text-white font-black text-xs tracking-widest uppercase mb-6">{skill.title}</h3>
                <ul className="space-y-3 text-sm opacity-60 font-semibold">{skill.items.map(item => <li key={item}>› {item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-32 px-9 md:px-30 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter uppercase">PROJECTS</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { title: "AI Resume Matcher", tag: "NLP + ML", desc: "Analyzes resumes using NLP, generates ATS scores, extracts skills and suggests improvements.", stack: ["React", "Node", "NLP"], color: "cyan" },
            { title: "Trade Pulse AI", tag: "FinTech + Data Viz", desc: "Trading dashboard with real-time market data, live charts and ML-based trend analysis.", stack: ["React", "FastAPI", "ML"], color: "emerald" }
          ].map((project, i) => (
            <div key={i} className={`p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:border-${project.color}-500/50 transition-all group relative overflow-hidden`}>
              <span className={`text-${project.color}-500 font-bold text-[10px] tracking-widest uppercase`}>{project.tag}</span>
              <h3 className="text-3xl font-black mt-2 mb-4 uppercase">{project.title}</h3>
              <p className="opacity-50 text-sm mb-8 leading-relaxed font-medium">{project.desc}</p>
              <div className="flex flex-wrap gap-2">{project.stack.map(tag => <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-bold border border-white/10 uppercase">{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

     {/* CONTACT SECTION - Optimized Spacing & Brand Icons */}
<section id="contact" className="py-24 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
  <div className="max-w-4xl mx-auto p-10 md:p-16 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-2xl text-center relative z-10 shadow-2xl">
    
    {/* Balanced Heading */}
    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic leading-none">
      Let's <span className="text-cyan-500">Connect</span> 🚀
    </h2>
    
    <div className="space-y-6 mb-12">
      <a href="mailto:yadavabhinendra815@gmail.com" className="group block text-xl md:text-3xl font-black text-white hover:text-cyan-400 transition-all break-words">
        yadavabhinendra815@gmail.com
        <div className="h-0.5 w-0 group-hover:w-1/3 bg-cyan-500 transition-all duration-500 mx-auto mt-2 rounded-full"></div>
      </a>
      <div className="inline-block">
        <p className="text-xl font-black bg-white/5 px-8 py-3 rounded-xl border border-white/10 text-emerald-400">
          📱 +91 9696173189
        </p>
      </div>
    </div>

    {/* BRAND ICONS - Official Look */}
    <div className="flex justify-center flex-wrap gap-10 md:gap-16 pt-12 border-t border-white/5">
      
      {/* GitHub Official Style */}
      <a href="https://github.com/Abhinendra-yadav" target="_blank" className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/40 group-hover:bg-white/10 transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8 text-white"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </div>
        <span className="font-black text-[15px] tracking-[0.3em] opacity-40 group-hover:opacity-100 uppercase">GitHub</span>
      </a>

      {/* LinkedIn Official Style */}
      <a href="https://www.linkedin.com/in/abhinendra-yadav/" target="_blank" className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#0077B5]/10 border border-[#0077B5]/30 group-hover:bg-[#0077B5] transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8 text-[#0077B5] group-hover:text-white transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </div>
        <span className="font-black text-[15px] tracking-[0.3em] opacity-40 group-hover:opacity-100 uppercase text-[#0077B5]">LinkedIn</span>
      </a>

      {/* LeetCode Official Style */}
      <a href="https://leetcode.com/u/Abhinendra-yadav/" target="_blank" className="group flex flex-col items-center gap-3 transition-all hover:-translate-y-2">
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#FFA116]/10 border border-[#FFA116]/30 group-hover:bg-[#FFA116] transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-[#FFA116] group-hover:text-white transition-colors"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.71 9.71a1.375 1.375 0 0 0 0 1.94l6.001 6.001a1.375 1.375 0 0 0 1.94 0l9.71-9.71a1.375 1.375 0 0 0 0-1.94L14.444.414A1.374 1.374 0 0 0 13.483 0zM4.774 10.581L13.483 1.87l5.626 5.626L10.4 16.207l-5.626-5.626zM5.508 14.162a1.375 1.375 0 0 0 0 1.94l3.183 3.183a1.375 1.375 0 0 0 1.94 0l3.183-3.183a1.375 1.375 0 0 0-1.94-1.94l-2.213 2.213-2.213-2.213a1.375 1.375 0 0 0-1.94 0z"/></svg>
        </div>
        <span className="font-black text-[15px] tracking-[0.3em] opacity-40 group-hover:opacity-100 uppercase text-[#FFA116]">LeetCode</span>
      </a>

    </div>
  </div>
</section>

      <footer className="py-20 text-center opacity-30 text-[15px] font-black tracking-[1.0em] uppercase border-t border-white/5">
        Designed for Excellence &copy; 2026 Abhinendra Yadav
      </footer>
    </div>
  );
}