import path from "node:path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.join("../../", "protos", "premium.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const premiumProto = grpc.loadPackageDefinition(packageDefinition).premium;

const client = new premiumProto.PremiumService(
  "localhost:5000",
  grpc.credentials.createInsecure(),
);

export default client;
