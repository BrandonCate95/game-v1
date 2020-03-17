import React from 'react'

const StartFightBtn = ({children, character, startFight}) => (
    <div 
        style={{cursor: 'pointer', color: 'rgba(0,0,0,0.7)', backgroundColor: 'rgba(220,255,255,0.8)', borderRadius: '5px', fontSize: '16px', margin: '20px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        onClick={() => startFight(character)}
    >
        <img 
            src={character.portrait} 
            alt=""
            style={{border: '3px solid white', borderRadius: '50%', width: '150px', height: '150px'}}
        />
        <div style={{fontSize: '48px', textTransform: 'uppercase'}}>{character.name}</div>
        <table>
            <tbody>
                <tr>
                    <th style={{textAlign: 'right'}}>strength:</th>
                    <th>{character.str}</th>
                </tr>
            </tbody>
        </table>
    </div>
)

const OpponentsList = ({opponents, startFight}) => (
    <div style={{display: 'flex', maxWidth: '100%', justifyContent: 'center'}}>
        {Object.entries(opponents).map(([key, value]) => 
            <StartFightBtn 
                key={key} 
                character={value}
                startFight={startFight}
            >
                {key}
            </StartFightBtn>
        )}
    </div>
)

export default OpponentsList