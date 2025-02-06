export const SelectBudgetOptions = [
    {
        id:1,
        icon: "💵",
        title:"Cheap",
        desc: "Economize and Save"
    },
    {
        id: 2,
        icon: "💰",
        title:"Moderate",
        desc: "Balance Cost and Comfort"
    },
    {
        id:3,
        icon: "💎",
        title:"Luxury",
        desc: "Induldge without Limits"
    },
]

export const SelectNoOfPersons = [
    {
        id:1,
        icon: "🚶",
        title: "Solo",
        desc: "Discovering on Your Own",
        no: "1 Person(Solo)"
    },
    {
        id:2,
        icon: "💑",
        title: "Partner",
        desc: "Exploring with a Loved One",
        no: "2 People(Couple)"
    },
    {
        id:3,
        icon: "👨‍👩‍👧‍👦",
        title: "Family",
        desc: "Fun for All Ages",
        no: "3 to 5 People(Family)"
    },
    {
        id:4,
        icon: "🤝",
        title: "Friends",
        desc: "Adventure with Your Crew",
        no: "5 to 10 People(Friends)"
    },
]

export const AI_PROMPT = "Generate a Trip itinerary for {totalDays} days trip to  Location : {location} , for {traveller} , within a {budget} budget. List all hotels with HotelName , hotel address , price,  hotel image url, geo coordinates, rating , descriptions , and suggest the itinerary with placeName, place details, place image url, geo coordinates, ticket pricing, rating , time taken to travel for each location for {totalDays} days and  with each day plan suggest best time to visit , Remember all have to cover in the {budget} level budget. Important: give the result in JSON Format"