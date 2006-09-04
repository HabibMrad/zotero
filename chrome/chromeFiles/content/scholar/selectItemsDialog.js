/*
	Zotero
	Copyright (C) 2006   Center for History and New Media, George Mason University, Fairfax, VA
	http://chnm.gmu.edu/
*/

var itemsView;
var collectionsView;
var io;

function doLoad()
{
	io = window.arguments[0];
	
	collectionsView = new Scholar.CollectionTreeView();
	document.getElementById('collections-tree').view = collectionsView;

	// move to center of screen
	window.sizeToContent()
	window.moveTo(
		(self.screen.width-window.innerWidth)/2,
		(self.screen.height-window.innerHeight)/2
	);
}

function doUnload()
{
	collectionsView.unregister();
	if(itemsView)
		itemsView.unregister();
}

function onCollectionSelected()
{
	if(itemsView)
		itemsView.unregister();

	if(collectionsView.selection.count == 1 && collectionsView.selection.currentIndex != -1)
	{
		var collection = collectionsView._getItemAtRow(collectionsView.selection.currentIndex);
		collection.setSearch('');

		itemsView = new Scholar.ItemTreeView(collection);
		document.getElementById('items-tree').view = itemsView;
	}

}

function onItemSelected()
{
	
}

function doAccept()
{
	var start = new Object();
	var end = new Object();
	io.dataOut = new Array();
	
	for(var i = 0, rangeCount = itemsView.selection.getRangeCount(); i < rangeCount; i++)
	{
		itemsView.selection.getRangeAt(i,start,end);
		for(var j = start.value; j <= end.value; j++)
		{
			io.dataOut.push(itemsView._getItemAtRow(j).ref.getID());
		}
	}
}