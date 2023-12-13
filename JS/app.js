//The URIs of the REST endpoint for CREATOR
IUPS = "https://prod-00.northeurope.logic.azure.com:443/workflows/3127e5d6de8d49f4aaec0135050b4195/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jry5R4k1oPqSGWlPbpK1zv51oOs0dMIOr5DEqFqJXeo";
RAI = "https://prod-06.northeurope.logic.azure.com:443/workflows/09ba993bc3f840958c341391dc0a660d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xG8iMPhQLB5ZaXyHwbWyQTmYNsHoIdnlCxGmm5ET8e4";

BLOB_ACCOUNT = "https://blobpract9b.blob.core.windows.net";
//The URIs of the REST endpoints for VIEWER
RAAURI = "https://prod-12.northeurope.logic.azure.com/workflows/6920ec02f05246188bb376239fda9be5/triggers/manual/paths/invoke/rest/v1/getrecords?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sAu2g9mk73_AvHOl9tvTMTI4Vx-JF2gNS1u3RaMYQP4";
CIAURI = "https://prod-38.northeurope.logic.azure.com/workflows/ceb17c018afe4ff28623c620ef84b5f0/triggers/manual/paths/invoke/rest/v1/getrecords?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=t_K09hi1QtjxHfo0dJTGevHyTVphHvV0nYiUw_97-60";

DIAURI0 = "https://prod-48.northeurope.logic.azure.com/workflows/5da9bc7c31e24163b00a3cfd9dd3a435/triggers/manual/paths/invoke/rest/v1/getrecords/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IUSZJLTsZRnIYCLnlCv6DQHMCl-qkeI7K2St_SiiE4s";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    alert("Submitted Successfully");
    
  }); 
//--------------------
  //To sign up as a new user
  $("#CreateUser").click(function(){

    //Execute the submit new asset function
    signupform();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
   submitData = new FormData();
   //Get form variables and append them to the form data object
   submitData.append('fileName', $('#fileName').val());
   submitData.append('userID', $('#userID').val());
   submitData.append('userName', $('#userName').val());
   //Added code to put title,publisher to the video
   submitData.append('title', $('#title').val());
   submitData.append('publisher', $('#publisher').val());
   submitData.append('producer', $('#producer').val());
   submitData.append('genre', $('#genre').val());
   submitData.append('ageRating', $('#ageRating').val());
   submitData.append('File', $("#UpFile")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
   url: IUPS,
   data: submitData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(data){
  
   }
   })
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(RAI, function( data ) {
  //Create an array to hold all the retrieved assets
  var items = [];
 
  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {
  items.push( "<hr />");


  items.push("<video width='320' height='240' controls>")
  items.push('<source src="'+BLOB_ACCOUNT + val["filepath"] +'" type="video/mp4">')
  items.push('Your browser does not support the video tag</video>')
  /*
  items.push("<img src='"+BLOB_ACCOUNT + val["filepath"] +"' width='400'/> <br />")
  items.push( "File : " + val["fileName"] + "<br />");*/

  items.push( "<br />"+"Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
  /*Added code to put title,publisher to the video*/
  items.push( "VIDEO TITLE: " + val["title"] +"<br />");
  items.push( "PUBLISHER: " + val["publisher"] + "<br />");
  items.push( "PRODUCER: " + val["producer"] + "<br />");
  items.push( "GENRE: " + val["genre"] + "<br />");
  items.push( "AGE RATING: " + val["ageRating"] + "<br />");
  items.push( "<hr />");
  });
  //Clear the assetlist div
  $('#ImageList').empty();
  //Append the contents of the items array to the ImageList Div
  $( "<ul/>", {
  "class": "my-new-list",
  html: items.join( "" )
  }).appendTo( "#ImageList" );
  });
 }
//---------------------------
function signupform(){
  //Construct JSON Object for new item
	var subObj = {
	UserName: $('#UserName').val(),
	Cost: $('#Cost').val(),
	emailID: $('#emailID').val(),
	AddressLine1: $('#AddressLine1').val(),
	AddressLine2: $('#AddressLine2').val(),
	UserPasswrd: $('#UserPasswrd').val()
	}
	//Convert to a JSON String
	subObj = JSON.stringify(subObj);
	//Post the JSON string to the endpoint, note the need to set the content type header
	$.post({
	url: CIAURI,
	data: subObj,
	contentType: 'application/json; charset=utf-8'
	}).done(function (response) {
	loginpage();
	});
  // Hide the login section.
  document.getElementById("newAssetForm").style.display = "none";
}
function login(){
  var loginUsername = document.getElementById("loginUsername").value;
  var loginPassword = document.getElementById("loginPassword").value;
  alert("Login successful!");
  // Hide the login section.
  document.getElementById("loginForm").style.display = "none";
  // Hide the login section.
  document.getElementById("newAssetForm").style.display = "none";
}
 //A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){
	$.ajax({
	type: "DELETE",
	//Note the need to concatenate the
	url: DIAURI0 + id + DIAURI1,
	}).done(function( msg ) {
	//On success, update the assetlist.
	getAssetList();
	});
}

 


