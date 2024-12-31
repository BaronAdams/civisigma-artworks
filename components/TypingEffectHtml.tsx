import React, { useState, useEffect } from "react";

interface TypingEffectHtmlProps {
  htmlString: string; // Chaîne HTML brute avec ou sans balise <style>
  typingSpeed?: number; // Vitesse d'affichage des caractères
}

const TypingEffectHtml: React.FC<TypingEffectHtmlProps> = ({ htmlString, typingSpeed = 50 }) => {
  const [visibleHtml, setVisibleHtml] = useState(""); // Portion visible du HTML
  const [styles, setStyles] = useState(""); // Contenu des balises <style>

  useEffect(() => {
    // Étape 1 : Extraire le contenu des balises <style>
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const extractedStyles: string[] = [];
    let cleanHtml = htmlString;

    cleanHtml = cleanHtml.replace(styleRegex, (_, styleContent) => {
      extractedStyles.push(styleContent); // Sauvegarde le contenu des styles
      return ""; // Supprime les balises <style> du HTML
    });

    // Applique les styles extraits
    setStyles(extractedStyles.join("\n"));

    // Étape 2 : Afficher progressivement le HTML sans les styles
    let index = 0;
    const type = () => {
      if (index < cleanHtml.length) {
        setVisibleHtml((prev) => prev + cleanHtml[index]);
        index++;
        setTimeout(type, typingSpeed);
      }
    };

    type();

    return () => {
      setVisibleHtml(""); // Nettoyage à chaque démontage
      setStyles(""); // Réinitialiser les styles
    };
  }, [htmlString, typingSpeed]);

  return (
    <div>
      {/* Applique les styles extraits */}
      <style>{styles}</style>
      {/* Rendu progressif du HTML */}
      <div dangerouslySetInnerHTML={{ __html: visibleHtml }} />
    </div>
  );
};

export default TypingEffectHtml;

