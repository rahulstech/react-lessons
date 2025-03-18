import { memo, useCallback, useMemo, useRef, useState } from "react";
import { useAnotherContext, useAppContext } from "./AppContext";

// when a component is wrapped in React.memo then the component will be re-rendered only when one of its props changes
export const Parent = memo(({ setName, setAge, setHeight }) => {
    // const {  name } = useAppContext();
    // const {  age } = useAnotherContext();

    const refName = useRef();
    const refAge = useRef();
    const refHeight = useRef();

    // const [nameState, setNameState] = useState(name);
    // const [ageState, setAgeState] = useState(age);

    const handleClick = () => {
        // console.log('name ', name, ' newName ', nameState, ' age ',age, ' newAge ' ,ageState)
        // setName(nameState || name);
        // setAge(ageState || age);

        // setName(refName.current.value || name);
        // setAge(refAge.current.value || age);

        setName(refName.current.value );
        setAge(refAge.current.value );
        setHeight(refHeight.current.value );
    }

    const setters = useMemo(() => ({ setName, setAge }), [setName, setAge]);

    console.log('rendering parent')
    return (
        <>
            <input ref={refName} type="text" placeholder="Name"/>
            <input ref={refAge} type="text" placeholder="Age" />
            <input ref={refHeight} type="text" placeholder="Height" />
            <button onClick={handleClick}>Change Name</button>
        </>
    )
})