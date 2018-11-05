document.addEventListener("DOMContentLoaded", init);

function init() {

    document.getElementById("btnSend").addEventListener("click", getData);
    document.getElementById("digits").focus();
}

function getData() {

    let mainURL = "http://davidst.edumedia.ca/mad9014/nums.php";
    let allData = new FormData();

    let initDigits = document.getElementById("digits").value;
    let maxNumber = document.getElementById("max").value;

    if (initDigits.length > 0 && maxNumber.length > 0) {
        if (Number(maxNumber) >= Number(initDigits)) {
            document.getElementById("home").style.display = "none";
            document.getElementById("list").style.display = "block";

            fetch(mainURL + "?digits=" + initDigits + "&max=" + maxNumber)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    if (data.code == 0) {
                        let ul = document.querySelector(".num_list");
                        ul.innerHTML = "";
                        for (let item in data.numbers) {
                            let li = document.createElement("li");
                            li.innerHTML = data.numbers[item];
                            ul.appendChild(li);
                        }
                    }
                })
                .then(function (back) {
                    document.getElementById("btnBack").addEventListener("click", resetDoc);
                })
                .catch(function (error) {
                    document.getElementById("errorMessage").textContent = "Error: " + error.message;
                })
        } else {
            alert("You have to enter a valid number \ngreater than or equal to number of Digits");
            document.getElementById("max").focus();
        }

    } else if (initDigits.length == 0) {
        alert("You have to enter a valid number between 1 and 10");
        document.getElementById("digits").focus();
    } else if (maxNumber.length == 0) {
        alert("You have to enter a valid number between 1 and 99");
        document.getElementById("max").focus();
    }
}

function resetDoc() {
    document.getElementById("home").style.display = "block";
    document.getElementById("list").style.display = "none";
    document.getElementById("digits").value = "";
    document.getElementById("max").value = "";
    init();
}
