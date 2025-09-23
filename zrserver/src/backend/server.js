import express from "express";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";

const app = express();

app.use(
  session({ secret: "zaralha-secret", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Steam OpenID
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: "TUA_STEAM_API_KEY", // cria aqui: https://steamcommunity.com/dev/apikey
    },
    (identifier, profile, done) => {
      return done(null, profile);
    }
  )
);

// Rota login
app.get("/auth/steam", passport.authenticate("steam"));

// Callback da Steam
app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(
      "http://localhost:5173/?user=" +
        encodeURIComponent(JSON.stringify(req.user))
    );
  }
);

res.redirect(
  "http://localhost:5173/?user=" + encodeURIComponent(JSON.stringify(req.user))
);

app.listen(3000, () => console.log("Backend rodando em http://localhost:3000"));
