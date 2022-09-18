import WebNotification from "@components/web-notification/web-notification";

class WebMessageNotification extends WebNotification {
  #messageNotification?: AppData.MessageNotification;
  #messageLabelElement: HTMLSpanElement = document.createElement("span");
  #messageValueElement: HTMLAnchorElement = document.createElement("a");

  constructor() {
    super();
    this.#messageLabelElement.classList.add("web-notification__message-label");
    this.#messageValueElement.classList.add("web-notification__message-link");
    this.#messageLabelElement.textContent = "sent you a private message";
  }

  get messageNotification(): AppData.MessageNotification {
    if (this.#messageNotification) {
      return this.#messageNotification;
    } else {
      throw new Error("The message notification is not defined");
    }
  }

  set messageNotification(newMessageNotification: AppData.MessageNotification) {
    this.#messageNotification = newMessageNotification;
    this.notification = {
      type: this.#messageNotification.type,
      username: this.#messageNotification.username,
      avatar: this.#messageNotification.avatar,
      createdAt: this.#messageNotification.createdAt,
      markedAsRead: this.#messageNotification.markedAsRead
    }
    this.#messageValueElement.textContent = this.#messageNotification.message;
    this.#messageValueElement.setAttribute("href", "#");
    this.usernameElement.after(" ", this.#messageLabelElement);
    this.createdAtElement.after(this.#messageValueElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("messageNotification");
  }
}

export default WebMessageNotification;