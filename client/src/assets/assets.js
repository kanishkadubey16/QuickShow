import logo from './logo.svg'
import marvelLogo from './marvelLogo.svg'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'

export const assets = {
    logo,
    marvelLogo,
    googlePlay,
    appStore,
    screenImage,
    profile
}

export const dummyTrailers = [
    {
        title: "Lilo & Stitch | Official Teaser",
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/embed/umiKiW4En9g'
    },
    {
        title: "Marvel Television's Ironheart | Official Trailer",
        image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/embed/WpW36ldAqnM'
    },
    {
        title: "Captain America: Brave New World | Official Trailer",
        image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/embed/1pHDWnXmK7Y'
    },
    {
        title: "Lilo & Stitch | Official Trailer",
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/embed/umiKiW4En9g'
    },
    {
        title: "Marvel Studios' Thunderbolts* | Official Trailer",
        image: "https://img.youtube.com/vi/hUUszE29jS0/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/embed/hUUszE29jS0'
    },
]

const dummyCastsData = [
    { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", },
    { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", },
    { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", },
    { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", },
    { "name": "Tue Lunding", "profile_path": "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg", },
    { "name": "Jacek Dzisiewicz", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", },
    { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", },
    { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", },
    { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", },
    { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Pawel Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", },
    { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", }
]

export const dummyShowsData = [
    {
        "_id": "m1",
        "id": 1,
        "title": "Lilo & Stitch",
        "overview": "A young girl's close encounter with the galaxy's most wanted extraterrestrial.",
        "poster_path": "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
        "genres": [{ "id": 27, "name": "Horror" }],
        "casts": dummyCastsData,
        "release_date": "2025-04-16",
        "vote_average": 7.5,
        "vote_count": 3300,
        "runtime": 120,
        "trailer_url": "https://www.youtube.com/embed/umiKiW4En9g",
    },
    {
        "_id": "m2",
        "id": 2,
        "title": "Until Dawn",
        "overview": "Eight friends are trapped on a remote mountain retreat, and they aren't alone.",
        "poster_path": "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
        "genres": [{ "id": 16, "name": "Animation" }],
        "casts": dummyCastsData,
        "release_date": "2025-11-26",
        "vote_average": 7.5,
        "vote_count": 1200,
        "runtime": 105,
        "trailer_url": "https://www.youtube.com/embed/umiKiW4En9g",
    },
    {
        "_id": "m3",
        "id": 3,
        "title": "Mission: Impossible – Dead Reckoning Part One",
        "overview": "Ethan Hunt and his IMF team must track down a dangerous new weapon that threatens all of humanity.",
        "poster_path": "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg",
        "genres": [{ "id": 878, "name": "Sci-Fi" }],
        "casts": dummyCastsData,
        "release_date": "2025-12-17",
        "vote_average": 7.4,
        "vote_count": 2800,
        "runtime": 160,
        "trailer_url": "https://www.youtube.com/embed/1pHDWnXmK7Y",
    },
    {
        "_id": "m4",
        "id": 4,
        "title": "In the Lost Lands",
        "overview": "A sorceress travels to the desolate Lost Lands and encounters a world of wonders and terrors.",
        "poster_path": "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
        "genres": [{ "id": 28, "name": "Action" }],
        "casts": dummyCastsData,
        "release_date": "2026-01-13",
        "vote_average": 7.1,
        "vote_count": 683,
        "runtime": 110,
        "trailer_url": "https://www.youtube.com/embed/WpW36ldAqnM",
    },
    {
        "_id": "m5",
        "id": 5,
        "title": "Venom: The Last Dance",
        "overview": "Eddie and Venom are on the run. Hunted by both of their worlds, the duo is forced into a devastating decision.",
        "poster_path": "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
        "genres": [{ "id": 14, "name": "Fantasy" }],
        "casts": dummyCastsData,
        "release_date": "2025-05-15",
        "vote_average": 7.2,
        "vote_count": 450,
        "runtime": 130,
        "trailer_url": "https://www.youtube.com/embed/hUUszE29jS0",
    },
    {
        "_id": "m6",
        "id": 6,
        "title": "Reptol Family",
        "overview": "A fun family adventure.",
        "poster_path": "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
        "genres": [{ "id": 10751, "name": "Family" }],
        "casts": dummyCastsData,
        "release_date": "2026-01-20",
        "vote_average": 6.9,
        "vote_count": 150,
        "runtime": 95,
        "trailer_url": "https://www.youtube.com/embed/umiKiW4En9g",
    }
]

export const dummyDateTimeData = {
    "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
    ],
    "2025-07-25": [
        { "time": "2025-07-25T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" },
        { "time": "2025-07-25T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-07-25T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd6" }
    ],
    "2025-07-26": [
        { "time": "2025-07-26T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-07-26T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd8" },
        { "time": "2025-07-26T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd9" }
    ],
    "2025-07-27": [
        { "time": "2025-07-27T01:00:00.000Z", "showId": "68395b407f6329be2bb45bda" },
        { "time": "2025-07-27T03:00:00.000Z", "showId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-07-27T05:00:00.000Z", "showId": "68395b407f6329be2bb45bdc" }
    ]
}

export const dummyDashboardData = {
    "totalBookings": 20,
    "totalRevenue": 3247,
    "totalUser": 80,
    "activeShows": [
        {
            "_id": "s1",
            "movie": dummyShowsData[0],
            "showDateTime": "2025-06-08T20:51:00.000Z",
            "showPrice": 22,
            "occupiedSeats": {},
        },
        {
            "_id": "s2",
            "movie": dummyShowsData[1],
            "showDateTime": "2025-09-19T01:00:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        },
        {
            "_id": "s3",
            "movie": dummyShowsData[1],
            "showDateTime": "2025-05-19T01:00:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        },
        {
            "_id": "s4",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-02-19T17:39:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        },
        {
            "_id": "s5",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-03-20T18:00:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        },
        {
            "_id": "s6",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-04-20T19:00:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        },
        {
            "_id": "s7",
            "movie": dummyShowsData[4],
            "showDateTime": "2025-05-20T20:00:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        },
        {
            "_id": "s8",
            "movie": dummyShowsData[5],
            "showDateTime": "2025-06-20T21:00:00.000Z",
            "showPrice": 100,
            "occupiedSeats": {},
        }
    ]
}


export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 98,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 49,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 147,
        "bookedSeats": ["A1", "A2", "A3"],
        "isPaid": true,
    },
]