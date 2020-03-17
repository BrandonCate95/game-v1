import React from 'react'
import './UseMoveBtn.css'

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: '0.4',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
}

class UseMoveBtn extends React.Component {

    state = {
        showPopup: false,
        interval: null
    }

    handleEnter = () => {
        this.setState({ interval: setInterval(() => this.setState({showPopup: true}), 500) })
    }

    handleLeave = () => {
        clearInterval(this.state.interval)
        this.setState({showPopup: false})
    }

    render(){
        const {character, move, setMove, paused} = this.props
        const {showPopup} = this.state
        return(
            <div 
                onMouseEnter={this.handleEnter.bind(this)} 
                onMouseLeave={this.handleLeave.bind(this)}
                tabIndex="0"
                style={{position: 'relative', height: '75px', width: '75px', borderRadius: '50%', display: 'inline-block', margin: '0 5px'}}
            >
                {showPopup &&
                    <div
                        style={{position: 'absolute', bottom: '80px', color: 'rgba(0,0,0,0.7)', backgroundColor: 'rgba(220,255,255,0.8)', borderRadius: '5px', padding: '3px'}}
                    >
                        <div style={{textTransform: 'uppercase', textDecoration: 'underline', marginBottom: '5px'}}>{move.name}</div>
                        <div>{move.description}</div>
                    </div>
                }

                <input
                    className="use-move-btn"
                    type="image" 
                    alt="" 
                    onClick={() => setMove(character, move)} 
                    src={move.img}
                    style={{border: 'none', outline: 'none', borderRadius: '50%', height: '75px', width: '75px', cursor: 'pointer'}}
                /> 
                <div style={{
                    ...overlayStyle,
                    display: ((move.currentCooldown && move.currentCooldown > 0) || character.casting || paused) ? 'flex': 'none'
                }}>
                {move.currentCooldown > 0 &&
                    `${move.currentCooldown}s`
                }
                </div>
            </div>
        )
    }
}

export default UseMoveBtn