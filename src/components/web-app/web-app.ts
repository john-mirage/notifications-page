import WebCommentNotification from "@components/web-notification/web-comment-notification";
import WebFollowNotification from "@components/web-notification/web-follow-notification";
import WebGroupNotification from "@components/web-notification/web-group-notification";
import WebMessageNotification from "@components/web-notification/web-message-notification";
import WebNotification from "@components/web-notification/web-notification";
import WebReplyNotification from "@components/web-notification/web-reply-notification";
import notifications from "@data/notifications.json";

class WebApp extends HTMLElement {
  #webReplyNotification?: WebReplyNotification;
  #webFollowNotification?: WebFollowNotification;
  #webGroupNotification?: WebGroupNotification;
  #webMessageNotification?: WebMessageNotification;
  #webCommentNotification?: WebCommentNotification;
  notificationListElement: HTMLUListElement;
  notificationCountElement: HTMLDivElement;
  buttonElement: HTMLButtonElement;

  static get observedAttributes() {
    return ["unread-notifications"];
  }
  
  constructor() {
    super();
    this.notificationListElement = <HTMLUListElement>this.querySelector('[data-id="web-app-notification-list"]');
    this.notificationCountElement = <HTMLDivElement>this.querySelector('[data-id="web-app-notification-count"]');
    this.buttonElement = <HTMLButtonElement>this.querySelector('[data-id="web-app-button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get webReplyNotification(): WebReplyNotification {
    if (this.#webReplyNotification === undefined) {
      this.#webReplyNotification = <WebReplyNotification>document.createElement("li", { is: "web-reply-notification" });
    }
    return this.#webReplyNotification;
  }

  get webFollowNotification(): WebFollowNotification {
    if (this.#webFollowNotification === undefined) {
      this.#webFollowNotification = <WebFollowNotification>document.createElement("li", { is: "web-follow-notification" });
    }
    return this.#webFollowNotification;
  }

  get webGroupNotification(): WebGroupNotification {
    if (this.#webGroupNotification === undefined) {
      this.#webGroupNotification = <WebGroupNotification>document.createElement("li", { is: "web-group-notification" });
    }
    return this.#webGroupNotification;
  }

  get webMessageNotification(): WebMessageNotification {
    if (this.#webMessageNotification === undefined) {
      this.#webMessageNotification = <WebMessageNotification>document.createElement("li", { is: "web-message-notification" });
    }
    return this.#webMessageNotification;
  }

  get webCommentNotification(): WebCommentNotification {
    if (this.#webCommentNotification === undefined) {
      this.#webCommentNotification = <WebCommentNotification>document.createElement("li", { is: "web-comment-notification" });
    }
    return this.#webCommentNotification;
  }

  get unreadNotifications(): string | null {
    return this.getAttribute("unread-notifications");
  }

  set unreadNotifications(newUnreadNotifications: string | null) {
    if (newUnreadNotifications) {
      this.setAttribute("unread-notifications", newUnreadNotifications);
    } else {
      this.removeAttribute("unread-notifications");
    }
  }

  connectedCallback() {
    let unreadNotifications = 0;
    this.notificationListElement.replaceChildren(
      ...notifications.map((notification) => {
        if (!notification.markedAsRead) unreadNotifications += 1;
        switch (notification.type) {
          case "reply":
            const webReplyNotification = <WebReplyNotification>this.webReplyNotification.cloneNode(true);
            webReplyNotification.replyNotification = <AppData.ReplyNotification>notification;
            return webReplyNotification;
          case "follow":
            const webFollowNotification = <WebFollowNotification>this.webFollowNotification.cloneNode(true);
            webFollowNotification.followNotification = <AppData.Notification>notification;
            return webFollowNotification;
          case "group":
            const webGroupNotification = <WebGroupNotification>this.webGroupNotification.cloneNode(true);
            webGroupNotification.groupNotification = <AppData.GroupNotification>notification;
            return webGroupNotification;
          case "message":
            const webMessageNotification = <WebMessageNotification>this.webMessageNotification.cloneNode(true);
            webMessageNotification.messageNotification = <AppData.MessageNotification>notification;
            return webMessageNotification;
          case "comment":
            const webCommentNotification = <WebCommentNotification>this.webCommentNotification.cloneNode(true);
            webCommentNotification.commentNotification = <AppData.CommentNotification>notification;
            return webCommentNotification;
          default:
            throw new Error("The notification type is not valid");
        }
      })
    );
    this.unreadNotifications = String(unreadNotifications);
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "unread-notifications":
        const notificationCount = newValue ? newValue : "0";
        this.notificationCountElement.textContent = notificationCount;
        if (notificationCount === "0") {
          if (!this.buttonElement.hasAttribute("disabled")) {
            this.buttonElement.setAttribute("disabled", "");
          }
        } else if (this.buttonElement.hasAttribute("disabled")) {
          this.buttonElement.removeAttribute("disabled");
        }
        break;
      default:
        throw new Error("The modified attribute is not watched");
    }
  }

  handleButtonClick() {
    const webNotifications = <WebNotification[]>Array.from(this.notificationListElement.children);
    webNotifications.forEach((webNotification) => {
      if (!webNotification.markedAsRead) webNotification.markedAsRead = true;
    });
    this.unreadNotifications = "0";
  }
}

 export default WebApp;