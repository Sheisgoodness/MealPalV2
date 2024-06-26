import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "./ContactUsPage";

const ContactUs = () => {
    const [formData, setFormData] = useState ({
        Reason: "" ,
        Email: "" ,
        fullName: "" ,
        message: "" ,
    });

    const navigate = useNavigate();

     const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData({ ...formData, [name]: value
         });
 };

 const handleSubmit = (e) => {
     e.preventDefault(); 
     generatePDF();
     navigate("/success");
 };
//  const OnSubmit = async (e) => {
//     e.preventDefault(); 
//     try {
//         //Simulate form submission logic, e.g., sending email or saving data
//         // For demonstration purposes, we will just use a delay
//                 await new Promise((resolve, reject) => setTimeout(resolve, 1000));

//                 // On success, navigate to the success page
//                 navigate("/success", {state: { message: "Your form has been sent successfully!" }});
//                 }catch (error) {
//                     // On error, navigate to the success page with an error message
//                             navigate("/success",
//                         {state: {message: "There was an error logging you out." } });
//                  }
//                 };
                
 const generatePDF = () => {
     const input = document.getElementById("contact-us-form");

     html2canvas(input).then((canvas) => {
         const imgData= canvas.toDataURL("image/png");
         const pdf = new jsPDF();
         pdf.addImage(imgData, "PNG", 10, 10);
         pdf.save("contact_us.pdf"); });
 };


return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded 
        shadow-md w-full max-w-md">
                <h1 className="text-2xl mb-6">Contact Us</h1>
            <div className="mb-4">
                <label hmtlFor="reason" className="block text-sm font-medium
                text-grey-700">Reason</label>
                <select id="reason" name="reason"
                value={formData.reason}
                onChange={handleChange} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 
                    bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500
                    focus:border-blue-500 sm:text-sm">
                    <option
         value="">Select an option</option>
              <option
          value="question about the app">Question about the app</option>
              <option 
          value="report an issue with the app">Report an issue with the app</option>
              <option
          value="suggestion for the app">Suggestions for the app</option>
              <option
         value="others">Others</option>
                    </select>
            </div>
            <div>
            <label htmlFor="email"className="block text-sm font-medium text-gray-700
            ">Email Address</label>
        <input type="email" id="email" name="email"
        value={formData.email} 
        OnChange= {handleChange} placeholder="Enter email address" required classNmae="mt-1 block w-full px-3 py-2 border border-gray-300
        rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name
            </label>
            <input type="text" id="fullName" name="fullName"
            value={formData.fullName} 
            onChange={handleChange} placeholder="Enter full name" required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note
            </label>
            <textarea id="note" name="note"
            value={formData.note} 
            onChange={handleChange} placeholder="Enter your feedback here" required 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-blue-500 focus-border-blue-500 sm:text-sm" ></textarea>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
        </button>
        </form>
    </div>
);
};

        export default ContactUs;