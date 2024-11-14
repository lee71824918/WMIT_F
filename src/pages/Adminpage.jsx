import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Adminpage() {

  const navigate = useNavigate();

   useEffect(() => {
    const token = sessionStorage.getItem('authToken');

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [imageUrl, setImageUrl] = useState("");

  const Imagechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // 이미지 업로드 버튼 클릭 처리
  const handleUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image); // 선택된 이미지 파일을 FormData에 추가

      // fetch API를 사용하여 파일 전송
      fetch("http://localhost:4001/upload", {
        method: "POST",
        body: formData, // FormData를 그대로 body에 전달
      })
        .then((response) => response.json()) // 응답을 JSON으로 처리
        .then((data) => {
          console.log("이미지 업로드 성공: ", data);
          alert("이미지가 업로드되었습니다.");

          // 서버에서 반환된 이미지 URL을 localStorage에 저장
          const uploadedImageUrl = data.imageUrl;
          localStorage.setItem("uploadedImageUrl", uploadedImageUrl);
          setImageUrl(uploadedImageUrl); // 상태에 저장
        })
        .catch((error) => {
          console.error("이미지 업로드 실패: ", error);
          alert("이미지 업로드 실패");
        });
    } else {
      alert("이미지를 선택하세요.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          padding: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: 'center'
          ,fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }
         }}>
          관리자 페이지 - 이미지 업로드
        </Typography>

        <input
          type="file"
          accept="image/*"
          onChange={Imagechange}
          style={{ marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          size="medium"
        >
          메뉴 이미지 업로드
        </Button>
        {imageUrl && (
          <Box sx={{ mt: 3, textAlign: "center", width: '100%'}}>
            <Typography variant="h6">업로드된 이미지 미리보기</Typography>
            <img
              src={imageUrl}
              alt="업로드된 이미지"
              style={{
                width: "100%",
                maxHeight: "70vh", 
                objectFit: "fill",
                marginTop: "20px",
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Adminpage;
