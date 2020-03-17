import React from 'react'
import { connect } from 'react-redux'
import textData from '../data/text'

const ScreenPicker = ({screen, popup}) => (
    <React.Fragment>
        {screen}
        {/* {popups.map(popup => 

        )} */}
        {popup}
    </React.Fragment>
)

const mapStateToProps = state => ({
    screen: textData[state.screen[state.screen.length - 1].main].screen(state),
    popups: state.popup
})

export default connect(
    mapStateToProps,
    null
)(ScreenPicker)