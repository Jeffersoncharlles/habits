import { TouchableOpacity, View,Dimensions } from "react-native";

interface HabitDayProps{

}
const WEEK_DAYS = 7; //por dia so 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5; // espaçamento lateral (cada lado) / 5 que e o espaçamento dos quadrados
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5) //tamanho de cada um //pegando tamanho da tela e dividindo por quantos

export const HabitDay = ({ }: HabitDayProps) => {


    return(
      <TouchableOpacity
        className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1"
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
      />
    );
}
