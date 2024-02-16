window.uMessage = user_facing_message;
class Client {
    constructor() {
        if (window.location.href.includes("Store.html")) {
            const addButton = document.getElementById("add-button");
    
            addButton.addEventListener("click", () => {
                let wordInput = document.getElementById("word-area").value.trim();
                let definitionInput = document.getElementById("definition-area").value.trim();
    
                // Regular expression to match only letters
                let lettersOnly = /^[A-Za-z\s]+$/;
    
                if (!wordInput.match(lettersOnly)) {
                    document.getElementById("status").innerHTML = uMessage.INVALID_INPUT;
                    return;
                }
    
                this.Post(wordInput, definitionInput);
            });
        }

        if(window.location.href.includes("Search.html")) {
            const searchButton = document.getElementById("search-button");

            searchButton.addEventListener("click", () => {
                let wordInput = document.getElementById("word-area").value.trim();
    
                // Regular expression to match only letters
                let lettersOnly = /^[A-Za-z\s]+$/;
    
                if (!wordInput.match(lettersOnly)) {
                    document.getElementById("status").innerHTML = uMessage.INVALID_INPUT;
                    return;
                }
    
                this.Get(wordInput);
            });
        }
    }

    Post(word, definition) {
        document.getElementById("status").innerHTML = "";
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://strahd2.com/COMP4537/labs/4/api/definitions/");
        xhttp.send('?word=' + word + "&definition=" + definition);
    
        xhttp.onload = function () {
            const response = JSON.parse(this.responseText);

            const reqNum = response.req_num;
            const status = response.status;
            document.getElementById("requestNo").innerHTML = uMessage.ENTRY + reqNum;
            document.getElementById("status").innerHTML = uMessage.STATUS + status;
        }
    }

    Get(word) {
        document.getElementById("status").innerHTML = "";
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", `https://strahd2.com/COMP4537/labs/4/api/definitions/?word=${word}`, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
           if(this.readyState == 4 && this.status == 200) {

                const response = JSON.parse(this.responseText);

                // Extracting properties from the JSON object
                const reqNum = response.req_num;
                const status = response.status;
                const definition = response.definition;
                document.getElementById("requestNo").innerHTML =  uMessage.ENTRY + reqNum;
                if(status === "no word found") {
                    document.getElementById("output-area").innerHTML = status;
                }else {
                    document.getElementById("output-area").innerHTML = uMessage.DEFINITION + definition;
                }
           }
        }
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const client = new Client();
});
