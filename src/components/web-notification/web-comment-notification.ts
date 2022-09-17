import WebNotification from "@components/web-notification/web-notification";

class WebCommentNotification extends WebNotification {
  #commentNotification?: AppData.CommentNotification;
  #commentLabelElement: HTMLSpanElement = document.createElement("span");
  #commentPictureElement: HTMLImageElement = document.createElement("img");

  constructor() {
    super();
    this.#commentLabelElement.classList.add("web-notification__comment-label");
    this.#commentPictureElement.classList.add("web-notification__comment-picture");
    this.#commentPictureElement.setAttribute("draggable", "false");
    this.#commentLabelElement.textContent = "commented on your picture";
  }

  get commentNotification(): AppData.CommentNotification {
    if (this.#commentNotification) {
      return this.#commentNotification;
    } else {
      throw new Error("The comment notification is not defined");
    }
  }

  set commentNotification(newCommentNotification: AppData.CommentNotification) {
    this.#commentNotification = newCommentNotification;
    this.notification = {
      type: this.#commentNotification.type,
      username: this.#commentNotification.username,
      avatar: this.#commentNotification.avatar,
      createdAt: this.#commentNotification.createdAt,
      markedAsRead: this.#commentNotification.markedAsRead
    }
    this.#commentPictureElement.setAttribute("src", this.#commentNotification.picture);
    this.usernameElement.after(this.#commentLabelElement);
    this.append(this.#commentPictureElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("commentNotification");
  }
}

export default WebCommentNotification;