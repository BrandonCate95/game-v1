import React from 'react'
import ProgressBar from './ProgressBar'

const CastingAnimation = ({character}) => (            
    <div style={{padding: '5px', height: '100%'}}>
        <img 
            alt=""
            src={character.currentMove.img} 
            style={{border: 'none', outline: 'none', borderRadius: '50%', height: '50px', width: '50px', cursor: 'pointer'}}
        />
        <ProgressBar time={character.currentCastTime} />
    </div>
)

export default CastingAnimation