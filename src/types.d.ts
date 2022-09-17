namespace AppData {
  interface Notification {
    type: string;
    username: string;
    avatar: string;
    createdAt: string;
    markedAsRead: boolean;
  }

  interface ReplyNotification extends Notification {
    post: string;
  }

  interface GroupNotification extends Notification {
    action: string;
    group: string;
  }

  interface MessageNotification extends Notification {
    message: string;
  }

  interface CommentNotification extends Notification {
    picture: string;
  }
}