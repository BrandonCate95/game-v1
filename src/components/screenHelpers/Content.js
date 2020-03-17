import React from 'react'

const Content = ({children, style}) => (
    <div className="App-content" style={style}>
        {children}
    </div>
)

export default Content