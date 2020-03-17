import React from 'react'
import { CastingAnimation } from '../../screenHelpers'

const EffectContainer = ({character}) => (
    <div style={{flex: 1, overflow: 'auto', justifyContent: 'flex-start', border: '1px solid lightgrey'}}>
        <div style={{borderBottom: '1px solid lightgrey', height: '100px'}}>
            {character.casting &&
                <CastingAnimation character={character} />
            }    
        </div>  
        {character.effects.map((effect, index) => 
            <div key={index}>{effect}</div>                 
        )}
    </div>
)

const FightContent = ({player, opponent}) => (
    <div className="App-intro" style={{display: 'flex', height: '100%'}}>
        <EffectContainer
            character={player}
        />
        <EffectContainer 
            character={opponent} 
        />
    </div>
)

export default FightContent