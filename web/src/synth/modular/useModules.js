import {useState, useCallback, useEffect} from 'react';
import {getModules, setModules} from '@jsynth/core/synth'

function useModules(initialModules = []) {
    const [modules, setModulesState] = useState(initialModules)

    useEffect(() => {
        getModules().subscribe((newModules) => setModulesState(newModules))
    }, [])

    const setModuleFunc = useCallback((func, type, index) => {
        setModulesState(preModules => {
            const prevModule = preModules[index] || {}
            const nextModules = [...preModules.slice(0, index), {...prevModule, func, type}, ...preModules.slice(index + 1)];
            setModules(nextModules)
            return nextModules
        })
    }, [modules])

    const setModulePersistentState = useCallback((persistentState, funcIndex) => {
        setModulesState(preModules => {
            const prevModule = preModules[funcIndex] || {}
            const nextModules = [...preModules.slice(0, funcIndex), {...prevModule, persistentState}, ...preModules.slice(funcIndex + 1)]
            setModules(nextModules)
            return nextModules
        })
       
    }, [modules])

    const addModule = useCallback((theModule, moduleIndex) => {
        setModulesState((prevModules) => (
                [...prevModules.slice(0, moduleIndex), {...theModule}, ...prevModules.slice(moduleIndex)]
        ))
    }, [modules])
    
    const removeModule = useCallback((index) => {
        setModulesState((prevModules) => (
                [...prevModules.slice(0, index),  ...prevModules.slice(index + 1)]
        ))

        removeModuleFunc(index)
    }, [modules])
    
    return {modules, setModuleFunc, setModulePersistentState, addModule, removeModule};
}

export default useModules