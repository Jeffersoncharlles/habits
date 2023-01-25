import { Check } from 'phosphor-react';
import * as CheckBox from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import dayjs from 'dayjs';

interface HabitListProps{
  date:Date
}
interface HabitsInfo {
  posableHabits: {
    id: string;
    title: string;
    created_at: string
  }[];
  completedHabits: string[];
}

export const HabitList = ({ date }: HabitListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  const getList = async (date:Date) => {
   const response = await api.get('day', {
     params: {
          date:date.toISOString()
      }
   })

    setHabitsInfo(response.data)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  useEffect(() => {
    getList(date)
  }, [])

    return(
      <div className="flex flex-col gap-3 mt-6">
        {habitsInfo?.posableHabits.map((habit) => (
          <CheckBox.Root
            className='flex items-center gap-3 group'
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
