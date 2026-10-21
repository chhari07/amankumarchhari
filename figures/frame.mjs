// When the figure page runs inside the portfolio's <iframe>, drop the page margins
// and report the document height so the frame can size itself.
export function frameScript() {
  return `
if (window.parent !== window) {
  document.documentElement.classList.add("in-frame");
  const style = document.createElement("style");
  style.textContent = "html.in-frame{color-scheme:light;background:transparent}.in-frame body{background:transparent}.in-frame .iso-page{width:100%;margin:0}";
  document.head.append(style);
  const send = () => window.parent.postMessage({ anatomyHeight: Math.ceil(document.documentElement.scrollHeight), id: location.pathname }, "*");
  new ResizeObserver(send).observe(document.body);
  addEventListener("load", send);
  send();
}
`;
}
