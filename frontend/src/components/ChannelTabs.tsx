import React, { useState } from 'react';

interface TabsProps {
    onTabChange: (tab: string) => void;
    activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ onTabChange, activeTab }) => {
    const handleTabClick = (tab: string) => {
        onTabChange(tab);
    };

    return (
        <div className="tab-buttons">
            <button onClick={() => handleTabClick('Videos')} className={activeTab === 'Videos' ? 'active' : ''}>
                Videos
            </button>
            <button onClick={() => handleTabClick('Comments')} className={activeTab === 'Comments' ? 'active' : ''}>
                Comments
            </button>
        </div>
    );
};

export default Tabs;
