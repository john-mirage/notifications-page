import WebCommentNotification from "@components/web-notification/web-comment-notification";
import WebFollowNotification from "@components/web-notification/web-follow-notification";
import WebGroupNotification from "@components/web-notification/web-group-notification";
import WebMessageNotification from "@components/web-notification/web-message-notification";
import WebNotification from "@components/web-notification/web-notification";
import WebReplyNotification from "@components/web-notification/web-reply-notification";
import notifications from "@data/notifications.json";

class WebApp extends HTMLElement {
  #webReplyNotification = <WebReplyNotification>document.createElement("li", { is: "web-reply-notification" });
  #webFollowNotification = <WebFollowNotification>document.createElement("li", { is: "web-follow-notification" });
  #webGroupNotification = <WebGroupNotification>document.createElement("li", { is: "web-group-notification" });
  #webMessageNotification = <WebMessageNotification>document.createElement("li", { is: "web-message-notification" });
  #webCommentNotification = <WebCommentNotification>document.createElement("li", { is: "web-comment-notification" });
  #webNotifications?: WebNotification[];
  #notifications?: AppData.Notification[];
  notificationListElement: HTMLUListElement;
  badgeElement: HTMLDivElement;
  buttonElement: HTMLButtonElement;

  static get observedAttributes() {
    return ["data-unread-notifications"];
  }
  
  constructor() {
    super();
    this.notificationListElement = <HTMLUListElement>this.querySelector('[data-id="web-app-notification-list"]');
    this.badgeElement = <HTMLDivElement>this.querySelector('[data-id="web-app-badge"]');
    this.buttonElement = <HTMLButtonElement>this.querySelector('[data-id="web-app-button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get unreadNotifications(): string | undefined {
    return this.dataset.unreadNotifications;
  }

  set unreadNotifications(newUnreadNotifications: string | undefined) {
    if (newUnreadNotifications) {
      this.dataset.unreadNotifications = newUnreadNotifications;
    } else {
      delete this.dataset.unreadNotifications;
    }
  }

  get webNotifications(): WebNotification[] {
    if (this.#webNotifications) {
      return this.#webNotifications;
    } else {
      throw new Error("The web notifications are not defined");
    }
  }

  set webNotifications(newWebNotifications: WebNotification[]) {
    this.#webNotifications = newWebNotifications;
    this.notificationListElement.replaceChildren(...this.#webNotifications);
  }

  get notifications(): AppData.Notification[] {
    if (this.#notifications) {
      return this.#notifications;
    } else {
      throw new Error("The notifications are not defined");
    }
  }

  set notifications(newNotifications: AppData.Notification[]) {
    this.#notifications = newNotifications;
    let unreadNotifications = 0;
    this.webNotifications = this.#notifications.map((notification) => {
      if (!notification.markedAsRead) unreadNotifications += 1;
      switch (notification.type) {
        case "reply":
          const webReplyNotification = <WebReplyNotification>this.#webReplyNotification.cloneNode(true);
          webReplyNotification.replyNotification = <AppData.ReplyNotification>notification;
          return webReplyNotification;
        case "follow":
          const webFollowNotification = <WebFollowNotification>this.#webFollowNotification.cloneNode(true);
          webFollowNotification.followNotification = <AppData.Notification>notification;
          return webFollowNotification;
        case "group":
          const webGroupNotification = <WebGroupNotification>this.#webGroupNotification.cloneNode(true);
          webGroupNotification.groupNotification = <AppData.GroupNotification>notification;
          return webGroupNotification;
        case "message":
          const webMessageNotification = <WebMessageNotification>this.#webMessageNotification.cloneNode(true);
          webMessageNotification.messageNotification = <AppData.MessageNotification>notification;
          return webMessageNotification;
        case "comment":
          const webCommentNotification = <WebCommentNotification>this.#webCommentNotification.cloneNode(true);
          webCommentNotification.commentNotification = <AppData.CommentNotification>notification;
          return webCommentNotification;
        default:
          throw new Error("The notification type is not valid");
      }
    });
    this.unreadNotifications = String(unreadNotifications);
  }

  connectedCallback() {
    this.notifications = notifications;
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-unread-notifications":
        const notificationCount = newValue ? newValue : "0";
        if (notificationCount === "0") {
          this.badgeElement.classList.add("web-app__badge--empty");
          if (!this.buttonElement.hasAttribute("disabled")) this.buttonElement.setAttribute("disabled", "");
        } else {
          this.badgeElement.textContent = notificationCount;
          this.badgeElement.classList.remove("web-app__badge--empty");
          if (this.buttonElement.hasAttribute("disabled")) this.buttonElement.removeAttribute("disabled");
        }
        break;
      default:
        throw new Error("The modified attribute is not watched");
    }
  }

  handleButtonClick() {
    this.webNotifications.forEach((webNotification) => {
      if (!webNotification.markedAsRead) webNotification.markedAsRead = true;
    });
    this.unreadNotifications = "0";
  }
}

 export default WebApp;