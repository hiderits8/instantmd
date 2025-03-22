"use client";

import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface EditorProps {
  content: string;
  onChange: (newContent: string) => void;
  fileName?: string;
  fileHandle?: FileSystemFileHandle;
  autoSaveInterval?: number;
}

export default function Editor({
  content,
  onChange,
  fileName,
  fileHandle,
  autoSaveInterval = 1000,
}: EditorProps) {
  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const saveFile = async () => {
    if (!fileHandle) {
      console.warn("保存するファイルが選択されていません");
      return;
    }
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
    } catch (error) {
      console.error("ファイル保存エラー", error);
    }
  };

  useEffect(() => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }
    autoSaveTimeout.current = setInterval(() => {
      saveFile();
    }, autoSaveInterval);

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [content, autoSaveInterval]);

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      {/* 入力用テキストエリア */}
      <div style={{ flex: 1 }}>
        <h2>{fileName ? fileName : "New Markdown"}</h2>
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={30}
          style={{ width: "100%", fontFamily: "inherit" }}
        />
      </div>

      {/* リアルタイムプレビュー */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "0.5rem" }}>
        <h2>Preview:{fileName ? fileName : "New Markdown"}</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
