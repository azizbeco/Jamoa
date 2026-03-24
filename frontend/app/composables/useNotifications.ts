export const useNotifications = () => {
    const notifications = useState<any[]>('notifications', () => [])

    const addNotification = (notif: { message: string, type?: 'success' | 'error', title?: string, timeout?: number }) => {
        const id = Date.now()
        const newNotif = { id, type: 'success', ...notif }
        notifications.value.push(newNotif)

        if (newNotif.timeout !== 0) {
            setTimeout(() => {
                removeNotification(id)
            }, newNotif.timeout || 5000)
        }
    }

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    return {
        notifications,
        addNotification,
        removeNotification
    }
}
