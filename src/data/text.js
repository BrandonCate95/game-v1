import React from 'react'
import { bindActionCreators } from 'redux'
import { store } from '../index'
import { combatStats } from './meta'
import * as action from '../actions'
import * as CustomScreen from '../components/screens'
import * as Helper from '../components/screenHelpers'

export default {
    fight: {
        screen: (state = store.getState(), actions = bindActionCreators(action, store.dispatch)) => 
            <CustomScreen.Fight 
                player={state.characters.player}
                opponent={state.characters[state.characters.player.target]}
                setMove={(character, move) => actions.setMove(character, move)}
                paused={state.time.pause}
            />
    },
    'level up': {
        screen: (state = store.getState(), actions = bindActionCreators(action, store.dispatch)) => 
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
    },
    'pick fight': {
        screen: (state = store.getState(), actions = bindActionCreators(action, store.dispatch)) => 
            <CustomScreen.PickFight 
                startFight={(opponent) => actions.startFight(opponent)}
                opponents={Object.keys(state.characters)
                    .filter((key) => key !== 'player')
                    .reduce((obj, key) => {
                        obj[key] = state.characters[key];
                        return obj
                    }, {})}
            />
    },
    win: {
        screen: (state = store.getState()) => { 
            const screen = state.screen[state.screen.length - 1]
            return ( 
                <Helper.Screen>
                    <Helper.Header />
                    <Helper.Content style={{flexDirection: 'column'}}>
                        {Object.entries(screen.changes).map(([key, value]) =>
                            <div>
                                you gained {value} {key}
                            </div>
                        )}
                    </Helper.Content>
                    <Helper.Footer>
                        <Helper.ChangeScreenBtn screen={{main: 'pick fight'}} window={true}>
                            next fight
                        </Helper.ChangeScreenBtn>
                    </Helper.Footer>
                </Helper.Screen>
            ) 
        }
    },
    lose: {
        screen: (state = store.getState()) => { 
            const screen = state.screen[state.screen.length - 1]
            return (
                <Helper.Screen>
                    <Helper.Header />
                    <Helper.Content>
                        {Object.entries(screen.changes).map(([key, value]) =>
                            <div key={key}>
                                you lost {Math.abs(value)} {key}
                            </div>
                        )}
                    </Helper.Content>
                    <Helper.Footer>
                        <Helper.ChangeScreenBtn screen={{main: 'pick fight'}} window={true}>
                            next fight
                        </Helper.ChangeScreenBtn>
                    </Helper.Footer>
                </Helper.Screen>
            ) 
        }
    },
    start1: {
        screen: () => ( 
            <Helper.Screen>
                <Helper.Header />
                <Helper.Content>
                    Welcome to my game system demo!
                </Helper.Content>
                <Helper.Footer>
                    <Helper.ChangeScreenBtn screen={{main: 'start2'}} window={true}>
                        next
                    </Helper.ChangeScreenBtn>
                </Helper.Footer>
            </Helper.Screen>
        )
    },
    start2: {
        screen: () => ( 
            <Helper.Screen>
                <Helper.Header />
                <Helper.Content>
                    There is still a lot missing, but...
                </Helper.Content>
                <Helper.Footer>
                    <Helper.ChangeScreenBtn screen={{main: 'start3'}} window={true}>
                        next
                    </Helper.ChangeScreenBtn>
                </Helper.Footer>
            </Helper.Screen>
        )
    },
    start3: {
        screen: () => (
            <Helper.Screen> 
                <Helper.Header />
                <Helper.Content>
                    I hope you find it interesting
                </Helper.Content>
                <Helper.Footer>
                    <Helper.ChangeScreenBtn screen={{main: 'pick fight'}} window={true}>
                        start game!
                    </Helper.ChangeScreenBtn>
                </Helper.Footer>
            </Helper.Screen>
        )
    }
}