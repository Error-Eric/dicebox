import { useState } from "react";
import { useWindowRatio } from "hooks/useWindowRatio";
import { VisitedRoom } from "types";
import AppRoutes from "routes";
import SplitLayout from "./splitLayout";

export default function AdaptiveLayout() {
  const ratio = useWindowRatio();
  const [selectedRoom, setSelectedRoom] = useState<VisitedRoom | null>(null);
  const isHorizontal = ratio >= 1.0;

  if (isHorizontal) {
    return (
      <SplitLayout
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
        onLeave={() => setSelectedRoom(null)}
      />
    );
  }

  return <AppRoutes />;
}
