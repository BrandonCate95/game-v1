import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({time}) => (
    <div style={{backgroundColor: 'grey', borderRadius: '3px', border: '5px solid silver', boxShadow: '0 0 3px 2px black inset'}}>
        <div style={{
            height: '20px',
            width: `0%`,
            borderRadius: '0 7px 7px 0',
            backgroundColor: '#e6465d',
            animationName: 'example',
            animationDuration: `${time}s`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            boxShadow: '0 0 3px 1px black inset'
        }}></div>
    </div>
)

export default ProgressBar