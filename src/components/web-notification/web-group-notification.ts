import WebNotification from "@components/web-notification/web-notification";

class WebGroupNotification extends WebNotification {
  #groupNotification?: AppData.GroupNotification;
  #groupLabelElement = document.createElement("span");
  #groupValueElement = document.createElement("a");

  constructor() {
    super();
    this.#groupLabelElement.classList.add("web-notification__group", "web-notification__group--label");
    this.#groupValueElement.classList.add("web-notification__group", "web-notification__group--value");
  }

  get groupNotification(): AppData.GroupNotification {
    if (this.#groupNotification) {
      return this.#groupNotification;
    } else {
      throw new Error("The group notification is not defined");
    }
  }

  set groupNotification(newGroupNotification: AppData.GroupNotification) {
    this.#groupNotification = newGroupNotification;
    this.notification = {
      type: this.#groupNotification.type,
      username: this.#groupNotification.username,
      avatar: this.#groupNotification.avatar,
      createdAt: this.#groupNotification.createdAt,
      markedAsRead: this.#groupNotification.markedAsRead
    }
    this.#groupLabelElement.textContent = this.#groupNotification.action;
    this.#groupValueElement.textContent = this.#groupNotification.group;
    this.#groupValueElement.setAttribute("href", "#");
    this.usernameElement.after(this.#groupLabelElement, this.#groupValueElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("groupNotification");
  }
}

export default WebGroupNotification;