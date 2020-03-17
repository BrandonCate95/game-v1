import React from 'react'
import { connect } from 'react-redux'
import { levelRequirements } from '../../data/meta'
import { levelUp, changeScreen, pause, resume, addPopup } from '../../actions'
// import ProgressBar from './ProgressBar'

const Header = ({levelUpAvailable, statPointsAvailable, screen, changeScreen, paused, pause, resume, addPopup}) => (
    <header className="App-header" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {levelUpAvailable && screen.main !== 'fight' &&
            <button
                onClick={() => addPopup({popup: 'level up'})}
            >LEVEL UP</button>
        }
        {!levelUpAvailable && statPointsAvailable && screen.main !== 'level up' && screen.main !== 'fight' &&
            <button
                onClick={() => changeScreen({main: 'level up'})}
            >Use Points</button>
        }
        {screen.main === 'fight' && !paused &&
            <button onClick={() => pause()} title='pause' style={{cursor: 'pointer', background: 'transparent', border: 'none', outline: 'none', color: 'rgba(220,255,255,0.8)'}}>
                <i className="fas fa-pause" style={{fontSize: '36px'}}></i>
            </button>
        }
        {screen.main === 'fight' && paused &&
            <button onClick={() => resume()} title='pause' style={{cursor: 'pointer', background: 'transparent', border: 'none', outline: 'none', color: 'rgba(220,255,255,0.8)'}}>
                <i className="fas fa-play" style={{fontSize: '36px'}}></i>
            </button>
        }
        {/* <div style={{width: '100%'}}>
            <ProgressBar time={10} />
        </div> */}
    </header>
)

const mapStateToProps = state => ({
    levelUpAvailable: levelRequirements[state.characters.player.level - 1] <= state.characters.player.exp,
    statPointsAvailable: state.characters.player.statPoints > 0,
    screen: state.screen[state.screen.length - 1],
    paused: state.time.pause
})

const mapDispatchToProps = dispatch => ({
    changeScreen: (screen) => dispatch(changeScreen(screen)),
    pause: () => dispatch(pause()),
    resume: () => dispatch(resume()),
    addPopup: (popup) => dispatch(addPopup(popup))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)