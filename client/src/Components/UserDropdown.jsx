import { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { CalendarCheck, LogOut } from "lucide-react";

 const UserDropdown = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={user.imageUrl}
        alt="avatar"
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full cursor-pointer border"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              setOpen(false);
              window.location.href = "/my-bookings";
            }}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
          >
            <CalendarCheck className="w-4 h-4" />
            My Bookings
          </button>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default UserDropdown