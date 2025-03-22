"use client";
import React, { useState } from "react";
import FilePicker, { FilePickerProps } from "./FilePicker";
import Editor from "./Editor";

export default function EditorPage() {
  const [editorContent, setEditorContent] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileHandle, setSelectedFileHandle] = useState<
    FileSystemFileHandle | undefined
  >(undefined);

  const handleFileSelect: FilePickerProps["onFileSelect"] = (
    content,
    fileName,
    fileHandle
  ) => {
    setEditorContent(content);
    setSelectedFileName(fileName);
    setSelectedFileHandle(fileHandle);
  };

  return (
    <>
      <FilePicker onFileSelect={handleFileSelect}></FilePicker>
      <Editor
        content={editorContent}
        onChange={setEditorContent}
        fileName={selectedFileName}
        fileHandle={selectedFileHandle}
      ></Editor>
    </>
  );
}
