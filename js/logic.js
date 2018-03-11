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
        //console.log("current time in minutes: " + currentTimeMin);

    //gain focus on first input onload
    $("#trainName").focus();
    var dbIndex;


        // on submit button click
    $("#submit").on("click", function (e) {
        e.preventDefault(); //prevent page refresh

        //this will get the initial time and split it to hours and minutes
        // in array and calculate total time in minutes before pass it to
        //database
        var initTime = $("#trainTime").val().trim(),
            initTimeArr = initTime.split(":"),
            initHours = parseInt(initTimeArr[0],) 
            initMinutes = parseInt(initTimeArr[1]),
            initTimeMinutes = initHours * 60 + initMinutes;
            //console.log("init time in minutes: " + initTimeMinutes);

        //create new object
        var train = {
            tName: $("#trainName").val().trim(),
            tDestination: $("#trainDestination").val().trim(),
            tTime: initTimeMinutes,
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