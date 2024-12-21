"use server"
import { render } from "@react-pdf/renderer";
import { Blob } from "buffer";
import wkhtmltopdf from 'wkhtmltopdf';

// @ts-ignore*
export async function streamToBlob(readableStream, mimeType = "application/pdf") {
  const chunks = [];

  for await (const chunk of readableStream) {
    chunks.push(chunk); // Ajouter chaque morceau (chunk) au tableau
  }
  // Créer un Blob avec les morceaux collectés
  return new Blob(chunks, { type: mimeType });
}

export async function downloadPDF(htmlContent:React.JSX.Element){
    render( htmlContent, `${__dirname}/example.pdf`);
}
export async function handleGeneratePdf(html:string){
  // If you don't have wkhtmltopdf in the PATH, then provide
  // the path to the executable (in this case for windows would be):
  wkhtmltopdf.command = "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe";
  wkhtmltopdf(html, {
    output: 'demo.pdf',
    pageSize: 'A4',
  });
};
