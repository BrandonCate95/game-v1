import React from 'react'
import { connect } from 'react-redux'
import { back } from '../../actions'

const BackBtn = ({back, children}) => (
    <button onClick={() => back()}>
        {children}
    </button>
)

const mapDispatchToProps = dispatch => ({
    back: (screen) => dispatch(back()),
})

export default connect(
    null,
    mapDispatchToProps
)(BackBtn)