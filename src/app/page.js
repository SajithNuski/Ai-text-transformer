"use client";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("summarize");
  const modes = [
    {
      key: "summarize",
      label: "Summarize",
    },
    {
      key: "rewrite",
      label: "Rewrite",
    },
    {
      key: "translate",
      label: "Translate",
    },
  ];

  const [tone, setTone] = useState("simple");
  const [targetLanguage, setTargetLanguage] = useState("tamil");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function loadSample() {
    setInputText(
      "This is a sample text that you can use to test the AI Text Transformer. You can summarize, rewrite, or translate this text using the options provided. Feel free to experiment with different tones and target languages to see how the output changes. Enjoy using the AI Text Transformer!",
    );
  }

  function clearInput() {
    setInputText("");
    setOutputText("");
  }

  async function onCopy() {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
  }

  async function transform() {
    setLoading(true);
    setOutputText("");

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          tone: mode === "rewrite" ? tone : undefined,
          targetLanguage: mode === "translate" ? targetLanguage : undefined,
          inputText,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "An error occurred while processing your request.",
        );
      }

      setOutputText(data.outputText);
    } catch (error) {
      console.error("Error:", error);
      setOutputText("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden flex flex-col items-center justify-start py-12 md:py-20 px-4">
      {/* Background layer 1: Base radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a16_0%,#050506_60%,#020203_100%)] z-0 pointer-events-none" />

      {/* Background layer 2: Grid Overlay */}
      <div className="absolute inset-0 bg-grid-overlay opacity-30 z-0 pointer-events-none" />

      {/* Background layer 3: Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.012] pointer-events-none mix-blend-overlay z-0" />

      {/* Background layer 4: Floating glow blobs */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#5E6AD2]/12 blur-[130px] pointer-events-none z-0 animate-float-1" />
      <div className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0 animate-float-2" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[110px] pointer-events-none z-0" />

      <div className="relative w-full max-w-4xl z-10 flex flex-col flex-grow">
        {/* Header */}
        <header className="mb-10 text-center md:text-left select-none max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
            AI Text Transformer
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#8A8F98]">
            An elegant processing tool to summarize, rewrite, and translate text using advanced intelligence.
          </p>
        </header>

        {/* Card Panel with Spotlight Effect */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(94, 106, 210, 0.08), transparent 80%), linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`
              : 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)',
          }}
          className="border border-white/[0.06] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.4),0_0_50px_rgba(94,106,210,0.02)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_48px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.05)]"
        >
          {/* Card Top Border Highlight */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#5E6AD2]/30 to-transparent" />

          <div className="p-5 md:p-8 space-y-6">
            {/* Modes row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.06] pb-6">
              <div className="flex flex-wrap gap-2 bg-white/[0.02] p-1 border border-white/[0.04] rounded-lg">
                {modes.map((eachMode) => {
                  const isActive = mode === eachMode.key;
                  return (
                    <button
                      key={eachMode.key}
                      onClick={() => setMode(eachMode.key)}
                      className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${isActive
                        ? "bg-[#5E6AD2] text-white shadow-[0_2px_10px_rgba(94,106,210,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
                        : "bg-transparent text-[#8A8F98] hover:text-white hover:bg-white/[0.03]"
                        }`}
                    >
                      {eachMode.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={loadSample}
                  className="bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.08] border border-white/[0.06] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  Load sample
                </button>
                <button
                  onClick={clearInput}
                  className="bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.08] border border-white/[0.06] px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Main Content Layout Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input section */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-[#8A8F98] font-mono font-medium">Input Stream</label>
                  <span className="text-[10px] text-white/30 font-mono">TEXT_AREA</span>
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your text here…"
                  className="h-64 w-full resize-none rounded-xl border border-white/10 bg-[#0c0c0e] p-4 text-sm text-gray-200 outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]/30 focus:shadow-[0_0_20px_rgba(94,106,210,0.12)] transition-all duration-200 placeholder:text-gray-600"
                />

                {/* Sub controls dropdown wrapper */}
                {mode === "rewrite" && (
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs uppercase tracking-wider text-[#8A8F98] font-mono">Tone:</span>
                    <div className="relative">
                      <select
                        onChange={(e) => setTone(e.target.value)}
                        value={tone}
                        className="appearance-none border border-white/10 bg-[#0c0c0e] text-gray-300 px-4 py-2 pr-8 text-xs rounded-lg focus:outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]/30 cursor-pointer transition-all"
                      >
                        <option className="bg-[#0c0c0e] text-gray-300">Simple</option>
                        <option className="bg-[#0c0c0e] text-gray-300">Professional</option>
                        <option className="bg-[#0c0c0e] text-gray-300">Friendly</option>
                        <option className="bg-[#0c0c0e] text-gray-300">Funny</option>
                      </select>
                      <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-[8px] text-gray-500">
                        ▼
                      </div>
                    </div>
                  </div>
                )}

                {mode === "translate" && (
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-xs uppercase tracking-wider text-[#8A8F98] font-mono">Target:</span>
                    <div className="relative">
                      <select
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        value={targetLanguage}
                        className="appearance-none border border-white/10 bg-[#0c0c0e] text-gray-300 px-4 py-2 pr-8 text-xs rounded-lg focus:outline-none focus:border-[#5E6AD2] focus:ring-1 focus:ring-[#5E6AD2]/30 cursor-pointer transition-all"
                      >
                        <option className="bg-[#0c0c0e] text-gray-300">Tamil</option>
                        <option className="bg-[#0c0c0e] text-gray-300">English</option>
                      </select>
                      <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-[8px] text-gray-500">
                        ▼
                      </div>
                    </div>
                  </div>
                )}

                {/* Transform button */}
                <button
                  onClick={transform}
                  disabled={loading || !inputText.trim()}
                  className={`w-full rounded-xl py-3.5 text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${loading || !inputText.trim()
                    ? "bg-white/[0.02] text-[#8A8F98]/50 border border-white/[0.05] cursor-not-allowed"
                    : "bg-[#5E6AD2] hover:bg-[#6872D9] text-white shadow-[0_4px_12px_rgba(94,106,210,0.35),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(94,106,210,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                    }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing Stream...
                    </span>
                  ) : (
                    "Activate Transform"
                  )}
                </button>
              </div>

              {/* Output section */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-[#8A8F98] font-mono font-medium">Output Stream</label>
                  <span className="text-[10px] text-white/30 font-mono">TRANSMITTED</span>
                </div>

                <div className="h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-[#0c0c0e]/60 p-4 text-sm text-[#EDEDEF]">
                  {loading ? (
                    <div className="space-y-3 select-none">
                      <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-white/5 rounded animate-pulse w-5/6" />
                      <div className="h-4 bg-white/5 rounded animate-pulse w-2/3" />
                      <div className="h-4 bg-white/5 rounded animate-pulse w-4/5" />
                    </div>
                  ) : outputText ? (
                    outputText
                  ) : (
                    <span className="text-gray-600">
                      Your transformed text will appear here.
                    </span>
                  )}
                </div>

                <button
                  onClick={onCopy}
                  disabled={!outputText || loading}
                  className={`w-full rounded-xl border py-3 text-xs md:text-sm uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${!outputText || loading
                    ? "border-white/[0.04] text-[#8A8F98]/30 bg-transparent cursor-not-allowed"
                    : "border-white/10 bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.99] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    }`}
                >
                  Copy Output
                </button>
                <p className="text-[10px] text-[#8A8F98]/70 text-center select-none pt-1">
                  Tip: Use “Load sample” for quick demos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-[#8A8F98]/40 select-none">
          Developed by @sajithNuski
        </footer>
      </div>
    </main>
  );
}
