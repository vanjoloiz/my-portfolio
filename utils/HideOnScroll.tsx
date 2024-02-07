import { useScrollTrigger } from "@mui/material";
import Slide from "@mui/material/Slide";

const HideOnScroll = (props: any) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    target: undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
