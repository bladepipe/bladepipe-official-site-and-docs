// 机器人配置
// 详见：https://aibot.clougence.com/

// TODO:: 需要根据品牌动态获取apiUrl
// const brand = process.env.SITE_BRAND || 'clougence';
const brand = 'clougence';
const avatar = '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '<path d="M40.1211 8.04004H37.7711V10.39H40.1211V8.04004Z" fill="#0087C7"/>\n' +
  '<path d="M42.2711 11.1602H39.181V14.2502H42.2711V11.1602Z" fill="#0087C7"/>\n' +
  '<path d="M44.821 14.1602H43.371V15.6101H44.821V14.1602Z" fill="#0087C7"/>\n' +
  '<path d="M49.3709 13.7598H48.2909V14.8398H49.3709V13.7598Z" fill="#0087C7"/>\n' +
  '<path d="M49.1808 8.88965H48.5309V9.53964H49.1808V8.88965Z" fill="#0087C7"/>\n' +
  '<path d="M47.0109 11.04H44.5109V13.54H47.0109V11.04Z" fill="#0087C7"/>\n' +
  '<path d="M46.4409 5.80957H43.2809V8.96957H46.4409V5.80957Z" fill="#0087C7"/>\n' +
  '<path d="M50.7908 5.91992H49.0109V7.69992H50.7908V5.91992Z" fill="#0087C7"/>\n' +
  '<path d="M41.991 8.71973H41.121V9.58972H41.991V8.71973Z" fill="#0087C7"/>\n' +
  '<path d="M41.481 4.9502H39.621V6.81018H41.481V4.9502Z" fill="#0087C7"/>\n' +
  '<path d="M40.1211 47.4805H37.7711V49.8304H40.1211V47.4805Z" fill="#0087C7"/>\n' +
  '<path d="M42.2711 50.5996H39.181V53.6896H42.2711V50.5996Z" fill="#0087C7"/>\n' +
  '<path d="M44.821 53.5996H43.371V55.0496H44.821V53.5996Z" fill="#0087C7"/>\n' +
  '<path d="M49.3709 53.2002H48.2909V54.2802H49.3709V53.2002Z" fill="#0087C7"/>\n' +
  '<path d="M49.1808 48.3301H48.5309V48.9801H49.1808V48.3301Z" fill="#0087C7"/>\n' +
  '<path d="M47.0109 50.4902H44.5109V52.9902H47.0109V50.4902Z" fill="#0087C7"/>\n' +
  '<path d="M37.0909 46.6898H38.0909V45.6898H36.6009V45.8798H34.6709V45.6898H33.8509C29.7409 45.6898 26.7109 44.9098 24.7809 43.3598C22.0209 41.1398 20.6409 36.4498 20.6409 29.2898C20.6409 23.9565 21.5375 20.2898 23.3309 18.2898C25.4509 15.8232 28.8342 14.5898 33.4809 14.5898H36.1009V13.0898H38.1009V11.3298H37.1009V7.25983H38.1009V5.91981H36.6109V6.42982H34.6809V5.91981H32.2609C29.2306 5.87031 26.2064 6.20634 23.2609 6.91981V7.49982H22.1309V7.23981C21.2117 7.53199 20.3158 7.89303 19.4509 8.31983C16.0594 10.1229 13.3852 13.0299 11.8709 16.5598C9.99828 20.8678 9.09369 25.5342 9.22088 30.2298C9.22088 39.3698 11.5542 45.9498 16.2209 49.9698C18.005 51.558 20.1242 52.7236 22.4209 53.3798C25.5003 54.0987 28.6601 54.4147 31.8209 54.3198H36.1009V52.5498H38.1009V50.7798H37.1009L37.0909 46.6898ZM34.7009 8.91981H35.8909V10.0898H34.7009V8.91981ZM34.8809 10.7398V13.4098H32.2109V10.7398H34.8809ZM31.7909 6.82981H33.7209V8.75983H31.7909V6.82981ZM27.7909 8.31983H31.1409V11.6698H27.8309L27.7909 8.31983ZM27.1009 13.3198H28.2209V14.4498H27.1009V13.3198ZM25.1009 7.23981H26.4909V8.63981H25.1009V7.23981ZM23.3109 11.2398H25.1309V13.0898H23.3109V11.2398ZM21.4409 16.7398H20.8809V16.1898H21.4409V16.7398ZM20.6409 9.17982H21.4209V9.94981H20.6409V9.17982ZM22.3009 48.9898H21.5309V48.2098H22.3009V48.9898ZM22.4509 45.2298H21.3209V44.0898H22.4509V45.2298ZM25.1309 52.4998H23.3109V50.6798H25.1309V52.4998ZM26.4909 48.0698H25.1009V46.6798H26.4909V48.0698ZM28.2109 53.8798H27.0909V52.7598H28.2109V53.8798ZM31.1309 51.0898H27.8309V47.7398H31.1809L31.1309 51.0898ZM31.7409 48.1798V46.2598H33.6709V48.1798H31.7409ZM34.8309 52.8398H32.1609V50.1898H34.8309V52.8398ZM35.8309 49.5298H34.6409V48.3398H35.8309V49.5298Z" fill="#0087C7"/>\n' +
  '<path d="M46.4409 45.25H43.2809V48.41H46.4409V45.25Z" fill="#0087C7"/>\n' +
  '<path d="M50.7908 45.3604H49.0109V47.1404H50.7908V45.3604Z" fill="#0087C7"/>\n' +
  '<path d="M41.991 48.1602H41.121V49.0302H41.991V48.1602Z" fill="#0087C7"/>\n' +
  '<path d="M41.481 44.3896H39.621V46.2496H41.481V44.3896Z" fill="#0087C7"/>\n' +
  '</svg>\n';

let botName = '';
let botAvatar = '';
let apiUrl;
switch (brand) {
  case 'clougence':
    apiUrl = 'https://aibot.clougence.com/';
    botName = 'CloudCanal 技术支持';
    botAvatar = avatar;
    break;
  case 'clouddm':
    apiUrl = '';
    botName = '';
    botAvatar = '';
    break;
    case 'bladepipe':
    botName = '';
    botAvatar = '';
    break;
  default:
    apiUrl = '';
    break;
}

window.aiBotConfig = {
  botName,
  apiUrl,
  botAvatar,
  presetButtons: [
    {
        type: 'contact',
        html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        联系方式`
    },
    {
        type: 'quickstart',
        html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        快速开始`
    },
    {
        type: 'hotlinks',
        html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
        热门链路`
    }
  ],
  // 预设按钮处理函数
  presetButtonHandlers: {
      contact: function(type) {
          const contactMessage = `📞 **联系我们**

  - 商业洽谈: 0571-88603096
  - 邮箱: \`hr@clougence.com\`
  - 商务合作: \`sales@clougence.com\`
  - 人才招聘: \`hr@clougence.com\`

  如有任何问题，欢迎随时联系我们！`;

          // 使用ai-bot的内部函数发送机器人消息
          if (window.aiBotAddMessage) {
              window.aiBotAddMessage('bot', contactMessage, { skipHistory: true });
          }
      },
      quickstart: function(type) {
          const quickstartMessage = `🚀 **快速开始指南**

  5分钟快速上手 ClouGence 数据同步平台

  **部署方式：**
  - [私有部署](https://www.clougence.com/docs/quick/quick_start) 
  - [CLOUD](https://www.clougence.com/docs/quick/quick_start_byoc) 

  点击上方链接查看详细文档，或告诉我您想了解的具体内容！`;

          if (window.aiBotAddMessage) {
              window.aiBotAddMessage('bot', quickstartMessage, { skipHistory: true });
          }
      },
      hotlinks: function(type) {
          const hotlinksMessage = `🔗 **热门数据同步链路**

  - MySQL → Elasticsearch
  - Oracle → StarRocks  
  - PostgreSQL → Kafka
  - Redis → Redis
  - ......

  更多链路支持请说出你的需求，或者自行<a href="https://www.clougence.com/docs/dataMigrationAndSync/connection/mysql2" target='__blank'>查阅文档</a>
  `;

          if (window.aiBotAddMessage) {
              window.aiBotAddMessage('bot', hotlinksMessage, { skipHistory: true });
          }
      }
  }
};
