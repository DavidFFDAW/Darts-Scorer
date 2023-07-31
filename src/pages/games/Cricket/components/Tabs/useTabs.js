import { useState } from 'react';

export default function useTabs() {
    const cricketTabs = {
        points: '2acfcd4e0',
        board: '4e80e91da',
    };

    const [activeTab, setActiveTab] = useState(cricketTabs.points);

    const setTab = newTab => {
        if (activeTab !== newTab) {
            setActiveTab(newTab);
        }
    };

    return {
        tabs: cricketTabs,
        activeTab,
        setActiveTab,
        setTab,
    };
}
