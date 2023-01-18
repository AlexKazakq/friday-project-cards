export const dateFormatUtils = (data: string) => {
  const newData = data.slice(0, 10)

  return newData.split('-').reverse().join('.')
}
