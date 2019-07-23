export const parseUsername = (args: string[]) => {
  let end = 1
  let username = args[0]

  if (username.startsWith('"') || username.startsWith('“') || username.startsWith('”')) {
    while (!(username.endsWith('"') || username.endsWith('“') || username.endsWith('”')) && end < args.length - 1) {
      username += ' ' + args[end]
      end++
    }
    username = username.replace(/"/g, '').replace(/“/g, '').replace(/”/g, '')
  }

  return { username, end: end - 1 }
}
