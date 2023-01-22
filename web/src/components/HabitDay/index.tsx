import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'
import * as CheckBox from '@radix-ui/react-checkbox';
import { ProgressBar } from '../ProgressBar';
import { Check } from 'phosphor-react';

interface HabitDayProps{
  date: Date
  completed?:number
  amount?:number
}

export const HabitDay = ({ amount=0, completed=0 ,date}: HabitDayProps) => {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  return (
      <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2  rounded-lg', {
          'bg-zinc-900  border-zinc-800': completedPercentage === 0 ,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
        })}

      />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>Segunda-feira</span>
          <span className='mt-1 font-extrabold leading-tight text-zinc-400 text-3xl'>23/01</span>
          <ProgressBar progress={completedPercentage} />
          <div className="flex flex-col gap-3 mt-6">
            <CheckBox.Root
              className='flex items-center gap-3 group'
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
                beber
              </span>
            </CheckBox.Root>

          </div>
          <Popover.Arrow className='fill-zinc-900' height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    );
}
