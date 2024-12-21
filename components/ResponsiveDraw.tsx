"use client"

import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const sketch: Sketch = (p5) => {
    let canvasWidth;
    let canvasHeight;
    const arcWidthFactor = 0.5; // Facteur pour la largeur de l'arc
    const arcHeightFactor = 0.25; // Facteur pour la hauteur de l'arc
    const arcThicknessFactor = 0.02; // Épaisseur de l'arc
    const jointDiameterFactor = 0.06; // Facteur pour le diamètre des articulations
    const chargeMagnitudeFactor = 0.1; // Facteur pour la charge

  p5.setup = () => {
    canvasWidth = p5.windowWidth;
    canvasHeight = p5.windowHeight;
    p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
    p5.noLoop(); // Ne pas redessiner en boucle
    p5.background(255);
    p5.translate(p5.width / 2, p5.height / 2); // Déplacer l'origine au centre du canvas
    drawScene(canvasWidth, canvasHeight)
}

  const drawScene = (canvasWidth:number, canvasHeight:number) => {
    // Calculer les dimensions en fonction de la taille du canvas
    const arcWidth = canvasWidth * arcWidthFactor; // Largeur de l'arc
    const arcHeight = canvasHeight * arcHeightFactor; // Hauteur de l'arc
    const arcThickness = canvasWidth * arcThicknessFactor; // Épaisseur de l'arc
    const jointDiameter = canvasWidth * jointDiameterFactor; // Diamètre des articulations (cercles)
    const chargeMagnitude = canvasHeight * chargeMagnitudeFactor; // Longueur du vecteur de charge

    // Dessiner les supports
    const supportWidth = 20; // Largeur fixe pour les supports
    const supportHeight = 40; // Hauteur fixe pour les supports
    p5.fill(150); // Gris pour les supports
    p5.noStroke();
    p5.rect(-arcWidth / 2 - supportWidth / 2, arcHeight / 2 - supportHeight / 2, supportWidth, supportHeight); // Support gauche
    p5.rect(arcWidth / 2 - supportWidth / 2, arcHeight / 2 - supportHeight / 2, supportWidth, supportHeight); // Support droit

    // Dessiner l'arc épais
    p5.strokeWeight(arcThickness);
    p5.noFill();
    p5.stroke(0); // Noir pour l'arc
    p5.arc(0, 0, arcWidth, arcHeight, p5.PI, 0);

    // Ajouter les articulations aux extrémités de l'arc
    p5.fill(255); // Blanc pour le remplissage des articulations
    p5.stroke(0); // Noir pour la bordure des articulations
    p5.strokeWeight(2); // Épaisseur de la bordure
    p5.ellipse(-arcWidth / 2, 0, jointDiameter); // Articulation gauche
    p5.ellipse(arcWidth / 2, 0, jointDiameter); // Articulation droite

    // Ajouter la charge au milieu de l'arc
    const midPointX = 0;
    const midPointY = -arcHeight / 2; // Point milieu de l'arc
    p5.stroke(255, 0, 0); // Rouge pour le vecteur de charge
    p5.strokeWeight(2);
    p5.line(midPointX, midPointY, midPointX, midPointY + chargeMagnitude);

    // Dessiner la flèche pour la charge
    p5.fill(255, 0, 0);
    const arrowSize = 6;
    p5.triangle(
      midPointX - arrowSize, midPointY + chargeMagnitude - arrowSize,
      midPointX + arrowSize, midPointY + chargeMagnitude - arrowSize,
      midPointX, midPointY + chargeMagnitude + arrowSize
    );
  };

  p5.draw = () => {}
  p5.windowResized = () => {
    canvasWidth = p5.windowWidth; // Mettre à jour la largeur du canvas
    canvasHeight = p5.windowHeight; // Mettre à jour la hauteur du canvas
    p5.resizeCanvas(canvasWidth, canvasHeight); // Redimensionner le canvas
    drawScene(canvasWidth, canvasHeight); // Redessiner la scène
  };
};
  

export default function ResponsiveDraw() {
  return ( 
    <MathJaxContext>
      <div style={{ position: 'relative' }}>
        <NextReactP5Wrapper sketch={sketch} />
        {/* Ajouter l'annotation "P" en LaTeX au-dessus de la charge */}
          <MathJax inline>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) translateY(-90px)', color: 'black', fontSize: '20px' }}>
                {'\\(\\vec{P}\\)'}
                {/* {"$$\mathbf{P}$$"} */}
            </div>
          </MathJax>
      </div>
    </MathJaxContext>
    )
}