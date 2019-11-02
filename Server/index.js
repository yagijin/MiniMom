const Datastore = require('nedb');
const express = require('express');
const Obniz = require('obniz');
const pcap = require('pcap');
const MACADDR = require('./macAddr.js');
const data = require('./data.js');

let dummyData = data.dummyData;

const app = express();
const obniz = new Obniz("4485-7987");

//Obnizのコントロール
let flagHave = false;//ものを持っているかいないか
let flagExist = true;//家にいるかいないか
let flagExistBefore = true;
let flagAleat = false;//アラート中かどうか
let num = 0;

obniz.onconnect = async function () {
    var gp2y0a21yk0f;
    gp2y0a21yk0f = obniz.wired("GP2Y0A21YK0F",{"vcc":0, "gnd":1, "signal":2});
    await delayms(500);
    //flagExistは外部から制御
    while (true) {
        if(!(flagExistBefore==flagExist)){//前回から変わったら初期化
            num = 0;
        }
        if(flagAleat){
            if(num > 10){
                flagAleat = false;
                //鳴ったことを記録する%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            }
        }else if(flagHave&&flagExist){//もっていている
            if(num > 50){
                flagAleat = true;
            }
        }else if(flagHave&&!flagExist){//もってていない
            //何もしない
        }else if(!flagHave&&flagExist){//持って無くている
            if(num > 10){//持ち出したらflagHaveを変える
                flagHave = false;
            }
        }else if(!flagHave&&!flagExist){//持って無くていない
            //何もしない
        }

        if(flagAleat){
            //アラートを鳴らす処理を書く
            console.log("Alerting");
        }

        await delayms(0);
        console.log((await gp2y0a21yk0f.getWait()));
        console.log(num);
        if (await flagHave ? (gp2y0a21yk0f.getWait() <= 300) : (gp2y0a21yk0f.getWait() > 300)) {
            num = (typeof num == 'number' ? num : 0) + 1;
        }
        flagExistBefore = flagExist;
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
    res.json(dummyData);
});

app.listen(3000, () => console.log('Listening on port 3000'));


/**
 * MACアドレスの比較
 * @param {[]int} arr 比較するMACアドレス
 */
function compareArray(arr) {
  for (var i = 0;i < targetMacAddr.length;i++) {
    if (targetMacAddr[i] != arr[i]) {
      return false
    }
  }
  return true
}

const NET_INTERFACE = 'wlan0';
//ターゲットデバイスのMACアドレス
let targetMacAddr = MACADDR.mac();
//パケットCaputure
let pcapSession = pcap.createSession(NET_INTERFACE, "arp")

//ターゲットが帰って来たら
function targetReturn () {
    //データベースに記録
    const day = "2019/10/05";
    const index = dummyData[0].alertDays.findIndex(item => item === day);
    if(index === -1){//dayが無かった場合追加
        dummyData[0].alertDays.push(day);
    }
}

pcapSession.on('packet', function (raw_packet) {
  let packet = pcap.decode.packet(raw_packet);
  let sourceMacAddr = packet["payload"]["shost"]["addr"]

  console.log(sourceMacAddr);
  // TargetのMACアドレスと一致した時
  if (compareArray(sourceMacAddr)) {
    flagExist = true;
    console.log("FindTarget");
  }
})


