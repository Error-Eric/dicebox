export default function EmptyChatPlaceholder() {
  return (
    <div className="flex items-center justify-center h-full w-full text-lg opacity-50" style={{ backgroundColor: "var(--color-bg-lighter)" }}>
      <p>Please select a room</p>
    </div>
  );
}
