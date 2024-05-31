import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-white shadow border-b-2 border-[#330a68] p-5">
      <nav className="flex justify-center items-center w-full">
        <ul className="items-center gap-5 flex text-md">
          <li>
            <Link href={"/"}>نوبت جدید</Link>
          </li>
          <li>
            <Link href={"/bookings"}>نوبت‌ها</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
