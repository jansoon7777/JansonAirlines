import 'bootstrap';
import style from "./css/index.scss"
import style2 from "./css/index2.scss"
import users from "../users.json"
import seats from "../seats.json"
addButtonEvent();
addOnChangeEvents();
var summary = new Object();

import Icon from "./assets/img/proba.png"
import Icon2 from "./assets/img/siedem.png"

console.log(users);
var login = "1";
var password = "1";

document.getElementById("logUser").addEventListener("click", logUser);

function logUser() {
    var loginSucceeded = false;
    let login = document.getElementById("login").value;
    debugger;
    var matchedElement = users.find(x => x.email === login);
    if (matchedElement != undefined) {
        let password = document.getElementById("password").value;
        if (matchedElement.password === password) {
            loginSucceeded = true;
        }
    }
    if (!loginSucceeded) {
        $("#wrongLogin").removeClass("hidden");
    }
    else {
        $("#wrongLogin").addClass("hidden");
        $("#loginForm").addClass("hidden");
        $("#loggedInForm").removeClass("hidden");
        //$("#hello-message").append(" " + matchedElement.name + " " + matchedElement.surname + "!")
    }

}

function addButtonEvent() {
    $("#click").on("click", function () {
        $("#luggage").removeClass("hidden");
    });

    $("#click2").on("click", function () {
        $("#luggage").removeClass("hidden");
    });
    $("#click3").on("click", function () {
        $("#summary").removeClass("hidden");
    });
}

function addOnChangeEvents() {
    $("#destination").change(function () {
        var destination = $("#destination").val();
        var seatsContent = null;
        switch (destination) {
            case "Warszawa":
                seatsContent = seats[0];
                break;
            case "Rzym":
                seatsContent = seats[1];
                break;
            case "Nowy Jork":
                seatsContent = seats[2];
                break;
        }
        if (seatsContent != null) {
            console.log(seatsContent.name);
            $("#airplane-type").text(seatsContent.name);
            $("#airplane-type").attr("number-of-seats", seatsContent.numberOfSeats);
        }
        summary.destination = destination;
        updateSummary();
    });

    $("#wylot").change(function () {
        var value = $("#wylot").val();
        summary.wylot = value;
        updateSummary();
    });
    $("#powrot").change(function () {
        var value = $("#powrot").val();
        summary.powrot = value;
        updateSummary();
    });
    $("#departure").change(function () {
        var value = $("#departure").val();
        summary.departure = value;
        updateSummary();
    });
    $("#extra").change(function () {
        var value = $("#extra").val();
        summary.extra = value;
        updateSummary();
    });
    $("#passenger").change(function () {
        var numberOfPassengers = $("#passenger").val();
        var numberOfSeats = $("#airplane-type").attr("number-of-seats");
        var randomSeatNumber = randomInteger(parseInt(numberOfSeats-numberOfPassengers));
        var seats = "";
        for (var i = 0; i < numberOfPassengers; i++) {
            if( i > 0 ){
                seats +=","
            }
            seats += (randomSeatNumber+i);
        }
        summary.seats = seats;
        console.log(summary.seats);
        updateSummary();
    });
}

function updateSummary() {
    if (summary.wylot != undefined) {
        $("#wylot-summary").text(summary.wylot);
    }
    if (summary.powrot != undefined) {
        $("#powrot-summary").text(summary.powrot);
    }
    if (summary.departure != undefined) {
        $("#departure-summary").text(summary.departure);
    }
    if (summary.destination != undefined) {
        $("#destination-summary").text(summary.destination);
    }
    if (summary.extra != undefined) {
        $("#extra-summary").text(summary.extra);
    }
    if (summary.seats != undefined) {
        $("#seats-summary").text(summary.seats);
    }
}

function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}