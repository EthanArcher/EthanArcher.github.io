var wedding = new Date("Jul 11, 2021");
var now = new Date();

var years = now.getFullYear() - wedding.getFullYear();
var months = now.getMonth() - wedding.getMonth();
var days = now.getDate() - wedding.getDate();

if (days < 0) {
	months--;
	days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
}
if (months < 0) {
	years--;
	months += 12;
}

document.getElementById("countdown").innerHTML =
	years + " years " + months + " months " + days + " days";
