import WebNotification from "@components/web-notification/web-notification";

class WebReplyNotification extends WebNotification {
  #replyNotification?: AppData.ReplyNotification;
  #postLabelElement = document.createElement("span");
  #postValueElement = document.createElement("a");
  
  constructor() {
    super();
    this.#postLabelElement.classList.add("web-notification__post", "web-notification__post--label");
    this.#postValueElement.classList.add("web-notification__post", "web-notification__post--value");
    this.#postLabelElement.textContent = "reacted to your recent post";
  }

  get replyNotification(): AppData.ReplyNotification {
    if (this.#replyNotification) {
      return this.#replyNotification;
    } else {
      throw new Error("The reply notification is not defined");
    }
  }

  set replyNotification(newReplyNotification: AppData.ReplyNotification) {
    this.#replyNotification = newReplyNotification;
    this.notification = {
      type: this.#replyNotification.type,
      username: this.#replyNotification.username,
      avatar: this.#replyNotification.avatar,
      createdAt: this.#replyNotification.createdAt,
      markedAsRead: this.#replyNotification.markedAsRead
    }
    this.#postValueElement.textContent = this.#replyNotification.post;
    this.#postValueElement.setAttribute("href", "#");
    this.usernameElement.after(this.#postLabelElement, this.#postValueElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("replyNotification");
  }
}

export default WebReplyNotification;