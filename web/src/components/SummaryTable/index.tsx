import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";
import { HabitDay } from "../HabitDay";

interface SummaryTable {

}

export const SummaryTable = ({ }: SummaryTable) => {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDates = generateDatesFromYearBeginning()
  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountOfDaysFill = minimumSummaryDatesSize - summaryDates.length //min - dates current

    return(
      <section className="w-full flex">
        <header className="grid grid-rows-7 grid-flow-row gap-3">
          {weekDays.map((day,index) => (
            <div key={`${day}-${index}`} className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold">
              {day}
            </div>
          ))}
        </header>
        <main className="grid grid-rows-7 grid-flow-col gap-3">
          {summaryDates.map((date,index) => (
            <HabitDay key={String(date)} />
          ))}

          {amountOfDaysFill > 0 && Array.from({ length: amountOfDaysFill }).map((_,i) => {
            //days no exists disable
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })}

        </main>
      </section>
    );
}
