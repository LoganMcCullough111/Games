/* Function to start the sign in process */
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
    btnSignIn.appendChild(txtSignIn);
    let txtCancel = document.createTextNode("Cancel");
    let btnCancel = document.createElement("button");
    btnCancel.setAttribute("type", "button");
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
    btnCreate.appendChild(txtCreate);
    let txtCancel = document.createTextNode("Cancel");
    let btnCancel = document.createElement("button");
    btnCancel.setAttribute("type", "button");
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