// refactored from https://github.com/Dlogon/tailwind-alerts/blob/main/resources/views/components/tailwind-alert.blade.php

const closeDiv = function (ev: Event) {
  var divToCloseId = ev.target
    ? (ev.target as HTMLElement).dataset.alertId
    : null;

  if (!divToCloseId) {
    return;
  }
  setTimeout(function () {
    const div = document.getElementById(divToCloseId);
    div.remove();
  }, 1000);
};

const AlertToast: {
  BOTTOM_TOAST_CONTAINER: string;
  TOP_TOAST_CONTAINER: string;
  FOOTER_CONTAINER: string;
  HEADER_CONTAINER: string;
  TOAST_TEMPLATE: string;
  LINE_TEMPLATE: string;
  SUCCESS: string;
  ERROR: string;
  WARNING: string;
  INFO: string;
  showToast: (
    this: typeof AlertToast,
    message: string,
    level: string,
    container?: string,
    template?: string
  ) => void;

  randomDivId: () => string;
} = {
  BOTTOM_TOAST_CONTAINER: "bottom_toast_container",
  TOP_TOAST_CONTAINER: "top_toast_container",
  FOOTER_CONTAINER: "footer_container",
  HEADER_CONTAINER: "header_container",
  TOAST_TEMPLATE: "toast_template",
  LINE_TEMPLATE: "line_template",
  SUCCESS: "bg-green-500",
  ERROR: "bg-red-500",
  WARNING: "bg-yellow-500",
  INFO: "bg-blue-500",

  randomDivId: function () {
    return (Math.random() + 1).toString(36).substring(7);
  },
  showToast: function (
    this: typeof AlertToast,
    message: string,
    level: string,
    container: string = this.BOTTOM_TOAST_CONTAINER,
    template = this.TOAST_TEMPLATE
  ) {
    let divId = this.randomDivId();
    let checkId = this.randomDivId();

    const div = document
      .getElementById(template)
      .cloneNode(true) as HTMLElement;
    const alertContainer = document.getElementById(container);

    div.id = divId;
    const containerLabel = div.querySelector("label") as HTMLLabelElement;
    containerLabel.setAttribute("for", checkId);

    const check = div.querySelector("input") as HTMLInputElement;
    check.dataset.alertId = divId;
    check.setAttribute("id", checkId);
    check.addEventListener("click", closeDiv, false);

    containerLabel.className = containerLabel.className.replace("level", level);
    div.querySelector("p").textContent = message;

    alertContainer.appendChild(div);
    div.style.display = "block";
  },
};

export default AlertToast;
