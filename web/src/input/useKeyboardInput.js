import {useState, useEffect} from 'react' 
import {press, release, keyCodeToFrequencyModulation} from './KeyboardManager'
let isPlayingByKey = {};

export default () => {
    const [playingKeyCodes, setPlayingKeyCodes] = useState({})

    const initKeyboardInput = () => {
        window.addEventListener('keydown', (e) => {
            keyDown(e.keyCode)
        });
    
        window.addEventListener('keyup', (e) => {
            keyUp(e.keyCode)
        });
    }

    const keyDown = (keyCode) => {
        if (isPlayingByKey[keyCode]) {
            return;
        }
        
        const frequencyModulation = keyCodeToFrequencyModulation[keyCode]
    
        if (!frequencyModulation) {
            return;
        }
    
        press(frequencyModulation, keyCode)
        isPlayingByKey[keyCode] = true;

        setPlayingKeyCodes({...isPlayingByKey})
    }
    
    const keyUp = (keyCode) => {
    
        if (!isPlayingByKey[keyCode]) {
            return;
        }
        isPlayingByKey[keyCode] = false;
        release(keyCode);

        setPlayingKeyCodes({...isPlayingByKey})
    }

    useEffect(() => {
        initKeyboardInput()
    }, [])

    return [playingKeyCodes]
}