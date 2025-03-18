import { useCallback, useMemo, useRef, useState } from "react";
import { AnotherContextProvider, AppContextProvider } from "./AppContext"
import Page from "./PageComponent";


function Button({ onClick }) {
  console.log('render Button');
  return (
    <button onClick={onClick}>Click Me</button>
  )
}

function Display() {
  const [ count, setCount ] = useState(0);

  const numberGenerator = useMemo((cb) => {
    const n = Math.floor(Math.random()*99+1);
    // setTimeout(() => {
    //   cb(n);
    // }, 1500);
    return n;
  },[setCount]);

  const handleClick = () => {
    // console.time('handleClick')
    // numberGenerator(setCount);
    // console.timeEnd('handleClick');

    setCount(numberGenerator);
  };

  console.log('render Display');
  return (
    <>
    <p>{count}</p>
    <Button onClick={handleClick} />
    </>
    
  )
}

function Container() {

  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  const [marks, setMarks] = useState([
    { name: 'Rahul', score: 50 },
    { name: 'Rivu', score: 45 },
    { name: 'Rohan', score: 55 }
  ]);

  // const sorted = useMemo(()=>{
  //   console.log('sorting');
  //   return marks.sort((a,b) => a.score - b.score);
  // },[marks]);

  function addMark() {
    const mark = { name, score: Number(score) };
    setMarks(prevState => ([
      ...prevState, 
      mark
    ]));
    setName('');
    setScore(0);
  }

  console.log('rendering Container');
  return (
    <>
      <input placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Score" type="text" onChange={(e) => setScore(e.target.value)} />
      <button onClick={addMark}>Add Mark</button> 
      <br/>
      <button onClick={()=>setCount(count + 1)}>I am clicked { count }</button>
      <List marks={/*sorted*/ marks } />
    </>
    
  )
}

function List({ marks }) {

  /**
   * useMemo hook is used when a calculation is expensive. for example in this case List may render multiple time but
   * sorting the marks ( the expensive calculation ) is only required when there is any change in marks. i used useMemo
   * with marks as dependency. the hook takes two parameters first the callback which runs the expensive calculation and
   * returns the result. and an array of dependencies. useMemo returns the calculated value. in this case the sorted marks.
   * on each render it checks weather any dependency  changed between two successive renders it any of the dependency changes
   * then the callback is called and recalculated. otherwise the cached value from the latest run of the callback is used. 
   * thus the useMemo callback is called atleast one time i.e. during first render.
   * NOTE: if i don't mark as dependency then sorted will never change; it will always give the same value during the first
   * run. so choose the depndecies properly.  
   */
  const sorted = useMemo(()=>{
    console.log('sorting');
    return marks.sort((a,b) => a.score - b.score);
  },[marks]);

  console.log('rendering List');
  return (
    <>
    {
      sorted.map(item => (
        <p >{item.name} scored {item.score}</p>
      ))
    }
    </>
  )
}


function App() {

  // const [showing, setShowing] = useState(false);

  // function toggle() {
  //   setShowing(oldShowing => !oldShowing);
  // }

  console.log('redering App');
  return (
    <>
    <Container />
      {/* <AnotherContextProvider>
        <AppContextProvider>
          <Page />
        </AppContextProvider>
      </AnotherContextProvider> */}

      {/* <Display /> */}
    </>
    
  )
}

export default App
