import type { drive_v3 as DriveV3 } from 'googleapis'

declare global {
  type KeyFileType = Record<PropertyKey, string | undefined>

  type FileType = DriveV3.Schema$File

  type FileListType = Array<{ id: string, name: string }>
}
