namespace AppData {
  interface Notification {
    type: string;
    username: string;
    avatar: string;
    createdAt: string;
    markedAsRead: boolean;
  }

  interface ReplyNotification {
    post: string;
  }

  interface GroupNotification {
    action: string;
    group: string;
  }

  interface MessageNotification {
    message: string;
  }

  interface CommentNotification {
    picture: string;
  }
}