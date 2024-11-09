'use client'
import { useRef } from 'react';

export default function MyComponent() {
  const myValue = useRef<string>('initial value');

  const updateValue = () => {
    myValue.current = 'updated value';
    console.log(myValue.current); // This will log "updated value" without re-rendering the component
  };

  return (
    <div>
      <button onClick={updateValue}>Update Value</button>
    </div>
  );
}
