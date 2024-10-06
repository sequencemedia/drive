/**
 * Delete a JSON file from Google Drive
 */
export default function deleteFromDrive (
  fileId: string,
  keyFile: KeyFileType,
  scopes?: string[]
): Promise<void>
