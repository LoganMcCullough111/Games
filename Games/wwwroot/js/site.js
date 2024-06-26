﻿/* Function to start the sign in process */
function vStartSignIn(eventData) {
    //Cancel the default behavior for an <a> element.
    eventData.preventDefault();
    //Create the sign in box, put it into an overlay, and append it to the <body> element's children list.
    let eltSignInBox = eltCreateSignin();
    let divSignin = eltCreateOverlay(eltSignInBox);
    let bdyPageBody = document.getElementsByTagName("body")[0];
    bdyPageBody.appendChild(divSignin);
    return;
}

/*Function to create an overlay for the current page. Its parameter is a reference to the element at the top of the DOM tree
 for the content to display on the overlay. Returns a reference to a div element that is the complete overlay. Inserting the 
 div element into the page displays the overlay*/
function eltCreateOverlay(eltOverlayContent) {
    let divOverlay = document.createElement("div");
    //Risky. Give an element an id in JS
    divOverlay.setAttribute("id", "divOverlay");
    divOverlay.className = "Overlay";
    divOverlay.appendChild(eltOverlayContent);
    return divOverlay;
}

/*Function to create a box with text boxes for the username and password and a "Sign In" button. Returns a reference to a
 <section element that contains the above.*/

function eltCreateSignin() {
    //Build tree from the bottom up
    //First row of table
    let txtUserName = document.createTextNode("User Name:");
    let tdUserName = document.createElement("td");
    tdUserName.appendChild(txtUserName);
    let inpUserName = document.createElement("input");
    inpUserName.setAttribute("type", "text");
    let tdUNTextBox = document.createElement("td");
    tdUNTextBox.appendChild(inpUserName);
    let trUserName = document.createElement("tr");
    trUserName.appendChild(tdUserName);
    trUserName.appendChild(tdUNTextBox);
    //Second Row
    let txtPassword = document.createTextNode("Password:");
    let tdPassword = document.createElement("td");
    tdPassword.appendChild(txtPassword);
    let inpPassword = document.createElement("input");
    inpPassword.setAttribute("type", "password");
    let tdPTextBox = document.createElement("td");
    tdPTextBox.appendChild(inpPassword);
    let trPassword = document.createElement("tr");
    trPassword.appendChild(tdPassword);
    trPassword.appendChild(tdPTextBox);
    //third row
    let txtSignIn = document.createTextNode("Sign In");
    let btnSignIn = document.createElement("button");
    btnSignIn.setAttribute("type", "button");
    btnSignIn.onclick = vDoSignIn;
    btnSignIn.appendChild(txtSignIn);
    let txtCancel = document.createTextNode("Cancel");
    let btnCancel = document.createElement("button");
    btnCancel.setAttribute("type", "button");
    btnCancel.onclick = vCancelSignIn;
    btnCancel.appendChild(txtCancel);
    let divButtons = document.createElement("div");
    divButtons.className = "CenterButtons";
    divButtons.appendChild(btnSignIn);
    divButtons.appendChild(btnCancel);
    let tdSIButton = document.createElement("td");
    tdSIButton.colSpan = "2";
    tdSIButton.appendChild(divButtons);
    let trSIButton = document.createElement("tr");
    trSIButton.appendChild(tdSIButton);
    //Fourth Row
    let txtNoAccount = document.createTextNode("No account yet?");
    let brLineBreak = document.createElement("br");
    let txtClickHere = document.createTextNode("Click here");
    let aClickHere = document.createElement("a");
    aClickHere.setAttribute("href", "");
    //Set the "onclick" event handler.
    aClickHere.onclick = vShowCreateAccount;
    aClickHere.appendChild(txtClickHere);
    let txtToCreateOne = document.createTextNode(" to create one!");
    let tdCreateAccount = document.createElement("td");
    tdCreateAccount.colSpan = "2";
    tdCreateAccount.className = "SignIn";
    tdCreateAccount.appendChild(txtNoAccount);
    tdCreateAccount.appendChild(brLineBreak);
    tdCreateAccount.appendChild(aClickHere);
    tdCreateAccount.appendChild(txtToCreateOne);
    let trCreateAccount = document.createElement("tr");
    trCreateAccount.appendChild(tdCreateAccount);
    //Create <tbody> element and put the rows in
    let tbdyBody = document.createElement("tbody");
    tbdyBody.appendChild(trUserName);
    tbdyBody.appendChild(trPassword);
    tbdyBody.appendChild(trSIButton);
    tbdyBody.appendChild(trCreateAccount);
    let tblSignin = document.createElement("table");
    tblSignin.appendChild(tbdyBody);
    //Put the table inside of the <section> element and the <section> element inside <div> element
    let secSignin = document.createElement("section");
    secSignin.className = "SignIn";
    secSignin.appendChild(tblSignin);
    //Sign in box built. Return it
    return secSignin;
}

/*Function to create a box with text boxes for the username and password to create a new account. It returns a reference to a section
 * element that contains the above.*/

function eltCreateAccount() {
    //Build tree from the bottom up
    //First row of table
    let txtUserName = document.createTextNode("User Name:");
    let tdUserName = document.createElement("td");
    tdUserName.appendChild(txtUserName);
    let inpUserName = document.createElement("input");
    inpUserName.setAttribute("type", "text");
    let tdUNTextBox = document.createElement("td");
    tdUNTextBox.appendChild(inpUserName);
    let trUserName = document.createElement("tr");
    trUserName.appendChild(tdUserName);
    trUserName.appendChild(tdUNTextBox);
    //Second Row
    let txtPassword = document.createTextNode("Password:");
    let tdPassword = document.createElement("td");
    tdPassword.appendChild(txtPassword);
    let inpPassword = document.createElement("input");
    inpPassword.setAttribute("type", "password");
    let tdPTextBox = document.createElement("td");
    tdPTextBox.appendChild(inpPassword);
    let trPassword = document.createElement("tr");
    trPassword.appendChild(tdPassword);
    trPassword.appendChild(tdPTextBox);
    //Third Row
    let txtRPassword = document.createTextNode("Re-Enter Password:");
    let tdRPassword = document.createElement("td");
    tdRPassword.appendChild(txtRPassword);
    let inpRPassword = document.createElement("input");
    inpRPassword.setAttribute("type", "password");
    let tdRPTextBox = document.createElement("td");
    tdRPTextBox.appendChild(inpRPassword);
    let trRPassword = document.createElement("tr");
    trRPassword.appendChild(tdRPassword);
    trRPassword.appendChild(tdRPTextBox);
    //Fourth row
    let txtCreate = document.createTextNode("Create Account");
    let btnCreate = document.createElement("button");
    btnCreate.setAttribute("type", "button");
    //Set event handler for clicking on the Create Account button
    btnCreate.onclick = vDoCreateAccount;
    btnCreate.appendChild(txtCreate);
    let txtCancel = document.createTextNode("Cancel");
    let btnCancel = document.createElement("button");
    btnCancel.setAttribute("type", "button");
    //Set event handler for clicking the cancel button
    btnCancel.onclick = vCancelCreateAccount;
    btnCancel.appendChild(txtCancel);
    let divButtons = document.createElement("div");
    divButtons.className = "CenterButtons";
    divButtons.appendChild(btnCreate);
    divButtons.appendChild(btnCancel);
    let tdSIButton = document.createElement("td");
    tdSIButton.colSpan = "2";
    tdSIButton.appendChild(divButtons);
    let trSIButton = document.createElement("tr");
    trSIButton.appendChild(tdSIButton);
    //Create <tbody> element and put the rows in
    let tbdyBody = document.createElement("tbody");
    tbdyBody.appendChild(trUserName);
    tbdyBody.appendChild(trPassword);
    tbdyBody.appendChild(trRPassword);
    tbdyBody.appendChild(trSIButton);
    let tblSignin = document.createElement("table");
    tblSignin.appendChild(tbdyBody);
    //Put the table inside of the <section> element and the <section> element inside <div> element
    let secSignin = document.createElement("section");
    secSignin.className = "SignIn";
    secSignin.appendChild(tblSignin);
    //Sign in box built. Return it
    return secSignin;
}
/*Function to show the panel for creating a new account*/
function vShowCreateAccount(eventData) {
    //Cancel the usual behavior of clicking on a link
    eventData.preventDefault();
    //Get the overlay div and replace it's current child (sign in box) with the box for creating a new account.
    let divOverlay = document.getElementById("divOverlay");
    //Get the <section> element that is the box for signing in.
    let secSignIn = divOverlay.firstChild;
    //Create the box for creating a new account.
    let secNewAccount = eltCreateAccount();
    // Replace sign in box with create account box
    divOverlay.replaceChild(secNewAccount, secSignIn);
}

/*Function to cancel creating an account, by switching from the create account box back to the sign in box*/
function vCancelCreateAccount() {
    //Get the overlay div and replace it's current child (create acc box) with the box for signing in.
    let divOverlay = document.getElementById("divOverlay");
    //Get the <section> element that is the box for creating a new account.
    let secNewAccount = divOverlay.firstChild;
    //Create the box for signing in.
    let secSignIn = eltCreateSignin();
    // Replace create account box with sign in box
    divOverlay.replaceChild(secSignIn, secNewAccount);
}

/*Function to create a new account.*/
function vDoCreateAccount() {
    //Check to make sure the passwords match.
    //Get the three input elements (the text boxes) that are inside the overlay div
    let divOverlay = document.getElementById("divOverlay")
    let arrInputElts = divOverlay.getElementsByTagName("input");
    // Numbers 1 and 2 are the two passwords.
    let strPassword = arrInputElts[1].value;
    let strRePassword = arrInputElts[2].value;
    //If passwords do not match, display a message and exit
    if (strPassword != strRePassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }
    //If we get here, then passwords match, so we can send the username and password to the server for storage.
    let strUsername = arrInputElts[0].value;
    // Set up the URL and the data to send to the server, so we can use ajax.
    let strURL = "/Home/CreateAccount";
    let objUNandPW = { Username: strUsername, Password: strPassword };
    let strUNandPW = JSON.stringify(objUNandPW);
    //Call the function to do the Ajax stuff
    vDoAjax(strURL, strUNandPW, vCreateAcctResponse);
}

/*Utility function to set up and send an ajax request. Three parameters: 
strURL: the url to send the request to.
strData : the data sent with request
fcnHandleResponse:function that handles
 the response returned by the server.*/
function vDoAjax(strURL, strData, fcnHandleResponse) {
    //Create and configure the XMLHTTPRequest object
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.open("POST", strURL);
    //Set the "Content-Type" header to say that the data we send will be in JSON format
    xhrRequest.setRequestHeader("Content-Type", "application/json")
    //Define the function to handle the response
    xhrRequest.onreadystatechange =
        function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    //Request successful. Response complete. Call the specific function to process the response
                    fcnHandleResponse(xhrRequest);
                }
            }
        };
    //Send the request, with the data.
    xhrRequest.send(strData);
}

/*Function to handle the response from the server when we send a request to create a new account*/
function vCreateAcctResponse(xhrRequest) {
    //Parse the response text from JSON into javascript object
    let objResponse = JSON.parse(xhrRequest.responseText);
    let divOverlay = document.getElementById("divOverlay");
    //Check the status code returned in the response body
    if (objResponse.Status === 0) {
        // Remove overlay
        let eltBody = divOverlay.parentNode;
        eltBody.removeChild(divOverlay);
        //Replace the sign in link inside the sign in widget with a drop down list.
        let wdgSignIn = document.getElementById("wgtSignIn");
        let aSignInLink = wdgSignIn.getElementsByTagName("a")[0];
        let pSignInPar = aSignInLink.parentNode;
        let selSelect = eltCreateDropDown();
        pSignInPar.replaceChild(selSelect, aSignInLink);
    } else {
        alert(`The username "${objResponse.Name}" is already taken. Please choose a new username.`);
        // Select the text in the username text box and move focus
        let arrInputs = divOverlay.getElementsByTagName("input");
        let inpUsername = arrInputs[0];
        inpUsername.select();
        inpUsername.focus();
    }
}

/*Function to build the drop down list that replaces the sign in link when a new account is successfully created or the user
 successfully signs in. */
function eltCreateDropDown() {
    //Create 2 option elements
    let optProfile = eltCreateOption("Profile", "0");
    let optSignOut = eltCreateOption("Sign Out", "1");
    //Create the select element and append options
    let selSelect = document.createElement("select");
    selSelect.onchange = vSignOut;
    selSelect.appendChild(optProfile);
    selSelect.appendChild(optSignOut);
    //Return the select element
    return selSelect;
}

/*Function to create an <option> element for a drop down list 2 parameters:
 strDisplay - The string that is displayed in the drop-down list
 strValue - The value of the "value" attribute in the <option> start tag */
function eltCreateOption(strDisplay, strValue) {
    //Create text node for display
    let txtDisplay = document.createTextNode(strDisplay);
    //Create the option element and put in the attribute and text.
    let optOption = document.createElement("option");
    optOption.setAttribute("value", strValue);
    optOption.appendChild(txtDisplay);
    //Return option element
    return optOption;
}

function vCancelSignIn() {
    let divOverlay = document.getElementById("divOverlay");
    let bdyPageBody = document.getElementsByTagName("body")[0];
    bdyPageBody.removeChild(divOverlay);
}

function vDoSignIn() {
    let divOverlay = document.getElementById("divOverlay");
    let arrInputElts = divOverlay.getElementsByTagName("input");
    let strUsername = arrInputElts[0].value;
    let strPassword = arrInputElts[1].value;
    let strURL = "Home/SignIn";
    let objUNandPW = { Username: strUsername, Password: strPassword };
    let strUNandPW = JSON.stringify(objUNandPW);
    vDoAjax(strURL, strUNandPW, vSignInResponse);
}

function vSignInResponse(xhrRequest) {
    let objResponse = JSON.parse(xhrRequest.responseText);
    let divOverlay = document.getElementById("divOverlay");
    if (objResponse.Status === 0) {
        let eltBody = divOverlay.parentNode;
        eltBody.removeChild(divOverlay);
        let wdgSignIn = document.getElementById("wgtSignIn");
        let aSignInLink = wdgSignIn.getElementsByTagName("a")[0];
        let pSignInPar = aSignInLink.parentNode;
        let selSelect = eltCreateDropDown();
        pSignInPar.replaceChild(selSelect, aSignInLink);
        let eltCartSpan = document.getElementById("NumOfItems");
        eltCartSpan.innerHTML = objResponse.NumInCart;
    }
    else if (objResponse.Status === 1) {
        alert("The entered password is incorrect.");
        // Select the text in the username text box and move focus
        let arrInputs = divOverlay.getElementsByTagName("input");
        let inpUsername = arrInputs[0];
        inpUsername.select();
        inpUsername.focus();
    }
    else {
        alert("The entered username does not exist.");
        // Select the text in the username text box and move focus
        let arrInputs = divOverlay.getElementsByTagName("input");
        let inpUsername = arrInputs[0];
        inpUsername.select();
        inpUsername.focus();
    }
}

/*Function to add a game to the user's cart. The first parameter is a reference to the button clicked and the second is the id
 of the game chosen*/
function vAddToCart(eltButton, iGameID) {
    //Get the quantity chosen.
    let eltTr = eltButton.parentNode.parentNode;
    let eltNumber = eltTr.getElementsByTagName("input")[0];
    let iQuantity = parseInt(eltNumber.value);
    //Only add to cart of Quantity is > 0
    if (iQuantity > 0) {
        //set quantity back to 0
        eltNumber.value = 0;
        //Use ajax to send the new item for the users cart to the server for storage
        let objNewItem = { GameID: iGameID, Quantity: iQuantity };
        let strNewItem = JSON.stringify(objNewItem);
        let strURL = "/Home/AddToCart";
        vDoAjax(strURL, strNewItem, vAddToCartResponse);
    } else {
        alert("Item not added to cart: quantity is zero.")
    }
}

//Function to handle the response from the server after adding a new item to the cart
function vAddToCartResponse(xhrRequest) {
    //Update the number of items in the cart widget on the page
    let eltCartSpan = document.getElementById("NumOfItems");
    let objResponse = JSON.parse(xhrRequest.responseText);
    eltCartSpan.innerHTML = objResponse.NumInCart;
}

function vSignOut() {
    let strURI = "/Home/SignUserOut"
    vDoAjax(strURI, null, vSignOutResponse);
}

function vSignOutResponse() {
    let eltCartSpan = document.getElementById("NumOfItems");
    eltCartSpan.innerHTML = 0;
    let wdgSignIn = document.getElementById("wgtSignIn");
    let selDropDown = wdgSignIn.getElementsByTagName("select")[0];
    let DropDownPar = selDropDown.parentNode;
    let txtSignIn = document.createTextNode("Sign In");
    let aSignIn = document.createElement("a");
    aSignIn.setAttribute("href", "");
    aSignIn.setAttribute("onclick", "vStartSignIn(arguments[0])");
    aSignIn.appendChild(txtSignIn);
    DropDownPar.replaceChild(aSignIn, selDropDown);
}
