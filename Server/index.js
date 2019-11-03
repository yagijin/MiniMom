const express = require('express');
const Obniz = require('obniz');
const pcap = require('pcap');
const MACADDR = require('./macAddr.js');
const Database = require("nedb");
require('date-utils');
const obnizcode = require('./obnizcode.js'); 

const db = new Database({ filename: "datedata.db" });

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const obniz = new Obniz(obnizcode);

//Obnizのコントロール
let flagHave = false;//ものを持っているかいないか
let flagExist = true;//家にいるかいないか
let flagAleat = false;//アラート中かどうか
let num = 0;
let diff = 0;
let t1 = new Date();
let t2 = 0; 

function recordtodatabase() {
    //データベースに記録
    let month = new Date().toFormat("MM");
    let day = new Date().toFormat("DD");

    console.log('recordtodb');
    
    db.loadDatabase((error) => {
        if (error !== null) {
            console.error(error);
        }
        console.log("load database completed.");
    });
    
    db.find({ "key" : 1 }, (error, docs) => {
        const index = docs[0].alertDays[month].findIndex(item => item === parseInt(day));
        if(index === -1){//dayが無かった場合追加
            const query = { key: 1 };
            const update = {
                $push: { ["alertDays."+ month] : parseInt(day) }
            };
            const options = {};
            db.update(query, update, options, (error, numOfDocs) => {
            });
        }
    });
    
}

obniz.onconnect = async function () {
    var gp2y0a21yk0f;
    gp2y0a21yk0f = obniz.wired("GP2Y0A21YK0F",{"vcc":0, "gnd":1, "signal":2});
    const speaker = obniz.wired("Speaker", {signal:3, gnd:4});
    await delayms(500);
    //flagExistは外部から制御
    while (true) {
        if(flagAleat){
            if(num > 5){
                flagAleat = false;
                flagHave = false;
                //鳴ったことを記録する
                recordtodatabase();
                console.log("Alert is Done");
                num = 0;
                speaker.stop();
            }
        }else if(flagHave&&flagExist){//もっていている
            t2 = new Date();
            diff = t2 - t1;
            console.log("this is diff:"+diff)
            if(num > 10){
                flagHave = false;
                num = 0;
            }
            if(diff>5000){
                flagAleat = true;
                t2 = 0;
                t1 = 0;
                num = 0;
                diff = 0;
            }
        }else if(flagHave&&!flagExist){//もってていない
            //何もしない
            num = 0;
        }else if(!flagHave&&flagExist){//持って無くている
            if(num > 10){//持ち出したらflagHaveを変える
                flagHave = true;
                flagExist = false;
                console.log("item has gone");
                num = 0;
                
                //対応していないネットワークの場合の動作確認用
/*
                setTimeout(()=> {
                    flagExist=true;
                    t1 = new Date();
                    console.log("FindTarget");
                }, 10000)
*/

            }
        }else if(!flagHave&&!flagExist){//持って無くていない
            //何もしない
        }

        if(flagAleat){
            //アラートを鳴らす処理を書く  
            await delayms(0);      
            speaker.play(1000); 
            
        }

        await delayms(0);
        console.log((await gp2y0a21yk0f.getWait()));
        console.log(num);
        if ((flagHave ? (await gp2y0a21yk0f.getWait() <= 300) : (await gp2y0a21yk0f.getWait() > 300))) {
            num = (typeof num == 'number' ? num : 0) + 1;
        }
        await delayms(50);
    }
}

function delayms(timeMS) {
    return new Promise((ok, ng) => {
        setTimeout(()=> {
            ok();
        }, timeMS)
    })
}

app.get('/api/v1/getdata', (req, res) => {
    db.loadDatabase((error) => {
        if (error !== null) {
            console.error(error);
        }
        console.log("load database completed.");
    });
    
    db.find({ "key" : 1 }, (error, docs) => {
        res.json(docs[0].alertDays);
        //console.log(docs[0].alertDays["10"]);
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));

function compareArray(arr) {
  for (var i = 0;i < targetMacAddr.length;i++) {
    if (targetMacAddr[i] != arr[i]) {
      return false;
    }
  }
  return true;
}

const NET_INTERFACE = 'wlan0';
//ターゲットデバイスのMACアドレス
let targetMacAddr = MACADDR.mac();
//パケットCaputure
let pcapSession = pcap.createSession(NET_INTERFACE, "arp")

//ターゲットが帰って来たら
function targetReturn () {
}

pcapSession.on('packet', function (raw_packet) {
  let packet = pcap.decode.packet(raw_packet);
  let sourceMacAddr = packet["payload"]["shost"]["addr"];

  console.log(sourceMacAddr);
  // TargetのMACアドレスと一致した時
  if (compareArray(sourceMacAddr)) {
    flagExist = true;
    //targetReturn();
    t1 = new Date();
    console.log("FindTarget");
  }
})


