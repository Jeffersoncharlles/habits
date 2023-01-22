import { Check } from "phosphor-react";
import { useState } from "react";
import * as CheckBox from '@radix-ui/react-checkbox';
// import { Checkbox } from "../Checkbox";

interface NewHabitForm {

}

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
export const NewHabitForm = ({ }: NewHabitForm) => {
  const [checked, setChecked] = useState('indeterminate');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title,setTitle] = useState('')

  const handleCreateNewHabit = (e:React.FormEvent) => {
    e.preventDefault()
    console.log(weekDays)
  }

  const handleToggleWeekDay = (weekDay:number) => {
    if (weekDays.includes(weekDay)) {
      setWeekDays(prevState => prevState.filter(day => day !== weekDay))
    } else {
      setWeekDays(prevState => [...prevState, weekDay])
    }
  }

    return(
      <form className="w-full flex flex-col mt-6" onSubmit={handleCreateNewHabit}>
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual seu comprometimento?
        </label>
        <input
          type="text"
          id="title"
          placeholder="ex.: Execícios,dormir bem, etc..."
          autoFocus
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-zinc-300 placeholder:text-zinc-500"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <label htmlFor="" className="font-semibold leading-tight mt-4">
          Qual a recorrência?
        </label>
        <div className="flex flex-col gap-2 mt-4">
          {availableWeekDays.map((day, i) => (
            <CheckBox.Root
              key={`${day}-${i}`}
              className='flex items-center gap-3 group'
              onCheckedChange={() => handleToggleWeekDay(i)}
            >
              <div
                className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'
              >
                <CheckBox.Indicator

                >
                  <Check size={20} className="text-green-800" weight='bold' />
                </CheckBox.Indicator>
              </div>
              <span className='font-semibold text-base text-zinc-300 leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500'>{day}</span>
            </CheckBox.Root>
          ))}

        </div>
        <button className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-700 justify-center transition-colors hover:bg-green-600">
          <Check size={20} weight="bold" />
          Confirmar
        </button>

      </form>
    );
}
