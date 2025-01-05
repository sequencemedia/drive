export function hasErrorCode ({ code }: {
  code: number | undefined
}): boolean

export function getErrorCode ({ code }: {
  code: number | undefined
}): number | undefined

export function hasErrorMessage ({ message }: {
  message: string | undefined
}): boolean

export function getErrorMessage ({ message }: {
  message: string | undefined
}): string | undefined
