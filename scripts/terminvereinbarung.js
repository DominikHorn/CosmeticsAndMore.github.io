function getNextWorkingDate() {
	var day = new Date();
	var daysTilNextWorkingDay = 1;
	if (day.getDay() > 4) {
		daysTilNextWorkingDay += 7 - day.getDay();
	}

	day.setTime(day.getTime() + 1000 * 60 * 60 * 24 * daysTilNextWorkingDay);
	return day;
}

function getHumanReadableDate(dateString) {
	var date = new Date(dateString);
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	}

	return dd + "." + mm + "." + yyyy;
}

function onload() {
	var today = getNextWorkingDate();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	}

	today = yyyy + "-" + mm + "-" + dd;
	document.getElementsByName('date')[0].value = today;
}

function sendMail() {
	var mailElement = document.getElementsByName('mail')[0];
	var nameElement = document.getElementsByName('name')[0];
	var numberElement = document.getElementsByName('rufnummer')[0];
	var subjectElement = document.getElementsByName('betreff')[0];
	var messageElement = document.getElementsByName('nachricht')[0];
	mailElement.className = "";
	nameElement.className = "";
	numberElement.className = "";
	subjectElement.className = "";
	messageElement.className = "";

	var mail = escape(mailElement.value);
	var message = escape(messageElement.value);
	var name = escape(nameElement.value);
	var number = escape(numberElement.value);
	var subject = escape(subjectElement.value);

	if (!name || name === "") {
		nameElement.className = "error";
		nameElement.focus();

		return;
	}

	if (!mail || mail === "") {
		mailElement.className = "error";
		mailElement.focus();
			
		return;
	}

	if (!number || number === "") {
		numberElement.className = "error";
		numberElement.focus();

		return;
	}

	if (!subject || subject === "") {
		subjectElement.className = "error";
		subjectElement.focus();

		return;
	}
	
	var kontakt = "";

	if (message && !(message === "")) {
		kontakt = escape("\n\n--------------------------------------------------------------------\n")
		+ escape("Name: \t\t\"")
		+ unescape(name) 
		+ escape("\"\nRufnummer: \t\"") 
		+ number 
		+ escape("\"\nE-mail: \t\t\"") 
		+ mail
		+ escape("\"\nDatum: \t\t\"") 
		+ document.getElementsByName('date')[0].value
		+ escape("\"\nUhrzeit: \t\t\"") 
		+ document.getElementsByName('time')[0].value
		+ escape("\"\n--------------------------------------------------------------------")
		;
	} else {
		kontakt = escape("Sehr geehrte Frau Thurand,\n\nhiermit m") + unescape("ö") + escape("chte ich bei Ihnen einen Termin am ")
		+ getHumanReadableDate(document.getElementsByName('date')[0].value)
		+ " um "
		+ document.getElementsByName('time')[0].value
		+ " Uhr ausmachen. Bitte informieren sie mich ob das m" + unescape("ö") + "glich ist. Sie erreichen mich per Telefon unter "
		+ number
		+ " oder unter meiner E-mail: " 
		+ mail
		+ escape(". Vielen Dank im Voraus.\n\nMit freundlichen Gr")
		+ unescape("üß")
		+ escape("en,\n")
		+ unescape(name)
		+ escape("\n");
		;
	}

	var link = "mailto:cosmetics_and_more@me.com"
	 + "?cc=" + unescape(mail)
	 + "&subject=" + unescape(subject)
	 + "&body=" + unescape(message).replace(/\r?\n/g, "%0A")
	 + kontakt
	 ;
	window.location.href = link;
}