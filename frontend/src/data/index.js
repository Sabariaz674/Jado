// Image imports
import saudiaImg from '../assets/saudia.jpeg';
import dubaiImg from '../assets/dubai.jpg';
import ukImg from '../assets/uk.jpg';
import chinaImg from '../assets/china.jpg';

import ukimg from '../assets/uk1.jpg';
import saudiaImg1 from '../assets/saudia1.png';
import dubaiImg2 from '../assets/dubai1.jpg';
import chinaImg3 from '../assets/china1.jpg';
import dubaiimg4 from '../assets/dubai2.jpg';
import saudiaimg5 from '../assets/sauida2.jpg';

import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile1.jpg";


import saudiaplace from "../assets/hotel1.jpg";
import dubaiplace from "../assets/hotel2.jpg";
import ukplace from "../assets/hotel3.jpg";
import chinaplace from "../assets/hotel4.jpg";


import profile4 from '../assets/profile1.jpg';
import profile5 from '../assets/profile2.jpg';
import profile6 from '../assets/profile1.jpg';
import profile7 from '../assets/profile2.jpg';
import profile8 from '../assets/profile1.jpg';
import profile9 from '../assets/profile2.jpg';

import chinahotel from '../assets/chinahotel.jpg';
import chinahotel2 from '../assets/chinahotel2.jpg';
import chinahotel3 from '../assets/chinahotel3.jpg';

import chinahotel4 from '../assets/chinahotel.jpg';
import chinahotel5 from '../assets/chinahotel2.jpg';


import f1 from '../assets/f1.jpg';
import f2 from '../assets/f2.jpg';
import f3 from '../assets/f3.jpg';
import f4 from '../assets/f4.jpg';
import f5 from '../assets/f5.jpg';




// Exported deals
export const deals = [
  {
    image: chinaImg,
    title: "China",
    subtitle: "Discover ancient history, the Great Wall, and the vibrant culture of China!.",

    location: "Shanghai"
  },
  {
    image: saudiaImg,
    title: "Saudi Arabia",
    subtitle: "Explore the rich history and culture of Saudi Arabia, home to the Grand Mosque and beautiful deserts",

    location: "Riyadh"
  },
  {
    image: dubaiImg,
    title: "Dubai, UAE",
    subtitle: "Experience modern luxury in Dubai – from the Burj Khalifa to the Palm Jumeirah!",

    location: "Dubai"
  },
  {
    image: ukImg,
    title: "United Kingdom",
    subtitle: "Explore iconic landmarks like Big Ben, Buckingham Palace, and the beautiful countryside of the UK!",

    location: "London"
  },
];

// Exported destinations
export const destinations = [
  {
    image: ukimg,
    title: "Palace of Westminster, London",
    subtitle: "Home to the UK Parliament and iconic Big Ben clock tower",
    price: "$1,050",
    location: "United Kingdom"
  },
  {
    image: saudiaImg1,
    title: "Al-Masjid an-Nabawi, Madinah",
    subtitle: "The Prophet's Mosque – A sacred sanctuary and the second holiest site in Islam, attracting millions of pilgrims from around the world",
    price: "$1,020",
    location: "Saudi Arabia"
  },
  {
    image: dubaiImg2,
    title: "Luxury Beach Resort, Dubai",
    subtitle: "Experience opulence by the sea with palm-lit elegance and Arabian architecture",
    price: "$1,350",
    location: "Dubai"
  },
  {
    image: chinaImg3,
    title: "Yangshuo Town, Guilin",
    subtitle: "Close to Guilin Liangjiang International Airport with scenic karst landscapes",
    price: "$990",
    location: "China"
  },
  {
    image: dubaiimg4,
    title: "Burj Khalifa & Downtown Skyline, Dubai",
    subtitle: "Marvel at the tallest building on Earth surrounded by the dazzling lights of Downtown Dubai",
    price: "$1,450",
    location: "Dubai"
  },
  {
    image: saudiaimg5,
    title: "Masjid al-Haram, Makkah",
    subtitle: "The holiest site in Islam, home to the sacred Kaaba",
    price: "$1,020",
    location: "Saudi Arabia"
  },
];
//Export reviews
export const reviews = [
  {
    name: "Yifei Chen",
    location: "Seoul, South Korea",
    date: "April 2019",
    rating: 5,
    image: profile1,
    text: `What a great experience using Jadoo! I booked all of my flights for my gap year through Jadoo and never had any issues. When I had to cancel a flight because of an emergency, Jadoo support helped me resolve everything quickly and easily. I’ll definitely be using them again!`,
  },
  {
    name: "Kaori Yamaguchi",
    location: "Honolulu, Hawaii",
    date: "February 2017",
    rating: 4,
    image: profile2,
    text: `My family and I visit Hawaii every year, and we usually book our flights using other services. Jadoo was recommended to us by a long time friend, and I’m so glad we tried it out! The process was easy and stress-free. We got great prices and will be booking again next year!`,
  },
  {
    name: "Anthony Lewis",
    location: "Berlin, Germany",
    date: "April 2019",
    rating: 5,
    image: profile3,
    text: `When I was looking to book my flight to Berlin from LAX, Jadoo had the best browsing experience so I figured I’d give it a try. It was my first time using Jadoo, but I’d definitely recommend it to a friend and use it for future travels. Booking was smooth and support was responsive.`,
  },
];

//export stays
export const stays = [
  {
    title: "Stay among the atolls in",
    location: "Maldives",
    description:
      "From the 2nd century AD, the islands were known as the 'Money Isles' due to the abundance of cowry shells, a currency of the early ages.",
    image: saudiaplace,
  },
  {
    title: "Experience the Ourika Valley in",
    location: "Morocco",
    description:
      "Morocco’s Hispano-Moorish architecture blends influences from Berber culture, Spain, and contemporary artistic currents in the Middle East.",
    image: dubaiplace,
  },
  {
    title: "Live traditionally in",
    location: "Mongolia",
    description:
      "Traditional Mongolian yurts consist of an angled latticework of wood or bamboo for walls, ribs, and a wheel.",
    image: ukplace,
  },
  {
    title: "Discover ancient wonders in",
    location: "China",
    description:
      "Explore serene landscapes, traditional architecture, and rich cultural heritage in China's hidden retreats.",
    image: chinaplace,
  },
];

//Exportflight
 export const flights = [
  {
    airline: 'Dubai',
    logo: profile4,
    duration: 'SH-ZAY607',
    departure: '7:00AM - 4:15PM',
    stop: '1 stop',
    stopDetails: '2h 45m in HNL',
    price: '$624',
    type: 'round trip',
  },
  {
    airline: 'china',
    logo: profile5,
    duration: 'SH-ZAY607',
    departure: '7:35AM - 12:15PM',
    stop: '1 stop',
    stopDetails: '50m in HKG',
    price: '$663',
    type: 'round trip',
  },
  {
    airline: 'Delta',
    logo: profile6,
    duration: 'SH-ZAY607',
    departure: '9:47AM - 4:15PM',
    stop: '1 stop',
    stopDetails: '4h 05m in ICN',
    price: '$756',
    type: 'round trip',
  },
  {
    airline: 'Uk',
    logo: profile7,
    duration: 'SH-ZAY607',
    departure: '7:00AM - 4:15PM',
    stop: '1 stop',
    stopDetails: '2h 45m in HNL',
    price: '$624',
    type: 'round trip',
  },
  {
    airline: 'Japan',
    logo: profile8,
    duration: 'SH-ZAY607',
    departure: '7:35AM - 12:15PM',
    stop: '1 stop',
    stopDetails: '50m in HKG',
    price: '$663',
    type: 'round trip',
  },
  {
    airline: 'Delta',
    logo: profile9,
    duration: 'SH-ZAY608',
    departure: '9:47AM - 4:15PM',
    stop: '1 stop',
    stopDetails: '4h 05m in ICN',
    price: '$756',
    type: 'round trip',
  },
];
//export placetostay
export const places = [
  {
    title: 'Hotel Kaneyamaen and Bessho SASA',
    description: 'Located at the base of Mount Fuji, Hotel Kaneyamaen is a traditional Japanese ryokan with a modern twist. Enjoy a private onsen bath and a private multi-course kaiseki dinner.',
    image: chinahotel,
  },
  {
    title: 'HOTEL THE FLAG',
    description: 'Make a stop in Osaka and stay at HOTEL THE FLAG, just a few minutes walk to experience the food culture surrounding Dotonbori. Just one minute away is the Shinsaibashi shopping street.',
    image: chinahotel2,
  },
  {
    title: '9 Hours Shinjuku',
    description: 'Experience a truly unique stay in an authentic Japanese capsule hotel. 9 Hours Shinjuku is minutes from one of Japan\'s busiest train stations. Just take the NEX train from Narita airport!',
    image: chinahotel3,
  },
];
export const morePlaces = [
  {
    title: 'Hotel Kaneyamaen and Bessho SASA',
    description: 'Located at the base of Mount Fuji, Hotel Kaneyamaen is a traditional Japanese ryokan with a modern twist. Enjoy a private onsen bath and a private multi-course kaiseki dinner.',
    image: chinahotel5, // Replace with your image path
  },
  {
    title: 'HOTEL THE FLAG',
    description: 'Make a stop in Osaka and stay at HOTEL THE FLAG, just a few minutes walk to experience the food culture surrounding Dotonbori. Just one minute away is the Shinsaibashi shopping street.',
    image: chinahotel4, // Replace with your image path
  },
 
];

//people  search
 export const moresearch = [
  {
    image: f1, // Add the correct image path or URL
    title: 'Shanghai, China',
    description: 'An international city rich in culture.',
    price: '$598',
  },
  {
    image: f2,
    title: 'Nairobi, Kenya',
    description: 'Dubbed the Safari Capital of the World.',
    price: '$1,248',
  },
  {
    image: f3,
    title: 'Seoul, South Korea',
    description: 'This modern city is a traveler’s dream.',
    price: '$589',
  },
  // Add more objects as needed
];
export const jadooFaqData = [
  {
    title: 'How does Jadoo work?',
    content: 'Jadoo is a travel management platform that helps you book flights, manage bookings, and track your trips all in one place. We connect you with verified airlines and partners to ensure a smooth travel experience.',
  },
  {
    title: 'How can I find the cheapest flight using Jadoo?',
    content: 'Our platform automatically compares flight prices from multiple partners. You can also use our "Price Alert" feature to get notified when prices drop for your desired route.',
  },
  {
    title: 'Where should I book a flight to right now?',
    content: 'Jadoo’s "Deals" section is perfect for inspiration! It highlights the most affordable and popular destinations from your location, helping you find your next adventure.',
  },
  {
    title: 'Do I book my flight with Jadoo?',
    content: 'Jadoo is a booking management platform. While you can find and select flights on our site, the final booking and payment are processed directly with our trusted airline partners for your security and convenience.',
  },
  {
    title: 'What happens after I have booked my flight?',
    content: 'Once your booking is confirmed, you will receive an email confirmation from the airline. You can also view and manage all your booking details directly in your Jadoo dashboard under the "Bookings" tab.',
  },
  {
    title: 'Does Jadoo also book hotels?',
    content: 'Currently, Jadoo specializes in flight bookings and tracking. We are continuously working to expand our services, and hotel booking will be added in a future update.',
  },
  {
    title: 'What about car hire?',
    content: 'As a flight-focused platform, Jadoo does not offer car hire services at this time. We recommend checking with your airline partner for car rental options.',
  },
  {
    title: 'What\'s a Price Alert?',
    content: 'A Price Alert is a free service from Jadoo that sends you an email or notification when the price of a flight you are watching changes. It helps you book at the best possible time.',
  },
  {
    title: 'Can I book a flexible flight ticket?',
    content: 'Yes, Jadoo shows you flight options with flexible booking policies where available. Look for the "Flexible Ticket" label during your search to see which flights offer this feature.',
  },
  {
    title: 'Can I book flights that emit less CO₂?',
    content: 'Jadoo is committed to sustainable travel. During your search, you can use our filters to identify flights with lower carbon emissions, helping you make an eco-friendly choice.',
  },
];
export const headingWords = ["It’s", "more", "than", "just", "a", "trip"];

export const economyLayout = [
  [{ seat: "6A" }, { seat: "6B" }, { seat: "6C" }, null, { seat: "6D" }, { seat: "6E" }, { seat: "6F" }],
  [{ seat: "7A" }, { seat: "7B" }, { seat: "7C" }, null, { seat: "7D" }, { seat: "7E" }, { seat: "7F" }],
  [{ seat: "8A" }, { seat: "8B" }, { seat: "8C" }, null, { seat: "8D" }, { seat: "8E" }, { seat: "8F" }],
  [{ seat: "9A" }, { seat: "9B" }, { seat: "9C" }, null, { seat: "9D" }, { seat: "9E" }, { seat: "9F" }],
  [{ seat: "10A" }, { seat: "10B" }, { seat: "10C" }, null, { seat: "10D" }, { seat: "10E" }, { seat: "10F" }],
  [{ seat: "11A" }, { seat: "11B" }, { seat: "11C" }, null, { seat: "11D" }, { seat: "11E" }, { seat: "11F" }],
  [{ seat: "12A" }, { seat: "12B" }, { seat: "12C" }, null, { seat: "12D" }, { seat: "12E" }, { seat: "12F" }],
  [{ seat: "13A" }, { seat: "13B" }, { seat: "13C" }, null, { seat: "13D" }, { seat: "13E" }, { seat: "13F" }],
  null,
  [{ seat: "14A", exit: true }, { seat: "14B" }, null, { seat: "14D" }, { seat: "14E" }],
  [{ seat: "15A" }, { seat: "15B" }, null, { seat: "15D" }, { seat: "15E" }],
  [{ seat: "16A" }, { seat: "16B" }, null, { seat: "16D" }, { seat: "16E" }],
  [{ seat: "17A" }, { seat: "17B" }, null, { seat: "17D", exit: true }, { seat: "17E" }]
];

export const businessLayout = [
  [{ seat: "1A" }, { seat: "1B" }, null, { seat: "1C" }, { seat: "1D" }],
  [{ seat: "2A" }, { seat: "2B" }, null, { seat: "2C" }, { seat: "2D" }],
  [{ seat: "3A" }, { seat: "3B" }, null, { seat: "3C" }, { seat: "3D" }],
  [{ seat: "4A" }, { seat: "4B" }, null, { seat: "4C" }, { seat: "4D" }],
  [{ seat: "5A" }, { seat: "5B" }, null, { seat: "5C" }, { seat: "5D" }]
];
export const stats = {
    completedFlights: 152,
    completedPercentage: '92%',
    activeFlights: 24,
    activePercentage: '6%',
    canceledFlights: 8,
    canceledPercentage: '2%',
    totalRevenue: '$45,000',
    revenuePercentage: '12%',
  };

  export const bookings = [
    {
      flightNo: "CN-K12345",
      airline: "CloudNine Airlines",
      route: "CDO-JFK",
      departure: "9:00 AM",
      arrival: "12:00 PM",
      date: "2028-07-01",
      passengers: 187,
      status: "Confirmed",
    },
    {
      flightNo: "SH-07456",
      airline: "SkyHigh Airlines",
      route: "FRA-BKK",
      departure: "7:00 AM",
      arrival: "3:00 PM",
      date: "2028-07-01",
      passengers: 177,
      status: "Pending",
    },
    {
      flightNo: "TR-54321",
      airline: "Traveler Airways",
      route: "LHR-DXB",
      departure: "8:00 PM",
      arrival: "5:00 AM",
      date: "2028-07-02",
      passengers: 150,
      status: "Cancelled",
    },
  ];
export const weeklySales = [1200, 1800, 2200, 3200, 1500, 2100, 1900];
export const monthlySales = [8000, 10000, 12000, 15000, 11000, 14000, 13000];
export const yearlySales = [50000, 60000, 70000, 80000, 75000, 70000, 65000];

export const weeklyOther = [1000, 1500, 1900, 2500, 1400, 1900, 1600];
export const monthlyOther = [5000, 7000, 8000, 10000, 6500, 9000, 8500];
export const yearlyOther = [30000, 35000, 40000, 45000, 42000, 39000, 38000];

export const chartLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1000
      }
    }
  }
};
// src/data/passengerFormData.js

export const defaultFormData = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
  ecFirst: "",
  ecLast: "",
  ecEmail: "",
  ecPhone: "",
  sameAsP1: false,
};

export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const isValidPhone = (phone) => (phone || "").replace(/\D/g, "").length >= 7;

export const getFallbackFlightId = (selectedFlights = []) => {
  return (
    selectedFlights?.[0]?.flightCode ||
    selectedFlights?.[0]?.flightId ||
    selectedFlights?.[0]?._id ||
    "DEMO123"
  );
};

export const getGenderChipClass = (gender) => {
  return gender === "female"
    ? "bg-pink-100 text-pink-700 border border-pink-300"
    : "bg-blue-100 text-blue-700 border border-blue-300";
};
export const initialFlightFormData = {
  airline: '',
  logo: '',
  flightCode: '',
  departureTime: '',
  arrivalTime: '',
  stop: '',
  duration: '',
  price: '',
  type: '',
  baggage: '',
  meal: '0',
  lax: '',
  laf: '',
};
