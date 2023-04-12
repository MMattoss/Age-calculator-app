var selectedDay;
var selectedMonth;
var selectedYear;
var monthLength;


var isLeap = false;
var yearField = false;
var monthField = false;
var dayField = false;
var oddMonths = [1,3,5,7,8,10,12]
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();




function calculation() {
	var bornDate = new Date(selectedYear, selectedMonth, selectedDay);
	var ageYears = Math.floor(currentYear - bornDate.getFullYear());
	var ageMonths = Math.floor(currentMonth - (bornDate.getMonth()));
	var ageDays = Math.floor(currentDay - bornDate.getDate());

    if(ageMonths < 0){

        ageYears--;

        if(ageDays < 0){

            ageMonths = ageMonths + 12;
            ageDays = ageDays + monthLength;

        }
        else if (ageDays === 0){

            ageMonths = ageMonths + 12;

        }


    } else if (ageDays  < 0 ){
        ageMonths--;
        if(ageMonths == 0 ){
            year--;
            ageMonths = 12;
            ageDays = ageDays + 31;
        }
        else{
        	ageDays = ageDays + monthLength;
        }
    }


	$('.years-result').text(ageYears);
	$('.months-result').text(ageMonths);
	$('.days-result').text(ageDays);
}



function assignValues() {
	selectedDay = $('#day').val();
	selectedMonth = $('#month').val();
	selectedYear = $('#year').val();

	selectedDay = Math.floor(selectedDay);
	selectedMonth = Math.floor(selectedMonth);
	selectedYear = Math.floor(selectedYear);
}



function checkLeapYear(year) {

	if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
		isLeap = true;
	}

	else{
		isLeap = false;
	}
}



function fieldVerification() {

	// Year field verification
	if ($('#year').val() === '') {
		$('#year-alert').text('This field is required.');
		yearField = false;
	}

	else if(selectedYear > currentYear){
		$('#year-alert').text('Must be in the past.');
		yearField = true;
	}

	else if(selectedYear < 0){
		$('#year-alert').text('Must be a valid year');
		yearField = false;
	}

	else{
		$('#year-alert').text('');
		yearField = true;
	}


	// Month field verification
	if ($('#month').val() === '') {
		$('#month-alert').text('This field is required.');
		monthField = false;
	}

	else if(selectedMonth < 1 || selectedMonth > 12){
		$('#month-alert').text('Must be a valid month.');
		monthField = true;	
	}

	else if(selectedYear === currentYear & selectedMonth > currentMonth){
		$('#month-alert').text('Must be in the past.');
		monthField = true;
	}

	else{
		$('#month-alert').text('');
		monthField = true;
	}


	// Day field verification
	if ($('#day').val() === '') {
		$('#day-alert').text('This field is required.');
		dayField = false;
	}

	else if(selectedDay < 1 || selectedDay > 31){
		$('#day-alert').text('Must be a valid day.');
		dayField = true;
	}

	else{
		$('#day-alert').text('');
		dayField = true;
	}

}



function proceedValuesVerification() {
	if (yearField === true & monthField === true & dayField === true) {
		monthVerification();
	}
	else{
		return
	}
}


//Day verifications
function leapFebruaryVerification() {

	if (selectedDay < 1 || selectedDay > 29) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must in the past.');
		}

		else{
			$('#day-alert').text('');
			monthLength = 29;
			calculation();
		}
	}
}



function notLeapFebruaryVerification() {
	if (selectedDay < 1 || selectedDay > 28) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must be in the past.');
		}

		else{
			$('#day-alert').text('');
			monthLength = 28;
			calculation();
		}
	}
}



function dayVerificationOddMonth() {
	if (selectedDay < 1 || selectedDay > 31) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must be in the past.');
		}

		else{
			$('#day-alert').text('');
			monthLength = 31;
			calculation();
		}
	}
}



function dayVerificationEvenMonth() {
	if (selectedDay < 1 || selectedDay > 30) {
		$('#day-alert').text('Must be a valid day.');
	}

	else{
		$('#day-alert').text('');
		if (selectedYear === currentYear & selectedMonth === currentMonth & selectedDay > currentDay) {
			$('#day-alert').text('Must be in the past.');
		}

		else{
			$('#day-alert').text('');
			monthLength = 30;
			calculation();
		}
	}
}


//Month verification
function monthVerification() {

	if (selectedMonth === 2 & isLeap === false) {
		notLeapFebruaryVerification();
	}

	else if(selectedMonth === 2 & isLeap === true){
		leapFebruaryVerification();
	}

	else if(oddMonths.includes(selectedMonth)){
		dayVerificationOddMonth();
	}

	else{
		dayVerificationEvenMonth();
	}
}

$('.btn-desktop').click(function () {
	assignValues();
	checkLeapYear(selectedYear);
	fieldVerification();
	proceedValuesVerification();
})


$('.btn-mobile').click(function () {
	assignValues();
	checkLeapYear(selectedYear);
	fieldVerification();
	proceedValuesVerification();
})
