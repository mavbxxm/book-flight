import { Flight } from "../flight";

export class MockFlight {
  public static mFlight: Flight[] = [
    {
      fullName: "Supatchaya",
      from: "Korea",
      to: "Thailand",
      type: "Return",
      adults: 1,
      children: 0,
      infants: 0,
      departure: new Date(2565, 2, 10),
      arrival: new Date(2565, 2, 20),

    },
  ];
}
