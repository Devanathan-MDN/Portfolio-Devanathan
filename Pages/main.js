const step1=document.querySelector(".step1"),
step2=document.querySelector(".step2"),
step3=document.querySelector(".step3"),
emailAddress =document.getElementById("emailAddress"),
verifyEmail =document.getElementById("verifyEmail"),
inputs =document.querySelectorAll(".otp-group input"),
nextButton=document.querySelector(".nextButton"),
verifyButton=document.querySelector(".verifyButton");
let OTP="";
window.addEventListener("load", ()=>{
    emailjs.init("_7Du1b-bQ8tXw_3Y0");
    step2.style.display= "none";
    step3.style.display= "none";
    nextButton.classList.add("disable");
    nextButton.classList.add("disable");
});

const validateEmail=(email)=>{
    let re= /^[\w.-]+@[^\s@]+\.[^\s@]+$/;
    if(re.test(email)){
        nextButton.classList.remove("disable");
        console.log("test");
    }else{
        nextButton.classList.add("disable");
        console.log("test 1");
    }
};

    inputs.forEach((input, index)=>{
        input.addEventListener("keyup", function(e){
            const currentInput =input, nextInput=input.nextElementSibling,prevInput=input.previousElementSibling;
            if(nextInput && nextInput.hasAttribute("disable") && currentInput.value!==""){
                nextInput.removeAttribute("disable",true);
                nextInput.focus();
            }
            if(e.key === "Backspace"){
                inputs.forEach((input,index1)=>{
                    if(index<=index1 && prevInput){
                        input.setAttribute("disable",true);
                        prevInput.focus();
                    }
                });
            }
        });
    });

    inputs.forEach((input)=>{
        input.addEventListener("keyup", function(e){
            if(this.value.length>=1){
                e.target.value=e.target.value.substr(0,1);
            }
            if(inputs[0].value!="" && inputs[1].value!="" &&inputs[2].value!="" && inputs[3].value!="" )
                {
                    verifyButton.classList.remove("disable");
                }
                else{
                    verifyButton.classList.add("disable");
                }
        });
    });

nextButton.addEventListener("click",()=>{
    nextButton.innerHTML="&#9889; Sending...";
    
    const generateOTP=()=>{
        return Math.floor(1000+Math.random()*9000);
    }
    OTP=generateOTP();
    const serviceID="service_r72exwv";
    const templeteID="template_023i4e8";
    let templeteParameter ={
        from_name: " devanathan web ",
        OTP: OTP,
        message: "Please find out the attached file",
        reply_to:emailAddress.value,
    };
    emailjs.send(serviceID, templeteID, templeteParameter).then((res)=>{
        console.log(res);
        nextButton.innerHTML="Next &rarr;"
        step1.style.display ="none";
        step2.style.display ="block";
        step3.style.display ="none";
    },
    (err)=>{
        console.log(err);
    }
);
});

verifyButton.addEventListener("click",()=>{
    let values="";
    inputs.forEach((input)=>{
        values+=input.value;
    });
    if(OTP==values){
        step1.style.display="none";
        step2.style.display="none";
        step3.style.display="block";
    }else{
       verifyButton.classList.add("error-shake");
       setTimeout(()=>{
        verifyButton.classList.add("error-shake");
       },1000)
    }
});
function changeMyEmail(){
    step1.style.display="block";
        step2.style.display="none";
        step3.style.display="none";
}