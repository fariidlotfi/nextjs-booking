"use client";

import { useEffect, useState } from "react";
import jMoment from "jalali-moment";
import NavBar from "@/components/NavBar";

interface IBookingData {
  id: string;
  name: string;
  phone: string;
  date: string;
  status: boolean;
  centerId: string;
}

const AllBooking: React.FC = () => {
  const [bookings, setBookings] = useState<IBookingData[]>([]);
  const [center, setCenter] = useState<string>("jahad");
  const [selectedDate, setSelectedDate] = useState<string>(
    jMoment().format("jYYYY-jMM-jDD")
  );

  useEffect(() => {
    fetchBookings();
  }, [selectedDate, center]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "center-username": center,
          "selected-date": selectedDate,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: IBookingData[] = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handlePrevDay = () => {
    const prevDay = jMoment(selectedDate, "jYYYY-jMM-jDD")
      .subtract(1, "day")
      .format("jYYYY-jMM-jDD");
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = jMoment(selectedDate, "jYYYY-jMM-jDD")
      .add(1, "day")
      .format("jYYYY-jMM-jDD");
    setSelectedDate(nextDay);
  };

  const handleToday = () => {
    setSelectedDate(jMoment().format("jYYYY-jMM-jDD"));
  };

  const statusUpdateHandler = async (id: string) => {
    try {
      await fetch(`/api/booking`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          id: id,
        },
      });
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col gap-2 p-2">
        <div className="container mx-auto my-3 text-white flex flex-col gap-5">
          <div className="flex gap-5 items-center flex-wrap">
            <p className="text-xl font-bold">انتخاب شعبه: </p>
            <select
              className="text-black px-5"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
            >
              <option value="jahad">میدان جهاد</option>
              <option value="daraee">میدان دارایی</option>
            </select>
          </div>

          <div className="flex justify-between mb-3 flex-wrap gap-3">
            <button type="button" onClick={handlePrevDay}>
              ➡️ روز قبلی
            </button>
            <div className="flex gap-1">
              <button type="button" onClick={handleToday}>
                امروز ⏺️
              </button>
              <h2>{selectedDate}</h2>
            </div>
            <button type="button" onClick={handleNextDay}>
              روز بعدی ⬅️
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse table-fixed text-white border border-orange-400">
              <thead className="bg-orange-500 font-bold">
                <tr>
                  <th className="border border-orange-300 p-2">شماره پیگیری</th>
                  <th className="border border-orange-300 p-2">نام</th>
                  <th className="border border-orange-300 p-2">شماره تماس</th>
                  <th className="border border-orange-300 p-2">تاریخ</th>
                  <th className="border border-orange-300 p-2">وضعیت</th>
                </tr>
              </thead>
              <tbody className="bg-white shadow-md text-gray-700 text-xs">
                {bookings.map((booking) => (
                  <tr
                    className={`${booking.status ? "bg-green-300" : ""}`}
                    key={booking.id}
                  >
                    <td className="border border-orange-300 p-2">
                      {booking.id}
                    </td>
                    <td className="border border-orange-300 p-2">
                      {booking.name}
                    </td>
                    <td className="border border-orange-300 p-2">
                      {booking.phone}
                    </td>
                    <td className="border border-orange-300 p-2">
                      {booking.date}
                    </td>
                    <td className="border border-orange-300 p-2">
                      <button
                        className="bg-[#330a68] w-20 p-1 text-white"
                        type="button"
                        onClick={() => statusUpdateHandler(booking.id)}
                      >
                        {!booking.status ? "درحال انجام" : "انجام شد"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default AllBooking;
