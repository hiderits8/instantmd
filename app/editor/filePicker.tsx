"use client";
import React, {useState} from "react";

export default function FilePicker() {
    const [fileHandles, setFileHandles] = useState<FileSystemFileHandle[]>([]);
    const [dirHandles, setDirHandles] = useState<FileSystemDirectoryHandle[]>([]);
    const [fileContent, setFileContent] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");
    const [selectedDirName, setSelectedDirName] = useState("");

    const pickFolder = async() => {
        try {
            const fHandles :FileSystemFileHandle[] = [];
            const dHandles :FileSystemDirectoryHandle[] = [];
            const dirHandle = await window.showDirectoryPicker();
            dHandles.push(dirHandle);
        
        for await (const entry of dirHandle.values()) {
            if(entry.kind === "file") {
                fHandles.push(entry as FileSystemFileHandle);
            } else if (entry.kind === "directory") {
                dHandles.push(entry as FileSystemDirectoryHandle);
            }
        }
        setFileHandles(fHandles);
        setDirHandles(dHandles);
        setSelectedDirName(dirHandle.name);
        } catch (error) {
            console.error("フォルダ選択エラー", error);
        }
    };

    const openFolder = async(dirHandle :FileSystemDirectoryHandle) => {
        try {
            const fHandles :FileSystemFileHandle[] = [];
            const dHandles :FileSystemDirectoryHandle[] = [];

            for await (const entry of dirHandle.values()) {
                if(entry.kind === "file") {
                    fHandles.push(entry as FileSystemFileHandle);
                } else if (entry.kind === "directory") {
                    dHandles.push(entry as FileSystemDirectoryHandle);
                }
            }

            const nextFileHandles = [...fileHandles];
            const nextDirHandles = [...dirHandles];
            nextFileHandles.concat(fHandles);
            nextDirHandles.concat(dHandles);
            setFileHandles(nextFileHandles);
            setDirHandles(nextDirHandles);
        } catch (error) {
            console.error("フォルダ読み込みエラー", error);
        }
    }
    
    const openFile = async(fileHandle :FileSystemFileHandle) => {
        try {
            const file = await fileHandle.getFile();
            const content = await file.text();
            setFileContent(content);
            setSelectedFileName(fileHandle.name);
        } catch (error) {
            console.error("ファイル読み込みエラー", error);
        }
    }

    return (
        <div>
            {selectedDirName === "" ? (
                <button onClick={pickFolder}>
                    フォルダを選択する
                </button>
            ) : (
                <>
                <div>
                    {selectedDirName}
                </div>
                {dirHandles.map(dh => (
                    <div key={dh.name} onClick={() => openFolder(dh)}>
                        {dh.name}
                    </div>
                ))}
                {fileHandles.map(fh => (
                    <div key={fh.name} onClick={() => openFile(fh)}>
                        {fh.name}
                    </div>
                ))}
                </>
            )} 
        </div>
    );
}