import {useState, useCallback, useEffect} from 'react';
import {setGlobalModules} from 'synth'

function useModules(initialModules = []) {
    const [modules, setModules] = useState(initialModules)
    
    useEffect(() => {
        setGlobalModules(modules)
    }, [modules])

    const updateModuleFunc = useCallback((func, funcIndex) => {
        setModules((prevModules) => {
          const theModule = prevModules[funcIndex]
          return [...prevModules.slice(0, funcIndex), {...theModule, func}, ...prevModules.slice(funcIndex + 1)]
    })
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
    const removeModule = useCallback((moduleIndex) => {
        setModules((prevModules) => (
                [...prevModules.slice(0, moduleIndex),  ...prevModules.slice(moduleIndex + 1)]
        ))
    }, modules)
    
    return {modules, addModule, removeModule, updateModuleFunc, updateModulePersistentState};
}

export default useModules