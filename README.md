# useRef ve forwardRef Kullanımı

## useRef Nedir?

`useRef`, React uygulamalarında referans oluşturmak ve bu referansı kullanarak DOM elementlerine veya React bileşenlerine erişim sağlamak için kullanılan bir Hook'tur.

### Hangi Amaçlar için Kullanılabilir?

1. **DOM Manipülasyonları:** DOM elementlerine erişim sağlamak ve bu elementleri manipüle etmek için kullanılabilir.

2. **Değişkenlerin Saklanması:** Component'in re-render edilmesine neden olmadan değişkenleri saklamak için kullanılabilir.

3. **Focus ve Selection Durumları:** Input alanlarına odaklanma veya belirli bir metni seçme gibi durumları kontrol etmek için kullanılabilir.

### Faydaları Nelerdir?

1. **Component'in Re-render Edilmemesi:** Değerleri güncellemek için kullanılan `useRef`, component'in re-render edilmesine neden olmaz. Bu, performansı artırabilir.

2. **Mutable Değerlerin Depolanması:** `useRef`, mutable (değiştirilebilir) değerleri saklamak için idealdir ve bu değerlere erişim sağlar.

3. **DOM Elementlerine Erişim:** `useRef`, DOM elementlerine kolayca erişim sağlar ve bu elementleri manipüle etmek için kullanılabilir.

## forwardRef Nedir?

`forwardRef`, React bileşenlerinde bir ref'i child component'e iletmek için kullanılan bir fonksiyondur.

### Nasıl Bir Faydası Vardır?

1. **Ref İletme:** Parent component, child component'in ref'ine doğrudan erişim sağlamak için kullanılır. Böylece, child component'teki DOM elementlerine veya fonksiyonlara erişim mümkün olur.

## Başlıca Yapılan Hatalar ve Püf Noktalar

1. **Unnecessary Re-renders:** `useRef` kullanılırken, değerleri güncellemek için `current` özelliğini doğrudan değiştirmek, component'in tekrar render edilmesine neden olmaz. Ancak, state benzeri bir kullanım yapıldığında (örneğin, bir objeyi değiştirmek), component'in re-render edilmesine neden olabilir.

2. **Ref İletme:** `forwardRef` kullanılırken, ref'i iletmek için dikkatlice belirli fonksiyonları veya değerleri seçmek önemlidir. Gereksiz değerleri iletmek, kodu karmaşıklaştırabilir ve performans sorunlarına yol açabilir.

## Kod Örnekleri

### useRef Kullanımı

```jsx
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myInputRef = useRef();

  useEffect(() => {
    // myInputRef.current, input elementine referans verir
    myInputRef.current.focus();
  }, []);

  return <input ref={myInputRef} />;
}
```

### forwardRef Kullanımı

```javascript
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
}```
