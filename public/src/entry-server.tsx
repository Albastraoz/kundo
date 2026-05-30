import { renderToString } from "react-dom/server";
import App from "./App";

export function render(_url: string): string {
  return renderToString(<App />);
}
