


//Function to give #name text input focus on page load
//hides paypal and bitcoin info and sets credit-card info as default
$(document).ready(function(){
    $("#name").focus();
    $("#credit-card").show();
    $("#paypal").hide();
    $("#bitcoin").hide();

});

//Label to hold activity checkbox totals
var totalLabel = $("<label></label>");

//Hide "other" job role option text field
$("#other-title").hide();

//Function for setting error focus css
function focusErrorCss(input){
    $(input).focus(function(){
        $(this).css({"background" : "#e6b0aa", "border" : "3px solid #c0392b", "transition": "border .4s, background-color .4s"});
    });

}

//Function for setting error blur css
function blurErrorCss(input){
    $(input).blur(function(){
        $(this).css({"background" : "#d98880", "border" : "3px solid #c0392b"});
    });
}

//Function for resetting non-error focus css
function focusCss(input){
    $(input).focus(function(){
        $(this).css({"background" : "#fff", "border-color" : "#5e97b0", "transition": "border-color .4s, background-color .4s"});
    });
}

//Function for resetting non-error blur css
function blurCss(input){
    $(input).blur(function(){
        $(this).css({"background" : "#c1deeb", "border" : "2px solid #c1deeb"});
    });
}

//Show/hide conditions for "other" job title textfield
function otherTitle() {

    $("#title").change(function(){
        var $selected = $("#title").find(":selected").val();

        if($selected === "other"){
            $("#other-title").show();
        }else {
            $("#other-title").hide();
        }
    });

}

//Function for setting hide/show conditions on shirt color options
function shirtInfo() {

    $(".colors").hide();

    $("#design").change(function(){
        var $selected = $("#design").find(":selected").val();

        //Hiding colors until ddsign is choosen
        if($selected !== 'Select Theme'){
            $(".colors").show();
        } else {
            $(".colors").hide();
        }


        if($selected === "js puns"){
            $("#color option:contains('I')").hide();
        } else {
            $("#color option:contains('I')").show();
        }

        if ($selected === "heart js"){
            $("#color option:contains('Puns')").hide();

        } else {
            $("#color option:contains('Puns')").show();

        }

    });


}


//Disabling activities with same times as checked activites

function registerActivities(){

    var frameworks = $("input[name='js-frameworks']");
    var express = $("input[name='express']");
    var node = $("input[name='node']");
    var jsLib = $("input[name='js-libs']");
    var main = $("input[name='all']");
    var buildTools = $("input[name='build-tools']");
    var npm = $("input[name='npm']");

    //Css for activity total label
    $(totalLabel).css({"color" : "#184f68", "font-size" : "1.15em", "font-weight" : "500"});


    $(".activities").append(totalLabel);

    $(".activities").change(function(){

        var $totalNum = 0;

        //Increasing total
        //Setting disabled etc
        //changing css based on disabled true/false

        if ($(main).prop("checked") === true) {
            $totalNum += 200;
        }

        if ($(buildTools).prop("checked") === true){
            $totalNum += 100;
        }

        if ($(npm).prop("checked") === true) {
            $totalNum += 100;
        }



        if ($(frameworks).prop("checked") === true) {
            $(express).prop("disabled", true);
            $("#expressLabel").css({"color" : "#a9cce3"});
            $totalNum += 100;
        } else if ($(express).prop("checked") === true) {
            $(frameworks).prop("disabled", true);
            $("#frameworkLabel").css({"color" : "#a9cce3"});
            $totalNum += 100;
        }

        if ($(jsLib).prop("checked") === true) {
            $(node).prop("disabled", true);
            $("#nodeLabel").css({"color" : "#a9cce3"});
            $totalNum += 100;
        } else if ($(node).prop("checked") === true) {
            $(jsLib).prop("disabled", true);
            $("#libsLabel").css({"color" : "#a9cce3"});
            $totalNum += 100;
        }


        if ($(frameworks).prop("checked") === false){
            $(express).prop("disabled", false);
            $("#expressLabel").css({"color" : "#000"});
        }

        if ($(express).prop("checked") === false) {
            $(frameworks).prop("disabled", false);
            $("#frameworkLabel").css({"color" : "#000"});
        }

        if ($(jsLib).prop("checked") === false) {
            $(node).prop("disabled", false);
            $("#nodeLabel").css({"color" : "#000"});
        }

        if ($(node).prop("checked") === false) {
            $(jsLib).prop("disabled", false);
            $("#libsLabel").css({"color" : "#000"});
        }


        $(totalLabel).html("Total: $" + $totalNum);

    });

}


//Hide/show conditions for payment info
function paymentInfo() {

    $("#payment").change(function(){
        var $selected = $("#payment").find(":selected").val();

        if ($selected === "select_method" || $selected === "credit card"){
            $("#credit-card").show();
            $("#paypal").hide();
            $("#bitcoin").hide();
        } else {
            $("#credit-card").hide();
        }


        if ($selected === "paypal") {
            $("#paypal").show();
        } else {
            $("#paypal").hide();
        }

        if ($selected === "bitcoin") {
            $("#bitcoin").show();
        } else {
            $("#bitcoin").hide();
        }



    });


}


//Validating all input fields

function validateInfo(){

    var $nameError = $("<label>(Please Enter Your Name)</label>").css({"color" : "#c0392b", "font-size" : "1.25em"});
    var $emailError = $("<label>(Please Enter Valid Email Address)</label>").css({"color" : "#c0392b", "font-size" : "1.25em"});

    var $cardNumEspace = $("<label>&nbsp;</label>");
    var $zipEspace = $("<label>&nbsp;</label>");
    var $cvvEspace = $("<label>&nbsp;</label>");
    $("label[for='cc-num']").append($cardNumEspace);
    $("label[for='zip']").append($zipEspace);
    $("label[for='cvv']").append($cvvEspace);

    //Validate on submit
    $("button").click(function(){

        //Validate email
        var $email = $("#mail").val();
        var $emailFormat =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var $emailCheck = $emailFormat.test($email);
        if($emailCheck === false){

            $($emailError).show();

            $("#mail").css({"border" : "3px solid #c0392b", "background-color" : "#d98880"});

            focusErrorCss("#mail");
            blurErrorCss("#mail");

            $("label[for='mail']").append($emailError);

        } else {

            $($emailError).hide();

            $("#mail").css({"background" : "#c1deeb", "border" : "2px solid #c1deeb"});

            focusCss("#mail");
            blurCss("#mail");
        }

        //Validate name input
        //Activate error message
        var $input = $("#name").val();


        if($input === ''){

            $($nameError).show();

            $("#name").css({"border" : "3px solid #c0392b", "background-color" : "#d98880"});

            focusErrorCss("#name");
            blurErrorCss("#name");

            $("label[for='name']").append($nameError);

        } else {

            $($nameError).hide();

            $("#name").css({"background" : "#c1deeb", "border" : "2px solid #c1deeb"});

            focusCss("#name");
            blurCss("#name");

        }

        //Validate checkbox
        //Activate error messages
        var $checkbox = $(".activities").find(":checked").val();
        if ($checkbox !== 'on'){
            $(".activities legend").css({"color" : "#c0392b"}).text("Register for Activities (Please Select At Least One Activity)");
        } else {
            $(".activities legend").css({"color" : "#184f68"}).text("Register for Activities");
        }

        //Validate payment info
        //Activate all error messages based on different error conditions
        var $creditInfo = $("#cc-num").val();

        if($.isNumeric($creditInfo) === false || ($creditInfo.length === 0)){
            $("#cc-num").css({"border" : "3px solid #c0392b", "background-color" : "#d98880"});
            focusErrorCss("#cc-num");
            blurErrorCss("#cc-num");
            $($cardNumEspace).text("Please Enter Valid Credit Card Number").css({"color" : "#c0392b"});
        } else if ($.isNumeric($creditInfo) === true && ($creditInfo.length < 13)){
            $("#cc-num").css({"border" : "3px solid #c0392b", "background-color" : "#d98880"});
            focusErrorCss("#cc-num");
            blurErrorCss("#cc-num");
            $($cardNumEspace).text("Please Enter Number At Least 13 Digits Long").css({"color" : "#c0392b", "font-size" : ".94em"});
        } else {
            $($cardNumEspace).html("&nbsp;");
            $("#cc-num").css({"background": "#c1deeb", "border" : "2px solid #c1deeb"});
            focusCss("#cc-num");
            blurCss("#cc-num");

        }



    });

    //Validate cvv in real-time
    //on keyup
    $("#cvv").keyup(function(){
        var $cvv = $("#cvv").val();
        if($.isNumeric($cvv) === false || ($cvv.length < 3 || $cvv.length > 3)) {
            $("#cvv").css({"border" : "3px solid #c0392b", "background-color" : "#d98880"});
            focusErrorCss("#cvv");
            blurErrorCss("#cvv");
            $($cvvEspace).text("Please Enter 3 Digits").css({"color" : "#c0392b", "font-size" : ".9em"});
        } else {
            $($cvvEspace).html("&nbsp;");
            $("#cvv").css({"background": "#c1deeb", "border" : "2px solid #c1deeb"});
            blurCss("#cvv");
            focusCss("#cvv");
        }
    });


    //Validate zip in real-time
    //on keyup
    $("#zip").keyup(function(){
        var $zipCode = $("#zip").val();

        if($.isNumeric($zipCode) === false || ($zipCode.length !== 5)) {
            $("#zip").css({"border" : "3px solid #c0392b", "background-color" : "#d98880"});
            focusErrorCss("#zip");
            blurErrorCss("#zip");
            $($zipEspace).text("Please Enter 5 Digits").css({"color" : "#c0392b", "font-size" : ".9em"});
        } else {
            $($zipEspace).html("&nbsp;");
            $("#zip").css({"background": "#c1deeb", "border" : "2px solid #c1deeb"});
            focusCss("#zip");
            blurCss("#zip");
        }
    });


}

$("button").click(function(event){
    event.preventDefault();
});

//Call all functions
validateInfo();
paymentInfo();
registerActivities();
otherTitle();
shirtInfo();
