import React from 'react';
import ChannelList from './channelList';

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h3 href="#">
          <div>MSK Chat</div>
          <i alt="Brand" className="glyphicon glyphicon-comment" />
        </h3>
      </div>
      <h5>Channels</h5>
      <ChannelList />
    </section>
  );
};

export default Sidebar;
