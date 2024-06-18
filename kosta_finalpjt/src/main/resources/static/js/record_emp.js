window.onload=()=>{
    flagCheck();
	// date 일자 관리
	let minDate =  year + '-' + month + '-' + day;
	$("#date1").attr("min", minDate);
}


// 출근 버튼
const workin=()=>{
	$.ajax({
		url:"/auth/record/in",  //서버주소
		type:"post",   				//전송방식
		dataType:'json',			//응답데이터 형태
		data:{Members:mem},
		success:function(res){		//응답 정상일때
            flag = res.flag;
            num = res.num;
            flagCheck();
            $("#com_end").attr("onclick","workout()");
		},
		error:function(){			//응답 에러일때
			console.log('error');
		}
	});
}

//퇴근 버튼 클릭
const workout=()=>{
	$.ajax({
		url:"/auth/record/out",  //서버주소
		type:"post",   				//전송방식
		dataType:'json',			//응답데이터 형태
		data:{Members:mem,memberid:num},
		success:function(res){		//응답 정상일때
			console.log(res);
		},
		error:function(){			//응답 에러일때
			console.log('error');
		}
	});
}

setInterval(()=>{
    time = new Date();
    var hours = ('0' + time.getHours()).slice(-2); 
    var minutes = ('0' + time.getMinutes()).slice(-2);

    var timeString = hours + ':' + minutes ;
    $("#record_time").html(dateString+timeString);
} ,60000);


// 출근 여부에 따라서 버튼,문구 변경
const flagCheck = ()=>{
    if(flag === 'true'){
        console.log("출근 완료")
        $("#record_sta").html("출근 완료")
        $("#com_start").removeClass("blue_btn").addClass('gray_btn');
        $("#com_start").removeAttr("onclick");
        $("#com_end").removeClass("gray_btn").addClass('blue_btn');
    }else{
        console.log("출근 전")
        $("#record_sta").html("출근 전")
        $("#com_end").removeAttr("onclick");
    }   
}

//출근기록 조회
const myrecord=(num)=>{
	arrow_btn(num)
	$.ajax({
		url:"/auth/record/getmonth",  //서버주소
		type:"get",   				//전송방식
		dataType:'json',			//응답데이터 형태
		data:{Members:mem,count:cnt},
		success:function(res){		//응답 정상일때
			table_draw(res.list)
		},
		error:function(){			//응답 에러일때
			console.log('error');
		}
	});
}

// 휴가 기록하기
const myoff=()=>{
	let fdata = new FormData($('#offform')[0]);
	$.ajax({
		url:"/auth/record/offday",  //서버주소
		type:"post",   				//전송방식
		dataType:'json',	
		contentType: false,
		processData: false,
		data:fdata,
		success:function(res){		//응답 정상일때
			$(".btn-close").click();
		},
		error:function(){			//응답 에러일때
			console.log('error');
		}
	});
}