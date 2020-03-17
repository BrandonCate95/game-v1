import { combineReducers } from 'redux'
import screen from './screen'
import characters from './characters'
import time from './time'

export default combineReducers({
  screen,
  characters,
  time
})