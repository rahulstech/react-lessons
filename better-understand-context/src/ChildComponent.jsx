import { memo } from "react";
import { useAnotherContext, useAppContext } from "./AppContext";

export const Child = memo(({ age, name, height }) => {

    // const { name } = useAppContext();
    // const { age } = useAnotherContext();

    console.log('rendering child');
    return (
        <p>The name = {name} and age { age } height={height} </p>
    )
})