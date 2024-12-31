import { TypeAnimation } from 'react-type-animation';

export const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'I produce food for Mice',
        // 1000, // wait 1s before replacing "Mice" with "Hamsters"
        // 'You produce food for Hamsters',
        // 1000,
        // 'He does food for Guinea Pigs',
        // 1000,
        // 'We cook food for Chinchillas',
        // 1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
    //   repeat={Infinity}
    />
  );
};