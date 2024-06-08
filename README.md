// First Observation

// after deep testing i found that multer is not comptiable with fetch
// if we send formdata array through fetch we will not be able to extract image file using
// multer middleware and there will be no file in uploads which will be giving error path not
// defined ....
// now if we send formdata through fetch we will be able to extarct all the feilds including
// image but we have to configure api : { bodyParser : false} and then we dont have to use
// multer at all
// if we send data using json.stringfy then configure api : { bodyParser : true} and all the
// feilds will be available in req.body with 1MB size limit

// Second Observation

// using nextConnect.createRoute method is not working in next js 14
// we have to import createRoute directly from next-connect  libarary
// and call it in our handler and then we can use any middleware usinng apiRouter.use()
// but still i find that multer middleware is not working when sending formdata using fetch/axios
// from frontend

// Third Observation

// when i sent form-data from postman ...multer worked like a charm
// but we have to configure api : { bodyParser : false} so that we can use multer
// and we are able to get every feild in req.body and image in req.file.path