import {useState, useCallback, useEffect} from 'react';
import {setGlobalModules} from 'synth'

export let _modulesFuncs = []

function useModules(initialModules = []) {
    const [modules, setModules] = useState(initialModules)

    const updateModuleFunc = useCallback((func, type, index) => {
        const prevFunc = _modulesFuncs[index]
        _modulesFuncs = [..._modulesFuncs.slice(0, index), {...prevFunc, func, type}, ..._modulesFuncs.slice(index + 1)];
        setGlobalModules(_modulesFuncs)
    })

    const removeModuleFunc = useCallback((index) => {
        _modulesFuncs = [..._modulesFuncs.slice(0, index),  ..._modulesFuncs.slice(index + 1)]
        setGlobalModules(_modulesFuncs)
    }, [modules])

    const updateModulePersistentState = useCallback((persistentState, funcIndex) => {
        setModules((prevModules) => {
          const theModule = prevModules[funcIndex]
          return [...prevModules.slice(0, funcIndex), {...theModule, persistentState}, ...prevModules.slice(funcIndex + 1)]
    })

    }, [modules])

    const addModule = useCallback((theModule, moduleIndex) => {
        setModules((prevModules) => (
                [...prevModules.slice(0, moduleIndex), {...theModule}, ...prevModules.slice(moduleIndex)]
        ))
    }, [modules])
    const removeModule = useCallback((index) => {
        setModules((prevModules) => (
                [...prevModules.slice(0, index),  ...prevModules.slice(index + 1)]
        ))

        removeModuleFunc(index)
    }, [modules])
    
    return {modules, addModule, removeModule, updateModuleFunc, updateModulePersistentState};
}

export default useModules