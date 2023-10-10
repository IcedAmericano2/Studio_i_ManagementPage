import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const useProject = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};

export const ProjectProvider = ({ children }) => {
    const [projectIdData, setProjectId] = useState(0);
    const setProject = (projectId) => {
        console.log("여기가 context : "+projectId);
        setProjectId(projectId);

        console.log("여기가 context222 : "+projectIdData);
    };

    // projectIdData가 업데이트될 때마다 실행되는 useEffect
    useEffect(() => {
        console.log("여기가 useEffect : " + projectIdData);
        // projectIdData가 변경될 때 수행할 작업을 여기에 추가
    }, [projectIdData]); // projectIdData가 변경될 때만 실행


    const contextValue = {
        projectIdData, // 보드에게 보내기
        setProject, // 저장 하는것.  프로젝트에서 가져온것
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};