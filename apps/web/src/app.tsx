import { PageLayout, Header, NavList, Text } from "@primer/react";
import {
  CreditCardIcon,
  HomeIcon,
  WebhookIcon,
  KeyIcon,
} from "@primer/octicons-react";

function AppHeader() {
  return (
    <Header
      style={{
        borderRadius: 6,
      }}
    >
      <Header.Item>
        <Header.Link
          href="#"
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CreditCardIcon size={20} />
          Fakement
        </Header.Link>
      </Header.Item>
      <Header.Item full />
      <Header.Item>
        <Text style={{ fontSize: 0, color: "success.fg" }}>Local · v0.4.2</Text>
      </Header.Item>
    </Header>
  );
}

function Sidebar() {
  return (
    <NavList>
      <NavList.Item href="#" aria-current="page">
        <NavList.LeadingVisual>
          <HomeIcon />
        </NavList.LeadingVisual>
        Overview
      </NavList.Item>

      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <CreditCardIcon />
        </NavList.LeadingVisual>
        Payments
      </NavList.Item>

      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <WebhookIcon />
        </NavList.LeadingVisual>
        Webhooks
      </NavList.Item>

      <NavList.Item href="#">
        <NavList.LeadingVisual>
          <KeyIcon />
        </NavList.LeadingVisual>
        API Keys
      </NavList.Item>
    </NavList>
  );
}

function Content() {
  return (
    <div
      style={{
        padding: 4,
        minHeight: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "canvas.subtle",
        color: "fg.muted",
      }}
    >
      Conteúdo
    </div>
  );
}

export function App() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <AppHeader />
      </PageLayout.Header>
      <PageLayout.Pane position="start" width="small">
        <Sidebar />
      </PageLayout.Pane>
      <PageLayout.Content>
        <Content />
      </PageLayout.Content>
    </PageLayout>
  );
}
