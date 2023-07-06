import { React, useState } from "react";
import styled from "styled-components";
import { MyPageApi } from "../../api/MyPageApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store";
import { Backdrop } from "@mui/material";
import AlertModal from "../../util/Alert";

const EditBlock = styled.div`
  width: 70%;
  height: 100%;
  /* background-color: blue; */
  p {
    text-align: left;
    margin: 0rem 0 0.3rem 0;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .title {
    /* background-color: red; */
    height: 2.8rem;
    font-weight: bold;
  }
  .introducBlock {
    /* background-color: aqua; */
    width: calc(100% - 1rem);
    textarea {
      width: 88%;
      background-color: #f4f8ff;
      border: 1px solid #5eadf7;
      border-radius: 0.3rem;
      resize: none;
      padding-left: 0.6rem;
      font-size: 0.7rem;
    }
    textarea:focus {
      outline: none;
      background-color: #5eadf7;
      outline: none;
      color: white;
      ::placeholder {
        color: white;
        padding-left: 0.3rem;
      }
    }
    textarea::placeholder {
      color: #555;
      padding-left: 0.3rem;
    }
  }

  .btnBlock {
    height: 20%;
    width: 95%;
    /* background-color: blue; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 18%;
      height: 2rem;
      border-radius: 3rem;
      margin: 1rem 0.5rem;
      background-color: #2b5ec2;
      border: 1px solid #f4f8ff;
      color: white;
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const Edit = styled.div`
  width: 100%;
  height: 70%; // 여기서 내소개 위치 변경함 (바꿔야함...)
  display: flex;
  flex-direction: row;
  p {
    text-align: left;
    margin: 1.6rem 0 0.3rem 0;
    font-size: 0.8rem;
    font-weight: bold;
  }
  input {
    width: 70%;
    height: 1.8rem;
    background-color: #f4f8ff;
    border: 1px solid #5eadf7;
    /* border: 1px solid #5EADF7; */
    border-radius: 0.3rem;
    padding-left: 0.6rem;
    color: black;
    font-size: 0.7rem;
    ::placeholder {
      color: #555;
      padding-left: 0.3rem;
    }
  }
  input:focus {
    background-color: #5eadf7;
    outline: none;
    color: white;
    ::placeholder {
      color: #f4f8ff;
    }
  }

  .hint {
    font-size: 0.4rem;
    text-align: center;
    display: flex;
    width: 76%;
    justify-content: right;
    height: 1rem;
    /* background-color: red; */
  }
`;
const LeftBox = styled.div`
  width: 50%;
  min-width: 200px;

  height: 100%;
  /* background-color: aqua; */
`;
const RightBox = styled.div`
  width: 50%;
  min-width: 200px;

  height: 100%;
  /* background-color: red; */
`;

const EditInfo = (props) => {
  const { memberId } = useParams();

  const [inputNick, setInputNick] = useState();
  const [inputName, setInputName] = useState();
  const [inputTel, setInputTel] = useState();
  const [inputInst, setInputinst] = useState();
  const [inputIntro, setInputintro] = useState();

  const [responseData, setResponseData] = useState(null);

  const [nickMessage, setNickMessage] = useState("");
  const [isNick, setIsNick] = useState(true);

  // 회원 정보 모두 가져오기
  useEffect(() => {
    const infoFetchDate = async () => {
      const response = await MyPageApi.info(memberId);
      if (response.data) {
        setResponseData(response.data);
        setInputNick(
          response.data.nickname ? response.data.nickname : inputNick
        );
        setInputName(response.data.name ? response.data.name : inputName);
        setInputTel(response.data.tel ? response.data.tel : inputTel);
        setInputinst(
          response.data.instagram ? response.data.instagram : inputInst
        );
        setInputintro(
          response.data.introduce ? response.data.introduce : inputIntro
        );
      }
    };
    infoFetchDate();
  }, [memberId]);

  // onChangeHandling
  const onChangeName = (e) => {
    const nameCurrent = e.target.value;
    setInputName(nameCurrent);
  };

  const onChangeTel = (e) => {
    const telCurrent = e.target.value;
    setInputTel(telCurrent);
  };

  const onChangeInst = (e) => {
    const instCurrent = e.target.value;
    setInputinst(instCurrent);
  };

  const onChangeIntro = (e) => {
    const introCurrent = e.target.value;
    setInputintro(introCurrent);
  };

  // 디바운싱 :  타이핑을 멈추고 일정 시간 동안 아무런 입력도 없을 때에만 이벤트를 처리
  let debounceTimeout;
  const onChangeNick = (e) => {
    const nickCurrent = e.target.value;
    setInputNick(nickCurrent);

    // 닉네임 중복 체크
    const nickDuplication = async (memberId, nickname) => {
      try {
        const response = await MyPageApi.nicknamedup(memberId, nickname);
        if (response.status === 200) {
          console.log("닉네임 중복 체크 중");
          console.log(response.data);
          if (!response.data) {
            setNickMessage("해당 닉네임은 이미 사용 중입니다.");
            setIsNick(false);
          } else {
            setNickMessage("사용가능한 닉네입입니다. ");
            setIsNick(true);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      nickDuplication(memberId, nickCurrent);
    }, 300); // 300ms 동안 아무런 입력이 없으면 nickDuplication 호출
  };

  // 변경 사항 저장하는 함수
  const handleSave = async (apiMethod, memberId, inputValue) => {
    try {
      const response = await apiMethod(memberId, inputValue);
      console.log(inputValue);
      if (response.data === true) {
        console.log(`${apiMethod} 변경 완료`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 함수가 전부다 불러올때까지 await
  const handleOnclick = async () => {
    await handleSave(MyPageApi.nickname, memberId, inputNick);
    await handleSave(MyPageApi.name, memberId, inputName);
    await handleSave(MyPageApi.tel, memberId, inputTel);
    await handleSave(MyPageApi.instagram, memberId, inputInst);
    await handleSave(MyPageApi.introduce, memberId, inputIntro);
    // setPopupOpen(true);
    handleOpen()
  };

  const { setShowPage } = useStore();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 1000);
  };

  return (
    <>
      {responseData && (
        <EditBlock>
          <div className="title">내 정보 수정</div>
          <Edit>
            <LeftBox>
              <p>이메일</p>
              <div className="textBox">
                <input
                  type="text"
                  style={{ backgroundColor: "#eee", border: "1px solid #888" }}
                  defaultValue={responseData.email}
                  disabled
                />
              </div>
              {/* <p>비밀번호</p>
                        <div className="textBox">
                            <input type="password"  />
                        </div>
                        <p>비밀번호 확인</p>
                        <div className="textBox">
                            <input type="password"  />
                        </div> */}
              <p>닉네임</p>
              <div className="textBox">
                <input type="text" onChange={onChangeNick} value={inputNick} />
              </div>
              <div className="hint">{nickMessage}</div>
              <p>인스타그램(선택사항)</p>
              <div className="textBox">
                <input type="text" onChange={onChangeInst} value={inputInst} />
              </div>
            </LeftBox>
            <RightBox>
              <p>이름</p>
              <div className="textBox">
                <input type="text" onChange={onChangeName} value={inputName} />
              </div>
              <p>연락처</p>
              <div className="textBox">
                <input type="tel" onChange={onChangeTel} value={inputTel} />
              </div>
            </RightBox>
          </Edit>
          <div className="introducBlock">
            <p>내 소개</p>
            <textarea
              className="introarea"
              name=""
              id=""
              cols="20"
              rows="5"
              style={{ width: "88%" }}
              onChange={onChangeIntro}
              value={inputIntro}
            />
          </div>
          <div className="btnBlock">
            <button
              onClick={handleOnclick}
              disabled={!isNick}
              style={isNick ? null : { backgroundColor: "#ddd" }}
            >
              저장
            </button>
            <Backdrop
              sx={{
                backgroundColor: "transparent", // 배경색을 녹색으로 설정
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0, // 팝업을 상단에 위치
              }}
              open={open}
              onClick={handleClose}
            >
              <AlertModal />
            </Backdrop>
            <button
              onClick={() => {
                setShowPage("마이페이지");
              }}
            >
              취소
            </button>
          </div>
        </EditBlock>
      )}
    </>
  );
};

export default EditInfo;
