"use client";
import { useState } from "react";

export default function Home() {

    const [mode, setMode] = useState("summarize");
    const modes =[ {
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
    }
    
  ]

  const [tone, setTone] = useState("simple");
  const [targetLanguage, setTargetLanguage] = useState("tamil");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  function loadSample() {
    setInputText("This is a sample text that you can use to test the AI Text Transformer. You can summarize, rewrite, or translate this text using the options provided. Feel free to experiment with different tones and target languages to see how the output changes. Enjoy using the AI Text Transformer!");
  }

  function clearInput() {
    setInputText("");
    setOutputText("");
  }

  

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Text Transformer
          </h1>
          <p className="mt-2 text-zinc-300">
            Summarize, rewrite, and translate
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
          {/* Mode buttons + actions */}
          <div className="flex flex-wrap items-center gap-2">

          {
            modes.map((eachMode) => (
              <button 
                key={eachMode.key}
                value={eachMode.key}
                onClick={(e) => setMode(eachMode.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === eachMode.key ? "bg-emerald-400 text-zinc-950" : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"}`}
              >
                {eachMode.label} 
                </button>
            ))
          }

            <div className="ml-auto flex items-center gap-2">
              <button 
              onClick={loadSample}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Load sample
              </button>
              <button 
              onClick={clearInput}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Clear
              </button>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {/* Left: Input */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-300">Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here…"
                className="h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />

              {/* Tone dropdown (for Rewrite mode) */}
              {mode === "rewrite" && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Tone</span>
                <select 
                onChange={(e) => setTone(e.target.value)}
                value={tone}
                className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100">
                  <option className="bg-zinc-900 text-white">Simple</option>
                  <option className="bg-zinc-900 text-white">Professional</option>
                  <option className="bg-zinc-900 text-white">Friendly</option>
                  <option className="bg-zinc-900 text-white">Funny</option>
                </select>
              </div>
              )}

              {/* Target language (for Translate mode) */}
              {mode === "translate" && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Target</span>
                <select 
                onChange={(e) => setTargetLanguage(e.target.value)}
                value={targetLanguage}
                className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100">
                  <option className="bg-zinc-900 text-white">Tamil</option>
                  <option className="bg-zinc-900 text-white">English</option>
                </select>
              </div>
              )}


              {/* Transform button */}
              <button className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">
                Transform
              </button>
            </div>

            {/* Right: Output */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-300">Output</label>
              <div className="h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100">
                <span className="text-zinc-500">
                  Your transformed text will appear here.
                </span>
              </div>
              <button className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Copy
              </button>
              <p className="text-xs text-zinc-500">
                Tip: Use “Load sample” for quick demos.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-zinc-500">
          
        </footer>
      </div>
    </main>
  );
}
