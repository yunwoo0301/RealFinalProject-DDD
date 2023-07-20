import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BG from "../../resources/BGimg1.jpg"
import MuseumInfo from "./Museum";
import RollDiv from "./SlideBanner";
import GridComponent from "./GridLayout";
import {TbMessageChatbot} from "react-icons/tb";
import Chatbot from "../../pages/Chatbot";

const ScrollStyle = styled.div`
  body {
  margin: 0;
  overflow-y: hidden;
  color: #050E3D;
}

.outer {
  height: 100vh;
  overflow-y: auto;
}

/* 화면에서 스크롤바 안보이게 */
.outer::-webkit-scrollbar {
  display: none;
}

.inner {
  height: 100vh;
  display: flex;
  align-items: center;
}

.first-layer{
  background-image: url(${BG});
  background-size: cover;
  display: flex;
  justify-content: space-between;
}
.service {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 3rem;
  width: fit-content;
  height: fit-content;
}
.service .icon{
  float: left;
  z-index: 99;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-radius: 100%;
  text-align: center;
  background-color: #f4f8ff;
 }

.second-layer{
  justify-content: center;
}

.third-layer{
  justify-content: center;
}

.fourth-layer{
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 728px) {
        .service{
          font-size: 2rem;
        }
    }
`;

const Mainpage = () => {
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);
    useEffect(() => {
        const wheelHandler = (e) => {
        e.preventDefault();
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

            if (deltaY > 0) {
            // 스크롤 내릴 때
            if (scrollTop >= 0 && scrollTop < pageHeight) {
              //현재 1페이지
                outerDivRef.current.scrollTo({
                top: pageHeight,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(2);
            } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
              //현재 2페이지
                outerDivRef.current.scrollTo({
                top: pageHeight * 2,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(3);
            } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
              //현재 3페이지
                outerDivRef.current.scrollTo({
                top: pageHeight * 3,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(4);
            } else {
              // 현재 4페이지
                outerDivRef.current.scrollTo({
                top: pageHeight * 4,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(4);
            }
            } else {
            // 스크롤 올릴 때
            if (scrollTop >= 0 && scrollTop < pageHeight) {
              //현재 1페이지
                outerDivRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(1);
            } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
              //현재 2페이지
                outerDivRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(1);
            } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
              //현재 3페이지
                outerDivRef.current.scrollTo({
                top: pageHeight,
                left: 0,
                behavior: "smooth",
                });
                setScrollIndex(2);
            } else {
              // 현재 4페이지
                outerDivRef.current.scrollTo({
                top: pageHeight*2,
                left: 0,
                behavior: "smooth",
            });
            setScrollIndex(3);
            }
        }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
    }, []);

    // 챗봇 나오게
    const [showChatbot, setShowChatbot] = useState(false);
    const openToChatbot = () => {
      setShowChatbot((prevShowChatbot) => !prevShowChatbot);
    };
    return (
        <ScrollStyle>
        <div ref={outerDivRef} className="outer">
            <div className="inner first-layer">
            <div className="service">
            {showChatbot && <Chatbot/> }
            <div className="icon">
            <TbMessageChatbot onClick={openToChatbot}/>
            </div>
            </div>
            </div>
            <div className="inner second-layer"><RollDiv/></div>
            <div className="inner third-layer"><GridComponent/></div>
            <div className="inner fourth-layer"><MuseumInfo/></div>
        </div>
        </ScrollStyle>   
    );
}

export default Mainpage;