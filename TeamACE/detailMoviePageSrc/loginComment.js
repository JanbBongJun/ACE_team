import { movie_id } from "./detailMoviePage.js";
let isLogin = false; //로그인이 되었는지 확인하는 boolean
const joinBtn = document.getElementById("joinBtn");
const joinMembership = document.getElementById("joinMembership"); //로그인이 된 경우 topnav의 회원가입 버튼을 숨김
const openJoinMembership = document.getElementById("openJoinMembership");
const loginContainer = document.getElementById("loginContainer");
const logIn = document.getElementById("logIn");
export let loginId; //로그인한 멤버의 아이디를 저장

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function checkPwd(strPwd) {
  if (strPwd === "") {
    return false;
  } else if (strPwd.length < 7) {
    return false;
  }
  const reg1 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return reg1.test(strPwd);
}
function checkId(strId) {
  if (strId === "") {
    return false;
  }
  const reg2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg2.test(strId);
  // return true;
}

function joinHomePage() {
  const idInput = document.getElementById("loginId"); //id 인풋창
  const pwdInput = document.getElementById("loginPw"); //pw 인풋창
  // console.log(idInput.value);
  // console.log(pwdInput.value);
  if (idInput && pwdInput) {
    if (checkId(idInput.value) && checkPwd(pwdInput.value)) {
      if (localStorage[idInput.value]) {
        alert("이미 있는 아이디입니다");
        return;
      }
      localStorage.setItem(idInput.value, pwdInput.value); // 유효성검사 통과하면, id pw 저장
      openJoinMembership.style.display = "none";
      alert("회원가입성공");
      return true;
    } else {
      alert("아이디 또는 비밀번호를 올바르게 입력해주세요.");
      return false;
    }
  } else {
    alert("아이디,비밀번호를 입력해주세요");
  }
}

joinBtn.addEventListener("click", joinHomePage);
joinMembership.addEventListener("click", () => {
  if (openJoinMembership.style.display === "block") {
    openJoinMembership.style.display = "none";
  } else {
    openJoinMembership.style.display = "block";
  }
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 기능 구현ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

logIn.addEventListener("click", () => {
  //topnav의 로그인버튼을 누르면 로그인창 block,none
  if (!isLogin) {
    //아직 로그인 전일때는 login창을 여는 역할
    if (loginContainer.style.display === "block") {
      loginContainer.style.display = "none";
    } else {
      loginContainer.style.display = "block";
    }
  } else {
    //로그인을 완료하였을때는 logout기능을 담당
    isLogin = false;
    loginId = null;
    logIn.innerText = "로그인";
    joinMembership.style.display = "block";
    document.getElementById("personalId").innerText = "";
  }
});
document.getElementById("alertClose").addEventListener("click", () => {
  loginContainer.style.display = "none";
});

const loginBtn = () => {
  const inputId = document.getElementById("inputID").value;
  const inputPw = document.getElementById("inputPw").value;
  const localPw = localStorage.getItem(inputId);
  if (localPw === inputPw) {
    isLogin = true;
    loginId = inputId;
    logIn.innerText = "로그아웃";
    loginContainer.style.display = "none";
    alert("로그인에 성공하셨습니다");
    joinMembership.style.display = "none";
    document.getElementById("personalId").innerText = `ID: ${loginId}`;
  } else {
    alert("아이디 또는 비밀번호를 확인해주세요");
  }
};

document.getElementById("loginBtn").addEventListener("click", loginBtn);
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ코멘트기능 추가ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
document.getElementById("setComment").addEventListener("click", () => {
  document.getElementById("commentModal").style.display = "block";
});
document.getElementById("closeCommentModal").addEventListener("click", () => {
  document.getElementById("commentModal").style.display = "none";
});

export const makeComment = () => {
  if (!isLogin) {
    alert("로그인을 해주세요");
    document.getElementById("commentModal").style.display = "none";
    return;
  }
  let commentStorage;
  let personalCommentStorage = {};
  const comment = document.getElementById("commentInput").value;
  if (localStorage.getItem(movie_id)) {
    commentStorage = JSON.parse(localStorage[movie_id]);
    console.log(commentStorage);
    //로컬스토리지의 movieId값을 JSON.parse로 변환하여
    //loginId값이 있는지 확인
    //로컬스토리지에 comment가 저장되어있는 경우
    if (commentStorage[`${loginId}`]) {
      personalCommentStorage = commentStorage[`${loginId}`]; // key값이 loginId인 객체
      let storageLength = Object.keys(personalCommentStorage).length;
      personalCommentStorage[storageLength / 1 + 1] = comment;
      commentStorage[`${loginId}`] = personalCommentStorage;
      localStorage.setItem(movie_id, JSON.stringify(commentStorage));
    } else {
      commentStorage[loginId] = { 1: comment };

      localStorage.setItem(movie_id, JSON.stringify(commentStorage));
    }
  } else {
    //ok
    personalCommentStorage[`${loginId}`] = { 1: comment };
    localStorage.setItem(movie_id, JSON.stringify(personalCommentStorage));
  }
  fillCommentContainer();
  alert('코멘트작성이 완료되었습니다!')
  document.getElementById("commentModal").style.display = "none";
};

export const fillCommentContainer = () => {
  let commentStorage;
  if ((commentStorage = localStorage.getItem(movie_id))) {
    let commentStorageObject = JSON.parse(commentStorage);
    let commentHtml = "";
    let commentAllHtml = "";
    for (let key in commentStorageObject) {
      console.log(commentStorageObject);
      for (let innerKey in commentStorageObject[key]) {
        commentHtml += `
        <div class="commentElement" id=${`${key}`}>
            <h5 class="personalCommentId">${key}</h5>
            <p class="comment">${
              commentStorageObject[`${key}`][`${innerKey}`]
            }</p>
        </div>
        `;
      }
    }
    document.getElementById("commentGridElement").innerHTML = commentHtml;
  }
};
