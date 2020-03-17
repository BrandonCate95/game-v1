import React from 'react'
import { checkRequirements } from '../../../utilities'
import { UseMoveBtn } from '../../screenHelpers'

const ActionList = ({player, setMove, paused}) => (
    checkRequirements(player).map((move) => 
        <UseMoveBtn 
            key={move.name}
            character={player}
            move={move}
            setMove={setMove}
            paused={paused}
        />
    )
)

export default ActionList