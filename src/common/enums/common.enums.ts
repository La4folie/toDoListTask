export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

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
