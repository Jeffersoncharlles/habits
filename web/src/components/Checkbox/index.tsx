import * as CheckBox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckBoxProps{
  title: string
  checked?: boolean
  onChecked:()=>void
}

export const Checkbox = ({title,checked=false,onChecked }: CheckBoxProps) => {


    return(
      <CheckBox.Root
        className='flex items-center gap-3 group'
        checked={checked}
        onCheckedChange={onChecked}
      >
        <div
          className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'
        >
          <CheckBox.Indicator

          >
            <Check size={20} className="text-green-800" weight='bold' />
          </CheckBox.Indicator>
        </div>
        <span className='font-semibold text-xl text-zinc-300 leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500'>{title}</span>
      </CheckBox.Root>
    );
}
