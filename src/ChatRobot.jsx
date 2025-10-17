import React, { useEffect, useState } from 'react';
import styles from './robot.module.css';

export default function ChatRobotLauncher() {
  const [robotClosing, setRobotClosing] = useState(false);
  const [expandedRobot, setExpandedRobot] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleRobot = () => {
    if (showRobot) {
      closeRobot();
    } else {
      setShowRobot(true);
      setRobotClosing(false);
    }
  };

  const closeRobot = () => {
    setRobotClosing(true);
    setTimeout(() => {
      setShowRobot(false);
      setRobotClosing(false);
    }, 300);
  };

  const expandRobot = () => {
    setExpandedRobot((prev) => !prev);
  };

  // 获取设备信息
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/android|iphone|ipad|ipod|windows phone/i.test(userAgent));
  }, []);

  useEffect(() => {
    if (window.ChatRobot && ReactDOM?.render && React?.createElement) {
      ReactDOM.render(
        React.createElement(window.ChatRobot, {
          ROBOT_FETCH_URL: 'https://aibot.clougence.com/api/chat/stream',
          onClose: closeRobot,
          onExpand: expandRobot,
          showRobot
        }),
        document.getElementById('reactApp')
      );
    }
  }, [showRobot]);

  return (
    <>
      <div className={styles.robotWrap} onClick={toggleRobot}>
        {/* 可以把图标也抽到单独文件中 */}
        <svg t="1749093561314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4602" width="30" height="30"><path d="M576 85.333333c0 18.944-8.234667 35.968-21.333333 47.701334V213.333333h213.333333a128 128 0 0 1 128 128v426.666667a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V341.333333a128 128 0 0 1 128-128h213.333333V133.034667A64 64 0 1 1 576 85.333333zM256 298.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v426.666667a42.666667 42.666667 0 0 0 42.666667 42.666667h512a42.666667 42.666667 0 0 0 42.666667-42.666667V341.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H256z m-170.666667 128H0v256h85.333333v-256z m853.333334 0h85.333333v256h-85.333333v-256zM384 618.666667a64 64 0 1 0 0-128 64 64 0 0 0 0 128z m256 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128z" p-id="4603" fill="#ffffff"></path></svg>
      </div>
      <div
        className={`${styles.robotPanel} ${robotClosing ? styles.closing : ''} ${isMobile || expandedRobot ? styles.expanded : ''}`}
        style={{ display: showRobot ? 'block' : 'none' }}
      >
        <div id="reactApp" className={styles.reactApp}></div>
      </div>
    </>
  );
}
