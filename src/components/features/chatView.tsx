import { useEffect, useState } from "react";
import { ChatEvent } from "types/events";
import { listen } from "@tauri-apps/api/event";
import TopBar from "./topbar";
import Messages from "./messages";
import { notify, notifyError } from "services/notifications";
import { PeerInfo, VisitedRoom } from "types";
import {
  addMessage,
  eventToMessage,
  ensureConversationExists,
} from "services/db";
import { useMessageLoader } from "hooks/useMessageLoader";

interface ChatViewProps {
  ticket: VisitedRoom;
  onLeave?: () => void;
}

export default function ChatView({ ticket, onLeave }: ChatViewProps) {
  const [eventLog, setEventLog] = useState<ChatEvent[]>([]);
  const [neighbours, setNeighbours] = useState<PeerInfo[]>([]);
  const {
    dbMessages,
    loadMorePreviousMessages,
    isLoadingMore,
    hasMoreOldMessages,
    addLiveMessageToDisplay,
  } = useMessageLoader({ ticket });

  useEffect(() => {
    if (!ticket) return;
    const setupConversation = async () => {
      try {
        await ensureConversationExists(ticket.id, ticket.name);
      } catch (error) {
        notifyError(`Failed to set up conversation: ${error}`, "convError");
      }
    };
    setupConversation();
  }, [ticket]);

  useEffect(() => {
    if (!ticket) return;
    const updatePeersRef = listen<PeerInfo[]>("peers-event", async (event) => {
      console.log(event.payload);
      setNeighbours(event.payload);
    });
    const welcomePeersRef = listen<String>("peers-new", async (event) => {
      notify(`👋 found ${event.payload}`, "newPeer", 1000);
    });

    const eventsRef = listen<ChatEvent>("chat-event", async (event) => {
      console.log(event);
      setEventLog((prevLog) => [...prevLog, event.payload]);
      if (event.payload.type === "messageReceived") {
        const liveMessage = event.payload;
        addLiveMessageToDisplay(liveMessage);
        try {
          await addMessage(eventToMessage(liveMessage, ticket));
        } catch (dbError) {
          console.error("Failed to persist message:", dbError);
          notifyError(`Error saving message: ${dbError}`, "saveMsgError");
        }
      }
    });
    return () => {
      Promise.all([updatePeersRef, eventsRef, welcomePeersRef]).then((drops) =>
        drops.forEach((drop) => drop())
      );
    };
  }, [ticket]);

  return (
    <div className="flex flex-col items-center h-full w-full space-y-2" style={{ backgroundColor: "var(--color-bg-lighter)" }}>
      <div className="w-full text-center pb-1 border-b border-blue-950 rounded-b-box">
        <TopBar
          eventLog={eventLog}
          neighbours={neighbours}
          onLeave={onLeave}
        />
        <h1 className="text-xl font-bold py-1">{ticket?.name}</h1>
      </div>
      <Messages
        dbMessages={dbMessages}
        onLoadMore={loadMorePreviousMessages}
        isLoadingMore={isLoadingMore}
        hasMoreOldMessages={hasMoreOldMessages}
        peersOnline={neighbours.length > 0}
      />
    </div>
  );
}
