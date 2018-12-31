var messages = require('../../grpc/proto/proto_pb');
var services = require('../../grpc/proto/proto_grpc_pb');
var grpc = require('grpc');
const util = require('util');

let client = null;

export const connect = (port = 50051) => {
  client = new services.CTEClient(
    `localhost:${port}`,
    grpc.credentials.createInsecure()
  );
};

export const pollStream = signals => {
  return new Promise((resolve, reject) => {
    var request = new messages.StreamDataRequest();
    var idsArray = [];
    if (signals.includes('AC')) idsArray.push(1);
    if (signals.includes('DC')) idsArray.push(2);
    request.setSignalidsList(idsArray);
    client.startStream(request, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

export const endConnection = () => {
  if (client) client.close();
  client = null;
};
