import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkCommponent } from "react-router-dom";
import { grayColor } from "../../contants/color";

export const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const Link = styled(LinkCommponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.3rem;
  background-color: ${grayColor};
`;

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
  font-size: 1.5rem;
`;
export const CurveButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 1.1rem;
  &:hober {
    background-color: rgba(0, 0, 0, 0, 8);
  }
`;
const bounceAnimation= keyframes`
0% { transform: scale(1); }
50% { transfor: scale(1.5); }
100% {transfrom: scale(1);}
`
export const BouncingSkeleton=styled(Skeleton)(()=>({
  animation:`${bounceAnimation} 1s infinite`,
}))
