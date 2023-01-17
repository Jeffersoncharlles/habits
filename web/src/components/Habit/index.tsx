interface HabitProps{
  completed:number
}

export const Habit = ({completed }:HabitProps) => {

    return(
        <p>
        {completed}
        </p>
    );
}
