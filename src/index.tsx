import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

render(
  <ErrorBoundary fallback={<>Oops, sorry an error occurred.</>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
