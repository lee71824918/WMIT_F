import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { apiUrl } from "./config";

function Homepage() {

  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null);
  const [drinkImage, setDrinkImage] = useState(null)
  const [imagetime, setImagetime] = useState(null)

  useEffect(() => {
    handleImage();
  }, []);  // 홈페이지 렌더링시에 식당메뉴버튼의 api 자동호출


  //식당 메뉴 버튼 클릭시 이미지 불러오기
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
      setImage(imageObjectURL); // 받은이미지 파일에대해 url 생성후 저장




      // 시간 가져오기 위한 api 호출
      const response2 = await fetch(`${apiUrl}/time`);
      if (!response.ok) {
        throw new Error("Failed to fetch image data");
      }

      const uploadimagetime = await response2.text()
      console.log(uploadimagetime)
      setImagetime(uploadimagetime)

    } catch (error) {
      console.error("이미지 로딩 실패: ", error);
      alert("이미지 로딩 실패");
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };




  // 음료이미지 버튼 클릭시 하드코딩된 이미지 출력
  const handleDrink = () => {
    setDrinkImage("drink.jpg")
    setImage(null)
  }



  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mt={3}>
        <Typography variant="h4" gutterBottom sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // 반응형 폰트 크기
          }}>
          WMIT FOOD & DRINK!
        </Typography>

        <Box mb={2} mt={3}>
          
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
              style={{ width: "100%", maxHeight: "70vh", objectFit: "contain" }} // 스타일링
            />
            <Typography variant="body2" color="textSecondary" mt={3}>
              Timestamp: {imagetime}
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
                objectFit: "contain", // 이미지 크기 조정
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Homepage;
