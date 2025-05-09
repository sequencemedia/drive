/**
 *  Create a JSON file in Google Drive
 */
export default function createInDrive (
  driveId: string,
  fileName: string,
  fileData: Buffer,
  keyFile: KeyFileType,
  scopes?: string[]
): Promise<FileType>
