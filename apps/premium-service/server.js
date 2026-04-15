import { connectToDatabase } from "./config/dbConnect.js";
import path from "node:path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import PremiumUser from "./model/PremiumUsersModel.js";

const PROTO_PATH = path.join("../../", "protos", "premium.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const premiumProto = grpc.loadPackageDefinition(packageDefinition).premium;

async function isUserPremium(call, callback) {
  const { userId } = call.request;

  try {
    const user = await PremiumUser.findOne({
      where: { userId },
    });

    if (!user) {
      return callback(null, { isPremium: false });
    }

    return callback(null, { isPremium: true });
  } catch (error) {
    console.error("Error fetching user premium status:", error);
    return callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
}

const server = new grpc.Server();

server.addService(premiumProto.PremiumService.service, { isUserPremium });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDatabase();
    server.bindAsync(
      `localhost:${PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err) => {
        if (err) {
          console.error("Error binding server:", err);
        } else {
          console.log(`Server running on localhost:${PORT}`);
        }
      },
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
