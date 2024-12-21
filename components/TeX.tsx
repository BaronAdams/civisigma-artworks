"use client"

import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from 'react'

export const Vector = ({ text }: { text: string }) => {
    return (
        <MathJaxContext>
            <MathJax inline>
                <span style={{ color: 'black', fontSize: '14px' }}>
                    {`\\(\\vec{${text}}\\)`}
                </span>
            </MathJax>
        </MathJaxContext>
    )
}

export const Letter = ({ text }: { text: string }) => {
    return (
        <MathJaxContext>
            <MathJax inline>
                <span style={{ color: 'black', fontSize: '14px' }}>
                    {`\\({${text}}\\)`}
                </span>
            </MathJax>
        </MathJaxContext>
    )
}
