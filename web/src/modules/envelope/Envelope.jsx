import React, {useEffect, useRef, useState} from 'react' 
import {addModule, updateArgs} from '../../output/browserPlayer'
import './Envelope.scss'

const Envelope = () => { 
    const id = useRef()

    useEffect(() => {
      id.current = addModule('envalope', 'monoTransform')
    }, [])

    return (
        <div styleName="container">
            Envelope.
        </div>
    )
}

export default Envelope