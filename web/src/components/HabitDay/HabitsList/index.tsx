import { Check } from 'phosphor-react';
import * as CheckBox from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import dayjs from 'dayjs';

interface HabitListProps{
  date: Date;
  onCompletedChange:(completed:number)=>void
}
interface HabitsInfo {
  posableHabits: {
    id: string;
    title: string;
    created_at: string
  }[];
  completedHabits: string[];
}

export const HabitList = ({ date, onCompletedChange }: HabitListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()



  useEffect(() => {
    getList(date)
  }, [])

  const getList = async (date:Date) => {
   const response = await api.get('day', {
     params: {
          date:date.toISOString()
      }
   })

    setHabitsInfo(response.data)
  }

  const handleToggleHabit = async (habit_id:string) => {
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habit_id)
    await api.patch(`habits/${habit_id}/toggle`)

    let completedHabits: string[] = []
    if (isHabitAlreadyCompleted) {
      //remover da lista
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habit_id)
    } else {
      //adicionar na lista
      completedHabits = [...habitsInfo!.completedHabits, habit_id]
    }
    setHabitsInfo({ posableHabits: habitsInfo!.posableHabits, completedHabits })

    onCompletedChange(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())




    return(
      <div className="flex flex-col gap-3 mt-6">
        {habitsInfo?.posableHabits.map((habit) => (
          <CheckBox.Root
            className='flex items-center gap-3 group disabled:hover:cursor-not-allowed disabled:hover:bg-zinc-800/30 hover:transition-colors'
            onCheckedChange={() => handleToggleHabit(habit.id)}
            key={habit.id}
            disabled={isDateInPast}
            checked={habitsInfo.completedHabits.includes(habit.id)}
          >
            <div
              className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'
            >
              <CheckBox.Indicator

              >
                <Check size={20} className="text-green-800" weight='bold' />
              </CheckBox.Indicator>
            </div>
            <span className='font-semibold text-xl text-zinc-300 leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500'>
              {habit.title}
            </span>
          </CheckBox.Root>
        ))}


      </div>
    );
}
