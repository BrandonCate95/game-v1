import React from 'react'
import { combatStats } from '../../../data/meta'
import { StatBar } from '../../screenHelpers'

const CharacterSideBar = ({character}) => (
    <div 
        className="App-sidebar"
        style={{height: '100%', color: 'rgba(0,0,0,0.7)', backgroundColor: 'rgba(220,255,255,0.8)', fontSize: '16px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
    >
        <img 
            src={character.portrait} 
            alt=""
            style={{border: '3px solid white', borderRadius: '50%', width: '150px', height: '150px'}}
        />
        <div style={{fontSize: '48px', textTransform: 'uppercase'}}>{character.name}</div>
        {combatStats.map(stat => 
            <StatBar 
                key={stat}
                character={character}
                stat={stat}
            />
        )}
    </div>
)

export default CharacterSideBar