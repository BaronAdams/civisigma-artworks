"use client"

import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(600, 400, p5.WEBGL);
    if(window.innerWidth < 600) p5.createCanvas(window.innerWidth, window.innerWidth * 2/3, p5.WEBGL);
    p5.background(255);
    p5.translate(p5.width / 2, p5.height / 2); // Déplacer l'origine au centre du canvas
  }

  p5.draw = () => {
    // Paramètres de l'arc
    let arcWidth = p5.width * 2/3; // Largeur de l'arc
    let arcHeight = p5.height *7/8; // Hauteur de l'arc
    let arcThickness = 6.5; // Épaisseur de l'arc

    // Dessiner les supports
    let supportWidth = 40;
    let supportHeight = 20;
    p5.fill(150); // Gris pour les supports
    p5.noStroke();
    p5.rect(-arcWidth / 2 - supportWidth / 2, 0, supportWidth, supportHeight); // Support gauche
    p5.rect(arcWidth / 2 - supportWidth / 2, 0, supportWidth, supportHeight); // Support droit

    // Dessiner l'arc épais
    p5.strokeWeight(arcThickness);
    p5.noFill();
    p5.stroke(0); // Noir pour l'arc
    p5.arc(0, 0, arcWidth, arcHeight, p5.PI, 0);

    // Ajouter les articulations aux extrémités de l'arc
    let jointDiameter = 15;
    p5.fill(255); // Blanc pour le remplissage des articulations
    p5.stroke(0); // Noir pour la bordure des articulations
    p5.strokeWeight(1.2); // Épaisseur de la bordure
    p5.ellipse(-arcWidth / 2, 0, jointDiameter); // Articulation gauche
    p5.ellipse(arcWidth / 2, 0, jointDiameter); // Articulation droite

    // Ajouter la charge au milieu de l'arc
    let chargeMagnitude = 50; // Longueur du vecteur de charge
    let midPointX = 0;
    let midPointY = -arcHeight / 2; // Point milieu de l'arc
    p5.stroke(255, 0, 0); // Rouge pour le vecteur de charge
    p5.strokeWeight(2);
    p5.line(midPointX, midPointY, midPointX, midPointY + chargeMagnitude);
    // Dessiner la flèche pour la charge
    p5.fill(255, 0, 0);
    let arrowSize = 6;
    p5.triangle(
      midPointX - arrowSize, midPointY + chargeMagnitude - arrowSize,
      midPointX + arrowSize, midPointY + chargeMagnitude - arrowSize,
      midPointX, midPointY + chargeMagnitude + arrowSize
    );
  };
};
  

export default function Draw() {
  return ( 
    <MathJaxContext>
      <div style={{ position: 'relative' }}>
        <NextReactP5Wrapper sketch={sketch} />
        {/* Ajouter l'annotation "P" en LaTeX au-dessus de la charge */}
          <MathJax inline>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) translateY(-90px)', color: 'black', fontSize: '20px' }}>
                {'\\(\\vec{P}\\)'}
            </div>
          </MathJax>
      </div>
    </MathJaxContext>
    )
  
}