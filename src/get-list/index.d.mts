/**
 *  Get a list of the JSON files from Google Drive
 */
export default function getListFromDrive (
  driveId: string,
  keyFile: KeyFileType,
  scopes?: string[]
): Promise<FileListType>
