import {useState, useCallback, useEffect} from 'react';
import {setGlobalModules} from 'synth'

export let _modulesFuncs = []

function useModules(initialModules = []) {
    const [modules, setModules] = useState(initialModules)

    const updateModuleFunc = useCallback((func, type, index) => {
        const prevFunc = _modulesFuncs[index]
        const newModules = [..._modulesFuncs.slice(0, index), {...prevFunc, func, type}, ..._modulesFuncs.slice(index + 1)];
        _modulesFuncs = newModules
        setGlobalModules(newModules)
    })

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
    const removeModule = useCallback((moduleIndex) => {
        setModules((prevModules) => (
                [...prevModules.slice(0, moduleIndex),  ...prevModules.slice(moduleIndex + 1)]
        ))
    }, modules)
    
    return {modules, addModule, removeModule, updateModuleFunc, updateModulePersistentState};
}

export default useModules