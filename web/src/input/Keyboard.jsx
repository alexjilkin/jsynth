import React, {useCallback, useState, useMemo} from 'react' 
import {
    isMobile
  } from "react-device-detect";
import './Keyboard.scss';
import {virtualKeyboardKeyDown, virtualKeyboardKeyUp} from './KeyboardManager'
import useKeyboardInput from './useKeyboardInput'
import {octaveLayout, indexToKey, keyCodeToIndex, whiteKeyWidth, blackKeyWidth} from './consts'

const Keyboard = ({numberOfOctaves = 2}) => {
    const keyboardLayout = useMemo(() => getKeyboardLayout(numberOfOctaves), [numberOfOctaves])
    const [playingKeysByKeycode] = useKeyboardInput()

    const playingKeyCodes = useMemo(() => Object.keys(playingKeysByKeycode).filter(keyCode => playingKeysByKeycode[keyCode]).map(keyCode => parseInt(keyCode)), [playingKeysByKeycode])

    return (
        <div styleName="container" style={{gridAutoColumns: whiteKeyWidth}}>
            {keyboardLayout.map((value, index) =>
                value ? 
                    <WhiteKey key={index} isPressed={playingKeyCodes.some(playingKeyCode => keyCodeToIndex.indexOf(playingKeyCode) === index)} index={index}/> :
                    <BlackKey key={index} isPressed={playingKeyCodes.some(playingKeyCode => keyCodeToIndex.indexOf(playingKeyCode) === index)} index={index} keyboardLayout={keyboardLayout} />
            )}
        </div>
    )
}

const BlackKey = ({index, isPressed, keyboardLayout}) => {
    const eventHandlers = useMemo(() => isMobile ? getTouchEvents(index) : getMouseEvents(index), [index])
    const numberOfWhiteKeysBefore = useMemo(() => getNumberOfWhiteKeysBefore(keyboardLayout, index), [index, keyboardLayout])

    return (
        <div 
            {...(eventHandlers)}
            styleName="black-key" 
            style={{left: `${(numberOfWhiteKeysBefore * whiteKeyWidth) - blackKeyWidth / 2}px`, width: blackKeyWidth, backgroundColor: isPressed ? 'grey' : 'black'}}
        >
            <span styleName="key-notation">{indexToKey[index] || ''}</span>
            <div styleName="white-line"></div>
        </div>
    )
}

const WhiteKey = ({index, isPressed}) => {
    const getEventHandlers = useCallback(() => isMobile ? getTouchEvents(index) : getMouseEvents(index), [index])
    return (
        <div {...(getEventHandlers())} styleName="white-key" style={{backgroundColor: isPressed ? 'lightgrey' : 'white'}}>
            <span styleName="key-notation">{indexToKey[index] || ''}</span>
        </div>
    )
}

const getMouseEvents = (index) => ({
    onMouseDown: () => virtualKeyboardKeyDown(index), onMouseUp: () => virtualKeyboardKeyUp(index), onMouseLeave: () => virtualKeyboardKeyUp(index)
})

const getTouchEvents = (index) => ({
    onTouchStart: () => virtualKeyboardKeyDown(index), onTouchEnd: () => virtualKeyboardKeyUp(index)
})

const getKeyboardLayout = (numberOfOctaves) => {
    let keyboardLayout = []
    for (let index = 0; index < numberOfOctaves; index++) {
        keyboardLayout = keyboardLayout.concat(octaveLayout)
    }

    return keyboardLayout;
}

const getNumberOfWhiteKeysBefore = (keyboardLayout, index) => keyboardLayout.slice(0, index).reduce((acc, value) => acc + value, 0)

export default Keyboard