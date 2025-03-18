import { useAnotherContext, useAppContext } from "./AppContext";
import { Child } from "./ChildComponent";
import {Parent} from "./ParentComponent";

export default function Page() {

    const { name, setName, height, setHeight } = useAppContext();
    const { age, setAge } = useAnotherContext();

    console.log('rendering page');
    return (
        <>
            <Parent setName={setName} setAge={setAge}  setHeight={setHeight} />
            <Child name={name} age={age} height={height} />
        </>
    )
}