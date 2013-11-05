﻿#target 'photoshop';var flag = confirm("psdをレイヤーごとに書き出す。");if(flag){  var docObj = app.activeDocument;  var folderPath = docObj.path + "/" + docObj.name.substring(0,String(docObj.name).length - 4);  var folderObj = new Folder(folderPath);  folderObj.create();  hideLayer(docObj);  makePNG(docObj,folderPath,"");  $.writeln("終了しました");}else{  $.writeln("動作を取り消しました。");}function hideLayer(obj){  for (var i=0; i<obj.artLayers.length; i++){    obj.artLayers[i].visible = false;         }  for (var i=0; i<obj.layerSets.length; i++){    obj.layerSets[i].visible = true;    hideLayer(obj.layerSets[i]);    }}function makePNG(obj,path,folder){  for(var i=0; i<obj.artLayers.length; i++){    var docObj = activeDocument;    obj.artLayers[i].visible = true;    var file = new File (path + "/" + obj.artLayers[i].name + ".png");    var option = new PNGSaveOptions();    option.interlaced = false;    docObj.saveAs(file,option,true,Extension.LOWERCASE);    open(File (path+"/"+obj.artLayers[i].name + ".png"));    docObj = activeDocument;    docObj.trim(TrimType.TRANSPARENT,true,true,true,true);    file = new File(docObj.path + "/" + docObj.name);    docObj.saveAs(file,option,true,Extension.LOWERCASE);    docObj.close(SaveOptions.DONOTSAVECHANGES);    obj.artLayers[i].visible = false;    }  for(var i=0; i<obj.layerSets.length; i++){    var folderObj = new Folder(path + "/" + obj.layerSets[i].name);    folderObj.create();    if(folder != ""){        makePNG(obj.layerSets[i], path + "/" + obj.layerSets[i].name, folder + "/" + obj.layerSets[i].name);              }    else{        makePNG(obj.layerSets[i], path + "/" + obj.layerSets[i].name, obj.layerSets[i].name);      }    }}