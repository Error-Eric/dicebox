import { useEffect, useState } from "react";
import { VisitedRoom } from "types";
import { getLatestTicket } from "services/ipc";
import ChatView from "components/features/chatView";

export function ChatPage() {
  const [ticket, setTicket] = useState<VisitedRoom>();

  useEffect(() => {
    getLatestTicket().then((newTicket) => {
      if (newTicket) {
        setTicket(newTicket);
      }
    });
  }, []);

  if (!ticket) return null;

  return <ChatView ticket={ticket} />;
}
