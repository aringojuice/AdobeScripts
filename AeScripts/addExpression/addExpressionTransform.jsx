﻿/*  addExpressionTransform.jsx ver 1.0    ##プレビューアバターの名前を参照したExpressionを書き出す    update : 2012/12/04  author : ishiyama@sirok.co.jp           http://takahiro.me  ©2012 SIROK, Inc. All Rights Reserved.   */#target 'aftereffects';debugLog("start");/* addExpressionTransform.jsx */function addExpressionTransform(){        var selectObj = app.project.activeItem.selectedLayers[0];   var layName = String(selectObj.name);   debugLog(layName);       selectObj.anchorPoint.expression = "var previewComp=String(comp('BaseAvatar_BONE').layer(1).text.sourceText);comp(previewComp).layer('" + layName + "').transform.anchorPoint;";    selectObj.transform.xPosition.expression = "var previewComp=String(comp('BaseAvatar_BONE').layer(1).text.sourceText);comp(previewComp).layer('"+layName+"').transform.xPosition;";    selectObj.transform.yPosition.expression = "var previewComp=String(comp('BaseAvatar_BONE').layer(1).text.sourceText);comp(previewComp).layer('"+layName+"').transform.yPosition;";    selectObj.scale.expression = "var previewComp = String(comp('BaseAvatar_BONE').layer(1).text.sourceText);comp(previewComp).layer('"+layName+"').transform.scale;";    selectObj.rotation.expression = "var previewComp = String(comp('BaseAvatar_BONE').layer(1).text.sourceText);comp(previewComp).layer('"+layName+"').transform.rotation;";    selectObj.opacity.expression = "var previewComp = String(comp('BaseAvatar_BONE').layer(1).text.sourceText);comp(previewComp).layer('"+layName+"').transform.opacity;";  return debugLog("fin");}//addExpressionTransform();function debugLog(obj){  $.writeln(obj);}function alertObj(obj) {    var properties = '';    for (var prop in obj){        properties += prop + "=" + obj[prop] + "\n";    }    alert(properties);}