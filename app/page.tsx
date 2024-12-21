"use client"
import Image, { type StaticImageData } from "next/image";
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import MathComponent from "@/components/MathComponent";
import Link from "next/link";
import Draw from "@/components/Draw";
import MathPage from "@/components/MathPDFGenerator";
import OneDoc from "@/components/OneDoc";
import { compile } from "@fileforge/react-print";
import { useEffect, useState } from "react";
import OneDoc2 from "@/components/OneDoc2";
import { Document, Page, PDFDownloadLink, PDFViewer, usePDF } from "@react-pdf/renderer";
import { fetchStylesheets, Html } from "react-pdf-html";
import ReactDOMServer from 'react-dom/server';

const DocToRender = ({html}:{html:string}) => {
  const [style, setStyle] = useState<any>()
  useEffect(() => {
    (async () => {
      const stylesheets = await fetchStylesheets(html);
      setStyle(stylesheets)
    })()

  }, [])
  // const stylesheets = await fetchStylesheets(html);
  // stylesheet={stylesheets}
  return (
    <Document>
      <Page>
        <Html stylesheet={style}>{html}</Html>
      </Page>
    </Document>
  )
}


export default function Home() {
  const [html, setHtml] = useState<string>("")
  let arcBridgeDesc = "Ce programme permet de déterminer les matrices d'influence des sollicitations des arcs isostatiques et hyperstatiques"
  let suspBridgeDesc = "Ce programme permet de déterminer les caractéristiques d'un pont suspendu(longueur de câble, allogement , force de poussée) "

  useEffect(() => {
    (async () => {
      let htmlExtracted = await compile(<OneDoc2 />)
      // console.log(ReactDOMServer.renderToStaticMarkup(<OneDoc2 />);)
      // console.log(htmlExtracted)
      setHtml(htmlExtracted)
    })()

  }, [])

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/html-to-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: html }), // Remplacez par votre contenu HTML
      });

      if (response.ok) {
        const blob = await response.blob();

        // Créer une URL temporaire pour le blob
        const url = window.URL.createObjectURL(blob);

        // Créer un lien temporaire
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.pdf'; // Nom du fichier à télécharger
        document.body.appendChild(link);

        // Déclencher le téléchargement
        link.click();

        // Nettoyer les ressources
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Erreur lors de la génération du PDF');
      }
    } catch (error) {
      console.error('Erreur dans le téléchargement :', error);
    }
  };

  // const handleGeneratePdf = () => {
	// 	const doc = new jsPDF({
	// 		format: 'a4',
	// 		unit: 'px',
	// 	});

		// // Adding the fonts.
		// doc.setFont('Inter-Regular', 'normal');
	// 	doc.html(html, {
	// 		async callback(doc) {
	// 			await doc.save('document');
	// 		},
	// 	});
	// };

  return (
    <div className="min-h-screen pt-14 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap w-screen gap-8 justify-center items-center sm:items-start">
        <CardDemo link="/arcs-structural" image={'/images/arcbridge.jpg'} title="Calcul des arcs" description={arcBridgeDesc} />
        <CardDemo link="/suspension-bridges" image={"/images/suspensionbridge.jpg"} title="Calcul des ponts suspendus" description={suspBridgeDesc} />
      </main>
      <OneDoc2 />
      {/* <Draw/> */}
      {/* <Button onClick={() => handleGeneratePdf(html)}>Télécharger PDF</Button> */}
      <Button onClick={() => handleDownload()}>Télécharger PDF</Button>
      {/* @ts-ignore */}
      {/* <PDFDownloadLink document={<DocToRender html={html} />} fileName="somename.pdf"> */}
        {/**@ts-ignore */}
        {/* {({ blob, url, loading, error }) =>
        loading ? <Button>'Loading document...'</Button> : <Button>'Download now!'</Button>
        }
        </PDFDownloadLink> */}
    </div>
  );
}

type OtherProps = {
  image: string,
  title: string,
  description: string,
  link: string
}
type CardProps = React.ComponentProps<typeof Card>

function CardDemo({ className, image, title, description, link, ...props }: CardProps & OtherProps) {
  return (
    <Card className={cn("w-[380px] max-[420px]:w-[95%]", className)} {...props}>
      <CardHeader>
        <Image
          src={image}
          width={380}
          height={140}
          alt="Arc"
          className="w-full h-[180px] object-cover"
        />
        <CardTitle className="text-[25px]">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
          </div> */}
        {/* <div> */}
        {/* {enums.map((elt, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {elt}
                  </p>
                </div>
              </div>
            ))} */}
        {/* </div> */}
      </CardContent>
      <CardFooter>
        <Link href={link}>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Proceder au calcul
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
