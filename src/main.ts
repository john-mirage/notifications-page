import "./main.css";

import WebApp from "@components/web-app/web-app";
import WebReplyNotification from "@components/web-notification/web-reply-notification";
import WebFollowNotification from "@components/web-notification/web-follow-notification";
import WebGroupNotification from "@components/web-notification/web-group-notification";
import WebMessageNotification from "@components/web-notification/web-message-notification";
import WebCommentNotification from "@components/web-notification/web-comment-notification";

customElements.define("web-app", WebApp, { extends: "main" });
customElements.define("web-reply-notification", WebReplyNotification, { extends: "li" });
customElements.define("web-follow-notification", WebFollowNotification, { extends: "li" });
customElements.define("web-group-notification", WebGroupNotification, { extends: "li" });
customElements.define("web-message-notification", WebMessageNotification, { extends: "li" });
customElements.define("web-comment-notification", WebCommentNotification, { extends: "li" });