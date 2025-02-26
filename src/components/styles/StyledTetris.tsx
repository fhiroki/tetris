import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  padding: 0;
`;

export const StyledTetris = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 1600px;
  height: 95vh;

  .game-area {
    position: relative;
    width: 400px;
    max-width: 800px;
    display: block;
    margin: 0 20px 0 5px;
  }

  .game-over, .game-paused {
    position: absolute;
    top: 40%;
    left: 51%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    font-size: 22px;
    padding: 30px;
    border-radius: 10px;
    width: 80%;
    text-align: center;
    z-index: 10;
    pointer-events: none;
  }

  .game-over {
    color: red;
  }

  .game-paused {
    color: yellow;
  }

  aside {
    width: 100%;
    max-width: 220px;
    display: flex;
    flex-direction: column;
    padding: 0 5px;

    .info-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    height: auto;

    .game-area {
      margin: 0 0 10px 0;
    }

    aside {
      max-width: 800px;
      min-height: auto;
      margin-bottom: 20px;

      .info-section {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;

        > div {
          flex: 0 0 calc(50% - 10px);
        }

        .next-tetromino-container, button {
          flex: 1 0 100%;
          max-width: 200px;
        }
      }
    }
  }

  @media (max-width: 600px) {
    aside .info-section > div {
      flex: 1 0 100%;
    }
  }
`;
