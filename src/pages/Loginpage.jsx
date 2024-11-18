import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography, Container, Box } from '@mui/material'


function Loginpage () {

  const [id, setId] = useState('')    
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const Login = async (e) => {
    e.preventDefault()
    

    if (id === 'admin' || password === 'grit!234' ) {
      alert('관리자 로그인성공')
          
      const token = 'rhksflwkvpdlwl'
      sessionStorage.setItem('authToken',token)
          
      navigate('/Admin')
    }
    else if(id !== 'adim' || password !== 'grit!234'){
      alert('id 또는 password가 잘못되었습니다.')
    }
    else{
      alert('로그인 에러')
    }
  }


    return (
        <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', // 모바일
            mt: 8,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff', //모바일
            width: '100%', // 모바일
          }}
        >
          <Typography variant="h5"
          sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 'bold' }} //xs=모바일, sm= 데스크탑
          >WMIT - FOOD</Typography>
          <form onSubmit={Login} style={{ width: '100%' }}>
            <TextField
              label="아이디"
              type="text"
              fullWidth
              margin="normal"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              sx={{    // 모바일 반응형 입력필드 크기
                marginBottom: 2,
                '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
                '& .MuiInputBase-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
              }}
            />
            <TextField
              label="비밀번호"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              
              sx={{  //모바일 ===
                marginBottom: 2,
                '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
                '& .MuiInputBase-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{   // 모바일
                mt: 2,
                padding: { xs: '10px', sm: '12px' },
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              로그인
            </Button>
          </form>
        </Box>
      </Container>
    );
    

}

export default Loginpage
