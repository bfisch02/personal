doneClicked=false;
midInvent=false;
$(document).ready(function(){
	$("#yesButton").click(function(){
  		$(this).hide();
   		start();
    	})
    });	

function start()
{
	IPADDRESS="";
	presentStory=false;
	$("#NAO").hide();
   	$('#scrollBox').css('visibility','visible');
   	$('#timelineLabel').css('visibility','visible');
   	$('#bottom').css('visibility', 'visible');
   	$('#corner').css('visibility', 'visible');
   	$('#bottomScreen').css('visibility', 'visible');
   	$("#standing").css('visibility','visible');
   	$("#sitting").css('visibility','hidden');
   	$("#finish").css('visibility','visible');
   	$("#finish2").css('visibility','visible');
   	$("#title").css('visibility','visible');
   	$("#ipadd").css('visibility','visible');
   	$("#finish2").hide();
   	$("#xButton").css('visibility','visible');
   	$("#xButton").hide();
   	$("#xButton2").css('visibility','visible');
   	$("#xButton2").hide();
	numCanvases=0;
	currCanvas = 0;
	img = new Image();
    img.src = 'NAOcanvas7.jpg';
    actions = new Array;
    actions2 = new Array;
    text = new Array;
    durations = new Array;
    standing = new Array;
    helper = new Array;
    standing[0] = true;
    helper[0]=false;
    $("#nextButton").click(function(){doneClick();});
    $("#finish").click(function(){
    	if (confirm("Are you sure the story is over?")) {
    		i=0;
    		firstTime = true;
    		if (document.getElementById("address").value != "")
				IPADDRESS=document.getElementById("address").value;
			if (IPADDRESS=="")
				alert("Enter IP Address! (Bottom Left)");
			else {
				presentStory = true;
    			sendInfo();
    		}
    	}
    });
	inventCanvas();
}

function inventCanvas()
{
	numCanvases+=1;
	if(numCanvases!=1) {
		currCanvas +=1;
		if ((standing[currCanvas-1] && actions[currCanvas-1]!="Sit Down") || actions[currCanvas-1]=="Stand Up")
			standing[currCanvas]=true;
		else
			standing[currCanvas]=false;
		
		if (standing[currCanvas]) {
   			standingOptions();
   		}
   		else {
   			sittingOptions();
   		}
	}
	helper[currCanvas] = false;
	$("#canvasAction2").css('visibility', 'hidden');
	$("#nextButton").show();
	$('body').append('<canvas id="myCanvas' + (numCanvases-1) + '" class="canvasClass" height="450" width="780"></canvas>')
	$(document.getElementById("myCanvas"+(numCanvases-1))).css({height:"450px",marginLeft:"+=205px"});
	canvas = document.getElementById("myCanvas" + (numCanvases-1));
	if (canvas.getContext) {
  		ctx = canvas.getContext('2d');
		ctx.save();
		initializeCanvas();
	}
 	if (numCanvases!=0 && numCanvases != (currCanvas+1)) {
 		$(document.getElementById("myCanvas"+(numCanvases-1))).hide();
 		$(document.getElementById("myCanvas"+(currCanvas))).show();
		inventMidCanvas();
	}
}

function inventMidCanvas()
{		
	for (i=numCanvases;i>currCanvas;i--) {
		actions[i] = actions[i-1];
		actions2[i] = actions2[i-1];
		text[i]= text[i-1];
		standing[i] = standing[i-1];
		if (actions2[i]!="")
			$("#timelinetext"+i).html(
				actions2[i]+'</br> Say: "'+text[i]+'"</p>');
		else 
			$("#timelinetext"+i).html(
				actions[i]+'</br> Say: "'+text[i]+'"</p>');
		$("#timeline"+(currCanvas)).css('border','5px red inset');
	}
	actions[currCanvas] = "No Action";
	text[currCanvas] = "";
	durations[currCanvas] = "";
	$("#timelinetext"+currCanvas).html("");
	$("#timeline"+currCanvas).hide();
	$("#timeline"+currCanvas).slideDown(200);
}

function initializeCanvas()
{
	ctx.drawImage(img, 0, 0);
    $("#nextButton").css('visibility', 'visible');
    $("#canvasAction").css('visibility', 'visible');
    $("#canvasText").css('visibility', 'visible');
    ctx.fillStyle="rgb(0, 210, 240)";
    if (numCanvases < 10) {
   		ctx.font = "bold 100px arial";
   		ctx.fillText(numCanvases, 4, 90);
   	}
    else if (numCanvases < 100) {
   		ctx.font = "bold 70px arial";
   		ctx.fillText(numCanvases, 3, 70);
   	}
   	else {
   		ctx.font = "bold 50px arial";
   		ctx.fillText(numCanvases, 3, 55);
   	}
   	getInfo();
   	addTimelineElement();
}

function addTimelineElement()
{
   	$("#scrollBox").append('<div id="timeline'+(numCanvases-1)+'" name = '+(numCanvases-1)+' class="timelineElement"><p id="timelineElementName"><strong>Part '+numCanvases+'</strong><p><div id="timelinetext'+(numCanvases-1)+'"></div></div>');
   	$("#timeline"+currCanvas).hide();
	$("#timeline"+currCanvas).slideDown(200);
   	if (numCanvases==(currCanvas+1))
   		$("#timeline"+(numCanvases-1)).css('border','5px inset rgb(255, 0, 0)');
   	else
   		$("#timeline"+(numCanvases-1)).css('border','5px outset');
   	$("#timeline"+(numCanvases-1)).mouseover(function(){
   		if ($(this).css('border')!='5px inset rgb(255, 0, 0)')
   			$(this).css('border','5px inset');
   		else {
   			$("#xButton").show();
   			$("#xButton").css("top",(20+(currCanvas*140))+"px");
   			$("#xButton").mouseover(function(){
   				deleting=true;
   				$("#xButton2").show();
   				$("#xButton2").css("top",(17+(currCanvas*140))+"px");
   				$("#xButton2").click(function(){
   					deleteCanvas();
   					deleting=false;
   					$(this).hide();
   				});
   				$("#xButton2").mouseout(function(){
   					$("#xButton2").hide();
   				});
   			});
   		}
   	});
   	$("#timeline"+(numCanvases-1)).mouseout(function(){
   		if ($(this).css('border')!='5px inset rgb(255, 0, 0)')
   			$(this).css('border','5px #e2e2e2 outset');
   		else
   			$("#xButton").hide();
   	});
   	$("#timeline"+(numCanvases-1)).click(function(){
   		$("#timeline"+(currCanvas)).css('border','5px #e2e2e2 outset');
   		$(this).css('border','5px red inset');
   		if (!this.id[9]) {
   			thisCanvas=this.id[8];
   		}
   		else {
   			if (!this.id[10])
   				thisCanvas=(this.id[8]+this.id[9]);
   			else
   				thisCanvas=(this.id[8]+this.id[9]+this.id[10]);
   		}
   		if (currCanvas!=thisCanvas)
   			editCanvas();
   	});

}

function standingOptions()
{
	if (document.getElementById("stand")){
		$("#select option[id='stand']").remove();
		$("#select option[id='lie']").remove();
		$("#select option[id='stand']").remove();
		$("#select").append('<option class="sitorstand" id="sit" value="Sit Down">Sit Down</option>');
		$("#sitting").css('visibility','hidden');
   		$("#standing").css('visibility','visible');
	}
}

function sittingOptions()
{
	if (document.getElementById("sit")){
		$("#select option[id='sit']").remove();
		$("#select option[id='walkF']").remove();
		$("#select option[id='walkB']").remove();
		$("#select").append('<option class="sitorstand" id="stand" value = "Stand Up">Stand Up</option>');
		$("#sitting").css('visibility','visible');
   		$("#standing").css('visibility','hidden');
   		
	}
}

function editCanvas()
{
	if(!text[currCanvas] || text[currCanvas] == "") {
		getInfo();
	}
	$(document.getElementById("myCanvas"+currCanvas)).hide();
	currCanvas = parseInt(thisCanvas);
	if (standing[currCanvas]) {
		$("#sitting").css('visibility','hidden');
		$("#standing").css('visibility','visible');
		standingOptions();
	}
   	else {
   		$("#sitting").css('visibility','visible');
   		$("#standing").css('visibility','hidden');
   		sittingOptions();
   	}
	$(document.getElementById("myCanvas"+currCanvas)).show();
	document.getElementById("textarea").value = text[currCanvas];
	document.getElementById("select").value = actions[currCanvas];
	actionHelper();
	document.getElementById("select2").value = actions2[currCanvas];
	if (true)
		$(document.getElementById("duration")).css('visibility','hidden');
}

function deleteCanvas()
{
	if (deleting) {
		if (numCanvases==1)
			alert("You can't delete the only part to the story!");
		else if (actions[currCanvas] == "Sit Down" && currCanvas!=numCanvases-1)
			alert("You can't delete this part, since I am sitting in part " + (currCanvas+2)+".");
		else if (actions[currCanvas] == "Stand Up" && currCanvas!=numCanvases-1)
			alert("You can't delete this part, since I am standing in part " + (currCanvas+2)+".");
		else {
			if (currCanvas==numCanvases-1) 
				deleteLastCanvas();
			else {
				numCanvases--;
				for (i=currCanvas;i<numCanvases;i++) {
					actions[i] = actions[i+1];
					actions2[i] = actions2[i+1];
					text[i]= text[i+1];
					standing[i] = standing[i+1];
					if (document.getElementById("duration"))
						durations[i] = durations[i+1];
					if (actions2[i]!="")
						$("#timelinetext"+i).html(
							actions2[i]+'</br> Say: "'+text[i]+'"</p>');
					else
						$("#timelinetext"+i).html(
							actions[i]+'</br> Say: "'+text[i]+'"</p>');
					$("#timeline"+(currCanvas)).css('border','5px red inset');
				}
				document.getElementById("textarea").value = text[currCanvas];
				document.getElementById("select").value = actions[currCanvas];
				actions[numCanvases] = "No Action";
				actions2[numCanvases] = "";
				text[numCanvases] = "";
				if ((standing[numCanvases-1] && actions[numCanvases-1]!="Sit Down") || actions[numCanvases-1]=="Stand Up")
					standing[numCanvases]=true;
				else
					standing[numCanvases]=false;
				$("#timeline"+numCanvases).remove();
				$("#myCanvas"+numCanvases).remove();
				actionHelper();
			}	
		}
		deleting=false;
	}
}

function deleteLastCanvas()
{
	numCanvases--;
	currCanvas-=1;
	$("#timeline"+(currCanvas)).css('border','5px red inset');
	actions[numCanvases] = "No Action";
	actions2[numCanvases] = "";
	text[numCanvases] = "";
	$("#timeline"+numCanvases).remove();
	$("#myCanvas"+numCanvases).remove();
	$("#myCanvas"+currCanvas).show();
	if (standing[currCanvas])
		standingOptions();
	else
		sittingOptions();
	document.getElementById("select").value = actions[currCanvas];
	document.getElementById("textarea").value = text[currCanvas];
	actionHelper();
	if (actions2[currCanvas]!="") {
		document.getElementById("select2").value = actions2[currCanvas];
	}
}

function doneClick()
{
	doneClicked = true;
	if ((document.getElementById("select").value != "No Action")||(document.getElementById("textarea").value != "")||midInvent){
		$("#nextButton").hide();
		$("#timeline"+currCanvas).css('border','5px #e2e2e2 outset');
		getInfo();
		document.getElementById("noAction").selected = true;
		document.getElementById("textarea").value = "";
		$(document.getElementById("duration")).css('visibility','hidden');
    	if (currCanvas ==0) {
			$(document.getElementById("myCanvas"+currCanvas)).slideUp();
			img = new Image();
    		img.src = 'NAOcanvas2.jpg';
    	}
		else
			$(document.getElementById("myCanvas"+currCanvas)).slideUp();
   		inventCanvas();
   	}
   	doneClicked=false;
   	
}

function getInfo()
{
	if (!doneClicked) {
		text[currCanvas]= document.getElementById("textarea").value;
		actions[currCanvas] = document.getElementById("select").value;
		if (helper[currCanvas]) {
			actions2[currCanvas] = document.getElementById("select2").value;
			$("#timelinetext"+currCanvas).html(
			actions2[currCanvas]+'</br> Say: "'+text[currCanvas]+'"</p>');
		}
		else {
			actions2[currCanvas] = "";
			$("#timelinetext"+currCanvas).html(
			actions[currCanvas]+'</br> Say: "'+text[currCanvas]+'"</p>');
		}
	}
}

function addSelect()
{
	if (document.getElementById("select").value == "Sit Down" || (document.getElementById("select").value != "Stand Up" && !document.getElementById("sit"))) {
		if (currCanvas!=numCanvases-1 && standing[currCanvas+1]) {
			if (confirm('I am standing up in Part ' + (currCanvas+2) + '. If you press "Continue", I will add a new part to the story so that I can stand up.')) {
				actionHelper();
				getInfo();
				fixError();
			}
			else {
				document.getElementById("select").value = actions[currCanvas];
			}
		}
		else {
			actionHelper();
			getInfo();
		}
   	}
   	else if (document.getElementById("select").value == "Stand Up" || (document.getElementById("select").value != "Sit Down" && !document.getElementById("stand"))) {
		if (currCanvas!=numCanvases-1 && !standing[currCanvas+1]) {
			if (confirm('I am sitting down in Part ' + (currCanvas+2) + '. If you press "Continue", I will add a new part to the story so that I can sit down.')) {
				actionHelper();
				getInfo();
				fixError();
			}
			else
				document.getElementById("select").value = actions[currCanvas];
		}
		else {
			actionHelper();
			getInfo();
		}
	}
	else {
		actionHelper();
		getInfo();
	}
}

function actionHelper()
{
	var currAction = document.getElementById("select").value;
	if (currAction == "Walk" || currAction == "Turn" || currAction == "Move Arms" || currAction == "Turn Head" || currAction == "Gesture") {
		helper[currCanvas]=true;
		$("#canvasAction2").css('visibility', 'visible');
		if (currAction == "Walk") {
			walkingOptions();
		}
		else if (currAction == "Turn")
			turningOptions();
		else if (currAction == "Move Arms")
			armOptions();
		else if (currAction == "Turn Head")
			headOptions();
		else if (currAction == "Gesture")
			gestureOptions();
	}
	else {
		helper[currCanvas]=false;
		actions2[currCanvas] = "";
		$("#canvasAction2").css('visibility', 'hidden');
	}
}

function walkingOptions()
{
	$("#canvasAction2").css('left', '816px');
	$("#select2").empty();
	$("#select2").append('<option class = "walk" id="walkF" value = "Walk Forward">Walk Forward</option>');
	$("#select2").append('<option class = "walk" id="walkB" value = "Walk Backward">Walk Backward</option>');
	$("#select2").append('<option class = "walk" id="walkFL" value = "Walk and Turn Left">Walk and Turn Left</option>');
	$("#select2").append('<option class = "walk" id="walkFR" value = "Walk and Turn Right">Walk and Turn Right</option>');
}

function turningOptions()
{
	$("#canvasAction2").css('left', '836px');
	$("#select2").empty();
    $("#select2").append('<option class = "turn" id="turnA" value = "Turn Around">Turn Around</option>');
	$("#select2").append('<option class = "turn" id="turnL" value = "Turn Left">Turn Left</option>');
	$("#select2").append('<option class = "turn" id="turnR" value = "Turn Right">Turn Right</option>');
}

function armOptions()
{
	$("#canvasAction2").css('left', '816px');
	$("#select2").empty();
	$("#select2").append('<option class = "arm" id="raiseBoth" value = "Raise Both Hands">Raise Both Hands</option>');
	$("#select2").append('<option class = "arm" id="raiseOne" value = "Raise One Hand">Raise One Hand</option>');
	$("#select2").append('<option class = "arm" id="reachBoth" value = "Reach Out Both Arms">Reach Out Both Arms</option>');
	$("#select2").append('<option class = "arm" id="raiseOne" value = "Reach Out One Arm">Reach Out One Arm</option>');
	$("#select2").append('<option class = "arm" id="reachSideBoth" value = "Reach Side Both Arms">Reach Side Both Arms</option>');
	$("#select2").append('<option class = "arm" id="reachSideOne" value = "Reach Side One Arm">Reach Side One Arm</option>');
	$("#select2").append('<option class = "arm" id="LowerArms" value = "Lower Arms">Lower Arms</option>');
}

function headOptions()
{
	$("#canvasAction2").css('left', '838px');
	$("#select2").empty();
	$("#select2").append('<option class = "head" id="headL" value = "Look Left">Look Left</option>');
	$("#select2").append('<option class = "head" id="lookR" value = "Look Right">Look Right</option>');
	$("#select2").append('<option class = "head" id="lookU" value = "Look Up">Look Up</option>');
	$("#select2").append('<option class = "head" id="lookD" value = "Look Down">Look Down</option>');
	$("#select2").append('<option class = "head" id="centerHead" value = "Center Head">Center Head</option>');
}

function gestureOptions()
{
	$("#canvasAction2").css('left', '800px');
	$("#select2").empty();
	$("#select2").append('<option class = "head" id="gestureA" value = "Gesture Toward Audience">Gesture Toward Audience</option>');
	$("#select2").append('<option class = "head" id="gestureS" value = "Gesture Toward Self">Gesture Toward Self</option>');
	$("#select2").append('<option class = "head" id="gestureL" value = "Gesture Toward Left">Gesture Toward Left</option>');
	$("#select2").append('<option class = "head" id="gestureR" value = "Gesture Toward Right">Gesture Toward Right</option>');
	$("#select2").append('<option class = "head" id="gestureF" value = "Gesture Toward Sky">Gesture Toward Sky</option>');
	$("#select2").append('<option class = "head" id="gestureF" value = "Gesture Toward Ground">Gesture Toward Ground</option>');
}

function fixError()
{
	midInvent=true;
	doneClick();
	if (standing[currCanvas+1]) {
		document.getElementById("sit").selected = true;
		getInfo();
		standing[currCanvas+1]=false;
	}
	else {
		document.getElementById("stand").selected = true;
		getInfo();
		standing[currCanvas+1]=true;
	}	
	midInvent=false;
}

function sendInfo() //i=0 first time
{

	if (i<numCanvases && presentStory) {
		if (actions[i] == "Taichi")
			actions[i] = "taichi";
		j=0;
		request1 = new XMLHttpRequest();
		request2 = new XMLHttpRequest();
		request3 = new XMLHttpRequest();
		request4 = new XMLHttpRequest();
		request5 = new XMLHttpRequest();
		request6 = new XMLHttpRequest();
		request7 = new XMLHttpRequest();
		request8 = new XMLHttpRequest();
		request9 = new XMLHttpRequest();
		request10 = new XMLHttpRequest();
		request11 = new XMLHttpRequest();
		request12 = new XMLHttpRequest();
		request13 = new XMLHttpRequest();
		request14 = new XMLHttpRequest();
		request15 = new XMLHttpRequest();
		request16 = new XMLHttpRequest();
		request17 = new XMLHttpRequest();
		
		if (actions2[i]!="") {
			str1 = encodeURI(actions2[i]);
		}
		else
			str1 = encodeURI(actions[i]);
		if (!actions[i])
			actions[i] = "No Action";
		if (!text[i])
			text[i] = "";
		str2 = encodeURI(text[i]);
		str2 = str2.replace(',','%3B');
		if (firstTime) {
			
			request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALBehaviorManager.runBehavior("Stand Up")', true);
			request1.send(null);
			request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",0,1,1)', true);
			request2.send(null);
			request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",0,1,1)', true);
			request3.send(null);
			request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",1.5,1.5,1)', true);
			request4.send(null);
			request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1.5, 1.5,1)', true);
			request5.send(null);
			request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,.5,1)', true);
			request6.send(null);
			request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,.5,1)', true);
			request7.send(null);
		}
		else
		{
			request16.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALTextToSpeech.say("'+str2+'")', true);
			request16.send(null);
			
			if (actions[i] == "Sit Down" || actions[i] == "Stand Up" || actions[i] == "Wave" || actions[i] == "taichi") {
				request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALBehaviorManager.runBehavior("'+str1+'")', true);
				request1.send(null);
			}
			else if (actions[i] == "Walk"){
				walkCommand();
			}
			else if (actions[i] == "Turn") {
				turnCommand();
			}
			else if (actions[i] == "Move Arms") {
				armCommand();
			}
			else if (actions[i] == "Turn Head") {
				headCommand();
			}
			else if (actions[i] == "Gesture") {
				gestureCommand();
			}
		}
	
		myVar = setInterval(delay,50);
	}
	
}

function walkCommand()
{
	if (actions2[i] == "Walk Forward") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(.2,0,0)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Walk Backward") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(-.2,0,0)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Walk and Turn Left") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(.2,0,1.4)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Walk and Turn Right") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(.2,0,-1.4)', true);
		request1.send(null);
	}
}

function turnCommand()
{
	if (actions2[i] == "Turn Left") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(0,0,1.4)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Turn Right") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(0,0,-1.4)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Turn Around") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.walkTo(0,0,2.8)', true);
		request1.send(null);
	}
}
function headCommand()
{
	if (actions2[i] == "Look Left") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",1,1,1)', true);
		request1.send(null);
		return;
	}
	else if (actions2[i] == "Look Right") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",-1,1,1)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Look Up") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",-1,1,1)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Look Down") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",1,1,1)', true);
		request1.send(null);
	}
	else if (actions2[i] == "Center Head") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",0,1,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",0,1,1)', true);
		request2.send(null);
	}
	else
		return;
}

function armCommand()
{
	if(actions2[i] == "Raise Both Hands") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",-1.5,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",-1.5,2,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,2,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,2,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",0,.8,1)', true);
		request5.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",0,.8,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("LHand")', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",0,.8,1)', true);
		request10.send(null);
	}
	else if(actions2[i] == "Raise One Hand") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",-1.5,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",0,.8,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request4.send(null);
	}
	else if(actions2[i] == "Reach Out Both Arms") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",0,2,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,1,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,1,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",1,.8,1)', true);
		request5.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-1,.8,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("LHand")', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",0,.8,1)', true);
		request10.send(null);
	}
	else if(actions2[i] == "Reach Out One Arm") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,2,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",1,.8,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request5.send(null);
	}
	else if(actions2[i] == "Reach Side Both Arms") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",0, 2,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",-1.5,2,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",1.5,2,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",1,.8,1)', true);
		request5.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-1,.8,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("LHand")', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",0,.8,1)', true);
		request10.send(null);
	}
	else if(actions2[i] == "Reach Side One Arm") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",-1.5,2,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",1,.8,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request5.send(null);
	}
	else if(actions2[i] == "Lower Arms") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",1.5,2,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1.5, 2,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,1,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,1,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.8,1)', true);
		request5.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",0,.8,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",1.5,.8,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-1.5,.8,1)', true);
		request8.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.8,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.8,1)', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("RHand")', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("LHand")', true);
		request10.send(null);
		
	}
}

function gestureCommand(){
	if(actions2[i] == "Gesture Toward Audience") {
		request12.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",0,.5,1)', true);
		request12.send(null);
		request13.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",0,.5,1)', true);
		request13.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.5,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.5,1)', true);
		request10.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.5,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",-1.5,.5,1)', true);
		request8.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",2,.5,1)', true);
		request5.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-2.5,.5,1)', true);
		request6.send(null);
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,.5,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1,.5,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,.5,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",.5,.5,1)', true);
		request4.send(null);
		request11.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request11.send(null);

	}
	if(actions2[i] == "Gesture Toward Self") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",0,.5,1)', true);
		request1.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",0,.5,1)', true);
		request2.send(null);

		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",2,.5,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",-1.5,.5,1)', true);
		request10.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",0,.5,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-2.5,.5,1)', true);
		request8.send(null);
		request11.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.5,1)', true);
		request11.send(null);
		request12.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.5,1)', true);
		request12.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,.5,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1,.5,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,.5,1)', true);
		request5.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,.5,1)', true);
		request6.send(null);
		request13.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request13.send(null);
		request14.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("LHand")', true);
		request14.send(null);
	}
	if(actions2[i] == "Gesture Toward Right") {
	
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",-1,.5,1)', true);
		request1.send(null);
		request14.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",0,.5,1)', true);
		request14.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",1,.5,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-2.5,.5,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.5,1)', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",-1.5,.5,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.5,1)', true);
		request10.send(null);
		request11.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.5,1)', true);
		request11.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",0,.5,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1,.5,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",-1.5,.5,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,.5,1)', true);
		request5.send(null);
		request12.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request12.send(null);
		request13.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("LHand")', true);
		request13.send(null);
		
	}
	if(actions2[i] == "Gesture Toward Left") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",1,.5,1)', true);
		request1.send(null);
		request14.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",0,.5,1)', true);
		request14.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.5,1)', true);
		request10.send(null);
		request11.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.5,1)', true);
		request11.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",2,.5,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",-1,.5,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.5,1)', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",0,.5,1)', true);
		request9.send(null);
				request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",1,.5,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",0,.5,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,.5,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",1.5,.5,1)', true);
		request5.send(null);
		request12.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("RHand")', true);
		request12.send(null);
		request13.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("LHand")', true);
		request13.send(null);
	}
	if(actions2[i] == "Gesture Toward Sky") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",-1,1,1)', true);
		request1.send(null);
		request14.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",0,.5,1)', true);
		request14.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",2,.5,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",0,.5,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.5,1)', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",1,.5,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.5,1)', true);
		request10.send(null);
		request11.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.5,1)', true);
		request11.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",-1,1.3,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1.5,1.3,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,1,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,1,1)', true);
		request5.send(null);
		request12.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request12.send(null);
		request13.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("LHand")', true);
		request13.send(null);
	}
	if(actions2[i] == "Gesture Toward Ground") {
		request1.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadPitch",1,1,1)', true);
		request1.send(null);
		request14.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("HeadYaw",0,.5,1)', true);
		request14.send(null);
		request6.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowYaw",2,.5,1)', true);
		request6.send(null);
		request7.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowYaw",0,.5,1)', true);
		request7.send(null);
		request8.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RElbowRoll",0,.5,1)', true);
		request8.send(null);
		request9.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LElbowRoll",1,.5,1)', true);
		request9.send(null);
		request10.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RWristYaw",1.5,.5,1)', true);
		request10.send(null);
		request11.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LWristYaw",-1.5,.5,1)', true);
		request11.send(null);
		request2.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderPitch",.6,1.3,1)', true);
		request2.send(null);
		request3.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderPitch",1.5,1.3,1)', true);
		request3.send(null);
		request4.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("RShoulderRoll",0,1,1)', true);
		request4.send(null);
		request5.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.angleInterpolation("LShoulderRoll",0,1,1)', true);
		request5.send(null);
		request12.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.openHand("RHand")', true);
		request12.send(null);
		request13.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALMotion.closeHand("LHand")', true);
		request13.send(null);
	}
}

function delay()
{
	j++;
	if (firstTime && j>25) {
		request16.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALBehaviorManager.isBehaviorRunning("Stand Up")', true);
		request16.send(null);
		request16.onreadystatechange = function(){
			if(request16.readyState == 4) {
				if(request16.responseText != "<HTML><BODY><PRE>true</PRE></BODY></HTML>") {
					clearInterval(myVar);
					ready = true;
					firstTime = false;
					j = 0;
					sendInfo();
				}
			}
		
		};
		
		
	}
	else {
		if ((actions[i] == "Walk" && j>100) || (actions[i] == "Move Arms" && j>60) || (actions[i] == "Sit Down" && j>25) || (actions[i] == "Stand Up" && j>25) || (actions[i] == "Wave" && j>25) || (actions[i] == "Turn Head" && j>25) || (actions[i] == "Turn" && j>125) || (actions[i] == "Gesture" && j>50) || (actions[i] == "taichi" && j>5)) {
		request17.open("GET", '/proxy.php?url=http%3A%2F%2F'+IPADDRESS+'%3A9559%2F%3Feval%3DALBehaviorManager.isBehaviorRunning("'+str1+'")', true);
		request17.send(null);
		request17.onreadystatechange = function(){
			if(request17.readyState == 4) {
				if(request17.responseText != "<HTML><BODY><PRE>true</PRE></BODY></HTML>") {
					if (j>str2.length+15) {
						clearInterval(myVar);
						ready = true;
						j = 0;
						i++;
						if (i<numCanvases)
							sendInfo();
						else
							presentStory = false;
					}
				}
			}
		
		};
		
		}
	}
}