import React from 'react'
import { bindActionCreators } from 'redux'
import { store } from '../index'
import { combatStats } from './meta'
import * as action from '../actions'
import * as CustomScreen from '../components/screens'
import * as Helper from '../components/screenHelpers'

export default {
    'level up': {
        popup: (state = store.getState(), actions = bindActionCreators(action, store.dispatch)) => 
            <div style={{width: '65vh', height: '65vh'}}>
                <CustomScreen.LevelUp 
                    playerChange={(change) => actions.characterChange('player', change)}
                    statPoints={state.characters.player.statPoints}
                    stats={Object.keys(state.characters.player.baseStats)
                        .filter((key) => combatStats.includes(key))
                        .reduce((obj, key) => {
                            obj[key] = state.characters.player[key];
                            return obj
                        }, {})}
                />
            </div>
    }
}