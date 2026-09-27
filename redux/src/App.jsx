
import { useDispatch, useSelector } from 'react-redux'
import { increment, incrementBYten } from './redux/features/counterSlice'

const App = () => {

  // dispatch() is used to send an action to the Redux store.
  const dispatch = useDispatch() 

  // useSelector() is used to read/access data from the Redux store.
  const count = useSelector((state) => state.counter.value)

  return (
    <div >

      <h1>{count}</h1>

      <button
      onClick={() => {
        dispatch(increment())
      }}
      >increment</button>
      

        <button
      onClick={() => {
        dispatch(incrementBYten(10))
      }}
      >increment BY 10</button>
    </div>
  )
}

export default App
