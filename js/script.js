//-----------------------get team data from database--------------------------
function getTeams(){
	clearTable();
		$.ajax({
			type: "GET",
			url: "backliftapp/team",
			success: function(data){
			leagueArray= data;
			populateTable(leagueArray);
			console.log(leagueArray);
		},
		});
	};  //end getTeams

//----------------add team data to standings table-------------------------
	function populateTable(data){
		for(var i=0; i<data.length; i++){
			$('#standings').find('tbody').append(
				'<tr><td><a id="popover" rel="popover" title="'+ data[i].tname +'" data-content="Manager: '+ data[i].manager +'<br>Phone #: '+ data[i].phone +'<br>Sponsor: '+ data[i].sponsor +'<br>Zip: '+ data[i].zip +'">'+ data[i].tname +'</td><td>'+ data[i].wins +'</td><td>'+ data[i].losses +'</td><td>'+ percent(data[i].wins, data[i].losses) +'</td><td><a class="btn btn-mini btn-danger erase" type="button" onclick="deleteTeam(\''+ data[i].id +'\')">Delete</a></td></tr>'
				);
		}
	}; //end populateTable

//----------------post team data to database function-------------------------
	function addTeams(){
		$.ajax({
			type: "POST",
			url: "backliftapp/team",
			data: {
				tname: $('#TeamName').val(),
				manager: $('#ManagerName').val(),
				phone: $('#TelNumber').val(),
				sponsor: $('#Sponsor').val(),
				zip: $('#Zip').val(),
				wins: 0,
				losses: 0
			},
			success: function(data){
				console.log(data);
				location.reload();
			}
		})
	};  //end addTeams

//----------------clear application function-----------------
function clearForm(){
	$('.team_inputs').each(function(){
		$(this).val("");
	});
};  //end clearForm

//--------------clear table function--------------------------
function clearTable(){
	$('#standings tbody').html("");
};   //end slearTable

//---------------Delete Button function------------------------
function deleteTeam(id){
	var admit= confirm("Are you sure you want to delete this team?");
	if(admit===true){
		$.ajax({
			url: "backliftapp/team/" + id,
			type: "DELETE",
			datatype: "json",
			success: function(){
				location.reload();
			}
			});
		};
	};   // end deleteTeam


function schedCheck(){
	if(leagueArray.length===4){

	}
};


// function byeCheck(){
// 	if (leagueArray.length%2!===0){

// 	}
// }


// function table4(){
// 	$('body').append('<div class="row-fluid box">
//    <h3>Schedule</h3>
//     <br>
//   <div class="row-fluid box">
//     <div class="span6 offset3">
//       <table class="table table-bordered">
//         <caption>Week 1</caption>
//         <thead>
//           <tr>
//             <th>Games</th>
//             <th>Scores</th>
//           </tr> 
//         </thead>
//         <tr>
//           <td>'+ leagueArray[0].tname +' vs '+ leagueArray[3].tname +'</td>
//           <td><a class="btn update" >Update results</a></td>
//         </tr>
//          <tr>
//           <td>Team2 vs Team 3</td>
//           <td><a class="btn update" >Update results</a></td>
//         </tr>
//       </table>
//     </div>
//   </div>
//   <div class="row-fluid box">
//     <div class="span6 offset3">
//       <table class="table table-bordered">
//         <caption>Week 2</caption>
//         <thead>
//           <tr>
//             <th>Games</th>
//             <th>Scores</th>
//           </tr> 
//         </thead>
//         <tr>
//           <td>Team1 vs Team 3</td>
//           <td><a class="btn update" >Update results</a></td>
//         </tr>
//          <tr>
//           <td>Team2 vs Team 4</td>
//           <td><a class="btn update" >Update results</a></td>
//         </tr>
//       </table>
//     </div>
//   </div>
//   <div class="row-fluid box">
//     <div class="span6 offset3">
//       <table class="table table-bordered">
//         <caption>Week 3</caption>
//         <thead>
//           <tr>
//             <th>Games</th>
//             <th>Scores</th>
//           </tr> 
//         </thead>
//         <tr>
//           <td>Team1 vs Team 2</td>
//           <td><a class="btn update" >Update results</a></td>
//         </tr>
//          <tr>
//           <td>Team3 vs Team 4</td>
//           <td><a class="btn update" >Update results</a></td>
//         </tr>
//       </table>
//     </div>
//     </div> 
//     </div>')
// }

var leagueArray= [];
var percent= function(wins, losses){
	((+wins)/((+wins) + (+losses))).toFixed(2)* 100 + "%"
};
var sched4 = [ 
[ [leagueArray[0], leagueArray[3]], [leagueArray[1], leagueArray[2]] ],
[ [leagueArray[0], leagueArray[2]], [leagueArray[1], leagueArray[3]] ],    //4 teams schedule
[ [leagueArray[0], leagueArray[1]], [leagueArray[2], leagueArray[3]] ]
];

var sched6 = [ 
[ [leagueArray[0], leagueArray[5]], [leagueArray[1], leagueArray[4]], [leagueArray[2], leagueArray[3]] ],
[ [leagueArray[0], leagueArray[4]], [leagueArray[3], leagueArray[5]], [leagueArray[1], leagueArray[2]] ],
[ [leagueArray[0], leagueArray[3]], [leagueArray[2], leagueArray[4]], [leagueArray[1], leagueArray[5]] ],  //5-6 teams schedule
[ [leagueArray[0], leagueArray[2]], [leagueArray[1], leagueArray[3]], [leagueArray[4], leagueArray[5]] ],
[ [leagueArray[0], leagueArray[1]], [leagueArray[2], leagueArray[5]], [leagueArray[3], leagueArray[4]] ],
];

var sched8 = [
[ [leagueArray[0], leagueArray[7]], [leagueArray[1], leagueArray[6]], [leagueArray[2], leagueArray[5]], [leagueArray[3], leagueArray[4]] ],
[ [leagueArray[0], leagueArray[6]], [leagueArray[5], leagueArray[7]], [leagueArray[1], leagueArray[4]], [leagueArray[2], leagueArray[3]] ],
[ [leagueArray[0], leagueArray[5]], [leagueArray[4], leagueArray[6]], [leagueArray[3], leagueArray[7]], [leagueArray[1], leagueArray[2]] ],
[ [leagueArray[0], leagueArray[4]], [leagueArray[3], leagueArray[5]], [leagueArray[2], leagueArray[6]], [leagueArray[1], leagueArray[7]] ],  //7-8 teams schedule
[ [leagueArray[0], leagueArray[3]], [leagueArray[2], leagueArray[4]], [leagueArray[1], leagueArray[5]], [leagueArray[6], leagueArray[7]] ],
[ [leagueArray[0], leagueArray[2]], [leagueArray[1], leagueArray[3]], [leagueArray[4], leagueArray[7]], [leagueArray[5], leagueArray[6]] ],
[ [leagueArray[0], leagueArray[1]], [leagueArray[2], leagueArray[7]], [leagueArray[3], leagueArray[6]], [leagueArray[4], leagueArray[5]] ],
];


$(document).ready(function(){
	getTeams();
//--------------popover function and options----------------
	$('#standings').popover({
		selector: "#popover",
		trigger: "hover",
    	html: true
	});
//-------------check to see if league has reached team limit-----------------------
	$('#addTeam').click(function(){
		if($('#standings tbody tr').length ===8){
			alert("League is now full. Please come back next year.");
			return false;
		};
	});
//---------------application submit function--------------------------
	$('#SaveChanges').click(function(){
		addTeams();
		getTeams();
		clearForm();
	});
	$('#StartSeason').click(function(){
		var start= confirm("Warning! Once season has started you cannot add teams or edit teams. Do you want to start the season?");
		if (start===true){
			$('.erase, #addTeam').attr("disabled", "disabled");
			// schedCheck();
		};
	});

});  //end ready



//********pseudo code************
// 1= team 1 etc
// for (var i; i<leaguearray.length i++){
// 	if (leaguearray[i].id===)
// }
// function table4(){
// 	3 week schedule
// 	2 games a week
// 	3 tables 2 rows a piece
// 	week 1= 1 vs 4 & 2 vs 3
// 	week 2= 1 vs 3 & 2 vs 4
// 	week 3= 1 vs 2 & 3 vs 4
// }
// "<td>"+ leaguearray[0].tname +" vs. "+ leaguearray[3].tname +"</td>"