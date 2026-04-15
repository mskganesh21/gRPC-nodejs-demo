import express from "express";
import { connectToDatabase } from "./config/dbConnect.js";
import client from "./services/gRPC-Client.js";

const app = express();

app.get("/api/v1/isUserPremium/:userId", (req, res) => {
  const { userId } = req.params;

  client.isUserPremium({ userId: Number(userId) }, (error, response) => {
    if (error) {
      console.error("Error fetching user premium status:", error);
      return res.status(500).send({ error: error.message });
    }

    return res.send({
      userId: Number(userId),
      isPremium: response.isPremium
    });
  });
});


app.listen(3000, async () => {
  await connectToDatabase();
  console.log("User service is running on port 3000");
});
