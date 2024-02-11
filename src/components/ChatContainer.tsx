"use client";
// components/ChatContainer.tsx
import React, { useRef, useEffect, useCallback } from "react";
import { Message, useChat } from "ai/react";
import { Card } from "./ui/card";

import { useControlContext } from "@/providers/ControlContext";
import { CommonForm } from "./CommonForm";
import { TypingBubble } from "./TypingBubble";
import { MessageCircleX } from "lucide-react";
import { Button } from "./ui/button";
import { MessageItem } from "./MessageItem";








export const ChatContainer = () => {
  const { generalSettings, safetySettings } = useControlContext();

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    isLoading,
  } = useChat({
    id: "gemini-pro",
    api: `/api/gemini-pro`,
    body: {
      general_settings: generalSettings,
      safety_settings: safetySettings,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const handleRemoveMessage = useCallback(
    (id: string) => {
      const newMessages = messagesRef.current.filter(
        (message) => message.id !== id
      );
      setMessages(newMessages);
    },
    [setMessages]
  );

  return (
    <div className="flex flex-col h-[91vh]  py-0">
      <Card className="flex flex-col  flex-1 overflow-hidden border border-gray-600 rounded-md">
        <div className="flex-1 overflow-y-auto px-1 py-1">
          {messages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              isLastMessage={messages.length === index + 1}
              isLoading={isLoading}
              onRefresh={reload}
              onRemove={() => handleRemoveMessage(message.id)}
            />
          ))}

          <div ref={messagesEndRef} />
          {isLoading && <TypingBubble />}
        </div>
        

        <CommonForm
          value={input}
          placeholder="Chat with Gemini Pro"
          loading={isLoading}
          onInputChange={handleInputChange}
          onFormSubmit={handleSubmit}
          isSubmittable={input.trim() !== ""}
        />
      </Card>
    </div>
  );
};
