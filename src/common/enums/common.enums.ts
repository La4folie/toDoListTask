export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
}

export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10,
} as const
