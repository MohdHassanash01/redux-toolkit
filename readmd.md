# Redux Toolkit Flow

Redux Toolkit (RTK) is the recommended way to write Redux logic. It helps manage global application state in a React application.

## Redux Toolkit Architecture

The main parts of Redux Toolkit are:

* **Store**
* **Slice**
* **Reducer**
* **Action**
* **Dispatch**
* **Selector**

---

## 1. Store

The **store** is the central place where the application's global Redux state is stored.

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

Here:

```js
reducer: {
  counter: counterReducer
}
```

means that `counterReducer` manages the `counter` part of the Redux state.

The store can contain multiple feature reducers:

```js
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    products: productsReducer
  }
});
```

The state will look conceptually like:

```js
{
  counter: {
    value: 0
  },
  auth: {
    user: null
  },
  products: {
    items: []
  }
}
```

---

# 2. Slice

A **slice represents a feature or a portion of the Redux state**.

For example:

```text
Redux Store
│
├── counter → counterSlice
├── auth → authSlice
└── products → productsSlice
```

Example:

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByTen: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {
  increment,
  decrement,
  incrementByTen
} = counterSlice.actions;

export default counterSlice.reducer;
```

A slice contains:

```text
Slice
│
├── name
├── initialState
├── reducers
├── actions
└── reducer
```

---

# 3. Initial State

`initialState` defines the starting state of the feature.

```js
initialState: {
  value: 0
}
```

So initially:

```js
{
  value: 0
}
```

---

# 4. Reducers

Reducers define **how the state should change**.

```js
reducers: {
  increment: (state) => {
    state.value += 1;
  },

  decrement: (state) => {
    state.value -= 1;
  }
}
```

For example:

```js
increment
```

means:

> Increase the counter by 1.

```js
decrement
```

means:

> Decrease the counter by 1.

Redux Toolkit uses **Immer** internally, which allows us to write:

```js
state.value += 1;
```

even though Redux follows immutable state updates.

---

# 5. Actions

`createSlice()` automatically creates action creators from the reducers.

For example:

```js
export const {
  increment,
  decrement,
  incrementByTen
} = counterSlice.actions;
```

Now we can use:

```js
increment()
```

or:

```js
incrementByTen(10)
```

An action describes **what happened / what operation should be performed**.

For example:

```js
incrementByTen(10)
```

creates an action conceptually similar to:

```js
{
  type: "counter/incrementByTen",
  payload: 10
}
```

---

# 6. Dispatch

`dispatch()` sends an action to the Redux store.

In React:

```js
const dispatch = useDispatch();
```

Then:

```js
dispatch(increment());
```

or:

```js
dispatch(incrementByTen(10));
```

The flow is:

```text
User clicks button
       ↓
dispatch(action)
       ↓
Redux Store
       ↓
Reducer
       ↓
State is updated
```

---

# 7. Selector

`useSelector()` is used to read data from the Redux store.

```js
const counter = useSelector(
  (state) => state.counter.value
);
```

If the Redux state is:

```js
{
  counter: {
    value: 10
  }
}
```

then:

```js
state.counter.value
```

returns:

```text
10
```

---

# 8. Provider

The Redux store must be provided to the React application using `<Provider>`.

In `main.jsx`:

```jsx
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

`Provider` makes the Redux store available to the React component tree.

---

# Complete Redux Toolkit Flow

The complete flow can be understood as:

```text
                    Redux Store
                         │
                         │
                    contains
                         ↓
                  Global State
                         │
                         ↓
                  ┌─────────────┐
                  │   Counter   │
                  │  value: 0   │
                  └─────────────┘
                         ↑
                         │
                    useSelector()
                         │
                         │
                    React UI
                         │
                         │
                    User Action
                         │
                         ↓
                     dispatch()
                         │
                         ↓
                      Action
                         │
                         ↓
                      Reducer
                         │
                         ↓
                  Update State
                         │
                         ↓
                    Redux Store
                         │
                         ↓
                  useSelector()
                         │
                         ↓
                  Component Updates
```

---

# Example: Increment Counter

Suppose the user clicks:

```jsx
<button onClick={() => dispatch(increment())}>
  Increment
</button>
```

The flow is:

```text
1. User clicks button
          ↓
2. dispatch(increment())
          ↓
3. Action is sent to Redux
          ↓
4. counter reducer receives the action
          ↓
5. reducer updates state
          ↓
6. counter.value changes from 0 → 1
          ↓
7. useSelector gets the updated value
          ↓
8. React component re-renders
          ↓
9. UI displays 1
```

---

# Example: Increment By 10

```jsx
<button onClick={() => dispatch(incrementByTen(10))}>
  Increment By 10
</button>
```

Flow:

```
## Redux Toolkit Flow

User clicks button
       ↓
dispatch(incrementByTen(10))
       ↓
Action is created
       ↓
Redux Store receives action
       ↓
counterReducer handles the action
       ↓
state.value += 10
       ↓
Redux Store is updated
       ↓
useSelector() detects the selected state change
       ↓
Component re-renders
       ↓
UI shows the new value


```

```text
User clicks button
       ↓
dispatch(incrementByTen(10))
       ↓
Action
{
  type: "counter/incrementByTen",
  payload: 10
}
       ↓
counter reducer
       ↓
state.value += action.payload
       ↓
0 + 10
       ↓
10
       ↓
useSelector()
       ↓
UI displays 10
```

---

# Redux Toolkit Mental Model

Remember this simple flow:

```text
                 STORE
                   │
                   ↓
                STATE
                   ↑
                   │
              useSelector
                   │
                   │
              React UI
                   │
                   ↓
               dispatch()
                   │
                   ↓
                ACTION
                   │
                   ↓
                REDUCER
                   │
                   ↓
              UPDATE STATE
                   │
                   └──────────→ STORE
```

## Easy Interview Explanation

> Redux Toolkit is used to manage global application state. We create a store to hold the global state, and we create slices for different features. Each slice contains the initial state and reducers that define how the state can change. `createSlice()` automatically generates action creators. Components use `useDispatch()` to dispatch actions and `useSelector()` to read data from the store. When the selected state changes, the relevant component is updated.

## Important Distinction

There are two places where you may see the word **reducer**:

### Inside `createSlice()`

```js
reducers: {
  increment: (state) => {
    state.value += 1;
  }
}
```

These define **how a feature's state changes**.

### Inside `configureStore()`

```js
configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

This tells the Redux store **which reducer manages each part of the global state**.

So remember:

```text
Slice
 │
 ├── reducers → define state changes
 │
 └── reducer → generated reducer function
                    │
                    ↓
              configureStore()
                    │
                    ↓
                  Store
```
