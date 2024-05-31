interface IBookingResult {
  id: number;
  date: string;
}

export default function BookingResult({ id, date }: IBookingResult) {
  return (
    <>
      <div className="text-xl text-center flex flex-col gap-3 bg-white p-6 rounded shadow-sm">
        <h1 className="text-2xl">نوبت شما رزرو شد</h1>
        <p>
          کد پیگیری: <span className="font-bold">{id}</span>
        </p>
        <p>
          روز مراجعه: <span className="font-bold">{date}</span>
        </p>
      </div>
      <button
        className="text-white"
        type="button"
        onClick={() => window.location.reload()}
      >
        نوبت جدید
      </button>
    </>
  );
}
