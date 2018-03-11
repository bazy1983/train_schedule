$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBbz8hVF_czUjOPCdILZ9PtivEm-dwtRTY",
        authDomain: "trainscheduler-bf7ad.firebaseapp.com",
        databaseURL: "https://trainscheduler-bf7ad.firebaseio.com",
        projectId: "trainscheduler-bf7ad",
        storageBucket: "",
        messagingSenderId: "35492814730"
    };
    firebase.initializeApp(config);


    var db = firebase.database();
    //time caculation
    var currentTime = new Date(),
        currentHours = currentTime.getHours(),
        currentMinutes = currentTime.getMinutes(),
        currentTimeMin = currentHours * 60 + currentMinutes;
        console.log(currentTimeMin);

    //gain focus on first input onload
    $("#trainName").focus();
    var dbIndex;


        // on submit button click
    $("#submit").on("click", function (e) {
        e.preventDefault(); //prevent page refresh

        //create new object
        var train = {
            tName: $("#trainName").val().trim(),
            tDestination: $("#trainDestination").val().trim(),
            tTime: $("#trainTime").val().trim(),
            tFrequency: $("#trainFrequency").val().trim()
        };

        db.ref("train/" + dbIndex).set(train)
        $("input").val("");
        $("#trainName").focus();
    })

    db.ref("train").on("value", function(res){
        console.log(res.val());
        if (res.val() === null){
            dbIndex = 0
        } else {
            dbIndex = res.val().length; //response length
            console.log(dbIndex);
            
        }
    })
})