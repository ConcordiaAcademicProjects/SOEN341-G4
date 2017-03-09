function filter(){
	//----------checkboxes for what information to show
	document.getElementById('commitsPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("commitsChart").style.display="none"
	    }
	    else document.getElementById("commitsChart").style.display="block"
	};

	document.getElementById('issuesPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("issuesChart").style.display="none"
	    }
	    else document.getElementById("issuesChart").style.display="block"
	};

	document.getElementById('commentsPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("commetsChart").style.display="none"
	    }
	    else document.getElementById("commetsChart").style.display="block"
	};

	//----------radio buttons for how to display the information
	document.getElementById('TextData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("commitsCanvas").style.display="none"
	        document.getElementById("issuesCanvas").style.display="none"
	        document.getElementById("commentsCanvas").style.display="none"
	        document.getElementById("commitsTable").style.display="block"
	        document.getElementById("issuesTable").style.display="block"
	        document.getElementById("commentsTable").style.display="block"
	    }
	};

	document.getElementById('GraphicData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("commitsTable").style.display="none"
	        document.getElementById("issuesTable").style.display="none"
	        document.getElementById("commentsTable").style.display="none"
	        document.getElementById("commitsCanvas").style.display="block"
	        document.getElementById("issuesCanvas").style.display="block"
	        document.getElementById("commentsCanvas").style.display="block"
	    }
	};

	document.getElementById('MixedData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("commitsTable").style.display="block"
	        document.getElementById("issuesTable").style.display="block"
	        document.getElementById("commentsTable").style.display="block"
	        document.getElementById("commitsCanvas").style.display="block"
	        document.getElementById("issuesCanvas").style.display="block"
	        document.getElementById("commentsCanvas").style.display="block"
	    }
	};
};

function report(){

	document.getElementById('commitsCanvas').innerHTML += "<canvas id='commitsPerCollaborator' class='visible' width='500px' height='500px'></canvas>"
	document.getElementById('issuesCanvas').innerHTML += "<canvas id='issuesPerCollaborator' class='visible'></canvas>"
	document.getElementById('commentsCanvas').innerHTML += "<canvas id='commentsPerCollaborator' class='visible'></canvas>"

	commitsPerCollaborator(repo.commits, 'doughnut');
	issuesPerCollaborator(repo.issues, 'doughnut');
	commentsPerCollaborator(repo.comments, 'doughnut');

	document.getElementById('doughnutCPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commitsCanvas').style.width="30%"
			commitsPerCollaborator_chart.destroy();
	        commitsPerCollaborator(repo.commits, 'doughnut');
	    }
	};
	document.getElementById('pieCPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commitsCanvas').style.width="30%"
			commitsPerCollaborator_chart.destroy();
	        commitsPerCollaborator(repo.commits, 'pie');
	    }
	};
	document.getElementById('barCPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commitsCanvas').style.width="60%"
			commitsPerCollaborator_chart.destroy();
	        commitsPerCollaborator(repo.commits, 'bar');
	    }
	};
	document.getElementById('lineCPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commitsCanvas').style.width="70%"
			commitsPerCollaborator_chart.destroy();
	        commitsPerCollaborator(repo.commits, 'line');
	    }
	};

	document.getElementById('doughnutIPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('issuesCanvas').style.width="30%"
	    	issuesPerCollaborator_chart.destroy();
	        issuesPerCollaborator(repo.issues, 'doughnut');
	    }
	};
	document.getElementById('pieIPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('issuesCanvas').style.width="30%"
	    	issuesPerCollaborator_chart.destroy();
	        issuesPerCollaborator(repo.issues,'pie');
	    }
	};
	document.getElementById('barIPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('issuesCanvas').style.width="60%"
	        issuesPerCollaborator_chart.destroy();
	        issuesPerCollaborator(repo.issues,'bar');
	    }
	};
	document.getElementById('lineIPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('issuesCanvas').style.width="70%"
	        issuesPerCollaborator_chart.destroy();
	        issuesPerCollaborator(repo.issues,'line');
	    }
	};

	document.getElementById('doughnutCoPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commentsCanvas').style.width="30%"
	    	commentsPerCollaborator_chart.destroy();
	        commentsPerCollaborator(repo.comments, 'doughnut');
	    }
	};
	document.getElementById('pieCoPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commentsCanvas').style.width="30%"
	    	commentsPerCollaborator_chart.destroy();
	        commentsPerCollaborator(repo.comments, 'pie');
	    }
	};
	document.getElementById('barCoPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commentsCanvas').style.width="60%"
	    	commentsPerCollaborator_chart.destroy();
	        commentsPerCollaborator(repo.comments, 'bar');
	    }
	};
	document.getElementById('lineCoPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commentsCanvas').style.width="70%"
	    	commentsPerCollaborator_chart.destroy();
	        commentsPerCollaborator(repo.comments, 'line');
	    }
	};
};

function tables(commitsPerCollaborator, commentsPerCollaborator, issuesPerCollaborator){
	commitsPerCollaborator.then(function(commitsPerCollaborator){
		var commits = 0;
		for (var key in commitsPerCollaborator){
			commits += commitsPerCollaborator[key]
		}

		var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of commits</th><th class='th_s'>Percentage</th></tr>"
		for (var key in commitsPerCollaborator) {
			table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+commitsPerCollaborator[key]+"</td><td class='td_s'>"+Math.round(commitsPerCollaborator[key]*100/commits)+"%</td></tr>"
		}
		table+="</table>"
		document.getElementById('commitsTable').innerHTML += table;
	});
	
	issuesPerCollaborator.then(function(issuesPerCollaborator){
		var issues = 0;
		for (var key in issuesPerCollaborator){
			issues += issuesPerCollaborator[key]
		}
		var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of issues</th><th class='th_s'>Percentage</th></tr>"
		for (var key in issuesPerCollaborator) {
			table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+issuesPerCollaborator[key]+"</td><td class='td_s'>"+Math.round(issuesPerCollaborator[key]*100/issues)+"%</td></tr>"
		}
		table+="</table>"
		document.getElementById('issuesTable').innerHTML += table;
	});

	commentsPerCollaborator.then(function(commentsPerCollaborator){
		var comments = 0;
		for (var key in commentsPerCollaborator){
			comments += commentsPerCollaborator[key]
		}
		var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of comments</th><th class='th_s'>Percentage</th></tr>"
		for (var key in commentsPerCollaborator) {
			table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+commentsPerCollaborator[key]+"</td><td class='td_s'>"+Math.round(commentsPerCollaborator[key]*100/comments)+"%</td></tr>"
		}
		table+="</table>"
		document.getElementById('commentsTable').innerHTML += table;
	});
};

	
function commitsPerCollaborator(commitsPerCollaborator, chartType){
	var ctx_commitsPerCollaborator = document.getElementById('commitsPerCollaborator').getContext("2d");
	commitsPerCollaborator.then(function(commitsPerCollaborator){
		//Data and options for commits per collaborator
		var commitsPerCollaborator_data = commitsPerCollaboratorTransformation(commitsPerCollaborator);
		var commitsPerCollaborator_options = {}
		//commits per collaborators
		commitsPerCollaborator_chart = new Chart(ctx_commitsPerCollaborator, {
	        type: chartType,
	        data: commitsPerCollaborator_data,
	        options: commitsPerCollaborator_options
	    });
	});
};

function issuesPerCollaborator(issuesPerCollaborator, chartType){
	var ctx_issuesPerCollaborator = document.getElementById('issuesPerCollaborator').getContext("2d");
	issuesPerCollaborator.then(function(issuesPerCollaborator){
		//Data and options for issues per collaborator
		var issuesPerCollaborator_data = issuesPerCollaboratorTransformation(issuesPerCollaborator);	
		var issuesPerCollaborators_options = {}

		issuesPerCollaborator_chart = new Chart(ctx_issuesPerCollaborator, {
	        type: chartType,
	        data: issuesPerCollaborator_data,
	        options: issuesPerCollaborators_options
	    });
	});
};

function commentsPerCollaborator(commentsPerCollaborator, chartType){
	var ctx_commentsPerCollaborator = document.getElementById('commentsPerCollaborator').getContext("2d");
	commentsPerCollaborator.then(function(commentsPerCollaborator){
		//Data and options for comments per collaborator
		var commentsPerCollaborator_data = commentsPerCollaboratorTransformation(commentsPerCollaborator);	
		var commentsPerCollaborators_options = {}

		commentsPerCollaborator_chart = new Chart(ctx_commentsPerCollaborator, {
	        type: chartType,
	        data: commentsPerCollaborator_data,
	        options: commentsPerCollaborators_options
	    });
	});
};

function commitsPerCollaboratorTransformation (commitsPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
	for (var key in commitsPerCollaborator_data) {
		labels[keyNum]=key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in commitsPerCollaborator_data) {
		data[keyNum]=commitsPerCollaborator_data[key]
		keyNum++
	}

	commitsPerCollaborator_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commitsPerCollaborator_data;
};

function commentsPerCollaboratorTransformation (commentsPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
	for (var key in commentsPerCollaborator_data) {
		labels[keyNum]=key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in commentsPerCollaborator_data) {
		data[keyNum]=commentsPerCollaborator_data[key]
		keyNum++
	}

	commentsPerCollaborator_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commentsPerCollaborator_data;

};

function issuesPerCollaboratorTransformation (issuesPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
	for (var key in issuesPerCollaborator_data) {
		labels[keyNum]=key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in issuesPerCollaborator_data) {
		data[keyNum]=issuesPerCollaborator_data[key]
		keyNum++
	}

	issuesPerCollaborator_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return issuesPerCollaborator_data;

};

filter();
tables(repo.commits, repo.comments, repo.issues);
var commitsPerCollaborator_chart;
var issuesPerCollaborator_chart;
var commentsPerCollaborator_chart;
report();





// Additional functions
// Chart js plugon for changing background color in charts. 
Chart.pluginService.register({
    beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;
            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }
});