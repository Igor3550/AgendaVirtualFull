import styled from 'styled-components';

export const DashboardArea = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #C52C6C;
  position: absolute;
`;

export const Container = styled.div`
  width: 780px;
  height: 775px;
  display: flex;
  border-radius: 10px 10px 0 0;
  padding-top: 30px;
  justify-content: center;
  background-color: #FF5CA1;
  overflow-y: auto;

  @media (max-width: 800px) {
    width: 100%;
    height: 100vh;

    border-radius: 0;
  }
`;