import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  children: React.ReactNode; // Un seul composant ou plusieurs
  typingSpeed?: number; // Vitesse d'animation en ms
}

const TypingEffect: React.FC<TypingEffectProps> = ({ children, typingSpeed = 500 }) => {
  const [visibleComponents, setVisibleComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const childArray = React.Children.toArray(children); // Transforme en tableau
    let index = 0;

    const interval = setInterval(() => {
      if (index < childArray.length) {
        setVisibleComponents((prev) => [...prev, childArray[index]]);
        index++;
      } else {
        clearInterval(interval); // Stopper une fois tous les composants affichés
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Nettoyer le setInterval au démontage
  }, [children, typingSpeed]);

  return (
    <div>
      {visibleComponents.map((component, idx) => (
        <React.Fragment key={idx}>{component}</React.Fragment>
      ))}
    </div>
  );
};

export default TypingEffect;

