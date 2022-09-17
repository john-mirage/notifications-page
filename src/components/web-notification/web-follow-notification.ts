import WebNotification from "@components/web-notification/web-notification";

class WebFollowNotification extends WebNotification {
  #initialMount = true;
  #followLabelElement = document.createElement("span");

  constructor() {
    super();
    this.#followLabelElement.classList.add("web-notification__follow-label");
    this.#followLabelElement.textContent = "followed you";
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.#initialMount) {
      this.usernameElement.after(this.#followLabelElement);
      this.#initialMount = false;
    }
  }
}

export default WebFollowNotification;