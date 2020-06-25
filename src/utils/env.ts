export const env = (key: string, defaultValue: string | null = null): string | null => {
  return process.env[key] ?? defaultValue
}
