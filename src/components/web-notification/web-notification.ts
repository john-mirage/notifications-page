class WebNotification extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #notification?: AppData.Notification;
  avatarElement: HTMLImageElement;
  usernameElement: HTMLSpanElement;
  createdAtElement: HTMLSpanElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-notification");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.avatarElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-notification-avatar"]');
    this.usernameElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-notification-username"]');
    this.createdAtElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-notification-created-at"]');
  }

  get notification(): AppData.Notification {
    if (this.#notification) {
      return this.#notification;
    } else {
      throw new Error("The notification is not defined");
    }
  }

  set notification(newNotification: AppData.Notification) {
    this.#notification = newNotification;
    this.avatarElement.setAttribute("src", this.#notification.avatar);
    this.avatarElement.setAttribute("alt", this.#notification.username);
    this.usernameElement.textContent = this.#notification.username;
    this.createdAtElement.textContent = this.#notification.createdAt;
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-notification");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("notification");
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}

export default WebNotification;