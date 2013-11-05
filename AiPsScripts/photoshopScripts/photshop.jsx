﻿/**    デザイナーパフォーマンス追跡ツール ver0.1    Author : Takahiro Isihiyama    Mail : ishiyama@sirok.co.jp*//*** GLOBAL SETTINGS ***/preferences.rulerUnits = Units.PIXELS; // 単位をピクセルに//編集環境の取得var appName = app.name; //使用した編集ソフトvar appVer = app.version; //編集ソフトのバージョンvar appMem = Math.round(app.freeMemory / 1000000) +"MB";//残りメモリサイズ（四捨五入）var appCol = app.colorSettings;//alert(appVer);//編集中のファイル情報の取得var docObj = activeDocument; //ファイル情報取得var docPath = docObj.path; //ファイルパスvar docName = docObj.name; //ファイル名var docWidth = docObj.width.value; //ドキュメントの横幅var docHeight = docObj.height.value; //ドキュメントの高さvar docResolution = docObj.resolution; // 解像度var docColor = docObj.mode; //カラーモード//var docColorProfile = docObj.colorProfileName; //カラープロファイルvar docBitsChannel = docObj.bitsPerChannel; //ビット数var result = [];var baseURL = String(File(docPath).fsName).replace(/\\/g, "/" )+"/";var baseDir = "";var currentFolder = "";var LIMIT = 200;var count = 0;var offsetMargin = 0;/*** FILE TYPE SETTING ***/var useFolder = false;var TYPE_JPEG = "JPEG";var TYPE_PNG = "PNG";var saveFileFlag = true;var saveFileType = TYPE_PNG;var pngBit = 24;var jpegQuality = 100;/*** MAIN RUN ***/// in case we double clicked the fileapp.bringToFront();app.displayDialogs = DialogModes.NO;//ドキュメントが開かれているかどうか判別if (app.documents.length == 0){	//ドキュメントが開かれていない場合処理なし}else{   main();}/****************/function main(){     var date = dateClass(); //現在時刻の取得    layerListClass();      //var filePath = docPath  + "/" + docName.slice(0 , -4) +"_" +year2+"-"+month+"-"+day+"-"+h+"h"+m+"m"+s+"s" + ".jpg";  var filePath = docPath + "/" + docName.slice(0 , -4) + "_" + dObj + ".jpg";  backUpJpg(filePath);   }function addXmlClass(){  text ="<list>";  text +="<data><title>sample1</title></data>";  text +="<data><title>sample2</title></data>";  text +="<data><title>sample3</title></data>";  text +="</list>";  testXML = new XML(text);  n= testXML.toString().length;  //alert(n);}//現在時刻の取得function dateClass(){    dTbl = new Array("日","月","火","水","木","金","土");  dObj = new Date();  while((new Date()).getTime() < dObj.getTime() + 1000*5){          //日時の振り分け          year = dObj.getYear();          year2 = (year < 2000) ? year + 1900 : year;          month = dObj.getMonth() + 1;          day = dObj.getDay();          day2 = dTbl[day];          h = dObj.getHours();          m = dObj.getMinutes();          s = dObj.getSeconds();                    //alert(year2 + "年" + month +"月" + day +"日"+"("+day2+")"+ h+"時"+m+"分"+s+"秒");          //new Date()の元データを保持          dateRaw = dObj;                  break;  }  return dateRaw;}function layerListClass(){    //レイヤー情報取得  try {      //ルート階層にあるレイヤーセットを取得    var laySets = docObj.layerSets; //レイヤーセット    var laySetsCnt = laySets.length; //レイヤーセットの数                //ルート階層にある全てのレイヤーを取得    var layer = docObj.layers; //レイヤー    var layCnt = layer.length; //レイヤーの数        //レイヤー情報を格納する配列を作成    layNum = new Array(layCnt); //番号    layName = new Array(layCnt); //名前    layType = new Array(layCnt); //種類    layVisible = new Array(layCnt); //表示状態        alert(laySetsCnt);    //全てのレイヤーの情報を取得して非表示    for (i = 0; i < layCnt; i++){      //表示状態の取得      Num = i      layNum[i] = Num;      layName[i] = layer[i].name;      layType[i] = layer[i].typename;      layVisible[i] = layer[i].visible;          }      //alert(layName[2]+" 種類→"+ layType[2]);    //alert(layVisible[2]);      }  catch (e) {    if ( DialogModes.NO != app.playbackDisplayDialogs ) {    alert(e);    }  }  }CR = String.fromCharCode(13); //改行コードBS = String("＼");savename = File.saveDialog("保存するファイル名を入れてください");if (savename){  fileObj = new File(savename);  flag = fileObj.open("w");  if (flag == true){    writeLayerName(docObj,0);    fileObj.close();  }else{    alert("ファイルが開けませんでした");  }}// レイヤーセット内にレイヤーが含まれる限り書き出し（再帰）function writeLayerName(layObj, indent){  var i,k,idt;  var n = layObj.artLayers.length; //レイヤーの合計数  var ns = layObj.layerSets.length; //レイヤーセットの合計数    for (i=0; i<n; i++){    layNum = i; //レイヤー番号（昇順）    layName = layObj.artLayers[i].name; //レイヤーの名前    layType = layObj.artLayers[i].typename; //レイヤーの種類    layVisible = layObj.artLayers[i].visible; //レイヤーの表示・非表示        for (k=0,idt = "| "; k<indent; k++){idt +="| ";}//レイヤー名のインデント処理    fileObj.write(idt + layNum + ": "  + layName + ", " + layType +", "+ layVisible + CR);  }   for (i=0; i<ns; i++){    for (k=0,idt = "|"+BS; k<indent; k++){idt +=BS;}      fileObj.write(idt + " "+  i + " - " + k  + ": " + layObj.layerSets[i].name + ", " + layObj.layerSets[i].typename + ", " + layObj.layerSets[i].visible + CR);            writeLayerName(layObj.layerSets[i],indent+1)  }}function backUpJpg(filePath){  jpgFile = new File(filePath);  jpgSaveOptions = new JPEGSaveOptions();  jpgSaveOptions.embedColorProfile = true;  jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  jpgSaveOptions.matte = MatteType.NONE;  jpgSaveOptions.quality = 12;  activeDocument.saveAs(jpgFile, jpgSaveOptions, true,Extension.LOWERCASE); }