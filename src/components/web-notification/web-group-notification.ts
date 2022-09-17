import WebNotification from "@components/web-notification/web-notification";

interface Group {
  action: string;
  group: string;
}

class WebGroupNotification extends WebNotification {
  #group?: Group;
  #groupLabelElement = document.createElement("span");
  #groupValueElement = document.createElement("a");

  constructor() {
    super();
    this.#groupLabelElement.classList.add("web-notification__group", "web-notification__group--label");
    this.#groupValueElement.classList.add("web-notification__group", "web-notification__group--value");
  }

  get group(): Group {
    if (this.#group) {
      return this.#group;
    } else {
      throw new Error("The group is not defined");
    }
  }

  set group(newGroup: Group) {
    this.#group = newGroup;
    this.#groupLabelElement.textContent = this.#group.action;
    this.#groupValueElement.textContent = this.#group.group;
    this.#groupValueElement.setAttribute("href", "#");
    this.usernameElement.after(this.#groupLabelElement, this.#groupValueElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("group");
  }
}

export default WebGroupNotification;