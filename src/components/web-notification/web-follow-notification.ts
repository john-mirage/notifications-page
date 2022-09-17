import WebNotification from "@components/web-notification/web-notification";

class WebFollowNotification extends WebNotification {
  #followNotification?: AppData.Notification;
  #followLabelElement = document.createElement("span");

  constructor() {
    super();
    this.#followLabelElement.classList.add("web-notification__follow-label");
    this.#followLabelElement.textContent = "followed you";
  }

  get followNotification(): AppData.Notification {
    if (this.#followNotification) {
      return this.#followNotification;
    } else {
      throw new Error("The follow notification is not defined");
    }
  }

  set followNotification(newFollowNotification: AppData.Notification) {
    this.#followNotification = newFollowNotification;
    this.notification = {
      type: this.#followNotification.type,
      username: this.#followNotification.username,
      avatar: this.#followNotification.avatar,
      createdAt: this.#followNotification.createdAt,
      markedAsRead: this.#followNotification.markedAsRead
    }
    this.usernameElement.after(this.#followLabelElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("followNotification");
  }
}

export default WebFollowNotification;