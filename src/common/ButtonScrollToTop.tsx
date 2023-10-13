import { useEffect, useState } from "react";
import { IconButton, Slide, Tooltip } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";

const ButtonScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      console.log(
        window.scrollY,
        window.innerHeight,
        document.documentElement.offsetHeight
      );
      setIsVisible(scrollY >= window.innerHeight);
    };
    window.addEventListener(
      "scroll",
      debounce(() => handleVisibility(), 250)
    );
    return document.removeEventListener(
      "scroll",
      debounce(handleVisibility, 250)
    );
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Slide direction="bottom" in={isVisible}>
      <Tooltip hasArrow label="Scroll to top" bg="blue.200">
        <IconButton
          ml="97%"
          mb="20px"
          right="30"
          isRound
          onClick={scrollTop}
          colorScheme="blue"
          aria-label="Scroll to top"
          icon={<ArrowUpIcon />}
        />
      </Tooltip>
    </Slide>
  );
};

export default ButtonScrollToTop;
