import { MathJaxContext } from 'better-react-mathjax'
import React from 'react'

const ClientLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <MathJaxContext>
        {children}
    </MathJaxContext>
  )
}

export default ClientLayout