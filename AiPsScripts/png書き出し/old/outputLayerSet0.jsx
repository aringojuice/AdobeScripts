﻿/*  outputLayerSet.jsx ver 0.4    ##選択したレイヤーセットを別のilファイルとしてWEB(art最適)設定で書き出す。    update : 2012/12/11  author : ishiyama@sirok.co.jp           http://takahiro.me  ©2012 SIROK, Inc. All Rights Reserved.   */#target 'illustrator'function main(){var docObj = app.activeDocument; //ファイル情報取得var selObj = docObj.selection[0];//var selObjLength = selObj.length;var tName = String(selObj.name);var sw = parseInt(selObj.width);var sh = parseInt(selObj.height);app.copy();app.documents.add(DocumentColorSpace.RGB, sw, sh,);app.paste();};//checkPathfunction checkPath(path){  var folderObj = new Folder (path);  //alert(folderObj.exists);  folderObj.create();  if(!folderObj.exists){    flag = folderObj.create();    if(!flag) return alert("ログ保存のための、" + path + " を作成できませんでした。管理者にお問い合わせ下さい。");    //フォルダがない場合にフォルダを作成    log("INF : Make Directory");    alert("ログ保存のため、" + path + " にフォルダを生成しました");  }else log("INF : Already Make Directory");  return 0;}//tmpDocObj.close();if (app.documents.length == 0);else main();function log(text){    $.writeln(text);}//debugfunction alertObj(obj){    var properties = '';    for (var prop in obj){        properties += prop + "=" + obj[prop] + "\n";    }    alert(properties);};