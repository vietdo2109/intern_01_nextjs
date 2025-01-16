import React from "react";
import { ChatslotButton } from "../chatslotButton";
import { ChatslotFromDB } from "@/lib/models/chat/chatslot";

type DateChatGroupProps = {
  chats: Omit<ChatslotFromDB, "userid" | "messages">[];
  currentChatslotId?: number;
  menuState: {
    isOpen: boolean;
    id: number | undefined;
  };
  setMenuState: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number | undefined;
    }>
  >;
};

export const DateChatGroup: React.FC<DateChatGroupProps> = ({
  chats,
  currentChatslotId,
  menuState,
  setMenuState,
}) => {
  const categorizedChats = categorizeChats(
    chats.map((chat) => ({
      id: chat.id,
      title: chat.title,
      lastmodified: chat.lastmodified ?? new Date(), // Use current date as fallback
    }))
  );
  const renderChatGroup = (
    groupTitle: string,
    chatGroup: Omit<ChatslotFromDB, "userid" | "messages">[]
  ) => (
    <>
      <h3>{groupTitle}</h3>
      {chatGroup &&
        chats.map((chat) => {
          return (
            <ChatslotButton
              key={chat.id}
              chat={chat}
              isCurrentChat={chat.id === currentChatslotId}
              menuState={menuState}
              setMenuState={setMenuState}
            />
          );
        })}
    </>
  );

  return (
    <div>
      {renderChatGroup("Today", categorizedChats.today)}
      {renderChatGroup("Yesterday", categorizedChats.yesterday)}
      {renderChatGroup("Previous 7 Days", categorizedChats.last7Days)}
      {renderChatGroup("Previous 30 Days", categorizedChats.last30Days)}
      {renderChatGroup("Older", categorizedChats.older)}
    </div>
  );
};
const categorizeChats = (
  chats: { id: number; title: string; lastmodified: Date }[]
) => {
  const now = new Date();
  const today = now.setHours(0, 0, 0, 0); // Start of today
  const yesterday = new Date(today).setDate(new Date(today).getDate() - 1); // Start of yesterday
  const sevenDaysAgo = new Date(today).setDate(new Date(today).getDate() - 7); // Start of 7 days ago
  const thirtyDaysAgo = new Date(today).setDate(new Date(today).getDate() - 30); // Start of 30 days ago

  const groups = {
    today: [] as Omit<ChatslotFromDB, "userid" | "messages">[],
    yesterday: [] as Omit<ChatslotFromDB, "userid" | "messages">[],
    last7Days: [] as Omit<ChatslotFromDB, "userid" | "messages">[],
    last30Days: [] as Omit<ChatslotFromDB, "userid" | "messages">[],
    older: [] as Omit<ChatslotFromDB, "userid" | "messages">[],
  };

  chats.forEach((chat) => {
    const chatDate = new Date(chat.lastmodified).getTime();

    if (chatDate >= today) {
      groups.today.push(chat);
    } else if (chatDate >= yesterday) {
      groups.yesterday.push(chat);
    } else if (chatDate >= sevenDaysAgo) {
      groups.last7Days.push(chat);
    } else if (chatDate >= thirtyDaysAgo) {
      groups.last30Days.push(chat);
    } else {
      groups.older.push(chat);
    }
  });

  return groups;
};
