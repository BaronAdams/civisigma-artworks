import React from 'react';
import { Latex, compile, Tailwind, CSS } from '@fileforge/react-print';
import "katex/dist/katex.min.css"
import { BlockMath, InlineMath } from "react-katex";

const OneDoc2 = () => {
    return (
        <React.Fragment>
            <div id="pdf">
                <Tailwind>
                    {/* <CSS>{katexStyles}</CSS> */}
                    <CSS>{"@import url('/style.css');"}</CSS>
                    {/* <link rel="stylesheet" href="/style.css" /> */}
                    {/* <link rel="stylesheet" href="http://localhost:3000/_next/static/css/app/page.css?v=1733564499149" /> */}
                    <p className="red"> Fourier Transform </p>

                    <BlockMath>{String.raw`
                        \relax{x} = \int_{-\infty}^\infty
                        \hat\xi\,e^{2 \pi i \xi x}
                        \,d\xi
                        `}
                    </BlockMath>
                    <p>
                        Voici une équation inline :
                    </p>
                    <InlineMath math="E = mc^2" />
                    <p className='text-blue-400'> Inverse Fourier Transform </p>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    <div className='katex-display'>
                        <Latex>{`
                                \\left\\{
                                \\begin{array}{l}
                                x + y = 5 \\\\
                                x - y = 3 \\\\
                                2x = 8
                                \\end{array}
                                \\right.
                                `}
                        </Latex>
                    </div>    
                    <BlockMath>
                        {String.raw`
                        \hat\xi = \int_{-\infty}^\infty
                        x\,e^{-2 \pi i \xi x}
                        \,dx
                        `}
                    </BlockMath>
                    
                </Tailwind>
            </div>
        </React.Fragment>
    );
};

export default OneDoc2


