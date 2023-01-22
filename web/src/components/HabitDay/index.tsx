import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx'
import { Checkbox } from '../Checkbox';
import { ProgressBar } from '../ProgressBar';

interface HabitDayProps{
  completed:number
  amount:number
}

export const HabitDay = ({ amount, completed }: HabitDayProps) => {
  const completedPercentage = Math.round((completed / amount) * 100)

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
            <Checkbox title='Beber 2lt aguá'/>
            <Checkbox title='Beber 2lt aguá'/>
            <Checkbox title='Beber 2lt aguá'/>

          </div>
          <Popover.Arrow className='fill-zinc-900' height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    );
}
