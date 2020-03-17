import React from 'react'

const StatBar = ({character, stat}) => (
    <div key={stat}>
        {stat}: {character[stat]}
    </div>
)

export default StatBar