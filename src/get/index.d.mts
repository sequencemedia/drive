/**
 * Get a JSON file from Google Drive
 */
export default function getFromDrive (
  fileId: string,
  keyFile: KeyFileType,
  scopes?: string[]
): Promise<FileType>
