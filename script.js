var auther = ["ahmed morad", "علي جمعة", "elhabib ali elgafri", "محمد خالد", "ab", "cd", "ef &amp; g", "h", "i", "k", "k", "lm", "n", "op", "qrs", "tu"];

var book = ["a101", "الحقيقة", "جامع الكتب", "d401", "e501", "f601", "g701", "h801", "i901", "j101", "k201", "lm301", "n401", "op501", "qrs601", "tu701"];

var publisher = ["1", "دار ميمون", "دار قرطبة", "أطلس للنشر", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

var db = [
    {
        "id": 1,
        "auther": "ahmed morad",
        "book" : "a101",
        "publisher":"1",
        "location": "A1"
    },    {
        "id":"2",
        "auther": "محمد خالد",
        "book": "الحقيقة",
        "publisher": "دار ميمون",
        "location":"A2"
    },  {
        "id":"2",
        "auther" : "elhabib ali elgafri",
        "book" :"c301",
        "publisher" : "3",
        "location":"A3"
    },
]

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}




function search(book, auther, publisher) {
 
    var searchItems = {
            "book":book.value,
            "publisher": publisher.value,
            "auther": auther.value
}

for (let i = 0; i < db.length; i++) {

    if (searchItems.book === db[i].book ||
        searchItems.publisher === db[i].publisher ||
        searchItems.auther === db[i].auther) {
            console.log(db[i])
        window.location.replace("Direction.html"+"?"+"auther="+db[i].auther+"&"+"publisher="+db[i].publisher+"&"+"book="+db[i].book);

    } 
    
}

}



