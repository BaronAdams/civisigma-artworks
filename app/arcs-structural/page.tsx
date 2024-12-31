"use client"

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  LoaderCircle,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { Letter, Vector } from "@/components/TeX"
import { SVGProps, useEffect, useState, useTransition } from "react";
import "katex/dist/katex.min.css"
import { compile } from "@fileforge/react-print"
import ThreeArticulatedIsostaticArc from "@/components/arcs/ThreeArticulatedIsostaticArc"

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages."

function ThreeptsArcIcon(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="281.9561 182.5909 71.165 44.885" width="71.165px" height="44.885px" {...props} xmlnsXlink="https://boxy-svg.com"><g transform="matrix(1, 0, 0, 1, -3.2559518814086914, 4.883926868438721)"  id="object-4"><path style={{fill:"rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)", transformBox: "fill-box", transformOrigin: "50% 50%"}} transform="matrix(0, -0.833333, 0.742972, 0, -122.210831, -81.74079)" d="M 422.5 239.5 A 41.5 41.5 0 1 1 422.5 322.5 A 41.5 41.5 0 0 0 422.5 239.5 Z"  bbox="crescent 422.5 281 41.5 180 1 1@50c3e982" id="object-0" /><ellipse style={{fill:"rgb(216, 216, 216)", stroke:"rgb(0, 0, 0)"}} cx="290.328" cy="217.592" rx="5.116" ry="5" id="object-1" /><ellipse style={{fill:"rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)"}} cx="351.261" cy="217.592" rx="5.116" ry="5" id="object-2" /><ellipse style={{fill:"rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)"}} cx="320.795" cy="182.707" rx="5.116" ry="5" id="object-3" /></g></svg>);
}
function EncastredArcIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="71.165px" height="44.885px"
      {...props}
    >
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
          fill: "rgb(255, 255, 255)",
        }}
        transform="matrix(0, -0.833333, 0.815972, 0, -103.833337, -110.41668)"
        d="M 297 325.5 A 72 72 0 1 1 297 469.5 A 72 72 0 0 0 297 325.5 Z"
      />
      <rect
        x="156.531"
        y="316.667"
        width="28.333"
        height="11.667"
        style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
      />
      <rect
        x="272.726"
        y="315.383"
        width="28.333"
        height="12.309"
        style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
      />
    </svg>
  );
}

function ArticulatedArcIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="71.165px" height="44.885px"
      {...props}
    >
      <path
        style={{
          stroke: "rgb(0, 0, 0)",
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
          fill: "rgb(255, 255, 255)",
        }}
        transform="matrix(0, -0.833333, 0.815972, 0, -103.833337, -110.41668)"
        d="M 297 325.5 A 72 72 0 1 1 297 469.5 A 72 72 0 0 0 297 325.5 Z"
      />
      <g>
        <g>
          <ellipse
            style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
            cx="170.437"
            cy="319.643"
            rx="2.889"
            ry="2.568"
          />
          <path
            d="M 170.34 322.508 L 174.293 331.446 L 166.387 331.446 L 170.34 322.508 Z"
            style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          />
        </g>
        <line
          style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          x1="162.606"
          y1="331.79"
          x2="178.075"
          y2="331.79"
        />
        <line
          style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          x1="165.318"
          y1="331.634"
          x2="163.21"
          y2="334.852"
        />
        <line
          style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          x1="167.871"
          y1="331.634"
          x2="165.207"
          y2="335.296"
        />
        <line
          style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          x1="170.312"
          y1="331.412"
          x2="168.093"
          y2="334.963"
        />
        <line
          style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          x1="172.754"
          y1="331.301"
          x2="170.312"
          y2="335.296"
        />
        <line
          style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
          x1="177.526"
          y1="332.078"
          x2="175.195"
          y2="335.962"
        />
      </g>
    </svg>
  );
}

export default function Dashboard() {
  const [html, setHtml] = useState<string>("") 
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    (async () => {
      let htmlExtracted = await compile(<ThreeArticulatedIsostaticArc />)
      // console.log(ReactDOMServer.renderToStaticMarkup(<OneDoc2 />);)
      setHtml(htmlExtracted)
    })()

  }, [])

  useEffect(() => {
    if (isPending) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isPending]);

  const handleDownload = () => {
    startTransition(async () => {
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
    })
    
  };

  return (
    <div className={"grid relative h-screen w-full pl-[56px] font-[family-name:var(--font-geist-sans)]" }>
      {isPending && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] overflow-hidden z-50 flex justify-center gap-2 items-center">
            <LoaderCircle size={35} className="animate-spin text-white"/>
              <p className="text-white text-[22px]">
                Génération du document. Veuillez patienter
              </p>
        </div>
      )}
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                ArtWorks
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Models"
                >
                  <Bot className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Documentation"
                >
                  <Book className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Settings"
                >
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Artworks</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Paramètres de calcul
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
                    <Select>
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genesis">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Rabbit className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Bird className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Explorer
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Performance and speed for efficiency.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="quantum">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Turtle className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a..." />
                  </div>
                </fieldset>
              </form>
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
            disabled={isPending}
            onClick={()=>handleDownload()}
          >
            <Share className="size-3.5" />
            Imprimer
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 pt-1 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden h-screen flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-[30%] fixed items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Paramètres de calcul
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Modèle d'arc</Label>
                  <Select onValueChange={(value) => console.log(value)}>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Selectionnez un modèle d'arc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Rabbit className="size-5" /> */}
                          <ArticulatedArcIcon className="size-[25px] scale-[3.6] "/>
                          
                          <div className="grid gap-0.5">
                            <p>
                              Arc hyperstatique{" "}
                              <span className="font-medium text-foreground">
                                artculé
                              </span>
                            </p>
                            {/* <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p> */}
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Bird className="size-5" /> */}
                          <EncastredArcIcon className="size-[25px] scale-[3.6] "/>
                          <div className="grid gap-0.5">
                            <p>
                              Arc hyperstatique{" "}
                              <span className="font-medium text-foreground">
                                encastré
                              </span>
                            </p>
                            {/* <p className="text-xs" data-description>
                                Performance and speed for efficiency.
                              </p> */}
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          {/* <Turtle className="size-5" /> */}
                          <ThreeptsArcIcon className="size-[25px] dark:text-white"/>
                          <div className="grid gap-0.5">
                            <p>
                              Arc isostatique{" "}
                              <span className="font-medium text-foreground">
                                à 3 articulations
                              </span>
                            </p>
                            {/* <p className="text-xs" data-description>
                                The most powerful model for complex computations.
                              </p> */}
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fleche">Flèche <Letter text="f" /> (en mètres)</Label>
                  <Input id="fleche" type="number" placeholder="0.4" />
                </div>
                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div className="grid gap-2">
                  <Label htmlFor="charge-p">Charge <Vector text="P" /> (en tonnes)</Label>
                  <Input id="charge-p" type="number" placeholder="0.7" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pos-a">Position de la charge <Letter text="a" /> (en mètres)</Label>
                  <Input id="pos-a" type="number" placeholder="0.0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="longueur-l">Longueur <Letter text="L" /> (en mètres)</Label>
                  <Input id="longueur-l" type="number" placeholder="0.0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discretisation">Pas de discrétisation <Letter text="d" /> (en mètres)</Label>
                  <Input id="discretisation" type="number" placeholder="0.0" />
                </div>
                {/* </div> */}
                <Button size="sm" className="ml-auto gap-1.5">
                  Envoyer le modèle
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </fieldset>
              {/* <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="You are a..."
                      className="min-h-[9.5rem]"
                    />
                  </div>
                </fieldset> */}

            </form>
          </div>
          <div className="relative flex overflow-y-scroll min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1">
            {/* <TypingEffect typingSpeed={1000}> */}
                {/* <Image/> */}
              <ThreeArticulatedIsostaticArc/>
            {/* </TypingEffect> */}
            </div>
            <form
              className="relative hidden overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

