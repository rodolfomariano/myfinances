import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

export const Container = styled.View`
position: relative;
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 40px;
  margin-top: -10px;
  border: 10px solid ${({ theme }) => theme.colors.background};
`
export const Button = styled(RectButton)`
  flex: 1;
  width: 100%;
  height: 70px;
  border-radius: 40px;

  align-items: center;
  justify-content: center;
`
export const EditCurveOutsideLeft = styled.View`
  position: absolute;
  top: 2px;
  left: -10px;
  width: 8px;
  height: 19px;
  background-color: ${({ theme }) => theme.colors.background};
`
export const EditCurveOutsideRight = styled.View`
  position: absolute;
  top: 2px;
  right: -10px;
  width: 8px;
  height: 19px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const CurveOutsideLeft = styled.View`
  position: absolute;
  top: 0;
  left: -40px;
  width: 40px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.background};

`
export const CurveOutsideLeftCurve = styled.View`
  position: absolute;
  z-index: 200;
  top: 2px;
  left: -40px;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.shape_dark};
  border-top-right-radius: 30px;
`
export const CurveOutsideRight = styled.View`
  position: absolute;
  top: 0;
  right: -40px;
  width: 40px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.background};

`
export const CurveOutsideRightCurve = styled.View`
  position: absolute;
  z-index: 200;
  top: 2px;
  right: -40px;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.shape_dark};
  border-top-left-radius: 30px;
`