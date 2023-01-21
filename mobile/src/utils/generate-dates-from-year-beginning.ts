import dayjs from "dayjs"

export const generateDatesFromYearBeginning = () => {
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheYear

  while (compareDate.isBefore(today)) {
    //enquanto for anterior a hoje
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')//add um dia ao compare ate o dia atual
  }

  return dates
}
