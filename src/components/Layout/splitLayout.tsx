import { VisitedRoom } from "types";
import { LobbyTopBar } from "pages/Lobby";
import RoomsList from "components/features/roomsList";
import ChatView from "components/features/chatView";
import EmptyChatPlaceholder from "components/features/emptyChatPlaceholder";
import Footer from "./footer";

interface SplitLayoutProps {
  selectedRoom: VisitedRoom | null;
  onRoomSelect: (room: VisitedRoom) => void;
  onLeave: () => void;
}

export default function SplitLayout({
  selectedRoom,
  onRoomSelect,
  onLeave,
}: SplitLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <LobbyTopBar />
      <div className = "flex flex-row h-screen">
        <div className="w-72 min-w-64 border-r border-base-300 flex flex-col">
          <RoomsList onRoomSelect={onRoomSelect} />
          <Footer />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          {selectedRoom ? (
            <ChatView ticket={selectedRoom} onLeave={onLeave} />
          ) : (
            <EmptyChatPlaceholder />
          )}
        </div>
      </div>
      
    </div>
  );
}
