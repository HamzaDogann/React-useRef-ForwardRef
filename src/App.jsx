import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myInputRef = useRef();

  useEffect(() => {
    // myInputRef.current, input elementine referans verir
    myInputRef.current.focus();
  }, []);

  return <input ref={myInputRef} />;
}

export default MyComponent



// Başka bir kullanım forwardRef()



import React, { forwardRef, useRef, useImperativeHandle } from 'react';

// Child Component
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Parent component ref'ini child component'e iletmek için useImperativeHandle kullanılır
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});


// Parent Component
function ParentComponent() {
  const childRef = useRef();

  const handleButtonClick = () => {
    // Child component'in focusInput fonksiyonunu çağırarak input'a odaklanabiliriz
    childRef.current.focusInput();
  };

  return (
    <div>
      {/* ChildComponent'e ref'i ileterek parent component ile iletişim kurarız */}
      <ChildComponent ref={childRef} />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}