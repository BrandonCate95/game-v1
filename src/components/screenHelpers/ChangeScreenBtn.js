import React from 'react'
import { connect } from 'react-redux'
import { changeScreen } from '../../actions'

class ChangeScreenBtn extends React.Component {

    windowClick = () => {
        this.props.changeScreen(this.props.screen)
    }

    componentDidMount = () => {
        if(this.props.window) window.addEventListener('click', this.windowClick)
        if(!this.props.window) window.removeEventListener('click', this.windowClick)
    }

    componentDidUpdate = () => {
        if(this.props.window) window.addEventListener('click', this.windowClick)
        if(!this.props.window) window.removeEventListener('click', this.windowClick)
    }

    componentWillUnmount = () => {
        window.removeEventListener('click', this.windowClick)
    }

    render(){
        const {screen, children, changeScreen, window} = this.props
        if(window) return <div style={{color: 'rgba(255,255,255,.3)'}}>click to continue</div>
        return(
            <button
                onClick={() => changeScreen(screen)}
            >
                {children}
            </button>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeScreen: (screen) => dispatch(changeScreen(screen)),
})

export default connect(
    null,
    mapDispatchToProps
)(ChangeScreenBtn)