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
				'<tr><td><a id="popover" rel="popover" title="'+ data[i].tname +'" data-content="Manager: '+ data[i].manager +'<br>Phone #: '+ data[i].phone +'<br>Sponsor: '+ data[i].sponsor +'<br>Zip: '+ data[i].zip +'">'+ data[i].tname +'</td><td>'+ data[i].wins +'</td><td>'+ data[i].losses +'</td><td>'+ percent(+data[i].wins, +data[i].losses) +'</td><td><a class="btn btn-mini btn-danger erase" type="button" onclick="deleteTeam(\''+ data[i].id +'\')">Delete</a></td></tr>'
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
		schedule=sched4;
	}
	else if(leagueArray.length===5 || leagueArray.length===6){
		schedule=sched6;
	}
	else if(leagueArray.length===7 || leagueArray.length===8){
		schedule=sched8;
	};
	
	schedTableSet();
	console.log(schedule);
	console.log(leagueArray[0].tname);
};


function schedTableSet(){
	for(var i=0 ; i<schedule.length; i++){
		$('#schedTable').append('<thead> \
          <tr> \
            <th>Week '+ (+i + 1) +'</th> \
            <th>Scores</th> \
          </tr> \
        </thead>');
		for(var j=0 ; j<schedule[i].length; j++){
			$('#schedTable').append('<tbody><tr> \
          <td>'+ leagueArray[schedule[i][j][0] - 1].tname +' vs '+ leagueArray[schedule[i][j][1] - 1].tname +'</td> \
          <td><a class="btn update" href="#myModal'+ j +'" role="button" id="updateScore" class="btn btn-primary btn-mini" data-toggle="modal">Update Score</a></td> \
        </tr></tbody>');
			$('body').append('<div id="myModal'+ j +'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> \
                <div class="modal-header"> \
                   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                   <h3 id="myModalLabel">Enter Score</h3> \
               </div> \
		<div class="modal-body"> \
            <div class="control-group"> \
                 <label class="control-label">'+ leagueArray[schedule[i][j][0] - 1].tname +'</label> \
             <div class="controls"> \
                <input type="tel" name="telnumber" id="TelNumber" class="team_inputs"> \
             </div> \
           </div> \
           <div class="control-group"> \
                 <label class="control-label" for="TelNumber">'+ leagueArray[schedule[i][j][1] - 1].tname +'</label> \
             <div class="controls"> \
                <input type="tel" name="telnumber" id="TelNumber" class="team_inputs"> \
             </div> \
           </div> \
      </div> \
			<div class="modal-footer"> \
                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button> \
                <button class="btn btn-primary" aria-hidden="true" data-dismiss="modal" id="SaveChanges">Save Changes</button> \
            </div> \
  </div>');
		};
	};
};

// function byeCheck(){
// 	if (leagueArray.length%2!===0){

// 	}
// };


var leagueArray= [];
var schedule;
function percent(wins, losses){
	((+wins)/((+wins) + (+losses))).toFixed(2)* 100 + "%"
};

//----------------------Schedules------------------------------------
var sched4 = [ 
[ [1, 4], [2, 3] ],
[ [1, 3], [2, 4] ],
[ [1, 2], [3, 4] ]
];

var sched6 = [ 
[ [1, 6], [2, 5], [3, 4] ],
[ [1, 5], [4, 6], [2, 3] ],
[ [1, 4], [3, 5], [2, 6] ],
[ [1, 3], [2, 4], [5, 6] ],
[ [1, 2], [3, 6], [4, 5] ],
];

var sched8 = [
[ [1, 8], [2, 7], [3, 6], [4, 5] ],
[ [1, 7], [6, 8], [2, 5], [3, 4] ],
[ [1, 6], [5, 7], [4, 8], [2, 3] ],
[ [1, 5], [4, 6], [3, 7], [2, 8] ],
[ [1, 4], [3, 5], [2, 6], [7, 8] ],
[ [1, 3], [2, 4], [5, 8], [6, 7] ],
[ [1, 2], [3, 8], [4, 7], [5, 6] ],
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
			schedCheck();
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