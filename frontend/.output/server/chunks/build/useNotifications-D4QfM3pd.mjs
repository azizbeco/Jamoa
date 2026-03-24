import { a as useState } from './useAuth-Dd-17Ryf.mjs';

const useNotifications = () => {
  const notifications = useState("notifications", () => []);
  const addNotification = (notif) => {
    const id = Date.now();
    const newNotif = { id, type: "success", ...notif };
    notifications.value.push(newNotif);
    if (newNotif.timeout !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotif.timeout || 5e3);
    }
  };
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };
  return {
    notifications,
    addNotification,
    removeNotification
  };
};

export { useNotifications as u };
//# sourceMappingURL=useNotifications-D4QfM3pd.mjs.map
