import React, {useEffect, useCallback, useState, useMemo} from 'react' 
import {
    isMobile
  } from "react-device-detect";
import './Keyboard.scss';
import {initKeyboardInput, virtualKeyboardKeyDown, virtualKeyboardKeyUp} from './utils'

// 1 for white, 0 for black
const octaveLayout = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1]
const indexToKey = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K', 'O', 'L']
const whiteKeyWidth = 40;
const blackKeyWidth = 25;

const Keyboard = ({numberOfOctaves = 2}) => {
    useEffect(() => {
        initKeyboardInput()
    }, [])
    
    const keyboardLayout = useMemo(() => getKeyboardLayout(numberOfOctaves), [numberOfOctaves])

    return (
        <div styleName="container" style={{gridAutoColumns: whiteKeyWidth}}>
            {keyboardLayout.map((value, index) =>
                value ? 
                    <WhiteKey key={index} index={index}/> :
                    <BlackKey key={index} index={index} keyboardLayout={keyboardLayout} />
            )}
        </div>
    )
}

const BlackKey = ({index, keyboardLayout}) => {
    const eventHandlers = useMemo(() => isMobile ? getTouchEvents(index) : getMouseEvents(index), [index])
    const numberOfWhiteKeysBefore = useMemo(() => getNumberOfWhiteKeysBefore(keyboardLayout, index), [index, keyboardLayout])

    return (
        <div 
            {...(eventHandlers)}
            styleName="black-key" 
            style={{left: `${(numberOfWhiteKeysBefore * whiteKeyWidth) - blackKeyWidth / 2}px`, width: blackKeyWidth}}
        >
            <span styleName="key-notation">{indexToKey[index] || ''}</span>
            <div styleName="white-line"></div>
        </div>
    )
}

const WhiteKey = ({index}) => {
    const [isPressed, setIsPressed] = useState(false)

    const getEventHandlers = useCallback(() => isMobile ? getTouchEvents(index) : getMouseEvents(index), [index])
    return (
        <div {...(getEventHandlers())} styleName="white-key">
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