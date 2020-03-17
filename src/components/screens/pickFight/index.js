import React from 'react'
import OpponentsList from './OpponentsList'
import { Screen, Header, Content, Footer } from '../../screenHelpers'

const PickFight = ({opponents, startFight}) => (
    <Screen>
        <Header />
        <Content style={{flexDirection: 'column'}}>
            Pick someone to fight!
            <OpponentsList 
                opponents={opponents}
                startFight={startFight}
            />
        </Content>
        <Footer></Footer>
    </Screen>
)

export default PickFight