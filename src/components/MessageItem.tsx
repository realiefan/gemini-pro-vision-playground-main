// app/MessageItem.tsx
import React, { memo, useState } from "react";
import { Message } from "ai/react";
import { Bot, RefreshCw, Trash, User, Clipboard } from "lucide-react";
import { MarkdownViewer } from "./markdown-viewer/MarkdownViewer";
import { Button } from "./ui/button";

type MessageItemProps = {
  message: Message;
  isLastMessage: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onRemove: () => void;
};

export const MessageItem: React.FC<MessageItemProps> = memo(
  function MessageItem({
    message,
    isLastMessage,
    isLoading,
    onRefresh,
    onRemove,
  }) {
    const isUser = message.role === "user";
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(message.content);
      setIsCopied(true);

      // Reset copied state after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

    return (
      <div className="flex">
        <div
          className={`${
            isUser ? "" : "rounded bg-primary/10 dark:bg-primary/10"
          } px-1 py-1 w-full  rounded`}
        >
          <div className="my-1 flex  justify-between">
            <div className=" ml-2 flex  space-x-2 font-sm">
              {isUser ? <User /> : <Bot />}
              <div>{isUser ? "You" : "Gemini Pro"}</div>
            </div>
            <div className={`space-x-4 mr-2`}>
              {!isLoading && isLastMessage && isUser && (
                <Button
                  variant="icon"
                  type="button"
                  size="sm"
                  onClick={onRefresh}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              {!isLoading && isLastMessage && (
                <>
                  <Button
                    variant="icon"
                    type="button"
                    size="xs"
                    onClick={handleCopy}
                    className="bg-blue-500"
                  >
                    {isCopied ? (
                      <Clipboard className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="icon"
                    type="button"
                    size="xs"
                    onClick={onRemove}
                    className="bg-red-500"
                  >
                    <Trash className="w-4  h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="text-sm p-1"> {/* Adjust the font size */}
            <MarkdownViewer text={message.content} />
          </div>
        </div>
      </div>
    );
  }
);
