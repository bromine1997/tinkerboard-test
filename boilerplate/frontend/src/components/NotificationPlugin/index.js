import Notifications from './Notifications.vue';

const NotificationStore = {
  state: [], // 여기서 알림이 관리됩니다
  settings: {
    overlap: false,
    verticalAlign: 'top',
    horizontalAlign: 'right',
    type: 'info',
    timeout: 5000,
    closeOnClick: true,
    showClose: true,
  },
  setOptions(options) {
    this.settings = Object.assign(this.settings, options);
  },
  removeNotification(timestamp) {
    const indexToDelete = this.state.findIndex((n) => n.timestamp === timestamp);
    if (indexToDelete !== -1) {
      this.state.splice(indexToDelete, 1);
    }
  },
  addNotification(notification) {
    if (typeof notification === 'string' || notification instanceof String) {
      notification = { message: notification };
    }
    notification.timestamp = new Date();
    notification.timestamp.setMilliseconds(notification.timestamp.getMilliseconds() + this.state.length);
    notification = Object.assign({}, this.settings, notification);
    this.state.push(notification);
  },
  notify(notification) {
    if (Array.isArray(notification)) {
      notification.forEach((notificationInstance) => {
        this.addNotification(notificationInstance);
      });
    } else {
      this.addNotification(notification);
    }
  },
};

const NotificationsPlugin = {
  install(app, options) {
    // Vue 3의 글로벌 속성 설정
    app.config.globalProperties.$notify = (notification) => {
      NotificationStore.notify(notification);
    };

    app.config.globalProperties.$notifications = NotificationStore;

    // Notifications 컴포넌트를 전역 컴포넌트로 등록
    app.component('Notifications', Notifications);

    // 플러그인 옵션 병합
    if (options) {
      NotificationStore.setOptions(options);
    }
  },
};

export default NotificationsPlugin;
