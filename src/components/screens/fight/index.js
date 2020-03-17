import React from 'react'
import CharacterSideBar from './CharacterSideBar'
import ActionList from './ActionList'
import FightContent from './FightContent'
import { Screen, Header, Content, Footer } from '../../screenHelpers'

const Fight = ({player, opponent, setMove, paused}) => (
    <Screen>
        <Header />
        <Content style={{display: 'flex', alignItems: 'flex-start'}}>
            <CharacterSideBar character={player} />
            <FightContent 
                player={player}
                opponent={opponent}
            />
            <CharacterSideBar character={opponent} />
        </Content>
        <Footer>
            <ActionList 
                player={player}
                setMove={setMove}
                paused={paused}
            />
        </Footer>
    </Screen>
)

export default Fight