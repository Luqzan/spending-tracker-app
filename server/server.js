/* eslint-disable no-undef */
import express from "express";
import session from "express-session";
import cors from "cors";
import { sessionStore, connectDatabase } from "./db/database.js";
import env from "dotenv";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import api from "./routes/api.js";
import { User } from "./models/index.js";

env.config();

const port = process.env.SERVER_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (userId, cb) => {
  try {
    let user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  } catch (err) {
    cb(err);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          return cb(null, false, "Email has not been registered.");
        }

        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false, "Incorrect password.");
        }

        return cb(null, user, "Authentication successful.");
      } catch (err) {
        cb(err, false, "Internal server error. Try again.");
      }
    }
  )
);

app.use("/api", api);

// UNCOMMENT HERE TO SEED - START
// import { Category, SubCategory } from "./models/index.js";
// app.get("/seed", async (req, res) => {
//   try {
//     const categories = await Category.bulkCreate([
//       { name: "food & beverages" },
//       { name: "transport" },
//       { name: "housing & utilities" },
//       { name: "health & wellness" },
//       { name: "education" },
//       { name: "entertainment & leisure" },
//       { name: "travel" },
//       { name: "shopping" },
//       { name: "family & relationships" },
//       { name: "financial commitments" },
//       { name: "charity & donations" },
//       { name: "business & work" },
//       { name: "hobbies & interests" },
//       { name: "beauty & grooming" },
//       { name: "technology" },
//       { name: "events & celebrations" },
//       { name: "miscellaneous" },
//     ]);

//     if (!categories) {
//       res.status(500).json({ error: true, message: "seeding failed." });
//       return;
//     }

//     for (const category of categories) {
//       if (category.name === "food & beverages") {
//         await SubCategory.bulkCreate([
//           { name: "dining out", categoryId: category.id },
//           { name: "takeaway", categoryId: category.id },
//           { name: "delivery", categoryId: category.id },
//           { name: "groceries", categoryId: category.id },
//           { name: "snacks", categoryId: category.id },
//           { name: "beverages", categoryId: category.id },
//           { name: "meal subscriptions", categoryId: category.id },
//           { name: "catering services", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "transport") {
//         await SubCategory.bulkCreate([
//           { name: "fuel", categoryId: category.id },
//           { name: "parking", categoryId: category.id },
//           { name: "public transport", categoryId: category.id },
//           { name: "hailing", categoryId: category.id },
//           { name: "vehicle maintenance", categoryId: category.id },
//           { name: "vehicle loan payments", categoryId: category.id },
//           { name: "vehicle insurance", categoryId: category.id },
//           { name: "car rentals", categoryId: category.id },
//           { name: "cycling expenses", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "housing & utilities") {
//         await SubCategory.bulkCreate([
//           { name: "rent", categoryId: category.id },
//           { name: "mortgage", categoryId: category.id },
//           { name: "electricity", categoryId: category.id },
//           { name: "water", categoryId: category.id },
//           { name: "gas", categoryId: category.id },
//           { name: "internet bills", categoryId: category.id },
//           { name: "phone bills", categoryId: category.id },
//           { name: "housing maintenance", categoryId: category.id },
//           { name: "home security", categoryId: category.id },
//           { name: "community fees", categoryId: category.id },
//           { name: "property insurance", categoryId: category.id },
//           { name: "furniture and decorations", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "health & wellness") {
//         await SubCategory.bulkCreate([
//           { name: "doctor consultation", categoryId: category.id },
//           { name: "medication", categoryId: category.id },
//           { name: "hospital bills", categoryId: category.id },
//           { name: "medical insurance", categoryId: category.id },
//           { name: "fitness", categoryId: category.id },
//           { name: "mental health", categoryId: category.id },
//           { name: "dietary supplements", categoryId: category.id },
//           { name: "optical care", categoryId: category.id },
//           { name: "alternative medicine", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "education") {
//         await SubCategory.bulkCreate([
//           { name: "tuition fees", categoryId: category.id },
//           { name: "school supplies", categoryId: category.id },
//           { name: "online courses", categoryId: category.id },
//           { name: "certification programs", categoryId: category.id },
//           { name: "exam fees", categoryId: category.id },
//           { name: "educational apps", categoryId: category.id },
//           { name: "research material", categoryId: category.id },
//           { name: "student loans", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "entertainment & leisure") {
//         await SubCategory.bulkCreate([
//           { name: "movies", categoryId: category.id },
//           { name: "concerts", categoryId: category.id },
//           { name: "gaming", categoryId: category.id },
//           { name: "subscriptions", categoryId: category.id },
//           { name: "event and festivals", categoryId: category.id },
//           { name: "exhibitions", categoryId: category.id },
//           { name: "theme parks", categoryId: category.id },
//           {
//             name: "clubs and associations memberships",
//             categoryId: category.id,
//           },
//           { name: "books and comics", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "travel") {
//         await SubCategory.bulkCreate([
//           { name: "flights", categoryId: category.id },
//           { name: "accommodation", categoryId: category.id },
//           { name: "transportation", categoryId: category.id },
//           { name: "travel insurance", categoryId: category.id },
//           { name: "travel packages", categoryId: category.id },
//           { name: "souvenirs", categoryId: category.id },
//           { name: "visa/passport fees", categoryId: category.id },
//           { name: "luggage & travel accessories", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "shopping") {
//         await SubCategory.bulkCreate([
//           { name: "clothing", categoryId: category.id },
//           { name: "footwear", categoryId: category.id },
//           { name: "accessories", categoryId: category.id },
//           { name: "electronics", categoryId: category.id },
//           { name: "personal care", categoryId: category.id },
//           { name: "luxury goods", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "family & relationships") {
//         await SubCategory.bulkCreate([
//           { name: "childcare", categoryId: category.id },
//           { name: "children's education", categoryId: category.id },
//           { name: "elder care", categoryId: category.id },
//           { name: "pet care", categoryId: category.id },
//           { name: "gifts", categoryId: category.id },
//           { name: "family events", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "financial commitments") {
//         await SubCategory.bulkCreate([
//           { name: "savings", categoryId: category.id },
//           { name: "investments", categoryId: category.id },
//           { name: "loans", categoryId: category.id },
//           { name: "taxes", categoryId: category.id },
//           { name: "insurance premiums", categoryId: category.id },
//           { name: "credit card payments", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "charity & donations") {
//         await SubCategory.bulkCreate([
//           { name: "religious donations", categoryId: category.id },
//           { name: "NGO contributions", categoryId: category.id },
//           { name: "community projects", categoryId: category.id },
//           { name: "crowdfunding", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "business & work") {
//         await SubCategory.bulkCreate([
//           { name: "office supplies", categoryId: category.id },
//           { name: "professional memberships", categoryId: category.id },
//           { name: "conferences and seminars", categoryId: category.id },
//           { name: "business travel", categoryId: category.id },
//           { name: "software and tools", categoryId: category.id },
//           { name: "advertising and marketing", categoryId: category.id },
//           { name: "work uniforms", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "hobbies & interests") {
//         await SubCategory.bulkCreate([
//           { name: "arts and crafts", categoryId: category.id },
//           { name: "sports", categoryId: category.id },
//           { name: "music", categoryId: category.id },
//           { name: "photography", categoryId: category.id },
//           { name: "gardening", categoryId: category.id },
//           { name: "collectibles", categoryId: category.id },
//           { name: "DIY projects", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "beauty & grooming") {
//         await SubCategory.bulkCreate([
//           { name: "haircare", categoryId: category.id },
//           { name: "skincare", categoryId: category.id },
//           { name: "makeup", categoryId: category.id },
//           { name: "spa treatments", categoryId: category.id },
//           { name: "cosmetic procedures", categoryId: category.id },
//           { name: "fragrances", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "technology") {
//         await SubCategory.bulkCreate([
//           { name: "software", categoryId: category.id },
//           { name: "gadgets", categoryId: category.id },
//           { name: "repairs and maintenance", categoryId: category.id },
//           { name: "cloud storage", categoryId: category.id },
//           { name: "domain and hosting fees", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "events & celebrations") {
//         await SubCategory.bulkCreate([
//           { name: "weddings", categoryId: category.id },
//           { name: "birthdays", categoryId: category.id },
//           { name: "anniversaries", categoryId: category.id },
//           { name: "religious ceremonies", categoryId: category.id },
//           { name: "baby showers", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       } else if (category.name === "miscellaneous") {
//         await SubCategory.bulkCreate([
//           { name: "unexpected expenses", categoryId: category.id },
//           { name: "legal fees", categoryId: category.id },
//           { name: "fines and penalties", categoryId: category.id },
//           { name: "miscellaneous subscriptions", categoryId: category.id },
//           { name: "others", categoryId: category.id },
//         ]);
//       }
//     }

//     res.status(200).json({ error: false, message: "seed successful." });
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({ error: true, message: "seed failed." });
//   }
// });
// UNCOMMENT HERE TO SEED - END

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await connectDatabase();
});
