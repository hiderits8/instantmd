export {};

declare global {
  interface Window {
    showDirectoryPicker(options?: any): Promise<FileSystemDirectoryHandle>;
  }

  interface FileSystemDirectoryHandle extends FileSystemHandle {
    values(): AsyncIterableIterator<FileSystemHandle>;
  }
}