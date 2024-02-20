// import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: ""
  });

  const getuserData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postdata = async (e) => {
    e.preventDefault();
    const { name, email, message } = user;
    try {
      if(!name || !email || !message){
        toast.error("Failed to send message. Please try again later.");
        return;
      }else{}
      const res = await fetch(
        "https://react-netflix-clone-7c041-default-rtdb.firebaseio.com/contactForm.json",
        {method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        name,email,message
      }),
    }
      );
      console.log("Message sent successfully:", res.data);
      toast.success("Message sent successfully!!");
      setUser({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="main bg-white h-screen flex justify-center items-center">
      <div className="flex-col flex m-3">
        <div className="border-[5px] bg-indigo-100 border-black rounded-2xl p-5">
          <form method="POST">
            <div className="box justify-center flex align-middle items-center  p-2">
              <div className="heading justify-center flex items-center m-2">
                <h2 className="text-4xl font-mono font-bold justify-center flex items-center m-2">
                  Contact Us
                </h2>
              </div>
            </div>
            <div className="flex-row flex">
              <div className="name p-2">
                <input
                  placeholder="Name"
                  className="uppercase rounded-lg border-[1px] border-black p-2 font-bold"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={getuserData}
                  required
                />
              </div>
              <div className="email p-2">
                <input
                  placeholder="Email"
                  className="uppercase rounded-lg border-[1px] border-black p-2 font-bold"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={getuserData}
                  required
                />
              </div>
            </div>
            <div className="message w-auto p-2">
              <textarea
                placeholder="Message"
                value={user.message}
                onChange={getuserData}
                cols="30"
                rows="10"
                name="message"
                required
                className="uppercase p-2 font-bold border-[1px] border-black rounded-xl w-full"
              ></textarea>
            </div>
            <div className="button flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={postdata}
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
