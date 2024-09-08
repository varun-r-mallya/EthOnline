import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Conversation, Message } from "../model/db";
import { useMessages } from "../hooks/useMessages";
import { useLiveConversation } from "../hooks/useLiveConversation";
import { useReadReceipts } from "../hooks/useReadReceipts";
import { ContentTypeId } from "@xmtp/xmtp-js";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import MessageComposerView from "./MessageComposerView";
import MessageCellView from "./MessageCellView";
import ConversationSettingsView from "./ConversationSettingsView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, ArrowLeft } from "lucide-react";

const appearsInMessageList = (message: Message): boolean => {
  if (ContentTypeReaction.sameAs(message.contentType as ContentTypeId)) {
    return false;
  }
  return true;
};

export default function ConversationView({
  conversation,
}: {
  conversation: Conversation;
}) {
  const liveConversation = useLiveConversation(conversation);
  const messages = useMessages(conversation);
  const showReadReceipt = useReadReceipts(conversation);
  const [isShowingSettings, setIsShowingSettings] = useState(false);

  useEffect(() => {
    const scrollArea = document.getElementById("message-scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages?.length]);

  return (
    <div className="h-screen flex flex-col bg-black dark:bg-gray-900 z-100">
      <Card className="flex-grow flex flex-col m-4 overflow-hidden bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-white">
            {liveConversation?.title || conversation.peerAddress}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShowingSettings(!isShowingSettings)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </CardHeader>
        {isShowingSettings && (
          <ConversationSettingsView
            conversation={conversation}
            dismiss={() => setIsShowingSettings(false)}
          />
        )}
        <CardContent className="flex-grow p-0 overflow-hidden">
          <ScrollArea className="h-full p-4" id="message-scroll-area">
            {messages?.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No messages yet.
              </p>
            )}
            {messages ? (
              messages.reduce(
                (acc: React.ReactElement[], message: Message, index) => {
                  const showRead =
                    showReadReceipt && index === messages.length - 1;
                  if (appearsInMessageList(message)) {
                    acc.push(
                      <MessageCellView
                        key={message.id}
                        message={message}
                        readReceiptText={showRead ? "Read" : undefined}
                      />
                    );
                  }
                  return acc;
                },
                []
              )
            ) : (
              <p className="text-center text-red-500 dark:text-red-400 py-4">
                Could not load messages
              </p>
            )}
          </ScrollArea>
        </CardContent>
        <div className="p-4">
          <MessageComposerView conversation={conversation} />
        </div>
      </Card>
    </div>
  );
}
