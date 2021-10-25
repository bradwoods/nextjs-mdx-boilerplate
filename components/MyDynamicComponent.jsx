import dynamic from 'next/dynamic';

const DynamicMyCustomComponent = dynamic(() =>
  import('./MyCustomComponent.jsx').then((mod) => mod.MyCustomComponent)
);

export const MyDynamicComponent = () => (
  <>
    MyCustomComponent loaded dynamically: <DynamicMyCustomComponent />
  </>
);
