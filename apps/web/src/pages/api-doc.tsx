import { ApiReferenceReact } from "@scalar/api-reference-react";
//import "@scalar/api-reference-react/style.css";

export function ApiDoc() {
  return (
    <ApiReferenceReact
      configuration={{
        url: "http://localhost:8080/openapi.json",
      }}
    />
  );
}
