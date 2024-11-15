import React, { useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";

function Homepage() {

  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null);
  const [drinkImage, setDrinkImage] = useState(null)

  const apiUrl = "https://lovely-slug-asaa12-08e720ae.koyeb.app"

  const handleImage = async () => {
            setLoading(true); // 이미지 로딩 시작
            setError(null); // 이전 오류 초기화
            setDrinkImage(null)
    try {
      const response = await fetch(`${apiUrl}/home_image`);
      if (!response.ok) {
        throw new Error("Failed to fetch image data");
      }
      const imageBlob = await response.blob();

       // Blob을 URL로 변환 (브라우저에서 이미지로 표시할 수 있는 URL)
      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log(imageObjectURL);
      setImage(imageObjectURL); // API로부터 받은 데이터 저장
    } catch (error) {
      console.error("이미지 로딩 실패: ", error);
      alert("이미지 로딩 실패");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };



  const handleDrink = () => {
    setDrinkImage("logo192.png")
    setImage(null)
  }



  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // 반응형 폰트 크기
          }}>
          WMIT FOOD & DRINK!
        </Typography>

        <Box mb={2}>
          
          {/* 두 버튼을 한 줄에 배치하기 위한 Box */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleImage}
            disabled={loading} // 로딩 중에는 버튼 비활성화
            sx={{
                marginRight: "10px",
                fontSize: { xs: "0.8rem", sm: "1rem" }, // 작은 화면에서는 버튼 글씨를 조금 작게
                padding: { xs: "8px 16px", sm: "10px 20px" }, // 작은 화면에서 버튼 크기 조정
              }}
          >
            {loading ? "Loading..." : "식당 매뉴"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDrink}
            sx={{
                marginLeft: "10px",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                padding: { xs: "8px 16px", sm: "10px 20px" },
              }}
          >
            음료 메뉴
          </Button>
        </Box>

        {/* 오류 메시지 */}
        {error && (
          <Typography variant="h6" color="error" mt={2}>
            {error}
          </Typography>
        )}

        {/* 이미지가 존재하면 이미지 표시 */}
        {image && !loading && !error && (
          <Box mt={3}>
            <img
              src={image} // 서버에서 반환한 이미지 경로
              alt="메뉴 이미지"
              style={{ width: "100%", maxHeight: "70vh", objectFit: "fill" }} // 스타일링
            />
            <Typography variant="body2" color="textSecondary" mt={3}>
              Timestamp: {new Date(image.timestamp).toLocaleString()}
            </Typography>
          </Box>
        )}

        {/* 음료 이미지가 존재하면 표시 */}
        {drinkImage && (
          <Box mt={3}>
            <img
              src={"/" + drinkImage} // public 폴더 안에 이미지경로
              alt="음료 이미지"
              style={{
                width: "100%",
                maxHeight: "70vh",
                objectFit: "fill", // 이미지 크기 조정
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Homepage;
