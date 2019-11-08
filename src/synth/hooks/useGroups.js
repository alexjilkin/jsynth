import React, {useState, useCallback, useEffect} from 'react';
import {setGlobalGroups} from 'synth'
import {Oscilloscope} from 'modules'

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

    const addModuleToGroup = useCallback((theModule, groupIndex) => {
        setGroups((prevGroups) => {
            const group = prevGroups[groupIndex]

          return [...prevGroups.slice(0, groupIndex), 
            [...group, theModule]
            , ...prevGroups.slice(groupIndex + 1)]
        })
    })

    return {groups, addGroup, removeGroup, updateModuleFunc, updateModulePersistentState, addModuleToGroup};
}

export default useGroups