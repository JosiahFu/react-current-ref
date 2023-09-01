# `react-current-ref`

Utilities to simplify using refs to avoid state closure.

## `useValueRef`

Creates a ref that is always updated whenever the value changes, so it is safe
to use in async functions and event listeners that are set once and such.

Note that updating the value **WILL NOT** cause a re-render, at least for parts
of the code using the ref, so any references in the DOM won't update, and
passing `ref.current` as a prop to components will not re-render them. You
**can** pass the ref itself as a prop to provide the up-to-date value, although
this still will not cause a re-render.

### Example Usage

```js
const [count, setCount] = useState(0);

const countRef = useValueRef(count);

// Set a timeout on mount
useEffect(() => {
    setTimeout(() => {
        console.log(countRef.current);
        // Even if count changes, this will print the latest value since it is a ref
    }, 1000);
}, [])
```

## `useFunctionRef`

Creates a wrapper function that does not change but always calls the latest
value of `func`.

### Example Usage

```js
const handleResize = useFunctionRef(event => {
    // ... other code
});

useEffect(() => {
    // Because handleResize always returns the same function, there will only
    // be one DOM operation
    document.addEventListener('resize', handleResize);
    
    // Standard cleanup function
    return () => document.removeEventListener('resize', handleResize);
}, [handleResize]);
```
