
import {useSelector, useDispatch} from "react-redux"
import { increment, incrementBYValue } from "./redux/features/counterSlice"

const App = () => {
  
  const count  = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  function handleIncrement(){
    console.log("cjdscd");
    
    dispatch(increment())
  }

  
  function handleIncrementBYValue(){

    dispatch(incrementBYValue(10))
  }

  return (
    <div>
      {count}

      <button onClick={handleIncrement}>increment</button>

       <button onClick={handleIncrementBYValue}>increment by 10</button>
    </div>
  )
}

export default App
