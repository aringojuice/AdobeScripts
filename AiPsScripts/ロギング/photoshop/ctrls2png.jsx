﻿/*    Ctrls2PNG.jsx        ctrl+sでPNG画像をpngフォルダに自動吐き出し for MacPhotoshop    version: 1.1            Author : Takahiro Isihiyama    Mail : ishiyama@sirok.co.jp        導入方法:     1:スクリプトをhogehoge.jsxとして保存    2:Applications/Adobe Photoshop CS5.1/Presets/Scripts/ に移動    3:photoshopの キーボードショートカットのCTRL+S に割り当て        1.1 : 画像の保存先を共通パス化   */#target "Photoshop";#include "ScriptListenerOn.jsx";consolelog("abc");function consolelog(text){    var CR = String.fromCharCode(10);    extensionPath = "/Volumes/Macintosh\ HD/Library/Application\ Support/Adobe/CS6ServiceManager/extensions/";  extensionId = "com.sirok.DebugPanel";  extensionContent = "/content/Configurator-Panel.assets/Html";  folderObj = new Folder(extensionPath + extensionId);    if(!folderObj.exists) return;  logPath = extensionPath + extensionId + extensionContent + "/log.txt";  fileObj = new File(logPath);    flg = fileObj.open("w",8,true);  if (flg)  {    fileObj.writeln(tmpText + text);    fileObj.close();  }  else return;};/****************/function main(){  consolelog("INF : Scripts Start");  var docObj = activeDocument; //ファイル情報取得  var userName = String(Folder.myDocuments.parent.fsName).slice(7);  saveFlag = docObj.saved;  //ドキュメントが保存されているかどうかを見て  if(!saveFlag){      var docPath = docObj.path; //ファイルパス    var docName = docObj.name; //ファイル名    var date = dateClass(); //現在時刻の取得        var logPath = "/Volumes/Macintosh\ HD/Production";    checkPath(logPath);        putLog(date, logPath, docName, userName);//mac    publishPng(date, logPath, docName, userName); //PNGパブリッシュ    docObj.save();  //上書き保存         }else $.writeln("Documents Don't Saved!");  consolelog("INF : Scripts Fin");  return;}/* fin main *///checkPathfunction checkPath(path){  var folderObj = new Folder (path);  //alert(folderObj.exists);  folderObj.create();  if(!folderObj.exists){    flag = folderObj.create();    if(!flag) return alert("ログ保存のための、" + path + " を作成できませんでした。管理者にお問い合わせ下さい。");    //フォルダがない場合にフォルダを作成    $.writeln("INF : Make Directory");    alert("ログ保存のため、" + path + " にフォルダを生成しました");  }else $.writeln("INF : Already Make Directory");  return;}//putLogfunction putLog(date, path, docName, userName){    var logHistoryPath = path +"\/log\/history\/";  checkPath(logHistoryPath);    //macListenerPath  var logFile = File("~/Desktop/ScriptingListenerJS.log");  logFile.open("r");  history = logFile.read();//.split(/\/\/\s\=+/);    var fileRef = new File(logHistoryPath+"/"+ date + "\_" + userName + "\_" + docName.slice(0,-4) + ".log");  fileRef.encoding = "UTF8"; //文字コードをUTF-8に  flag = fileRef.open ("w","","");	if(flag) fileRef.writeln(history);  logFile.remove();  fileRef.close();  } //現在時刻の取得function dateClass(){  //dTbl = new Array("日","月","火","水","木","金","土");  dObj = new Date();  while((new Date()).getTime() < dObj.getTime() + 1000*5){ //timeOut5秒      //日時の振り分け      year = dObj.getYear();      year2 = (year < 2000) ? year + 1900 : year;      month = dObj.getMonth() + 1;      day = dObj.getDate();      //day2 = dTbl[day];      h = dObj.getHours();      m = dObj.getMinutes();      s = dObj.getSeconds();            //alert(year2 + "年" + month +"月" + day +"日"+"("+day2+")"+ h+"時"+m+"分"+s+"秒");      //new Date()の元データを保持      dateRaw = year2+'-'+month+'-'+day+' '+h+"h"+m+"m"+s+"s";      break;  }  return dateRaw;}/* fin dateClass *///png保存Zxcfunction publishPng(date, path, docName, userName){    var logViewPath = path +"\/log\/view\/";  checkPath(logViewPath);  fileName = date + "\_" + userName + "\_" + docName.slice(0,-4) + ".png";  filePath = logViewPath + fileName;  fileObj = new File(filePath);  pngOpt = new PNGSaveOptions();  pngOpt.interlaced = false; //インタレースなし  activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);}/* fin publishPng *///ドキュメントが開かれているかどうか判別//alert(app.documents.length);if (app.documents.length == 0);else main();//debugfunction alertObj(obj) {    var properties = '';    for (var prop in obj){        properties += prop + "=" + obj[prop] + "\n";    }    alert(properties);}   