import React, {useState, useCallback, useEffect, createContext} from 'react';
import {setGlobalGroups} from 'synth'

function useGroups(initialGroups = []) {
    const [groups, setGroups] = useState(initialGroups)

    const addGroup = useCallback((group = []) => {
        setGroups([...groups.slice(0, groups.length - 1), group, ...groups.slice(length - 1)])
    }, [groups])

    const removeGroup = useCallback((index) => {
        setGroups([...groups.slice(0, index), ...groups.slice(index + 1)])
    }, [groups])
    
    useEffect(() => {
        setGlobalGroups(groups)
    }, [groups])

    const updateModuleFunc = useCallback((func, groupIndex, funcIndex) => {
        setGroups((prevGroups) => {
          const group = prevGroups[groupIndex]
          const theModule = group[funcIndex]

          return [...prevGroups.slice(0, groupIndex), 
            [...group.slice(0, funcIndex), {...theModule, func}, ...group.slice(funcIndex + 1)]
        , ...prevGroups.slice(groupIndex + 1)]
    })

    }, [groups])


    const updateModulePersistentState = useCallback((persistentState, groupIndex, funcIndex) => {
        setGroups((prevGroups) => {
          const group = prevGroups[groupIndex]
          const theModule = group[funcIndex]

          return [...prevGroups.slice(0, groupIndex), 
            [...group.slice(0, funcIndex), {...theModule, persistentState}, ...group.slice(funcIndex + 1)]
        , ...prevGroups.slice(groupIndex + 1)]
    })

    }, [groups])

    const addModuleToGroup = useCallback((theModule, groupIndex, moduleIndex) => {
        setGroups((prevGroups) => {
            const group = prevGroups[groupIndex]
            moduleIndex = typeof moduleIndex === "undefined" ? group.length : moduleIndex;

            return [...prevGroups.slice(0, groupIndex), 
                [...group.slice(0, moduleIndex), {...theModule}, ...group.slice(moduleIndex)]
                , ...prevGroups.slice(groupIndex + 1)]
        })
    })
    const removeModuleFromGroup = useCallback((groupIndex, moduleIndex) => {
        setGroups((prevGroups) => {
            const group = prevGroups[groupIndex]

          return [...prevGroups.slice(0, groupIndex), 
            [...group.slice(0, moduleIndex), ...group.slice(moduleIndex + 1)]
            , ...prevGroups.slice(groupIndex + 1)]
        })
    })
    
    return {groups, addGroup, removeGroup, updateModuleFunc, updateModulePersistentState, addModuleToGroup, removeModuleFromGroup};
}

export default useGroups