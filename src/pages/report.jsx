import { useParams } from "react-router-dom";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { auth, db, onAuthStateChanged } from "../firebase/firebase";
import { useState } from "react";
import { toast } from "react-toastify";

const Report = () => {
  const params = useParams();

  const [reason, setReason] = useState([]);

  const [reportItself, setReportItself] = useState("");

  const addOrRemove = (val) => {
    if(reason.includes(val)) {
      const newReason = reason.filter(r => r != val);
      setReason(newReason);
    } else {
      setReason([...reason, val]);
    }
  }

  const { postId } = params;

  const reportPost = async (e) => {
    e.preventDefault();

    onAuthStateChanged(auth, async (currentUser) => {

      const report = collection(db, "reports");
  
      // const documentId = report.id;

      // report.uId = currentUser.uid;
  
      // report.timestamp = serverTimestamp();
  
      // report.documentId = documentId;

      // report.reason = reason;
      // report.report = reportItself;
  
      await addDoc(report, {
        uId: currentUser.uid,
        timestamp: serverTimestamp(),
        reason:reason,
        report: reportItself
      });

      toast("Report sent");
  
    });
  };

  const reasons = [
    "Harassment",
    "Copyright Violation",
    "Hate Speech",
    "Misinformation",
  ];
  return (
    <div className="px-3 my-3">
      <h1 className="text-center text-xl font-medium">Community</h1>
      <h3 className="font-medium text-lg my-3">Submit report *</h3>
      <h5 className="font-medium mb-3">Reason for submitting report</h5>
      <div>
        {reasons.map((res, index) => (
          <div className="flex items-center gap-3 mb-4" key={res}>
            <input
              className="custom-checkbox1"
              id={`reason-${index}`}
              type="checkbox"
              onClick={() => {addOrRemove(`${res}`)}}
            />
            <label
              className="text-[#101010] text-md font-normal"
              htmlFor={`reason-${index}`}
            >
              {res}
            </label>
          </div>
        ))}
        <form>
          <label className="font-semibold text-lg">Add a Comment</label>
          <textarea className="w-full h-[160px] my-6 rounded-lg border border-[#3B3A3A] block" onChange={(e) => {setReportItself(e.target.value)}}></textarea>
          <button
            className="bg-[#4268FB] hover:w-fit py-2 px-5 cursor-pointer text-white font-normal rounded-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
            onClick={reportPost}
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
