"use client"

import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Latex } from '@fileforge/react-print';
import React from 'react'

export const Vector = ({ text }: { text: string }) => {
    return (
        <Latex>
            {String.raw`\vec{${text}}`}
        </Latex>
    )
}

export const Letter = ({ text }: { text: string }) => {
    return (
        <Latex>
            {`\{${text}}`}
        </Latex>
    )
}
