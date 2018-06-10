var filterDate = 0;     /* filtering tiles by date */
var filterStatus1 = "open";  /* filtering tiles by open/closed */
var filterStatus2 = "original";  /* filtering tiles by original/added/cancelled */
var filterStatus3 = "hold";  /* filtering tiles by in use/hold/reject */
var filterArea = "packing";     /* filtering tiles by packing/mixing */

/* DECLARING FUNCTIONS */
/* these functions deal with filtering */
/* filter by day */
function filterByDay(z) {
  filterDate = z;
  if (z == -1) {
    $("#yesterday").removeClass("btnDisabled");
    $("#yesterday").addClass("btnEnabled");
    $("#today").addClass("btnDisabled");
    $("#tomorrow").addClass("btnDisabled");
  } else if (z == 0) {
    $("#today").removeClass("btnDisabled");
    $("#today").addClass("btnEnabled");
    $("#yesterday").addClass("btnDisabled");
    $("#tomorrow").addClass("btnDisabled");
  } else if (z == 1) {
    $("#tomorrow").removeClass("btnDisabled");
    $("#tomorrow").addClass("btnEnabled");
    $("#today").addClass("btnDisabled");
    $("#yesterday").addClass("btnDisabled");
  };
}
function filterByStatus1(x) {
  filterStatus1 = x;
  if (x == "open") {
    $("#open").removeClass("btnDisabled");
    $("#open").addClass("btnEnabled");
    $("#all").addClass("btnDisabled");
    $("#closed").addClass("btnDisabled");
  } else if (x == "closed") {
    $("#closed").removeClass("btnDisabled");
    $("#closed").addClass("btnEnabled");
    $("#open").addClass("btnDisabled");
    $("#all").addClass("btnDisabled");
  };
}
function filterByStatus2(y) {
  filterStatus2 = y;
  if (y == "original") {
    $("#original").removeClass("btnDisabled");
    $("#original").addClass("btnEnabled");
    $("#added").addClass("btnDisabled");
    $("#cancelled").addClass("btnDisabled");
  } else if (y == "added") {
    $("#added").removeClass("btnDisabled");
    $("#added").addClass("btnEnabled");
    $("#original").addClass("btnDisabled");
    $("#cancelled").addClass("btnDisabled");
  } else if (y == "cancelled") {
    $("#cancelled").removeClass("btnDisabled");
    $("#cancelled").addClass("btnEnabled");
    $("#original").addClass("btnDisabled");
    $("#added").addClass("btnDisabled");
  };
}
function filterByStatus3(w) {
  filterStatus3 = w;
  if (w == "hold") {
    $("#hold").removeClass("btnDisabled");
    $("#hold").addClass("btnEnabled");
    $("#inuse").addClass("btnDisabled");
    $("#reject").addClass("btnDisabled");
  } else if (w == "use") {
    $("#inuse").removeClass("btnDisabled");
    $("#inuse").addClass("btnEnabled");
    $("#hold").addClass("btnDisabled");
    $("#reject").addClass("btnDisabled");
  } else if (w == "reject") {
    $("#reject").removeClass("btnDisabled");
    $("#reject").addClass("btnEnabled");
    $("#hold").addClass("btnDisabled");
    $("#inuse").addClass("btnDisabled");
  };
}
function filterByArea(u) {
  filterArea = u;
  if (u == "mixing") {
    $("#mixing").removeClass("btnDisabled");
    $("#mixing").addClass("btnEnabled");
    $("#packing").addClass("btnDisabled");
  } else if (u == "packing") {
    $("#packing").removeClass("btnDisabled");
    $("#packing").addClass("btnEnabled");
    $("#mixing").addClass("btnDisabled");
  };
}



/*************/

<!DOCTYPE html>
<html>
<body>

<p id="demo"></p>

<script>


//Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["Javascript", "Gaming", "Foxes"]
    }
];

// Change these values to test your function
var text = lookUpProfile("Akir", "number");
var text2 = contacts.length

document.getElementById("demo").innerHTML = text;
</script>

</body>
</html>
