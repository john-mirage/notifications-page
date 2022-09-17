import WebNotification from "@components/web-notification/web-notification";

class WebReplyNotification extends WebNotification {
  #post?: string;
  #postLabelElement = document.createElement("span");
  #postValueElement = document.createElement("span");
  
  constructor() {
    super();
    this.#postLabelElement.classList.add("web-notification__post", "web-notification__post--label");
    this.#postValueElement.classList.add("web-notification__post", "web-notification__post--value");
    this.#postLabelElement.textContent = "reacted to your recent post";
  }

  get post(): string {
    if (this.#post) {
      return this.#post;
    } else {
      throw new Error("The post is not defined");
    }
  }

  set post(newPost: string) {
    this.#post = newPost;
    this.#postValueElement.textContent = newPost;
    this.usernameElement.after(this.#postLabelElement, this.#postValueElement);
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("post");
  }
}

export default WebReplyNotification;