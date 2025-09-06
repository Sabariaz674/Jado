// Image imports
import saudiaImg from '../assets/saudiacountry.jpeg';
import dubaiImg from '../assets/dubaicountry.jpg';
import ukImg from '../assets/ukcountry.jpg';
import chinaImg from '../assets/chinacountry.jpg';

import ukimg from '../assets/destination.jpg';
import saudiaImg1 from '../assets/destination2.jpg';
import dubaiImg2 from '../assets/destination3.jpg';
import chinaImg3 from '../assets/destination4.jpg';
import dubaiimg4 from '../assets/destination5.jpg';
import saudiaimg5 from '../assets/destination6.png';

import profile1 from "../assets/jadouser1.jpg";
import profile2 from "../assets/jadouser2.jpg";
import profile3 from "../assets/jadouser3.jpg";






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
    subtitle: "Explore the rich history and culture of Saudi Arabia, home to the Grand Mosque",

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
    subtitle: "Explore iconic landmarks like Big Ben, Buckingham Palace",

    location: "London"
  },
];

// Exported destinations
export const destinations = [
  {
    image: ukimg,
    title: "Palace of Westminster, London",
    subtitle: "Home to the UK Parliament and iconic Big Ben clock tower",
  
    location: "United Kingdom"
  },
  {
    image: saudiaImg1,
    title: "Al-Masjid an-Nabawi, Madinah",
    subtitle: "The Prophet's Mosque – A sacred sanctuary and the second holiest site in Islam",
    
    location: "Saudi Arabia"
  },
  {
    image: dubaiImg2,
    title: "Luxury Beach Resort, Dubai",
    subtitle: "Experience opulence by the sea with palm-lit elegance and Arabian architecture",
    
    location: "Dubai"
  },
  {
    image: chinaImg3,
    title: "Yangshuo Town, Guilin",
    subtitle: "Close to Guilin Liangjiang International Airport with scenic karst landscapes",
    
    location: "China"
  },
  {
    image: dubaiimg4,
    title: "Burj Khalifa & Downtown Skyline, Dubai",
    subtitle: "Marvel at the tallest building on Earth surrounded by the dazzling lights of Downtown Dubai",
    
    location: "Dubai"
  },
  {
    image: saudiaimg5,
    title: "Masjid al-Haram, Makkah",
    subtitle: "The holiest site in Islam, home to the sacred Kaaba",
    
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

// src/data/placesData.js

import chinaImg1 from "../assets/chinaplace2.jpg";
import chinaImg2 from "../assets/chinaplace3.jpg";
import chinaImg4 from "../assets/chinaplace.jpg";

import dubaiplace from "../assets/dubiplace2.jpg";
import dubaiplace2 from "../assets/dubiplace.jpg";
import dubaiplace3 from "../assets/dubiplace3.jpg";

import saudiaplace from "../assets/saudiaplace.jpg";
import saudiaplace2 from "../assets/saudiaplace2.jpg";
import saudiaplace3 from "../assets/saudiaplace3.jpg";

import ukplace from "../assets/ukplace.jpg";
import ukplace2 from "../assets/ukplace2.jpg";
import ukplace3 from "../assets/ukplace3.jpg";

export const placesData = {
  "China": {
    images: [
      { src: chinaImg1, title: "Great Wall", description: "One of the wonders of the world stretching over 13,000 miles." },
      { src: chinaImg2, title: "Forbidden City", description: "Historic palace in Beijing with rich cultural heritage." },
      { src: chinaImg4, title: "Shanghai Skyline", description: "Modern cityscape with iconic skyscrapers and riverside views." },
    ],
  },
  "Saudi Arabia": {
    images: [
      { src: saudiaplace, title: "Desert Safari", description: "Explore the beautiful dunes of Saudi Arabia." },
      { src: saudiaplace2, title: "Riyadh City", description: "Modern capital city with cultural landmarks." },
      { src: saudiaplace3, title: "Red Sea Coast", description: "Stunning beaches and coral reefs." },
    ],
  },
  "Dubai, UAE": {
    images: [
      { src: dubaiplace, title: "Burj Khalifa", description: "The tallest building in the world with amazing views." },
      { src: dubaiplace2, title: "Palm Jumeirah", description: "Iconic man-made island shaped like a palm tree." },
      { src: dubaiplace3, title: "Dubai Marina", description: "Luxury waterfront with skyscrapers and yachts." },
    ],
  },
  "United Kingdom": {
    images: [
      { src: ukplace, title: "Big Ben", description: "Famous clock tower and London landmark." },
      { src: ukplace2, title: "Tower Bridge", description: "Iconic bridge over the River Thames." },
      { src: ukplace3, title: "Stonehenge", description: "Ancient prehistoric monument in Wiltshire." },
    ],
  },
};

export default placesData;

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
