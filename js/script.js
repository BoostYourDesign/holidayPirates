// Ajax call for getting hotels list

function loadDoc() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            var obj = JSON.parse(this.responseText);
            document.getElementById("hotels").innerHTML = displayHotels(obj);
        }else if(this.status == 500){ //in case of a server error, display error message
            var obj = JSON.parse(this.responseText);
            document.getElementById("hotels").innerHTML = "<div class=\"alert alert-danger\"><i class=\"fa fa-frown-o fa-2x\" aria-hidden=\"true\"></i>&nbsp;&nbsp;" + obj.error + "</div>";
        }
    }
    xhttp.open("GET","http://fake-hotel-api.herokuapp.com/api/hotels?count=5", true);
    xhttp.send();
};

// Ajax call for getting user reviews

function showReviews(id) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            var obj = JSON.parse(this.responseText);
            if(obj.length > 0){ //if object is empty, display an error message
                document.getElementById(id).innerHTML = singleReview(obj);
            }else{
                document.getElementById(id).innerHTML = "<div class=\"alert alert-warning\"><i class=\"fa fa-smile-o fa-2x\" aria-hidden=\"true\"></i> This hotel has no reviews.</div>";
            }

        }else if(this.status == 500){
            var obj = JSON.parse(this.responseText);
            document.getElementById(id).innerHTML = "<div class=\"alert alert-danger\"><i class=\"fa fa-frown-o fa-2x\" aria-hidden=\"true\"></i>" + obj.error + "</div>";
        }
    }
    xhttp.open("GET","http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id="+ id, true);
    xhttp.send();
    document.getElementById(id).innerHTML = "Loading ..."
};

// Toggle the user reviews container

function toogleView(reviewBox, buttonElement) {

    var x = document.getElementById(reviewBox);
    if (x.style.display === 'block') {
        x.style.display = 'none';
        buttonElement.value = "Show Reviews";
    } else {
        x.style.display = 'block';
        buttonElement.value = "Hide Reviews";
    }
};

// Display hotels function

function displayHotels(hoteList){
    table="";
    var i;
    for (i=0 ; i< hoteList.length; i++){
        var hotel = hoteList[i];
        var stars="";
        var j;
        for(j=0;j<hotel.stars;j++){ //Showing rating starts for each hotel
            stars+= "<i class=\"fa fa-star\"></i>";
        }
        for(j=0;j<(5- hotel.stars);j++){
            stars+= "<i class=\"fa fa-star-o\"></i>";
        }
        // Loading each hotel
        table +=
            " <div class=\"row panel\" id=\"hotel\">\n" +
            "                <div class=\"rating\">\n" + stars+
            "                </div>\n" +
            "                <div class=\"imageHolder col-md-4 \">\n" +
            "                    <img class=\"hotelImg\" src=" + hotel.images +">\n" +
            "                </div>\n" +
            "                <div class=\"col-md-8  col-xs-12\">\n" +
            "                    <div class=\"header\">\n" +
            "                        <h1>" +hotel.name +"</h1>\n" +
            "                        <h4>" + hotel.city + "-" + hotel.country +"</h4>\n" +
            "                        <p>" + hotel.description + "</p>\n" +
            "                        <input class=\"showReviews btn btn-lg btn-warning pull-left\" id='button"+hotel.id+"'  onclick=\"showReviews('"+hotel.id+"'),toogleView('"+hotel.id+"',this)\" value='Show Reviews' type='button'>\n" +
            "                        <h3 class=\"price\">"+ hotel.price + "&euro;</h3>\n" +
            "                        <h5 class=\"date\">"+ parseDate(hotel.date_start) +" - "+ parseDate(hotel.date_end) +"</h5>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"jumbotron\" id="+hotel.id+"\>\n" +
            "                        \n" +
            "            </div>\n"+
            //hardcoded part for preview/design purposes
            "            <div class=\"row nav\">\n" +
            "                <div class=\"col-md-4\"></div>\n" +
            "                <div class=\"col-md-8 col-xs-12\" style=\"margin: 0px;padding: 0px;\">\n" +
            "                    <div class=\"col-md-4 col-xs-4 well\"><i class=\"fa fa-weixin fa-lg\"></i> 16</div>\n" +
            "                    <div class=\"col-md-4 col-xs-4 well\"><i class=\"fa fa-heart-o fa-lg\"></i> 14</div>\n" +
            "                    <div class=\"col-md-4 col-xs-4 well\"><i class=\"fa fa-thumbs-o-up fa-lg\"></i> 26</div>\n" +
            "                </div>\n" +
            "            </div>"
    }
    return table;
};

// Loading hotel reviews

function singleReview(obj){
    review= "";
    var j;
    for(j=0; j<obj.length; j++){
        var reviewer = obj[j];
        feedback = "";
        if(reviewer.positive){ // showing users feedback
            feedback = "<i class=\"fa fa-smile-o\"></i>"
        }
        else{
            feedback = "<i class=\"fa fa-frown-o\"></i>"
        }
        review +=
            " <div class=\"review-box\">" +
            "<h4 class=\"reviewer-name\">"
            +feedback+
            reviewer.name+
            "</h4>" +
            "<p>"+reviewer.comment+"</p>" +
            "</div>"
        ;
    }
    return review;
};

// Parsing date string into german date format

function parseDate(dateString) {
    var date = new Date(dateString);// This creates a Date object with the date value represented by a date string .
    var germanDate = date.getDate() + "." +  (date.getMonth()+1) + "." + date.getFullYear();
    return germanDate;

}
