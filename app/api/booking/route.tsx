import { PrismaClient, Booking } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { addDaysToDate } from "@/utils/addDaysToDate";

const prisma = new PrismaClient();

interface IBookingData {
  name: string;
  phone: string;
  date: string;
  status: boolean;
  centerId: string;
}

export async function GET(request: NextRequest) {
  let allBooking: Booking[] | null = null;

  try {
    const centerUsernameHeader = request.headers.get("center-username");
    const dateHeader = request.headers.get("selected-date");

    const filters: any = {};
    if (centerUsernameHeader) {
      filters.centerId = centerUsernameHeader;
    }
    if (dateHeader) {
      filters.date = dateHeader;
    }

    allBooking = await prisma.booking.findMany({
      where: filters,
    });

    return NextResponse.json(allBooking, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const newBookingInfo = await request.json();
  const { name, phone, date, status, centerId }: IBookingData = newBookingInfo;

  console.log(newBookingInfo);
  try {
    const maxBookingsPerDay = 3;

    const bookingsCount = await prisma.booking.count({
      where: {
        date: date,
        centerId: centerId,
      },
    });

    let newDate = date;

    if (bookingsCount >= maxBookingsPerDay) {
      let foundDate = false;
      let daysToAdd = 1;

      while (!foundDate) {
        const nextDate = addDaysToDate(date, daysToAdd);
        const nextBookingsCount = await prisma.booking.count({
          where: {
            date: nextDate,
            centerId: centerId,
          },
        });

        if (nextBookingsCount < maxBookingsPerDay) {
          newDate = nextDate;
          foundDate = true;
        } else {
          daysToAdd++;
        }
      }
    }

    const newBooking = await prisma.booking.create({
      data: {
        name,
        phone,
        date: newDate,
        status,
        centerId,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const incomingID = request.headers.get("id");
  try {
    const bookingExist = await prisma.booking.findFirst({
      where: {
        id: Number(incomingID),
      },
    });
    console.log(bookingExist);
    if (bookingExist) {
      await prisma.booking.update({
        where: {
          id: Number(incomingID),
        },
        data: {
          status: !bookingExist.status,
        },
      });
    }

    return NextResponse.json({ message: "record UPDATED" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `internal error - ${error}` },
      { status: 400 }
    );
  }
}
