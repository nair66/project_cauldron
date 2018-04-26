const express = require('express');
const bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const cors = require('cors');

let app = express();
app.use(bodyparser.json());
app.use(cors());

let {mongoose} = require('./db/mongoose');
let {amd_proc, intel_proc} = require('./db/models/processor');
// let {} = require('./db/models/processor');
let {amd_mobo, intel_mobo} = require('./db/models/motherboard');
// let {} = require('./db/models/motherboard');
let {cases} = require('./db/models/cases');
let {psu} = require('./db/models/psu');
let {rams} = require('./db/models/rams');
let {storages} = require('./db/models/storages');
let {coolers} = require('./db/models/coolers');
let {graphics} = require('./db/models/graphics');

let {AmdProcHunt, IntelProcHunt} = require('./db/Possible_sockets');

// graphics let {graphics} = require('./db/models/graphics'); port config for
const port = process.env.port || 3000;

app.get('/apis/processors', (req, res) => {
    // res.send('intel processor page'); with the received data we send back the
    // motherboard data both intel and amd that have the same socket type as the one
    // matching the one the usr chose. collects processors from both amd and intel
    let collect;
    intel_proc
        .find({})
        .then((docs) => {
            collect = docs;
            findAmdProc(collect);
        });

    findAmdProc = (collect) => {
        amd_proc
            .find({})
            .then((docs) => {
                collect = _.concat(collect, docs);
                res.send({processors: collect});
            });
    }
});

app.post('/apis/beginner-build/lowend',cors(), (req, res) => {
    console.log(res)
    let sendData = {};
    let getData = req.body.dataStore;

    let fillProcessorDetails = (doc) => {
        sendData['Processor id'] = doc['processor id'];
        sendData['Processor name'] = doc['processor name'];
        sendData['Processor speed'] = doc['base clock'];
        sendData['Max Boost'] = doc['max boost'];
        sendData['Cores'] = doc['cores'];
        console.log(sendData);
    }

    let fillRamDetails = (doc) => {
        sendData['Ram brand'] = doc['brand'];
        sendData['speed'] = doc['speed'];
        sendData['memory'] = doc['memory'];
    }

    let fillHDDDetails = (doc) => {
        sendData['Storage Brand'] = doc['brand'];
        sendData['capacity'] = doc['capacity'];
        sendData['speed'] = doc['performance class'];
    }

    if (getData.Usage == 'home') {
        if (getData.Processor == 'intel') {
            intel_proc
                .findOne({})
                .where('processor name')
                .regex('.*i3.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                    RunThroughRAMFunc();
                }, (err) => {
                    console.log(err);
                });
        } else if (getData.Processor == 'amd') {
            amd_proc
                .findOne({})
                .where('processor name')
                .regex('.*Ryzen 3.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                    RunThroughRAMFunc();
                }, (err) => {
                    console.log(err);
                });
        }
    } else if (getData.Usage == 'office') {
        if (getData.Processor == 'intel') {
            intel_proc
                .findOne({})
                .where('processor name')
                .regex('.*i5.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                    RunThroughRAMFunc();
                }, (err) => {
                    console.log(err);
                });
        } else if (getData.Processor == 'amd') {
            amd_proc
                .findOne({})
                .where('processor name')
                .regex('.*Ryzen 5.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                    RunThroughRAMFunc();
                }, (err) => {
                    console.log(err);
                });
        }
    }

    let RunThroughRAMFunc = () => {
        switch (getData.RAM) {
            case "4gb":
                rams
                    .findOne()
                    .where('memory')
                    .equals(4)
                    .then((founddoc) => {
                        fillRamDetails(founddoc);
                        RunThroughStorageFunc();
                        console.log('4 gb ram', founddoc);
                    });
                break;
            case "8gb":
                rams
                    .findOne()
                    .where('memory')
                    .equals(8)
                    .then((founddoc) => {
                        fillRamDetails(founddoc);
                        RunThroughStorageFunc();
                    });
                break;
            case "16gb":
                rams
                    .findOne()
                    .where('memory')
                    .equals(16)
                    .then((founddoc) => {
                        fillRamDetails(founddoc);
                        RunThroughStorageFunc();

                    });
                break;
        }
    }

    let RunThroughStorageFunc = () => {
        switch (getData['Hard Disk Space']) {
            case "500gb":
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*500GB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                        
                    });
                break;
            case "1tb":
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*1TB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                        
                    });
                break;
            case "2tb":
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*2TB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                       
                    });
                break;
            default:
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*1TB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                        
                    });
        }
    }

});

app.post('/apis/beginner-build/highend', (req, res) => {
    let sendData = {};
    let getData = req.body.dataStore;

    let fillProcessorDetails = (doc) => {
        sendData['Processor id'] = doc['processor id'];
        sendData['Processor name'] = doc['processor name'];
        sendData['Processor speed'] = doc['base clock'];
        sendData['Max Boost'] = doc['max boost'];
        sendData['Cores'] = doc['cores'];

    }

    let fillRamDetails = (doc) => {
        sendData['Ram brand'] = doc['brand'];
        sendData['speed'] = doc['speed'];
        sendData['memory'] = doc['memory'];
    }

    let fillGraphicsDetails = (doc) => {
        sendData['graphics model'] = doc['gpu model'];
        sendData['clock'] = doc['core clock'];
        sendData['graphics memory'] = doc['memory'];
    }

    let fillHDDDetails = (doc) => {
        sendData['Storage Brand'] = doc['brand'];
        sendData['capacity'] = doc['capacity'];
        sendData['speed'] = doc['performance class'];
    }

    if (getData.Budget == 'less than 50K') {
       
        if (getData.Processor == 'intel') {
            intel_proc
                .findOne({})
                .where('processor name')
                .regex('.*i3.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                }, (err) => {
                    console.log(err);
                });
        } else if (getData.Processor == 'amd') {
          
            amd_proc
                .findOne({})
                .where('processor name')
                .regex('.*Ryzen 3.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                }, (err) => {
                    console.log(err);
                });
        }

        if (getData.Graphics == 'Nvdia') {

            graphics
                .findOne()
                .where('brand')
                .equals('nvidia')
                .where('price')
                .equals('5000')
                .then((founddoc) => {
                    fillGraphicsDetails(founddoc);
                    RunThroughRAMFunc();
                });
        } else if (getData.Graphics === 'Vega') {
            graphics
                .findOne()
                .where('brand')
                .equals('vega')
                .where('price')
                .equals('8000')
                .then((founddoc) => {
                    fillGraphicsDetails(founddoc);
                    RunThroughRAMFunc();
                });
        }

    }

    if (getData.Budget == 'greater than 70k') {
        if (getData.Processor == 'intel') {
            intel_proc
                .findOne({})
                .where('processor name')
                .regex('.*i7.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                }, (err) => {
                    console.log(err);
                });
        } else if (getData.Processor == 'amd') {
            amd_proc
                .findOne({})
                .where('processor name')
                .regex('.*Ryzen 7.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                }, (err) => {
                    console.log(err);
                });
        }

        if (getData.Graphics == 'Nvdia') {
            graphics
                .findOne()
                .where('brand')
                .equals('nvidia')
                .where('price')
                .equals('100000')
                .then((founddoc) => {
                    fillGraphicsDetails(founddoc);
                    RunThroughRAMFunc();
                });
        } else if (getData.Graphics === 'Vega') {
            graphics
                .findOne()
                .where('brand')
                .equals('vega')
                .where('price')
                .equals('80000')
                .then((founddoc) => {
                    fillGraphicsDetails(founddoc);
                    RunThroughRAMFunc();
                });
        }
    }
    if (getData.Budget == '50k-70k') {
        if (getData.Processor == 'intel') {
            intel_proc
                .findOne({})
                .where('processor name')
                .regex('.*i5.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                }, (err) => {
                    console.log(err);
                });
        } else if (getData.Processor == 'amd') {
            amd_proc
                .findOne({})
                .where('processor name')
                .regex('.*Ryzen 5.*')
                .then((founddoc) => {
                    fillProcessorDetails(founddoc);
                }, (err) => {
                    console.log(err);
                });
        }

        if (getData.Graphics == 'Nvdia') {

            graphics
                .findOne()
                .where('brand')
                .equals('nvidia')
                .where('price')
                .equals('10000')
                .then((founddoc) => {
                    fillGraphicsDetails(founddoc);
                    RunThroughRAMFunc();
                });
        } else if (getData.Graphics === 'Vega') {
            
            graphics
                .findOne()
                .where('brand')
                .equals('vega')
                .where('price')
                .equals('25000')
                .then((founddoc) => {
                    fillGraphicsDetails(founddoc);
                    RunThroughRAMFunc();
                });
        }

    }

    let RunThroughRAMFunc = () => {
        
        switch (getData.RAM) {
            case "4gb":
                rams
                    .findOne()
                    .where('memory')
                    .equals(4)
                    .then((founddoc) => {
                        fillRamDetails(founddoc);
                        RunThroughStorageFunc();
                    });
                break;
            case "8gb":
                rams
                    .findOne()
                    .where('memory')
                    .equals(8)
                    .then((founddoc) => {
                        fillRamDetails(founddoc);
                        RunThroughStorageFunc();
                    });
                break;
            case "16gb":
                rams
                    .findOne()
                    .where('memory')
                    .equals(16)
                    .then((founddoc) => {
                        fillRamDetails(founddoc);
                        RunThroughStorageFunc();
                        
                    });
                break;
        }
    }

    let RunThroughStorageFunc = () => {
        
        switch (getData['Hard Disk Space']) {
            case "500gb":
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*500GB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                    });
                break;
            case "1tb":
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*1TB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                    });
                break;
            case "2tb":
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*2TB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                
                    });
                break;
            default:
                storages
                    .findOne()
                    .where('capacity')
                    .regex('.*1TB.*')
                    .then((founddoc) => {
                        fillHDDDetails(founddoc);
                        res.send(sendData);
                    });
        }

    }
});

// app.get('/apis/motherboards/cpu-socket=:cpu_socket', (req, res) => {
// cpu_socket = req.params.cpu_socket;     if (AmdProcHunt(cpu_socket)) {
//  console.log('amd socket type');         amd_mobo             .find({'cpu
// socket': cpu_socket})             .then((docs) => {                 res
//               .send({motherboards: docs})                     .status(200);
//           }, (err) => {                 console.log(err);             });
// } else if (IntelProcHunt(cpu_socket)) {         console.log('intel socket
// type');         intel_mobo             .find({'cpu socket': cpu_socket})
//        .then((docs) => {                 res
// .send({motherboards: docs})                     .status(200);             },
// (err) => {                 console.log(err);             });     } else {
//     res             .send({error: 'Not found', 'err details': 'No matching
// socket type or socket type', suggestion: 'Double check data and make sure the
// data (including caps) is correct', status: 404})             .status(404);
//  } }); app.get('/apis/rams/processor-id=:proc_id,motherboard-id=:mobo_id',
// (req, res) => {     let proc_id = req.params.proc_id;     let mobo_id =
// req.params.mobo_id;     let moboMaxMemSizeSupport;     let
// moboMaxFreqnSupport;     let moboMemSlots;     let processorMemChannels;
// let collect;     intel_proc         .findOne({'processor id': proc_id})
//   .then((founddoc) => {             if (founddoc) {                 collect =
// {                     processor: founddoc                 };
// lookForMobo(collect);             } else {                 amd_proc
//           .findOne({'processor id': proc_id})
// .then((founddoc) => {                         if (!founddoc) {
//              return res                                 .send({error: 'no
// processors found', 'err details': 'there are no matching processors for the
// processor id given', suggestion: 'Double check data and make sure the data
// (including caps) is correct', status: 404})
// .status(404);                         }                         collect = {
//                           processor: founddoc                         };
//                    lookForMobo(collect);                     }, (err) => {
//                      console.log(err);                     });             }
//        }, (err) => {             console.log(err);         });
// lookForMobo = (collect) => {         intel_mobo             .findOne({mbid:
// mobo_id})             .then((founddoc) => {                 if (founddoc) {
//                   collect = _.concat(collect, {motherboard: founddoc});
//               setParametersFunction(collect);                 } else {
//              amd_mobo                         .findOne({mbid: mobo_id})
//                   .then((founddoc) => {                             if
// (!founddoc) {                                 return res
//                .send({error: 'no motherboards found', 'err details': 'there
// are no matching motherboards for the motherboard id given', suggestion:
// 'Double check data and make sure the data (including caps) is correct',
// status: 404})                                     .status(404)
//              }                             collect = _.concat(collect,
// {motherboard: founddoc});
// setParametersFunction(collect);                         }, (err) => {
//                     console.log(err);                         })
//    }             }, (err) => {                 console.log(err);
// });     }     setParametersFunction = (collect) => {
// mobo_MaxMemSizeSupport = collect[1].motherboard["max memory support"];
//  console.log(moboMaxMemSizeSupport);         mobo_MaxFreqnSupport =
// collect[1].motherboard["max memory frequency"];
// console.log(moboMaxFreqnSupport);         mobo_MemSlots =
// collect[1].motherboard["memory slots"];         console.log(moboMemSlots);
//      processor_MemChannels = collect[0].processor["system memory channels"];
//        console.log(processor_MemChannels);
// fetchCompatibleParts(mobo_MaxMemSizeSupport, mobo_MaxFreqnSupport,
// mobo_MemSlots, processor_MemChannels);     }     fetchCompatibleParts =
// (maxMem, maxFreq, maxSlots, memChannels) => {         rams
// .find()             .where('memory')             .lte(maxMem)
// .where('speed')             .lte(maxFreq)             .where('memory config')
//             .lte(maxSlots)             .lte(memChannels)
// .then((founddocs) => {                 res
// .send(founddocs)                     .status(200);             });     } });
// app.get('/apis/storage/motherboard-id=:mobo_id,case-id=:case_id', (req, res)
// => {     // let mobo_id = req.params.mobo_id; let case_id =
// req.params.case_id; let     // collect; cases.find({'case
// id':case_id}).then((founddocs) => {     // if(!founddocs){         return
// res.send({             error:'No matching     // cases',             'err
// details':'no matching error details found',     // 'status':404
// }).status(404);     }     collect = {         case :     // founddocs     }
//   lookForMobo(collect); },(err) => {     console.log(err);     // });
// lookForMobo = (collect) => {     intel_mobo         .findOne({mbid:     //
// mobo_id})         .then((founddoc) => {             if (founddoc) {     //
// collect = _.concat(collect, {motherboard: founddoc});     //
// setParametersFunction(collect);             } else {                 amd_mobo
//     //                     .findOne({mbid: mobo_id}) .then((founddoc) => {
//  //               if (!founddoc) {              return res     //
// .send({error: 'no motherboards found', 'err details': 'there are no     //
// matching motherboards for the motherboard id given', suggestion: 'Double
// // check data and make sure the data (including caps) is correct', status:
// 404})     //    .status(404)                         }
//  collect =     // _.concat(collect, {motherboard: founddoc});
// res.send(collect).status(400);     // setParametersFunction(collect);
//             }, (err) => {     // console.log(err);                     });
//          } }, (err) => {     //     console.log(err);         }); }
// setParametersFunction = (collect) => {     //  let motherboard_SATAType
// //sata type     let case_driveBays //drive bays } });
// app.get('/apis/graphics', (req, res) => {     res.send('graphics page'); });
// //
// app.get('/apis/coolers/motherboard-id=:mobo-id,low-profile?:low-profile,led?:
// // led,for-gaming?:gaming,atx-exclusive?:atx-exclusive',(req, res) => {
// // // res.send('cooler page');     coolers.find({{}).where     //intel or amd
// // //home = low profile     //led = yes or no     //gaming = above 65
// cfm(intel) // or stock for amd     //ATX_Exclusive = atx boards only(extreme
// gaming) }); // app.get('/apis/power-supply', (req, res) => {
// res.send('power-supply // page'); }); app.get('/apis/case', (req, res) => {
//   res.send('case'); }); // remember to change this before heroku deployment

app.listen(port, () => {
    console.log(`server up on port ${port}`);
})