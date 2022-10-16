import { ToastContainer } from "react-toastify";
import { useThemeState } from "states/Style";
import { useRecoilValue } from "recoil";

export default function ToastProvider() {
  const theme = useRecoilValue(useThemeState);
  return (
    <ToastContainer
      theme={theme.theme.palette.mode}
      position="top-right"
    ></ToastContainer>
  );
}
