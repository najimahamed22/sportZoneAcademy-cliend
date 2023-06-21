import { useState } from "react";
import Swal from "sweetalert2";

const FeedbackModal = ({ classData, onClose, onSendFeedback }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      Swal.fire({
        title: "Feedback is required",
        icon: "warning",
      });
      return;
    }

    onSendFeedback(classData, feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow p-8 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Send Feedback</h2>
        <textarea
          className="w-full h-32 border border-gray-300 p-2 mb-4"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}></textarea>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
