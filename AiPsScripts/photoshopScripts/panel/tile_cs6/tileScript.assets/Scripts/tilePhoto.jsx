﻿#target photoshop/*    tilePhoto.jsx        ctrl+sでPNG画像をpngフォルダに自動吐き出し for MacPhotoshop    version: 0.9            Author : Takahiro Isihiyama    Mail : ishiyama@sirok.co.jp        導入方法:     1:スクリプトをhogehoge.jsxとして保存    2:Applications/Adobe Photoshop CS5.1/Presets/Scripts/ に移動    3:photoshopの キーボードショートカットのCTRL+S に割り当て        !ver0.9 bugReport!    **ドキュメントを保存してないとエラーが出ますが、ドキュメント保存をしていれば正常に動きます**   *///初期設定app.preferences.rulerUnits = Units.PIXELS;//メインfunction tilePhoto(){    baseObj = app.documents.add(640, 960, 72, "tilePhoto", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);    folderObj = Folder.selectDialog("フォルダを選択してください");    if (!folderObj) return;       var w = 4;//横     var h = 5;//縦    var pWH = 140;    var mWH = 14;    var bX = 20; //基準点 x,y    var bY = 200;    var fileList = folderObj.getFiles("*.png");        var i = 0;    for (y=0; y<h; y++){        for (x=0; x<w; x++){            fileObj = new File(fileList[i]);            open(fileObj);            activeDocument.resizeImage(pWH,pWH);            activeDocument.selection.selectAll();            activeDocument.selection.copy();            activeDocument.close(SaveOptions.DONOTSAVECHANGES);            activeDocument.paste();            x1 = parseFloat(activeDocument.activeLayer.bounds[0]);            y1 = parseFloat(activeDocument.activeLayer.bounds[1]);                        //相対位置でタイリング            activeDocument.activeLayer.translate(bX-x1+pWH*x+mWH*x, bY-y1+pWH*y+mWH*y);                        i++;            if (i >= fileList.length) return;        }    } }tilePhoto();