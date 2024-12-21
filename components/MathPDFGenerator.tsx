"use client"

import React, { useEffect, useRef, useState } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
// @ts-ignore
import { Document, PDFDownloadLink, Page, Text, View } from "@react-pdf/renderer";
import { fetchStylesheets, Html } from "react-pdf-html";
import { Button } from "./ui/button";
import { Latex, Tailwind, CSS } from '@fileforge/react-print';
// @ts-ignore
import html2pdf from 'html2pdf.js';

// const generatePDF = async () => {
//   const element = document.getElementById('math-content');
//   html2pdf(element);
// };

const MathPDFGenerator = () => {
  return (
    <Document>
      <Page>
        <View>
          {/* Contenu mathématique à inclure dans le PDF */}
          <View style={{ padding: "20px", backgroundColor: "#fff" }}>
            <Text>Document Mathématique</Text>
            <Text>
              Voici une équation mathématique :
              <CSS>{".katex-html{display:none}"}</CSS>
              <Text> Fourier Transform </Text>

              <Latex>{String.raw`
                    \ E = mc^2 \
                `}</Latex>
            </Text>
            <Text>
              Et une autre équation complexe :
              <Latex>
                {
                  String.raw` \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}`
                }
              </Latex>
            </Text>
          </View>
          {/* Bouton pour générer le PDF */}
        </View>
        {/* <PDFDownloadLink document={<MyDocToRender PDFContent={PDFContent} />} fileName="somename.pdf"> */}
        {/**@ts-ignore */}
        {/* {({ blob, url, loading, error }) => */}
        {/* loading ? <Button>'Loading document...'</Button> : <Button>'Download now!'</Button> */}
        {/* } */}
        {/* </PDFDownloadLink> */}
      </Page>
    </Document>
  );
};

export default MathPDFGenerator
// https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js