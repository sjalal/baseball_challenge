//-----------------------get team data from database--------------------------
function getTeams(){
	clearTable();
		$.ajax({
			type: "GET",
			url: "backliftapp/team",
			success: function(data){
			leagueArray= data;
			populateTable(leagueArray);
		},
		});
	};  //end getTeams

//----------------add team data to standings table-------------------------
	function populateTable(data){
		clearTable();
		for(var i=0; i<data.length; i++){
			$('#standings').find('tbody').append(
				'<tr><td><a id="popover" rel="popover" title="'+ data[i].tname +'" data-content="Manager: '+ data[i].manager +'<br>Phone #: '+ data[i].phone +'<br>Sponsor: '+ data[i].sponsor +'<br>Zip: '+ data[i].zip +'">'+ data[i].tname +'</td><td>'+ data[i].wins +'</td><td>'+ data[i].losses +'</td><td>'+ data[i].percent +'%</td><td><a class="btn btn-mini btn-danger erase" type="button" onclick="deleteTeam(\''+ data[i].id +'\')">Delete</a></td></tr>'
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
				losses: 0,
				percent: 0
			},
			success: function(data){
				getTeams();
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

//---------------check even or odd number of teams---------------------
function evenCheck(){
	if(leagueArray.length%2===0){
		schedCheck();
	}
	else{
		byeWeek();
	}
};//end evenCheck

//-------------odd number of teams schedule creation---------------
function byeWeek(){
	if(leagueArray.length===5){
		schedule=sched6;
	}
	else if(leagueArray===7){
		schedule=sched8
	};
	for(var i=0; i<schedule.length; i++){
		$('#schedTable').append('<thead> \
          <tr> \
            <th>Week '+ (+i + 1) +'</th> \
            <th>Scores</th> \
          </tr> \
        </thead>');
        for(var j=0; j<schedule[i].length; j++){
        	if(schedule[i][j][1]===schedule.length+1){
        	$('#schedTable').append('<tbody><tr><td>'+ leagueArray[schedule[i][j][0] - 1].tname +' Bye Week</td></tr></tbody>');
        }
        else{
        	var home=leagueArray[schedule[i][j][0] - 1];
			var away=leagueArray[schedule[i][j][1] - 1];
			$('#schedTable').append('<tbody><tr> \
          <td>'+ home.tname +' vs '+ away.tname +'</td> \
          <td> \
          <form class="form-horizontal" id="scoreForm"> \
           <div class="control-group"> \
                 <label class="control-label">'+ home.tname +'</label> \
             <div class="controls"> \
                <input type="text" name="score" id="'+ leagueArray[schedule[i][j][0] - 1].id +'" data-wins="'+ leagueArray[schedule[i][j][0] - 1].wins +'" data-losses="'+ leagueArray[schedule[i][j][0] - 1].losses +'" class="score_inputsHome"> \
             </div> \
           </div> \
           <div class="control-group"> \
                 <label class="control-label">'+ away.tname +'</label> \
             <div class="controls"> \
                <input type="text" name="score" id="'+ leagueArray[schedule[i][j][1] - 1].id +'" data-wins="'+ leagueArray[schedule[i][j][1] - 1].wins +'" data-losses="'+ leagueArray[schedule[i][j][1] - 1].losses +'" class="score_inputsAway"> \
             </div> \
           </div> \
          </form> \
          <a class="btn" id="scoreSubmit">Submit</a> \
          </td></tr></tbody>');
        };
        	
        };
};
$('#scoreSubmit').click(function(){
				var homeScore=$(this).parents().find('.score_inputsHome').val();
				var awayScore=$(this).parents().find('.score_inputsAway').val();
				var home=$(this).parents().find('.score_inputsHome').attr("id");
				var away=$(this).parents().find('.score_inputsAway').attr("id");
				var homeWins=$(this).parents().find('.score_inputsHome').attr("data-wins");
				var homeLoss=$(this).parents().find('.score_inputsHome').attr("data-losses");
				var awayWins=$(this).parents().find('.score_inputsAway').attr("data-wins");
				var awayLoss=$(this).parents().find('.score_inputsAway').attr("data-losses");
				console.log(home);
		scoreCheck(homeScore, awayScore, home, away, homeWins, homeLoss, awayWins, awayLoss);}
		);
};//end byeWeek

//------------------even number of teams schedule function-----------------
function schedCheck(){

	if(leagueArray.length===4){
		schedule=sched4;
	}
	else if(leagueArray.length===6){
		schedule=sched6;
	}
	else if(leagueArray.length===8){
		schedule=sched8;
	};
	
	schedTableSet();
	console.log(schedule);
	console.log(leagueArray[0].tname);
};//end schedCheck

//---------------Schedule creation function---------------------------
function schedTableSet(){
	for(var i=0 ; i<schedule.length; i++){
		$('#schedTable').append('<thead> \
          <tr> \
            <th>Week '+ (+i + 1) +'</th> \
            <th>Scores</th> \
          </tr> \
        </thead>');
		for(j=0; j<schedule[i].length; j++){
			var home=leagueArray[schedule[i][j][0] - 1];
			var away=leagueArray[schedule[i][j][1] - 1];
			$('#schedTable').append('<tbody><tr> \
          <td>'+ home.tname +' vs '+ away.tname +'</td> \
          <td> \
          <form class="form-horizontal" id="scoreForm"> \
           <div class="control-group"> \
                 <label class="control-label">'+ home.tname +'</label> \
             <div class="controls"> \
                <input type="text" name="score" id="'+ leagueArray[schedule[i][j][0] - 1].id +'" data-wins="'+ leagueArray[schedule[i][j][0] - 1].wins +'" data-losses="'+ leagueArray[schedule[i][j][0] - 1].losses +'" class="score_inputsHome"> \
             </div> \
           </div> \
           <div class="control-group"> \
                 <label class="control-label">'+ away.tname +'</label> \
             <div class="controls"> \
                <input type="text" name="score" id="'+ leagueArray[schedule[i][j][1] - 1].id +'" data-wins="'+ leagueArray[schedule[i][j][1] - 1].wins +'" data-losses="'+ leagueArray[schedule[i][j][1] - 1].losses +'" class="score_inputsAway"> \
             </div> \
           </div> \
          </form> \
          <a class="btn" id="scoreSubmit">Submit</a> \
          </td></tr></tbody>');
			
			};
	};
//------------------on Sunmit button click gathers score values and inserts into scoreCheck function-------------	
	$('#scoreSubmit').click(function(){
				var homeScore=$(this).parents().find('.score_inputsHome').val();
				var awayScore=$(this).parents().find('.score_inputsAway').val();
				var home=$(this).parents().find('.score_inputsHome').attr("id");
				var away=$(this).parents().find('.score_inputsAway').attr("id");
				var homeWins=$(this).parents().find('.score_inputsHome').attr("data-wins");
				var homeLoss=$(this).parents().find('.score_inputsHome').attr("data-losses");
				var awayWins=$(this).parents().find('.score_inputsAway').attr("data-wins");
				var awayLoss=$(this).parents().find('.score_inputsAway').attr("data-losses");
				console.log(home);
		scoreCheck(homeScore, awayScore, home, away, homeWins, homeLoss, awayWins, awayLoss);}
		);
};   //end schedTableSet

//-----------------------function to assign wins and losses by determining higher score value-------------
function scoreCheck(homeScore, awayScore, home, away, homeWins, homeLoss, awayWins, awayLoss){
	if(homeScore > awayScore){
	$.ajax({
		type: "PUT",
		datatype: "json",
		url: "backliftapp/team/"+ home,
		data:{
			wins: +homeWins + 1,
			percent: (+homeWins + 1)/((+homeWins + 1) + (+homeLoss)).toFixed(2)* 100
		}
	});
	$.ajax({
		type: "PUT",
		datatype: "json",
		url: "backliftapp/team/"+ away,
		data:{
			losses: +awayLoss + 1,
			percent: (+awayWins)/((+awayWins) + (+awayLoss + 1)).toFixed(2)* 100
		}
	});
}
	else{
		$.ajax({
		type: "PUT",
		datatype: "json",
		url: "backliftapp/team/"+ home,
		data:{
			losses: +homeLoss + 1,
			percent: (+homeWins)/((+homeWins) + (+homeLoss + 1)).toFixed(2)* 100
		}
	});
		$.ajax({
		type: "PUT",
		datatype: "json",
		url: "backliftapp/team/"+ away,
		data:{
			wins: +awayWins + 1,
			percent: (+awayWins + 1)/((+awayWins + 1) + (+awayLoss)).toFixed(2)* 100
		}
	});
	};
	getTeams();
};

// function byeCheck(){
// 	if (leagueArray.length%2!===0){

// 	}
// };


var leagueArray= [];
var schedule;
var games;

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
	$('#schedTable').popover({
		selector: "#updateScorepop",
		trigger: "click",
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
			$('.erase, #addTeam').attr("disabled", true);
			evenCheck();
		};
	});
	
//----------------Table Sorting function------------------	
	$('#standings').stupidtable();

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
