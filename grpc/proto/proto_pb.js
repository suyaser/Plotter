/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.proto.SampleData', null, global);
goog.exportSymbol('proto.proto.SignalData', null, global);
goog.exportSymbol('proto.proto.StreamDataRequest', null, global);
goog.exportSymbol('proto.proto.StreamDataResponse', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.SampleData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.SampleData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.SampleData.displayName = 'proto.proto.SampleData';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.SampleData.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.SampleData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.SampleData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.SampleData.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: jspb.Message.getFieldWithDefault(msg, 2, 0),
    value: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.SampleData}
 */
proto.proto.SampleData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.SampleData;
  return proto.proto.SampleData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.SampleData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.SampleData}
 */
proto.proto.SampleData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setTimestamp(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.SampleData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.SampleData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.SampleData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.SampleData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional uint64 timestamp = 2;
 * @return {number}
 */
proto.proto.SampleData.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.proto.SampleData.prototype.setTimestamp = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 value = 3;
 * @return {number}
 */
proto.proto.SampleData.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.proto.SampleData.prototype.setValue = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.SignalData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.SignalData.repeatedFields_, null);
};
goog.inherits(proto.proto.SignalData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.SignalData.displayName = 'proto.proto.SignalData';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.SignalData.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.SignalData.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.SignalData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.SignalData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.SignalData.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    dataList: jspb.Message.toObjectList(msg.getDataList(),
    proto.proto.SampleData.toObject, includeInstance),
    error: jspb.Message.getFieldWithDefault(msg, 3, false),
    errormsg: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.SignalData}
 */
proto.proto.SignalData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.SignalData;
  return proto.proto.SignalData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.SignalData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.SignalData}
 */
proto.proto.SignalData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.proto.SampleData;
      reader.readMessage(value,proto.proto.SampleData.deserializeBinaryFromReader);
      msg.addData(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setError(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrormsg(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.SignalData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.SignalData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.SignalData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.SignalData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getDataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.proto.SampleData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getErrormsg();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.proto.SignalData.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.proto.SignalData.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated SampleData data = 2;
 * @return {!Array.<!proto.proto.SampleData>}
 */
proto.proto.SignalData.prototype.getDataList = function() {
  return /** @type{!Array.<!proto.proto.SampleData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.proto.SampleData, 2));
};


/** @param {!Array.<!proto.proto.SampleData>} value */
proto.proto.SignalData.prototype.setDataList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.proto.SampleData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.proto.SampleData}
 */
proto.proto.SignalData.prototype.addData = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.proto.SampleData, opt_index);
};


proto.proto.SignalData.prototype.clearDataList = function() {
  this.setDataList([]);
};


/**
 * optional bool error = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.proto.SignalData.prototype.getError = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.proto.SignalData.prototype.setError = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string errorMsg = 4;
 * @return {string}
 */
proto.proto.SignalData.prototype.getErrormsg = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.proto.SignalData.prototype.setErrormsg = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.StreamDataResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.StreamDataResponse.repeatedFields_, null);
};
goog.inherits(proto.proto.StreamDataResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.StreamDataResponse.displayName = 'proto.proto.StreamDataResponse';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.StreamDataResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.StreamDataResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.StreamDataResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.StreamDataResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.StreamDataResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    responseList: jspb.Message.toObjectList(msg.getResponseList(),
    proto.proto.SignalData.toObject, includeInstance),
    error: jspb.Message.getFieldWithDefault(msg, 4, false),
    errormsg: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.StreamDataResponse}
 */
proto.proto.StreamDataResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.StreamDataResponse;
  return proto.proto.StreamDataResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.StreamDataResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.StreamDataResponse}
 */
proto.proto.StreamDataResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.proto.SignalData;
      reader.readMessage(value,proto.proto.SignalData.deserializeBinaryFromReader);
      msg.addResponse(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setError(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrormsg(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.StreamDataResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.StreamDataResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.StreamDataResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.StreamDataResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResponseList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.proto.SignalData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getErrormsg();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * repeated SignalData response = 1;
 * @return {!Array.<!proto.proto.SignalData>}
 */
proto.proto.StreamDataResponse.prototype.getResponseList = function() {
  return /** @type{!Array.<!proto.proto.SignalData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.proto.SignalData, 1));
};


/** @param {!Array.<!proto.proto.SignalData>} value */
proto.proto.StreamDataResponse.prototype.setResponseList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.proto.SignalData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.proto.SignalData}
 */
proto.proto.StreamDataResponse.prototype.addResponse = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.proto.SignalData, opt_index);
};


proto.proto.StreamDataResponse.prototype.clearResponseList = function() {
  this.setResponseList([]);
};


/**
 * optional bool error = 4;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.proto.StreamDataResponse.prototype.getError = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 4, false));
};


/** @param {boolean} value */
proto.proto.StreamDataResponse.prototype.setError = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string errorMsg = 5;
 * @return {string}
 */
proto.proto.StreamDataResponse.prototype.getErrormsg = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.proto.StreamDataResponse.prototype.setErrormsg = function(value) {
  jspb.Message.setField(this, 5, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.StreamDataRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.StreamDataRequest.repeatedFields_, null);
};
goog.inherits(proto.proto.StreamDataRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.StreamDataRequest.displayName = 'proto.proto.StreamDataRequest';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.StreamDataRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.StreamDataRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.StreamDataRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.StreamDataRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.StreamDataRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    signalidsList: jspb.Message.getRepeatedField(msg, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.StreamDataRequest}
 */
proto.proto.StreamDataRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.StreamDataRequest;
  return proto.proto.StreamDataRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.StreamDataRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.StreamDataRequest}
 */
proto.proto.StreamDataRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array.<number>} */ (reader.readPackedUint64());
      msg.setSignalidsList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.StreamDataRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.StreamDataRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.StreamDataRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.StreamDataRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSignalidsList();
  if (f.length > 0) {
    writer.writePackedUint64(
      1,
      f
    );
  }
};


/**
 * repeated uint64 signalIds = 1;
 * @return {!Array.<number>}
 */
proto.proto.StreamDataRequest.prototype.getSignalidsList = function() {
  return /** @type {!Array.<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/** @param {!Array.<number>} value */
proto.proto.StreamDataRequest.prototype.setSignalidsList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.proto.StreamDataRequest.prototype.addSignalids = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.proto.StreamDataRequest.prototype.clearSignalidsList = function() {
  this.setSignalidsList([]);
};


goog.object.extend(exports, proto.proto);