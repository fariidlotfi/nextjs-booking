"use client";

import { useState } from "react";
import jMoment from "jalali-moment";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal";
import BookingResult from "@/components/BookingResult";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [center, setCenter] = useState("jahad");
  const [givenId, setGivenId] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [state, setState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function postHandler(e: any) {
    e.preventDefault();
    try {
      if (!name || !phone) {
        setShowModal(true);
        return;
      }
      const adjustedDate = getAdjustedDate();
      const formattedDate = jMoment(adjustedDate)
        .locale("fa")
        .format("YYYY-MM-DD");

      const newBookingItem = {
        name: name,
        phone: phone,
        date: formattedDate,
        centerId: center,
        status: false,
      };

      const response = await fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify(newBookingItem),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setState(true);
        setGivenId(data.id);
        setBookingDate(data.date);
        console.log("New booking item created:", data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again later.");
    }
  }

  // convert time with Iran (UTC +3:30)
  function getAdjustedDate() {
    const currentDate = new Date();
    const timeDifference = (3 * 60 + 30) * 60 * 1000;
    const adjustedDate = new Date(currentDate.getTime() + timeDifference);
    return adjustedDate;
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="h-[94svh] bg-gradient-to-b from-[#30CCCE] to-[#330A68] flex flex-col gap-2 items-center justify-center">
        {!state ? (
          <>
            <form
              onSubmit={postHandler}
              className="flex rounded flex-col gap-5 py-10 px-6 bg-white shadow-md justify-center w-[95%] md:w-[350px]"
            >
              <h1 className="text-xl text-center font-bold">
                اطلاعات خود را وارد نمایید
              </h1>
              <input
                className="p-2 text-xs rounded border w-full focus:outline-[#330a68]"
                type="text"
                name="name"
                placeholder="نام خود را وارد نمایید"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="^[\u0600-\u06FF]+(\s[\u0600-\u06FF]+)+$"
                title="نام و نام خانوادگی خود را وارد کنید"
                required
              />
              <input
                className="p-2 text-xs placeholder:text-right rounded border w-full focus:outline-[#330a68]"
                type="tel"
                pattern="^\d{11}$"
                required
                placeholder="شماره تماس خود را وارد نمایید"
                title="شماره تماس را به درستی وارد نمایید"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <select
                className="p-2 rounded text-xs border w-full focus:outline-[#330a68]"
                value={center}
                onChange={(e) => setCenter(e.target.value)}
              >
                <option value={"jahad"}>دفتر پیشخوان میدان جهاد</option>
                <option value={"daraee"}>دفتر پیشخوان میدان دارایی</option>
              </select>
              <button
                type="submit"
                className="bg-[#330a68] text-white rounded p-2"
              >
                رزرو نوبت
              </button>
            </form>
          </>
        ) : (
          <BookingResult
            id={givenId}
            date={jMoment(bookingDate).format("YYYY/MM/DD")}
          />
        )}

        {showModal && (
          <Modal
            onClick={() => setShowModal(false)}
            message={"لطفا موارد خواسته شده را وارد نمایید"}
          />
        )}
      </main>
    </>
  );
}
