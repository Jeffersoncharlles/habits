import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, View,Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../../utils/generate-progress-percetage";

interface HabitDayProps extends TouchableOpacityProps{
  amount?: number;
  complected?: number;
  date:Date
}
const WEEK_DAYS = 7; //por dia so 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5; // espaçamento lateral (cada lado) / 5 que e o espaçamento dos quadrados
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5) //tamanho de cada um //pegando tamanho da tela e dividindo por quantos

export const HabitDay = ({ date, amount = 0, complected = 0, ...rest }: HabitDayProps) => {
  const accomplishedPercentage = amount > 0 ? generateProgressPercentage(amount, complected) : 0;
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay =dayjs(date).isSame(today)


    return(
      <TouchableOpacity
        className={clsx(" rounded-lg border-2 m-1", {
          'bg-zinc-900  border-zinc-800': accomplishedPercentage === 0,
          'bg-violet-900 border-violet-700': accomplishedPercentage > 0 && accomplishedPercentage < 20,
          'bg-violet-800 border-violet-600': accomplishedPercentage >= 20 && accomplishedPercentage < 40,
          'bg-violet-700 border-violet-500': accomplishedPercentage >= 40 && accomplishedPercentage < 60,
          'bg-violet-600 border-violet-500': accomplishedPercentage >= 60 && accomplishedPercentage < 80,
          'bg-violet-500 border-violet-400': accomplishedPercentage >= 80,
          'border-white/70 border-2':isCurrentDay
        })}
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
        activeOpacity={0.7}
        {...rest}
      />
    );
}
