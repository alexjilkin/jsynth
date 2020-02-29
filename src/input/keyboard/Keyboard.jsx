import React, {useEffect} from 'react' 
import {
    isMobile
  } from "react-device-detect";
import './Keyboard.scss';
import {initKeyboardInput, mouseDown, mouseUp} from './utils'

const keyboardLayout = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1]

const Keyboard = ({onKeyDown, onKeyUp}) => {
    useEffect(() => {
        initKeyboardInput()
    }, [])
    return (
        <div styleName="container">
            {keyboardLayout.map((value, index) =>
                value ? 
                    <div styleName="white-key" 
                        {...(isMobile ? getTouchEvents(index) : getMouseEvents(index))}
                    > </div> :
                    <div {...(isMobile ? getTouchEvents(index) : getMouseEvents(index))}
                    styleName="black-key" style={{left: `${(numberOfWhiteKeysBefore(index) * 50) - 15}px`}}> </div>
            )}
        </div>
    )
}

const getMouseEvents = (index) => ({
    onMouseDown: () => mouseDown(index), onMouseUp: () => mouseUp(index)
})

const getTouchEvents = (index) => ({
    onTouchStart: () => mouseDown(index), onTouchEnd: () => mouseUp(index)
})




const numberOfWhiteKeysBefore = (index) => keyboardLayout.slice(0, index).reduce((acc, value) => acc + value, 0)

export default Keyboard