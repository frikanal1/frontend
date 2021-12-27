export const getPreciseHours = (date: Date) => {
  const preciseSeconds = date.getSeconds() + date.getMilliseconds() / 1000
  const preciseMinutes = date.getMinutes() + preciseSeconds / 60
  const preciseHours = date.getHours() + preciseMinutes / 60

  return preciseHours
}
