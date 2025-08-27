import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CommonModal from "../../../components/Common/CommonModal";

const initialNotifications = [
  {
    id: 1,
    title: "Property Alert",
    message: "New listing details for Michael Chen are available for review.",
    time: "3h ago",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    read: false,
  },
  {
    id: 2,
    title: "Lead Notification",
    message: "A new lead, Sophia Patel, has been assigned to your account.",
    time: "1h ago",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    read: false,
  },
  {
    id: 3,
    title: "Follow-Up",
    message: "Contact David Kim regarding his condo purchase inquiry.",
    time: "2d ago",
    image: "https://images.unsplash.com/photo-1572126656642-3b16a5ff3a35",
    read: false,
  },
  {
    id: 4,
    title: "Appointment Set",
    message: "Meeting with Laura Kim confirmed for Thursday at 2 PM.",
    time: "4h ago",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    read: false,
  },
  {
    id: 5,
    title: "Message Received",
    message: "Client Olivia Lee inquired about the 3BHK apartment listing.",
    time: "20m ago",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    read: false,
  },
  {
    id: 6,
    title: "Price Change",
    message: "Property ID #39102 price has been adjusted upward.",
    time: "5h ago",
    image: "https://images.unsplash.com/photo-1582268615487-5d8ef0e2a5e8",
    read: false,
  },
  {
    id: 7,
    title: "Client Review",
    message: "New feedback from Thomas Nguyen is available.",
    time: "40m ago",
    image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f6",
    read: false,
  },
  {
    id: 8,
    title: "Call Reminder",
    message: "Call with Emma Garcia scheduled for 6 PM today.",
    time: "25m ago",
    image: "https://images.unsplash.com/photo-1564078510147-72c3c22e0589",
    read: false,
  },
  {
    id: 9,
    title: "Bid Submitted",
    message: "A new bid has been placed on property ID #51472.",
    time: "1h ago",
    image: "https://images.unsplash.com/photo-1600585154463-7ca0e4a0f3c9",
    read: false,
  },
  {
    id: 10,
    title: "Inspection Scheduled",
    message: "Inspection for James Carter confirmed for Saturday.",
    time: "7h ago",
    image: "https://images.unsplash.com/photo-1600585154299-50f8e0ba6575",
    read: false,
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (item) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const handleClickNotification = (item) => {
    const updated = notifications.map((n) =>
      n.id === item.id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setSelected(item); // Set selected item
    setIsModalOpen(true); // Open modal properly
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-7">
          <h1 className="text-3xl font-bold">Notification</h1>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-[#CE8B38] flex items-center gap-1"
        >
          <FaCheck className="text-sm" />
          Mark all as read
        </button>
      </div>

      <div className="">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex gap-4 py-4 cursor-pointer hover:bg-yellow-50 transform duration-200 border-b border-gray-100 px-5 ${
              item.read ? "text-gray-500" : "font-semibold"
            }`}
            onClick={() => handleClickNotification(item)}
          >
            <img src={item.image} alt="AI" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <button
                onClick={() => handleView(item)}
                className=""
              >
                {item.title}
              </button>
              <div className="text-sm">{item.message}</div>
            </div>
            <div className="text-sm text-gray-400 whitespace-nowrap">
              {item.time}
            </div>
          </div>
        ))}
      </div>

      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Notification Details"
      >
        {selected && (
          <div className="space-y-3">
            <p className="text-lg font-bold">{selected.title}</p>
            <p className="text-gray-500">{selected.time}</p>
            <p>{selected.message}</p>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default NotificationPage;