import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { media ,TitleLg, TitleMd, TitleSm, TextLg, TextMd, TextSm } from '../../Components/common/Font';

const SignInContainer = styled.div`
  background: #E9E9E9;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  height: 100vh;

  @media ${media.mobile}{
    display: block;
    background-color: #FFFFFF;
  }
`;

const TitleLeft = styled.div`
  display: block;
`;

const SignInBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin: 10px;
  padding: 160px 320px;

  @media ${media.mobile} {
    padding: 20px;
    display: inherit;
  }
`;

const SignInForm = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubInputForm = styled.div`
  align-items: flex-start;
`;

const SubInputFormWithButton = styled.div`
  display: flex;
  width: auto;
`;

const Margin8px = styled.div`
  margin: 0.5rem;
`;

const HorizontalLine = styled.div`
  border-top: 1px solid #ccc; /* 가로 선 스타일 */
  margin: 0.5rem 0; /* 원하는 간격 설정 */
  width: 100%;
`;

const InputSize = styled.input`
  border: 1px solid #A8A8A8;
  border-radius: 3px;
  width: 288px;
  height: 32px;
  margin: 8px 0px;
`;

const InputSizeWithBtn = styled.input`
  border: 1px solid #A8A8A8;
  border-radius: 3px;
  width: 192px;
  height: 32px;
  margin: 8px 4px 8px 0px;
`;

const SignInPageButton = styled.button`
  background-color: #363636;
  color: #fff;
  width: 100%;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 배경색 변화 시 부드러운 전환 효과 */
  margin: 0.5rem;
  &:hover {
    background-color: #cccccc;
  }
`;

const BtnWithInput = styled.button`
  background-color: #363636;
  color: #fff;
  width: 90px;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 배경색 변화 시 부드러운 전환 효과 */
  &:hover {
    background-color: #cccccc;
  }
`;

const WhiteBoxContainer = styled.div`
    padding: 16px 64px 64px 64px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 2px #E9E9E9;
  
    @media ${media.mobile}{
      box-shadow: none;
    }
`;

const healthCheckTest =()=> {
    // Axios를 사용하여 Spring Boot API에 GET 요청을 보냅니다.
    axios.get('http://localhost:8081/user/health_check')
        .then(response => {
            console.log({message: response.data})
        })
        .catch(error => {
            console.error('API 요청 중 오류 발생:', error);
        });
}

function SignInPage(){
   // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        pwd: "",
        name: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Send a POST request to your endpoint with formData.
        axios.post('http://localhost:8081/user/join', formData)
            .then((response) => {
                console.log({ message: response.data });
                alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.")

                //이전 페이지로 이동
                //navigate(-1);
            })
            .catch((error) => {
                console.error('API 요청 중 오류 발생:', error);
            });
    };

    return(
        <SignInContainer>
            <WhiteBoxContainer>
            <TitleLeft>
            <Margin8px>
                <TitleLg>Sign In</TitleLg>
            </Margin8px>
            <SignInBox className="SignInBox">
                <SignInForm className="SignInForm">
                    <SubInputForm className="SubInputForm">
                        <TextMd>메일주소</TextMd>
                        <InputSizeWithBtn   name="email"
                                            value={formData.email}
                                            onChange={handleChange} />
                        <BtnWithInput>인증</BtnWithInput>
                    </SubInputForm>
                    <SubInputForm className="SubInputFormWithButton">
                        <TextMd>비밀번호</TextMd>
                        <InputSize   name="pwd"
                                     value={formData.pwd}
                                     onChange={handleChange} />
                    </SubInputForm>
                    <SubInputForm className="SubInputForm">
                        <TextMd>비밀번호 확인</TextMd>
                        <InputSize />
                    </SubInputForm>
                    <SubInputForm className="SubInputForm">
                        <TextMd>이름</TextMd>
                        <InputSize   name="name"
                                     value={formData.name}
                                     onChange={handleChange}/>
                    </SubInputForm>
                    <SubInputForm className="SubInputForm">
                        <TextMd>전화번호</TextMd>
                        <InputSize   name="phoneNumber"
                                     value={formData.phoneNumber}
                                     onChange={handleChange} />
                    </SubInputForm>
                <HorizontalLine></HorizontalLine>
                <SignInPageButton onClick={() => handleSubmit()}>회원가입</SignInPageButton>
                </SignInForm>
            </SignInBox>
            </TitleLeft>
            </WhiteBoxContainer>
        </SignInContainer>
    );
}

export default SignInPage;