// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_proto_pb = require('../proto/proto_pb.js');

function serialize_proto_StreamDataRequest(arg) {
  if (!(arg instanceof proto_proto_pb.StreamDataRequest)) {
    throw new Error('Expected argument of type proto.StreamDataRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_proto_StreamDataRequest(buffer_arg) {
  return proto_proto_pb.StreamDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_StreamDataResponse(arg) {
  if (!(arg instanceof proto_proto_pb.StreamDataResponse)) {
    throw new Error('Expected argument of type proto.StreamDataResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_proto_StreamDataResponse(buffer_arg) {
  return proto_proto_pb.StreamDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CTEService = exports.CTEService = {
  startStream: {
    path: '/proto.CTE/startStream',
    requestStream: true,
    responseStream: true,
    requestType: proto_proto_pb.StreamDataRequest,
    responseType: proto_proto_pb.StreamDataResponse,
    requestSerialize: serialize_proto_StreamDataRequest,
    requestDeserialize: deserialize_proto_StreamDataRequest,
    responseSerialize: serialize_proto_StreamDataResponse,
    responseDeserialize: deserialize_proto_StreamDataResponse,
  },
};

exports.CTEClient = grpc.makeGenericClientConstructor(CTEService);
