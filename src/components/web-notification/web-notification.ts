class WebNotification extends HTMLLIElement {
  [key: string]: any;
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #notification?: AppData.Notification;
  avatarElement: HTMLImageElement;
  usernameElement: HTMLSpanElement;
  createdAtElement: HTMLSpanElement;
  indicatorElement: HTMLSpanElement;

  static get observedAttributes() {
    return ["marked-as-read"];
  }
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-notification");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.avatarElement = <HTMLImageElement>this.#templateFragment.querySelector('[data-id="web-notification-avatar"]');
    this.usernameElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-notification-username"]');
    this.createdAtElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-notification-created-at"]');
    this.indicatorElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-id="web-notification-indicator"]');
  }

  get markedAsRead(): boolean {
    return this.hasAttribute("marked-as-read");
  }

  set markedAsRead(isMarkedAsRead: boolean) {
    if (isMarkedAsRead) {
      this.setAttribute("marked-as-read", "");
    } else {
      this.removeAttribute("marked-as-read");
    }
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
    this.markedAsRead = this.#notification.markedAsRead;
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("web-notification", "web-notification--unread");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.upgradeProperty("marked-as-read");
    this.upgradeProperty("notification");
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "marked-as-read":
        const isMarkedAsRead = newValue !== null;
        if (isMarkedAsRead) {
          this.classList.remove("web-notification--unread");
        } else {
          this.classList.add("web-notification--unread");
        }
        break;
      default:
        throw new Error("The modified attribute is not watched");
    }
  }
}

export default WebNotification;