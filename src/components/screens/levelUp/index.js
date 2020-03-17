import React from 'react'
import { Screen, Header, Content, Footer, BackBtn } from '../../screenHelpers'

class LevelUp extends React.Component{

    state = {}

    addStatPoint = (key) => {
        const value = this.state[key] || null
        this.setState({[key]: value ? value + 1 : 1})
        this.props.playerChange({ [key]: 1, statPoints: -1 })
    }

    subtractStatPoint = (key) => {
        const value = this.state[key] || null
        this.setState({[key]: value - 1})
        this.props.playerChange({ [key]: -1, statPoints: 1 })
    }

    render(){
        const {stats, statPoints} = this.props
        return(
            <Screen>
                <Header />

                <Content style={{flexDirection: 'column'}}>
                    {Object.entries(stats).map(([key, value]) =>
                        <div key={key}>
                            {key}: {value}
                            {statPoints > 0 &&
                                <button
                                    onClick={() => this.addStatPoint(key)}
                                >+</button>
                            }
                            {this.state[key] > 0 &&
                                <button
                                    onClick={() => this.subtractStatPoint(key)}
                                >-</button>
                            }
                        </div>
                    )}
                </Content>

                <Footer>
                    <BackBtn>
                        Back
                    </BackBtn>
                </Footer>
            </Screen>
        )
    }
}

export default LevelUp