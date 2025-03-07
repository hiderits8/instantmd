"use client"; 
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EditorPage() {
  // 入力テキストを保持するステート
  const [text, setText] = useState<string>("### Hello Markdown!");

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      {/* 入力用テキストエリア */}
      <div style={{ flex: 1 }}>
        <h2>Markdown Editor</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={20}
          style={{ width: "100%", fontFamily: "inherit" }}
        />
      </div>

      {/* リアルタイムプレビュー */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "0.5rem" }}>
        <h2>Preview</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}