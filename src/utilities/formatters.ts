const playtime = (seconds: number, timeView: string = 'days'): string => {
  let hours: number
  let minutes: number
  let days: number
  let timeStr: string = ''

  minutes = Math.floor(seconds / 60)
  hours = Math.floor(minutes / 60)
  days = Math.floor(hours / 24)

  minutes %= 60

  if (timeView === 'days') {
    hours %= 24
    if (days) timeStr += days + 'd '
  }

  if (hours) timeStr += hours + 'h '
  if (minutes) timeStr += minutes + 'm'

  return timeStr.length > 0 ? timeStr : 'N/A'
}

const formatListField = (title: string , items: { key: string, value: any }[]) => {
  const rows = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    rows.push(`**${item.key}**: ${item.value}${i < items.length ? '\n' : ''}`)
  }

  return {
    name: title,
    inline: true,
    value: rows.join('')
  }
}

export { playtime, formatListField }
