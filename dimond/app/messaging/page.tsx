"use client";
import "./polyfills";
import "./index.css";
import "@animxyz/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/messaging/App";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { findConversation } from "./model/conversations";
import ConversationViewWithLoader from "./views/ConversationViewWithLoader";
import NewConversationView from "./views/NewConversationView";
import WalletContext from "./contexts/WalletContext";
import ClientProvider from "./contexts/ClientContext";

async function conversationLoader({ params }: any) {
  const conversation = await findConversation(params.conversationTopic);
  return { conversation };
}

const router = createHashRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "c/:conversationTopic",
    element: <ConversationViewWithLoader />,
    loader: conversationLoader,
  },
  {
    path: "new",
    element: <NewConversationView />,
  },
]);
const Messaging = () => {
  return (
      <ClientProvider>
        <WalletContext>
          <RouterProvider router={router} />
        </WalletContext>
      </ClientProvider>
  );
};
export default Messaging;
