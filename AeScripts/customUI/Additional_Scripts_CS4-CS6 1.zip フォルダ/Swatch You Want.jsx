﻿{	// Swatch You Want.jsx	// Copyright (c) 2007-2009 Adobe Systems, Incorporated. All rights reserved.	// 	// The unofficial simple color swatches panel for Adobe(R) After 	// Effects(R) CS3 or later. Use at your own risk. Brought to you by 	// Jeff of the After Effects crew.	// 	// Notes:	// This script displays a panel containing color swatches from a 	// selected Adobe Swatch Exchange (.ase) file from Adobe 	// Photoshop CS2/CS3, kuler, or any application that can export 	// such files. The panel displays the colors from one .ase file 	// at a time. Nothing fancy here -- just a simple way for you for 	// sampling colors with various eyedroppers in the application.	// Only the RGB or RGB-equivalent values (no opacity) are	// used.	// 	// You can use this script as a dockable panel by placing it 	// in a ScriptUI Panels subfolder of the Scripts folder, and 	// then choosing the Swatch You Want.jsx script from the 	// Window menu.			function SwatchYouWant(thisObj)	{		var swatchYouWantData = new Object();		swatchYouWantData.scriptName = "Swatch You Want";		swatchYouWantData.version = "1.1";				swatchYouWantData.strSettings = "...";		swatchYouWantData.strSettingsTip = "Settings";		swatchYouWantData.strHelp = "?";		swatchYouWantData.strHelpTip = "Help";		swatchYouWantData.strSelectASEFile = "Select an Adobe Swatch Exchange (.ase) file to import";		swatchYouWantData.strASEFileFilter = "Adobe Swatch Exchange File:*.ase,All Files:*";		swatchYouWantData.strAboutTitle = "About " + swatchYouWantData.scriptName;		swatchYouWantData.strAbout = swatchYouWantData.scriptName + " " + swatchYouWantData.version + "\n" +			"Copyright (c) 2007-2009 Adobe Systems, Incorporated. All rights reserved.\n" +			"\n" +			"The unofficial simple color swatches panel for Adobe(R) After \n" +			"Effects(R) CS3 or later. Use at your own risk. Brought to you by \n" +			"Jeff of the After Effects crew.\n" +			"\n" +			"Notes:\n" +			"This script displays a panel containing color swatches from a \n" +			"selected Adobe Swatch Exchange (.ase) file from Adobe \n" +			"Photoshop CS2/CS3, kuler, or any application that can export \n" +			"such files. The panel displays the colors from one .ase file \n" +			"at a time. Nothing fancy here -- just a simple way for you for \n" +			"sampling colors with various eyedroppers in the application. \n" +			"Only the RGB or RGB-equivalent values (no opacity) are \n" +			"used.\n" +			"\n" +			"You can use this script as a dockable panel by placing it \n" +			"in a ScriptUI Panels subfolder of the Scripts folder, and \n" +			"then choosing the Swatch You Want.jsx script from the \n" +			"Window menu.";		swatchYouWantData.strRefreshPanel = "Please close and then reopen Swatch You Want to refresh the panel's swatches.";		swatchYouWantData.strErrMinAE80 = "This script requires Adobe After Effects CS3 or later.";				swatchYouWantData.swatchSize = 11;			// Pixel width/height for each color swatch						// swatchYouWant_buildUI()		// Function for creating the user interface		function swatchYouWant_buildUI(thisObj)		{			var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", swatchYouWantData.scriptName, [200, 200, 400, 400], {resizeable: true});						if (pal != null)			{				pal.bounds.width = (swatchYouWantData.swatchSize+5)*10 + 5;				pal.bounds.height = (swatchYouWantData.swatchSize+5)*10 + 5;								pal.swatches = null;				swatchYouWant_rebuildButtons(pal);								pal.onResize = swatchYouWant_doResizePanel;				pal.onResizing = swatchYouWant_doResizePanel;			}			return pal;		}						// swatchYouWant_rebuildButtons()		// Function for creating/recreating the button layout		function swatchYouWant_rebuildButtons(palObj)		{			swatchYouWantData.swatchSize = 11;			if (swatchYouWantData.colors.length <= 8)				swatchYouWantData.swatchSize *= 2;						var topEdge = 1;			var leftEdge = 1;			var btnSize = swatchYouWantData.swatchSize;						// Remove the existing buttons (all of them)			if (palObj.btnGroup != undefined)			{				while (palObj.btnGroup.children.length > 0)					palObj.btnGroup.remove(0);				palObj.remove(0);			}						// Add buttons for scripts						palObj.swatches = undefined;			palObj.swatches = new Array();						// Place controls in a group container to get the panel background love			palObj.btnGroup = palObj.add("group", [0, 0, palObj.bounds.width, palObj.bounds.height]);						var winGfx =palObj.graphics;						for (var i=0; i<swatchYouWantData.colors.length; i++)			{				// If there's a corresponding .png file, use it as an iconbutton instead of a regular text button				palObj.swatches[i] = palObj.btnGroup.add("group", [leftEdge, topEdge, leftEdge+btnSize, topEdge+btnSize]);				palObj.swatches[i].graphics.backgroundColor = winGfx.newBrush(winGfx.BrushType.SOLID_COLOR, [swatchYouWantData.colors[i][0][0], swatchYouWantData.colors[i][0][1], swatchYouWantData.colors[i][0][2]]);				palObj.swatches[i].helpTip = swatchYouWantData.colors[i][1];								leftEdge += (btnSize + 1);			}						// Add the settings and help buttons			palObj.settingsBtn = palObj.btnGroup.add("button", [leftEdge, topEdge, leftEdge+30, topEdge+20], swatchYouWantData.strSettings);			palObj.settingsBtn.helpTip = swatchYouWantData.strSettingsTip;			palObj.settingsBtn.onClick = function ()			{				swatchYouWantData.swatchFile = File.openDialog(swatchYouWantData.strSelectASEFile, swatchYouWantData.strASEFileFilter);				if ((swatchYouWantData.swatchFile != null) && swatchYouWantData.swatchFile.exists)				{					swatchYouWant_parseSwatchFileForColors();										// Remember the swatch file for the next session					app.settings.saveSetting("Adobe", "swatchYouWant_swatchFile", swatchYouWantData.swatchFile.fsName);										// Refresh the palette					swatchYouWant_rebuildButtons(swatchPal);					swatchYouWant_doResizePanel();				}				else					swatchYouWantData.swatchFile = null;			}						palObj.helpBtn = palObj.btnGroup.add("button", [leftEdge+30+1, topEdge, leftEdge+30+1+30, topEdge+20], swatchYouWantData.strHelp);			palObj.helpBtn.helpTip = swatchYouWantData.strHelpTip;			palObj.helpBtn.onClick = function () {alert(swatchYouWantData.strAbout, swatchYouWantData.strAboutTitle);}		}						// swatchYouWant_parseSwatchFileForColors()		// Loads the colors array with the colors found in the swatches file.		function swatchYouWant_parseSwatchFileForColors()		{			var data = app.parseSwatchFile(swatchYouWantData.swatchFile);			var numColors = data.values.length;						swatchYouWantData.colors = new Array();						// Parse color values			var colorData, color;			for (var i=0; i<numColors; i++)			{				colorData = data.values[i];				if (colorData.type == "RGB")					color = [colorData.r, colorData.g, colorData.b, 1];				else if (colorData.type == "Gray")					color = [colorData.gray, colorData.gray, colorData.gray, 1];				else if (colorData.type == "CMYK")				{					// CMYK to RGB conversion is approximated					var invBlack = 1 - colorData.k;					color = [(1 - colorData.c)*invBlack, (1 - colorData.m)*invBlack, (1 - colorData.y)*invBlack, 1];				}				else					color = [0, 0, 0, 0];								// Do bounds checking				if (color[0] < 0.0) color[0] = 0.0;				else if (color[0] > 1.0) color[0] = 1.0;				if (color[1] < 0.0) color[1] = 0.0;				else if (color[1] > 1.0) color[1] = 1.0;				if (color[2] < 0.0) color[2] = 0.0;				else if (color[2] > 1.0) color[2] = 1.0;								swatchYouWantData.colors[swatchYouWantData.colors.length] = new Array(color, colorData.name);			}		}						// swatchYouWant_doResizePanel()		// Callback function for laying out the buttons in the panel		function swatchYouWant_doResizePanel()		{			var pal = swatchPal;						var btnSize = swatchYouWantData.swatchSize;			var btnOffset = btnSize + 1;			var maxRightEdge = pal.size.width - btnSize;			var leftEdge = 1;			var topEdge = 1;						// Reset the background group container's bounds			pal.btnGroup.bounds = [0, 0, pal.size.width, pal.size.height];						// Reset each button's layer bounds			var newLine = true;			for (var i=0; i<swatchYouWantData.colors.length; i++)			{				pal.swatches[i].bounds = [leftEdge, topEdge, leftEdge+btnSize, topEdge+btnSize];				newLine = false;								leftEdge += btnOffset;								// Create a new row if no more columns available in the current row of buttons				if (leftEdge > maxRightEdge)				{					leftEdge = 1;					topEdge += btnOffset;					newLine = true;				}			}						// The settings and help buttons go into the next "slot"			leftEdge = 1;			if (!newLine)				topEdge += btnOffset;			topEdge += (($.os.indexOf("Windows") != -1) ? 0 : 5);	// add 5 more pixels to the gap on Mac (because of its margin when disabled)			btnSize = 30;			pal.settingsBtn.bounds = [leftEdge, topEdge, leftEdge+btnSize, topEdge+20];			leftEdge += btnSize + 1;			if (leftEdge > (pal.size.width - btnSize))			{				leftEdge = 1;				topEdge += 20 + 1;			}			pal.helpBtn.bounds = [leftEdge, topEdge, leftEdge+btnSize, topEdge+20];		}						// main:		// 				if (parseFloat(app.version) < 8)		{			alert(swatchYouWantData.strErrMinAE80, swatchYouWantData.scriptName);			return;		}		else		{			// Use the last defined script folder, or ask the user for one (if not previously defined)			swatchYouWantData.colors = new Array();			swatchYouWantData.swatchFile = null;			if (app.settings.haveSetting("Adobe", "swatchYouWant_swatchFile"))			{				swatchYouWantData.swatchFile = new File(app.settings.getSetting("Adobe", "swatchYouWant_swatchFile").toString());				if (swatchYouWantData.swatchFile != null)				{					if (swatchYouWantData.swatchFile.exists)					{						swatchYouWant_parseSwatchFileForColors();												// Remember the swatch file for the next session						app.settings.saveSetting("Adobe", "swatchYouWant_swatchFile", swatchYouWantData.swatchFile.fsName);					}					else						swatchYouWantData.swatchFile = null;				}			}						// Build and show the UI			var swatchPal = swatchYouWant_buildUI(thisObj);			if ((swatchPal != null) && (swatchPal instanceof Window))			{				// Center the palette				swatchPal.center();								// Show the UI				swatchPal.show();			}		}	}			SwatchYouWant(this);}