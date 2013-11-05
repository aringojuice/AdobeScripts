﻿{
	// kuler Shapes.jsx
	// Copyright (c) 2007-2008 Adobe Systems, Incorporated. All rights reserved.
	// 
	// The unofficial Adobe Swatch Exchange (.ase) import script for 
	// Adobe(R) After Effects(R) CS4 or later. Use at your own risk. 
	// Brought to you by Jeff, and based on sample code by Chris, 
	// of the After Effects crew.
	// 
	// Notes:
	// Select a .ase file exported from Adobe Photoshop CS2/CS3/CS4, 
	// kuler, or any application that can export such files. The script 
	// will create a new composition with a shape layer containing 
	// colored shapes for each color it can import (currently, those 
	// in RGB, Gray, and CMYK formats; although CMYK will not 
	// be an accurate conversion). Other types of colors will be 
	// created as either black or transparent shapes until I can 
	// find conversion code. 
	
	
	function KulerShapes(thisObj)
	{
		var kulerShapesData = new Object();
		kulerShapesData.scriptName = "kuler Shapes";
		kulerShapesData.version = "1.1";
		
		kulerShapesData.strAboutTitle = "About " + kulerShapesData.scriptName;
		kulerShapesData.strAbout = kulerShapesData.scriptName + " " + kulerShapesData.version + "\n" +
			"Copyright (c) 2007-2008 Adobe Systems, Incorporated. All rights reserved.\n" +
			"\n" +
			"The unofficial Adobe Swatch Exchange (.ase) import script for Adobe(R) After Effects(R) CS4 or later. Use at your own risk. Brought to you by Jeff, and based on sample code by Chris, of the After Effects crew.\n" +
			"\n" +
			"Notes:\n" +
			"Select a .ase file exported from Adobe Photoshop CS2/CS3/CS4, kuler, or any application that can export such files. The script will create a new composition with a shape layer containing colored shapes for each color it can import (currently, those in RGB, Gray, and CMYK formats; although CMYK will not be an accurate conversion). Other types of colors will be created as either black or transparent shapes until I can find conversion code.";
		kulerShapesData.strSelectASEFile = "Select an Adobe Swatch Exchange (.ase) file to import";
		kulerShapesData.strASEFileFilter = "Adobe Swatch Exchange File:*.ase,All Files:*";
		kulerShapesData.strDone = "Open the selected composition to view the imported color swatches. Kule, eh?";
		kulerShapesData.strErrMinAE90 = "This script requires Adobe After Effects CS4 or later.";
		
		kulerShapesData.swatchesPerRow = 16;		// Number of swatches per row
		kulerShapesData.swatchSize = 10;			// Pixel width/height for each color swatch
		
		
		// main:
		// 
		
		if (parseFloat(app.version) < 9)
		{
			alert(kulerShapesData.strErrMinAE90, kulerShapesData.scriptName);
			return;
		}
		
		// Select a .ase file
		var aseFile = File.openDialog(kulerShapesData.strSelectASEFile, kulerShapesData.strASEFileFilter);
		if ((aseFile != null) && aseFile.exists)
		{
			var data = app.parseSwatchFile(aseFile);
			var numColors = data.values.length;
			var compNumRows = Math.ceil(numColors / kulerShapesData.swatchesPerRow);	// Number of full/partial rows of colors
			var compWidth = kulerShapesData.swatchesPerRow * kulerShapesData.swatchSize;
			var compHeight = compNumRows * kulerShapesData.swatchSize;
			
			// Create a comp matching the swatch set's "dimensions"
			var compName = aseFile.name.replace(/%20/g, " ").substr(0, 31);
			var comp = app.project.items.addComp(compName, compWidth, compHeight, 1.0, 1, 30);
			if (comp != null)
			{
				// Create a shape layer
				var shapeLayer = comp.layers.addShape();
				shapeLayer.name = "color swatches";
				shapeLayer.transform.position.setValue([0, 0]);
				
				var shapeLayerContents = shapeLayer.property("ADBE Root Vectors Group");
				
				// Parse color values
				var colorData, color;
				var shapeGroup, shapeRect, shapeFill;
				var rowPos = 0, colPos = 0;
				for (var i=0; i<numColors; i++)
				{
					colorData = data.values[i];
					if (colorData.type == "RGB")
						color = [colorData.r, colorData.g, colorData.b, 1];
					else if (colorData.type == "Gray")
						color = [colorData.gray, colorData.gray, colorData.gray, 1];
					else if (colorData.type == "CMYK")
					{
						// CMYK to RGB conversion is approximated
						var invBlack = 1 - colorData.k;
						color = [(1 - colorData.c)*invBlack, (1 - colorData.m)*invBlack, (1 - colorData.y)*invBlack, 1];
					}
					else
						color = [0, 0, 0, 0];
					
					// Add the shape container for the color
					shapeGroup = shapeLayerContents.addProperty("ADBE Vector Group");
					shapeGroup.name = (colorData.name != "") ? colorData.name : "color swatch";
					
					// Position the swatch at the correct location
					shapeGroup.transform.position.setValue([colPos*kulerShapesData.swatchSize, rowPos*kulerShapesData.swatchSize]);
					colPos++;
					if (colPos >= kulerShapesData.swatchesPerRow)
					{
						rowPos++;
						colPos = 0;
					}
					
					// Add the filled rectangle shape to the container
					shapeRect = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
					shapeRect.name = "swatch";
					shapeRect.property("ADBE Vector Rect Size").setValue([kulerShapesData.swatchSize, kulerShapesData.swatchSize]);
					shapeRect.property("ADBE Vector Rect Position").setValue([kulerShapesData.swatchSize/2, kulerShapesData.swatchSize/2]);
					
					shapeFill = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
					shapeFill.name = "color";
					shapeFill.property("ADBE Vector Fill Color").setValue([color[0], color[1], color[2]]);
					shapeFill.property("ADBE Vector Fill Opacity").setValue(color[3]*100);
				}
			}
			
			// Select only the created comp
			for (var i=1; i<=app.project.numItems; i++)
				app.project.item(i).selected = false;
			comp.selected = true;
			
			alert(kulerShapesData.strDone, kulerShapesData.scriptName);
		}
	}
	
	
	KulerShapes(this);
}