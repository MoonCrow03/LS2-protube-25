import React, { useEffect, useState } from 'react';
import TabPanel from './TabPanel';
import './Tabs.css';

interface UsernameProps {
    username: string;
}

type TabType = 'Videos' | 'Comments';

const TabButtons: React.FC<UsernameProps> = ({ username }) => {
    const [activeTab, setActiveTab] = useState<TabType>('Videos');

    const handleClick = (tab: TabType) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="container">
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'Videos' ? 'active' : ''}`}
                        onClick={() => handleClick('Videos')}
                    >
                        Videos
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'Comments' ? 'active' : ''}`}
                        onClick={() => handleClick('Comments')}
                    >
                        Comments
                    </button>
                </div>
                <div className="tabs-content">
                    {activeTab === 'Videos' && (
                        <div className="tab-page active">
                            <TabPanel username={username} tab={activeTab}/>
                        </div>
                    )}
                    {activeTab === 'Comments' && (
                        <div className="tab-page active">
                            <TabPanel username={username} tab={activeTab}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TabButtons;