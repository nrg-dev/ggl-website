$(function(){	
	$("#successdialog").hide();
	$("#failuredialog").hide();
	$('.ajax-loader').css("visibility", "hidden");
});

function feedback(){
	var mailvalidation=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	var email=$('#email').val();
	var name=$('#name').val();
	var subject=$('#subject').val();
	var message=$('#message').val();
	
	var emailflag=false;
	var nameflag=false;
	var subjectflag=false;
	var messageflag=false;
	
	if(email!="" ){
		if(mailvalidation.test(email)){
			$('#emailerror').html("");
			$("#email").css("border-color","");
			emailflag=true;
		}else{
			$('#emailerror').html("Please Enter Valid EmailID");
			$("#email").css("border-color","red");
			emailflag=false;
		}
	}else{
		$('#emailerror').html("Please Enter the EmailID");
		$("#email").css("border-color","red");
		emailflag=true;
	}
	
	if(name==""){
		$('#nameerror').html("please Enter the Name");
		$("#name").css("border-color","red");
		nameflag=false;
	}else{
		$('#nameerror').html("");
		$("#name").css("border-color","");
		nameflag=true;	
	}
	
	if(subject==""){
		$('#subjecterror').html("please Enter the Subject");
		$("#subject").css("border-color","red");
		subjectflag=false;
		
	}else{
		$('#subjecterror').html("");
		$("#subject").css("border-color","");
		subjectflag=true;	
	}
	if(message==""){
		$('#messageerror').html("please Enter the Message");
		$("#message").css("border-color","red");
		messageflag=false;
		
	}else{
		$('#messageerror').html("");
		$("#message").css("border-color","");
		messageflag=true;	
	}
	if(nameflag==true && emailflag == true){
		var feedbackData = new Object();
		var feedbackData = JSON.stringify({
			"email" : email,
			"name" : name,
			"subject" : subject,
			"message" : message
		});
		var url = "http://35.162.40.190:8091/user-portal/websiteFeedBackRegister";
		//var url = "http://localhost:8091/user-portal/websiteFeedBackRegister";
		$.ajax({
			url: url,
			cache: true,
			method: 'POST',
			data: feedbackData,
			dataType: "json",
			async: true,
			contentType: "application/json; charset=utf-8",
			beforeSend: function(){
				$('.ajax-loader').css("visibility", "visible");
			},
			success: function(json) {
				$('.ajax-loader').css("visibility", "hidden");
				if(json.status=="success"){
					$('#contactForm').find("input[type=text],input[type=email],textarea").val("");
					$("#successdialog").show();
				}else if(json.status=="failure"){
					$("#failuredialog").show();
				}
			}, error: function (error) {
				$('.ajax-loader').css("visibility", "hidden");
				$("#failuredialog").show();
			},
			complete: function(){
				$('.ajax-loader').css("visibility", "hidden");
			}
		});
		console.log("Called Successfully :::::::::::::::::::::::::::::");	
	}
}

function onCloseHandled(){
	$("#successdialog").hide();
	$("#failuredialog").hide();
}
